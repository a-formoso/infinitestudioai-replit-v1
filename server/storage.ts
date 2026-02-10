import {
  users,
  courses,
  lessons,
  enrollments,
  lessonProgress,
  assets,
  orders,
  orderItems,
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Lesson,
  type InsertLesson,
  type Enrollment,
  type InsertEnrollment,
  type LessonProgress,
  type InsertLessonProgress,
  type Asset,
  type InsertAsset,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: { username?: string; email?: string; emailVerified?: boolean; verificationToken?: string | null }): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;

  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  getCourseBySlug(slug: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Lesson operations
  getLessonsByCourse(courseId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Enrollment operations
  getUserEnrollments(userId: string): Promise<Array<Enrollment & { course: Course }>>;
  getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  isUserEnrolled(userId: string, courseId: string): Promise<boolean>;

  // Progress operations
  getLessonProgress(enrollmentId: string, lessonId: string): Promise<LessonProgress | undefined>;
  getEnrollmentProgress(enrollmentId: string): Promise<LessonProgress[]>;
  updateLessonProgress(progress: InsertLessonProgress): Promise<LessonProgress>;
  getEnrollmentStats(enrollmentId: string): Promise<{ total: number; completed: number }>;

  // Asset operations
  getAllAssets(): Promise<Asset[]>;
  getAsset(id: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;

  // Order operations
  getUserOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, data: { username?: string; email?: string; emailVerified?: boolean; verificationToken?: string | null }): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
    return user || undefined;
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses).orderBy(desc(courses.createdAt));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.slug, slug));
    return course || undefined;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  // Lesson operations
  async getLessonsByCourse(courseId: string): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, courseId))
      .orderBy(lessons.moduleNumber, lessons.lessonNumber);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson || undefined;
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const [lesson] = await db
      .insert(lessons)
      .values(insertLesson)
      .returning();
    return lesson;
  }

  // Enrollment operations
  async getUserEnrollments(userId: string): Promise<Array<Enrollment & { course: Course }>> {
    const results = await db
      .select()
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, userId));

    return results.map(row => ({
      ...row.enrollments,
      course: row.courses,
    }));
  }

  async getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
    return enrollment || undefined;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db
      .insert(enrollments)
      .values(insertEnrollment)
      .returning();
    return enrollment;
  }

  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    const enrollment = await this.getEnrollment(userId, courseId);
    return !!enrollment;
  }

  // Progress operations
  async getLessonProgress(enrollmentId: string, lessonId: string): Promise<LessonProgress | undefined> {
    const [progress] = await db
      .select()
      .from(lessonProgress)
      .where(and(eq(lessonProgress.enrollmentId, enrollmentId), eq(lessonProgress.lessonId, lessonId)));
    return progress || undefined;
  }

  async getEnrollmentProgress(enrollmentId: string): Promise<LessonProgress[]> {
    return await db
      .select()
      .from(lessonProgress)
      .where(eq(lessonProgress.enrollmentId, enrollmentId));
  }

  async updateLessonProgress(insertProgress: InsertLessonProgress): Promise<LessonProgress> {
    const existing = await this.getLessonProgress(insertProgress.enrollmentId, insertProgress.lessonId);
    
    if (existing) {
      const [updated] = await db
        .update(lessonProgress)
        .set({
          completed: insertProgress.completed,
          completedAt: insertProgress.completed ? new Date() : null,
        })
        .where(eq(lessonProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(lessonProgress)
        .values({
          ...insertProgress,
          completedAt: insertProgress.completed ? new Date() : null,
        })
        .returning();
      return created;
    }
  }

  async getEnrollmentStats(enrollmentId: string): Promise<{ total: number; completed: number }> {
    const progress = await this.getEnrollmentProgress(enrollmentId);
    const completed = progress.filter(p => p.completed).length;
    return { total: progress.length, completed };
  }

  // Asset operations
  async getAllAssets(): Promise<Asset[]> {
    return await db.select().from(assets);
  }

  async getAsset(id: string): Promise<Asset | undefined> {
    const [asset] = await db.select().from(assets).where(eq(assets.id, id));
    return asset || undefined;
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const [asset] = await db
      .insert(assets)
      .values(insertAsset)
      .returning();
    return asset;
  }

  // Order operations
  async getUserOrders(userId: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(sql`${orders.createdAt} DESC`);
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db
      .insert(orderItems)
      .values(insertOrderItem)
      .returning();
    return orderItem;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));
  }
}

export const storage = new DatabaseStorage();
