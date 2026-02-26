import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { insertUserSchema, insertEnrollmentSchema, insertLessonProgressSchema, insertOrderSchema, insertOrderItemSchema, insertFeaturedVideoSchema } from "@shared/schema";
import { z } from "zod";
import { sendVerificationEmail, sendPasswordResetEmail } from "./email";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";

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
  
  // Forgot password - request reset link
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const forgotSchema = z.object({ email: z.string().email() });
      const parsed = forgotSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "A valid email is required" });
      }

      const user = await storage.getUserByEmail(parsed.data.email);
      if (!user) {
        return res.json({ message: "If an account with that email exists, a reset link has been sent." });
      }

      const resetToken = nanoid(32);
      const expires = new Date(Date.now() + 60 * 60 * 1000);
      await storage.setPasswordResetToken(user.id, resetToken, expires);

      await sendPasswordResetEmail(user.email, resetToken);

      res.json({ message: "If an account with that email exists, a reset link has been sent." });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Failed to process request. Please try again." });
    }
  });

  // Reset password with token
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const resetSchema = z.object({
        token: z.string().min(1),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
      });
      const parsed = resetSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.errors[0]?.message || "Invalid input" });
      }

      const user = await storage.getUserByPasswordResetToken(parsed.data.token);
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset link" });
      }

      if (!user.passwordResetExpires || new Date() > user.passwordResetExpires) {
        await storage.clearPasswordResetToken(user.id);
        return res.status(400).json({ message: "Reset link has expired. Please request a new one." });
      }

      const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10);
      await storage.updateUserPassword(user.id, hashedPassword);
      await storage.clearPasswordResetToken(user.id);

      res.json({ message: "Password has been reset successfully. You can now log in." });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Failed to reset password. Please try again." });
    }
  });

  // Change password
  app.put("/api/auth/password", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(user.id, hashedPassword);

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update password" });
    }
  });

  // Register object storage routes for file uploads
  registerObjectStorageRoutes(app);

  // ===== Course Tier Routes =====

  app.get("/api/course-tiers", async (req, res) => {
    try {
      const tiers = await storage.getAllCourseTiers();
      res.json({ tiers });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tiers" });
    }
  });

  app.post("/api/course-tiers", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const { name, color, sortOrder } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Tier name is required" });
      }
      const slug = (name as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await storage.getCourseTierBySlug(slug);
      if (existing) {
        return res.status(400).json({ message: "A tier with a similar name already exists" });
      }
      const tier = await storage.createCourseTier({
        name,
        slug,
        color: color || "#2962FF",
        sortOrder: sortOrder ?? 0,
      });
      res.status(201).json({ tier });
    } catch (error) {
      res.status(500).json({ message: "Failed to create tier" });
    }
  });

  app.put("/api/course-tiers/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const { name, color, sortOrder } = req.body;
      const updates: Record<string, any> = {};
      if (name !== undefined) {
        updates.name = name;
        updates.slug = (name as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      if (color !== undefined) updates.color = color;
      if (sortOrder !== undefined) updates.sortOrder = sortOrder;
      const tier = await storage.updateCourseTier(req.params.id, updates);
      if (!tier) {
        return res.status(404).json({ message: "Tier not found" });
      }
      res.json({ tier });
    } catch (error) {
      res.status(500).json({ message: "Failed to update tier" });
    }
  });

  app.delete("/api/course-tiers/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const deleted = await storage.deleteCourseTier(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Tier not found" });
      }
      res.json({ message: "Tier deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete tier" });
    }
  });

  // ===== Course Routes =====
  
  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      let isAdmin = false;
      if (req.session.userId) {
        const user = await storage.getUser(req.session.userId);
        isAdmin = user?.isAdmin === true;
      }
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
      
      if (course.status !== 'published') {
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
  
  // Create course (admin only)
  app.post("/api/courses", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const { title, description, shortDescription, price, originalPrice, level, duration, lessonsCount, badge, color, status, imageUrl, trailerUrl, learningOutcomes, features, prerequisiteNote } = req.body;
      if (!title || !level) {
        return res.status(400).json({ message: "Title and level are required" });
      }
      const slug = (title as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await storage.getCourseBySlug(slug);
      if (existing) {
        return res.status(400).json({ message: "A course with a similar title already exists" });
      }
      const numPrice = Number(String(price || "0").replace(/[$,\s]/g, ""));
      const course = await storage.createCourse({
        title,
        slug,
        description: description || "",
        shortDescription: shortDescription || "",
        price: String(isNaN(numPrice) ? 0 : numPrice),
        level,
        duration: duration || "0h",
        lessonsCount: lessonsCount || 0,
        badge: badge || null,
        color: color || "#2962FF",
        status: status || "draft",
        imageUrl: imageUrl || null,
        trailerUrl: trailerUrl || null,
        originalPrice: originalPrice ? String(Number(String(originalPrice).replace(/[$,\s]/g, ""))) : null,
        learningOutcomes: learningOutcomes || null,
        features: features || null,
        prerequisiteNote: prerequisiteNote || null,
      } as any);
      res.status(201).json({ course });
    } catch (error) {
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  // Delete course (admin only)
  app.delete("/api/courses/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const deleted = await storage.deleteCourse(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete course" });
    }
  });

  // Update course (admin only)
  app.put("/api/courses/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const allowedFields = ["title", "slug", "shortDescription", "description", "price", "originalPrice", "level", "duration", "lessonsCount", "status", "badge", "color", "imageUrl", "trailerUrl", "learningOutcomes", "features", "prerequisiteNote"];
      const updates: Record<string, any> = {};
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      }
      if (updates.price !== undefined) {
        const numPrice = Number(String(updates.price).replace(/[$,\s]/g, ""));
        if (isNaN(numPrice) || numPrice < 0) {
          return res.status(400).json({ message: "Invalid price value" });
        }
        updates.price = String(numPrice);
      }
      if (updates.status !== undefined && !["published", "draft", "archived"].includes(updates.status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }
      const course = await storage.updateCourse(req.params.id, updates);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ course });
    } catch (error) {
      res.status(500).json({ message: "Failed to update course" });
    }
  });

  // Save lessons for a course (admin only) - replaces all existing lessons
  app.put("/api/courses/:id/lessons", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      const { lessons: lessonData } = req.body;
      if (!Array.isArray(lessonData)) {
        return res.status(400).json({ message: "lessons must be an array" });
      }
      await storage.deleteLessonsByCourse(course.id);
      const created = [];
      for (const l of lessonData) {
        if (!l.moduleNumber || !l.moduleName || !l.lessonNumber || !l.title) continue;
        const lesson = await storage.createLesson({
          courseId: course.id,
          moduleNumber: l.moduleNumber,
          moduleName: l.moduleName,
          lessonNumber: l.lessonNumber,
          title: l.title,
          videoUrl: l.videoUrl || null,
          duration: l.duration || null,
        });
        created.push(lesson);
      }
      res.json({ lessons: created });
    } catch (error) {
      res.status(500).json({ message: "Failed to save lessons" });
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

  // ===== Featured Videos Routes =====

  app.get("/api/featured-videos", async (req, res) => {
    try {
      let isAdmin = false;
      if (req.session.userId) {
        const user = await storage.getUser(req.session.userId);
        isAdmin = user?.isAdmin === true;
      }
      const videos = isAdmin ? await storage.getAllFeaturedVideos() : await storage.getPublishedFeaturedVideos();
      res.json({ videos });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured videos" });
    }
  });

  app.post("/api/featured-videos", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const parsed = insertFeaturedVideoSchema.parse(req.body);
      const video = await storage.createFeaturedVideo(parsed);
      res.status(201).json({ video });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create featured video" });
    }
  });

  app.put("/api/featured-videos/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const partialSchema = insertFeaturedVideoSchema.partial();
      const parsed = partialSchema.parse(req.body);
      if (Object.keys(parsed).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }
      const video = await storage.updateFeaturedVideo(req.params.id, parsed);
      if (!video) {
        return res.status(404).json({ message: "Featured video not found" });
      }
      res.json({ video });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update featured video" });
    }
  });

  app.delete("/api/featured-videos/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const deleted = await storage.deleteFeaturedVideo(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Featured video not found" });
      }
      res.json({ message: "Featured video deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete featured video" });
    }
  });

  return httpServer;
}
