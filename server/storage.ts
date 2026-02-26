import {
  users,
  courses,
  courseTiers,
  lessons,
  enrollments,
  lessonProgress,
  assets,
  orders,
  orderItems,
  featuredVideos,
  heroVideo,
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type CourseTier,
  type InsertCourseTier,
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
  type FeaturedVideo,
  type InsertFeaturedVideo,
  type HeroVideo,
  type InsertHeroVideo,
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
  updateUserPassword(id: string, hashedPassword: string): Promise<User | undefined>;
  setPasswordResetToken(id: string, token: string, expires: Date): Promise<User | undefined>;
  getUserByPasswordResetToken(token: string): Promise<User | undefined>;
  clearPasswordResetToken(id: string): Promise<void>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;

  // Course tier operations
  getAllCourseTiers(): Promise<CourseTier[]>;
  getCourseTier(id: string): Promise<CourseTier | undefined>;
  getCourseTierBySlug(slug: string): Promise<CourseTier | undefined>;
  createCourseTier(tier: InsertCourseTier): Promise<CourseTier>;
  updateCourseTier(id: string, data: Partial<InsertCourseTier>): Promise<CourseTier | undefined>;
  deleteCourseTier(id: string): Promise<boolean>;

  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  getCourseBySlug(slug: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, data: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;

  // Lesson operations
  getLessonsByCourse(courseId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  deleteLessonsByCourse(courseId: string): Promise<void>;

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
  getAssetBySlug(slug: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: string, asset: Partial<InsertAsset>): Promise<Asset>;
  deleteAsset(id: string): Promise<void>;

  // Order operations
  getUserOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;

  // Featured video operations
  getAllFeaturedVideos(): Promise<FeaturedVideo[]>;
  getPublishedFeaturedVideos(): Promise<FeaturedVideo[]>;
  getFeaturedVideo(id: string): Promise<FeaturedVideo | undefined>;
  createFeaturedVideo(video: InsertFeaturedVideo): Promise<FeaturedVideo>;
  updateFeaturedVideo(id: string, data: Partial<InsertFeaturedVideo>): Promise<FeaturedVideo | undefined>;
  deleteFeaturedVideo(id: string): Promise<boolean>;

  // Hero video operations
  getHeroVideo(): Promise<HeroVideo | undefined>;
  upsertHeroVideo(data: InsertHeroVideo): Promise<HeroVideo>;

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

  async updateUserPassword(id: string, hashedPassword: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async setPasswordResetToken(id: string, token: string, expires: Date): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ passwordResetToken: token, passwordResetExpires: expires })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getUserByPasswordResetToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.passwordResetToken, token));
    return user || undefined;
  }

  async clearPasswordResetToken(id: string): Promise<void> {
    await db
      .update(users)
      .set({ passwordResetToken: null, passwordResetExpires: null })
      .where(eq(users.id, id));
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
    return user || undefined;
  }

  // Course tier operations
  async getAllCourseTiers(): Promise<CourseTier[]> {
    return await db.select().from(courseTiers).orderBy(courseTiers.sortOrder);
  }

  async getCourseTier(id: string): Promise<CourseTier | undefined> {
    const [tier] = await db.select().from(courseTiers).where(eq(courseTiers.id, id));
    return tier || undefined;
  }

  async getCourseTierBySlug(slug: string): Promise<CourseTier | undefined> {
    const [tier] = await db.select().from(courseTiers).where(eq(courseTiers.slug, slug));
    return tier || undefined;
  }

  async createCourseTier(insertTier: InsertCourseTier): Promise<CourseTier> {
    const [tier] = await db.insert(courseTiers).values(insertTier).returning();
    return tier;
  }

  async updateCourseTier(id: string, data: Partial<InsertCourseTier>): Promise<CourseTier | undefined> {
    const [tier] = await db.update(courseTiers).set(data).where(eq(courseTiers.id, id)).returning();
    return tier || undefined;
  }

  async deleteCourseTier(id: string): Promise<boolean> {
    const result = await db.delete(courseTiers).where(eq(courseTiers.id, id)).returning();
    return result.length > 0;
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

  async updateCourse(id: string, data: Partial<InsertCourse>): Promise<Course | undefined> {
    const [course] = await db
      .update(courses)
      .set(data)
      .where(eq(courses.id, id))
      .returning();
    return course || undefined;
  }

  async deleteCourse(id: string): Promise<boolean> {
    await db.delete(lessons).where(eq(lessons.courseId, id));
    const result = await db.delete(courses).where(eq(courses.id, id)).returning();
    return result.length > 0;
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

  async deleteLessonsByCourse(courseId: string): Promise<void> {
    await db.delete(lessons).where(eq(lessons.courseId, courseId));
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

  async getAssetBySlug(slug: string): Promise<Asset | undefined> {
    const [asset] = await db.select().from(assets).where(eq(assets.slug, slug));
    return asset || undefined;
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const [asset] = await db
      .insert(assets)
      .values(insertAsset)
      .returning();
    return asset;
  }

  async updateAsset(id: string, data: Partial<InsertAsset>): Promise<Asset> {
    const [asset] = await db
      .update(assets)
      .set(data)
      .where(eq(assets.id, id))
      .returning();
    return asset;
  }

  async deleteAsset(id: string): Promise<void> {
    await db.delete(assets).where(eq(assets.id, id));
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

  // Featured video operations
  async getAllFeaturedVideos(): Promise<FeaturedVideo[]> {
    return await db.select().from(featuredVideos).orderBy(featuredVideos.sortOrder);
  }

  async getPublishedFeaturedVideos(): Promise<FeaturedVideo[]> {
    return await db.select().from(featuredVideos).where(eq(featuredVideos.status, "published")).orderBy(featuredVideos.sortOrder);
  }

  async getFeaturedVideo(id: string): Promise<FeaturedVideo | undefined> {
    const [video] = await db.select().from(featuredVideos).where(eq(featuredVideos.id, id));
    return video || undefined;
  }

  async createFeaturedVideo(insertVideo: InsertFeaturedVideo): Promise<FeaturedVideo> {
    const [video] = await db.insert(featuredVideos).values(insertVideo).returning();
    return video;
  }

  async updateFeaturedVideo(id: string, data: Partial<InsertFeaturedVideo>): Promise<FeaturedVideo | undefined> {
    const [video] = await db.update(featuredVideos).set(data).where(eq(featuredVideos.id, id)).returning();
    return video || undefined;
  }

  async deleteFeaturedVideo(id: string): Promise<boolean> {
    const result = await db.delete(featuredVideos).where(eq(featuredVideos.id, id)).returning();
    return result.length > 0;
  }

  async getHeroVideo(): Promise<HeroVideo | undefined> {
    const [video] = await db.select().from(heroVideo).where(eq(heroVideo.isActive, true)).limit(1);
    return video || undefined;
  }

  async upsertHeroVideo(data: InsertHeroVideo): Promise<HeroVideo> {
    const existing = await db.select().from(heroVideo).limit(1);
    if (existing.length > 0) {
      const [updated] = await db.update(heroVideo).set({ ...data, updatedAt: new Date() }).where(eq(heroVideo.id, existing[0].id)).returning();
      return updated;
    }
    const [created] = await db.insert(heroVideo).values(data).returning();
    return created;
  }

}

export const storage = new DatabaseStorage();
