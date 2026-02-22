import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { insertUserSchema, insertEnrollmentSchema, insertLessonProgressSchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";
import { sendVerificationEmail } from "./email";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ===== Authentication Routes =====
  
  // Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const verificationToken = nanoid(32);
      
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
        verificationToken,
        emailVerified: false,
      });
      
      req.session.userId = user.id;
      
      const redirectPath = req.body.redirectPath || null;
      try {
        await sendVerificationEmail(user.email, verificationToken, redirectPath);
      } catch (emailError) {
        console.error("Email send failed:", emailError);
      }
      
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword, verificationSent: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });
  
  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  // Verify email
  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const token = req.query.token as string;
      const redirect = req.query.redirect as string | undefined;
      
      if (!token) {
        return res.status(400).send("Invalid verification link");
      }
      
      const user = await storage.getUserByVerificationToken(token);
      if (!user) {
        return res.status(400).send("Invalid or expired verification link");
      }
      
      await storage.updateUser(user.id, {
        emailVerified: true,
        verificationToken: null,
      });
      
      req.session.userId = user.id;
      
      const safePaths = ["/checkout", "/dashboard", "/course/player", "/academy"];
      let redirectPath = "/dashboard";
      if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
        const basePath = redirect.split("?")[0];
        if (safePaths.some(p => basePath.startsWith(p))) {
          redirectPath = redirect;
        }
      }
      res.redirect(redirectPath);
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).send("Verification failed. Please try again.");
    }
  });
  
  // Resend verification email
  app.post("/api/auth/resend-verification", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if (user.emailVerified) {
        return res.json({ message: "Email already verified" });
      }
      
      const verificationToken = nanoid(32);
      await storage.updateUser(user.id, { verificationToken });
      
      const redirectPath = req.body.redirectPath || null;
      await sendVerificationEmail(user.email, verificationToken, redirectPath);
      
      res.json({ message: "Verification email sent" });
    } catch (error) {
      console.error("Resend verification error:", error);
      res.status(500).json({ message: "Failed to resend verification email" });
    }
  });
  
  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  });
  
  // Update user profile
  app.put("/api/auth/profile", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const { username, email } = req.body;
      
      // Check if email is taken by another user
      if (email) {
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser && existingUser.id !== req.session.userId) {
          return res.status(400).json({ message: "Email already in use" });
        }
      }
      
      // Check if username is taken by another user
      if (username) {
        const existingUser = await storage.getUserByUsername(username);
        if (existingUser && existingUser.id !== req.session.userId) {
          return res.status(400).json({ message: "Username already taken" });
        }
      }
      
      const updatedUser = await storage.updateUser(req.session.userId, { username, email });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  
  // ===== Course Routes =====
  
  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const allCourses = await storage.getAllCourses();
      let isAdmin = false;
      if (req.session.userId) {
        const user = await storage.getUser(req.session.userId);
        isAdmin = user?.isAdmin === true;
      }
      const courses = isAdmin ? allCourses : allCourses.filter(c => c.status === 'published');
      res.json({ courses, isAdmin });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });
  
  // Get course by slug
  app.get("/api/courses/:slug", async (req, res) => {
    try {
      const course = await storage.getCourseBySlug(req.params.slug);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      if (course.status === 'draft') {
        let isAdmin = false;
        if (req.session.userId) {
          const user = await storage.getUser(req.session.userId);
          isAdmin = user?.isAdmin === true;
        }
        if (!isAdmin) {
          return res.status(404).json({ message: "Course not found" });
        }
      }
      
      const lessons = await storage.getLessonsByCourse(course.id);
      res.json({ course, lessons });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });
  
  // ===== Enrollment Routes =====
  
  // Get user's enrollments
  app.get("/api/enrollments", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const enrollments = await storage.getUserEnrollments(req.session.userId);
      
      // Get progress for each enrollment
      const enrollmentsWithProgress = await Promise.all(
        enrollments.map(async (enrollment) => {
          const lessons = await storage.getLessonsByCourse(enrollment.courseId);
          const progress = await storage.getEnrollmentProgress(enrollment.id);
          const completed = progress.filter(p => p.completed).length;
          
          return {
            ...enrollment,
            progress: {
              total: lessons.length,
              completed,
              percentage: lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0,
            },
          };
        })
      );
      
      res.json({ enrollments: enrollmentsWithProgress });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });
  
  // Enroll in a course
  app.post("/api/enrollments", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user || !user.emailVerified) {
        return res.status(403).json({ message: "Please verify your email before enrolling" });
      }
      
      const { courseId } = req.body;
      
      if (!courseId) {
        return res.status(400).json({ message: "Course ID required" });
      }
      
      const existing = await storage.getEnrollment(req.session.userId, courseId);
      if (existing) {
        return res.status(400).json({ message: "Already enrolled in this course" });
      }
      
      const enrollment = await storage.createEnrollment({
        userId: req.session.userId,
        courseId,
      });
      
      res.status(201).json({ enrollment });
    } catch (error) {
      res.status(500).json({ message: "Failed to enroll in course" });
    }
  });
  
  // ===== Progress Routes =====
  
  // Get enrollment progress
  app.get("/api/enrollments/:enrollmentId/progress", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const { enrollmentId } = req.params;
      
      const enrollment = await storage.getEnrollment(req.session.userId, "");
      // Simple check - in production would verify enrollment belongs to user
      
      const progress = await storage.getEnrollmentProgress(enrollmentId);
      res.json({ progress });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });
  
  // Update lesson progress
  app.post("/api/progress", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const validatedData = insertLessonProgressSchema.parse(req.body);
      const progress = await storage.updateLessonProgress(validatedData);
      res.json({ progress });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });
  
  // ===== Asset Routes =====
  
  // Get all assets
  app.get("/api/assets", async (req, res) => {
    try {
      const assets = await storage.getAllAssets();
      res.json({ assets });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });
  
  // Get single asset
  app.get("/api/assets/:id", async (req, res) => {
    try {
      const asset = await storage.getAsset(req.params.id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.json({ asset });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch asset" });
    }
  });
  
  // ===== Order Routes =====
  
  // Get user's orders
  app.get("/api/orders", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const orders = await storage.getUserOrders(req.session.userId);
      res.json({ orders });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  
  // Create order (checkout)
  app.post("/api/orders", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const { items } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order items required" });
      }
      
      // Calculate total (in production, verify prices server-side)
      let totalAmount = 0;
      for (const item of items) {
        if (item.itemType === "course") {
          const course = await storage.getCourse(item.itemId);
          if (course) {
            totalAmount += parseFloat(course.price);
          }
        } else if (item.itemType === "asset") {
          const asset = await storage.getAsset(item.itemId);
          if (asset) {
            totalAmount += parseFloat(asset.price);
          }
        }
      }
      
      // Create order
      const order = await storage.createOrder({
        userId: req.session.userId,
        totalAmount: totalAmount.toString(),
        status: "completed",
      });
      
      // Create order items
      for (const item of items) {
        let price = 0;
        if (item.itemType === "course") {
          const course = await storage.getCourse(item.itemId);
          if (course) price = parseFloat(course.price);
        } else if (item.itemType === "asset") {
          const asset = await storage.getAsset(item.itemId);
          if (asset) price = parseFloat(asset.price);
        }
        
        await storage.createOrderItem({
          orderId: order.id,
          itemType: item.itemType,
          itemId: item.itemId,
          price: price.toString(),
        });
        
        // Auto-enroll in courses
        if (item.itemType === "course") {
          const existing = await storage.getEnrollment(req.session.userId!, item.itemId);
          if (!existing) {
            await storage.createEnrollment({
              userId: req.session.userId!,
              courseId: item.itemId,
            });
          }
        }
      }
      
      const orderItems = await storage.getOrderItems(order.id);
      res.status(201).json({ order, items: orderItems });
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  return httpServer;
}
