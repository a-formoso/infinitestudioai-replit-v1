type ApiResponse<T> = {
  data?: T;
  error?: string;
};

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'An error occurred' };
    }

    return { data };
  } catch (error) {
    return { error: 'Network error occurred' };
  }
}

// Auth
export async function register(username: string, email: string, password: string, redirectPath?: string) {
  return apiFetch<{ user: any; verificationSent: boolean }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, redirectPath }),
  });
}

export async function resendVerification(redirectPath?: string) {
  return apiFetch<{ message: string }>('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ redirectPath }),
  });
}

export async function login(email: string, password: string) {
  return apiFetch<{ user: any }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return apiFetch<{ message: string }>('/auth/logout', {
    method: 'POST',
  });
}

export async function getCurrentUser() {
  return apiFetch<{ user: any }>('/auth/me');
}

export async function updateProfile(username: string, email: string) {
  return apiFetch<{ user: any }>('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({ username, email }),
  });
}

export async function forgotPassword(email: string) {
  return apiFetch<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, newPassword: string) {
  return apiFetch<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

export async function changePassword(currentPassword: string, newPassword: string) {
  return apiFetch<{ message: string }>('/auth/password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// Course Tiers
export async function getCourseTiers() {
  return apiFetch<{ tiers: any[] }>('/course-tiers');
}

export async function createCourseTier(data: Record<string, any>) {
  return apiFetch<{ tier: any }>('/course-tiers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCourseTier(id: string, data: Record<string, any>) {
  return apiFetch<{ tier: any }>(`/course-tiers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCourseTier(id: string) {
  return apiFetch<{ message: string }>(`/course-tiers/${id}`, {
    method: 'DELETE',
  });
}

// Courses
export async function getCourses() {
  return apiFetch<{ courses: any[]; isAdmin?: boolean }>('/courses');
}

export async function getCourseBySlug(slug: string) {
  return apiFetch<{ course: any; lessons: any[] }>(`/courses/${slug}`);
}

export async function createCourse(data: Record<string, any>) {
  return apiFetch<{ course: any }>('/courses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCourse(id: string, data: Record<string, any>) {
  return apiFetch<{ course: any }>(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCourse(id: string) {
  return apiFetch<{ message: string }>(`/courses/${id}`, {
    method: 'DELETE',
  });
}

export async function saveCourseLessons(courseId: string, lessons: any[]) {
  return apiFetch<{ lessons: any[] }>(`/courses/${courseId}/lessons`, {
    method: 'PUT',
    body: JSON.stringify({ lessons }),
  });
}

// Enrollments
export async function getEnrollments() {
  return apiFetch<{ enrollments: any[] }>('/enrollments');
}

export async function enrollInCourse(courseId: string) {
  return apiFetch<{ enrollment: any }>('/enrollments', {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
}

// Progress
export async function updateProgress(enrollmentId: string, lessonId: string, completed: boolean) {
  return apiFetch<{ progress: any }>('/progress', {
    method: 'POST',
    body: JSON.stringify({ enrollmentId, lessonId, completed }),
  });
}

export async function getEnrollmentProgress(enrollmentId: string) {
  return apiFetch<{ progress: any[] }>(`/enrollments/${enrollmentId}/progress`);
}

// Featured Videos
export async function getFeaturedVideos() {
  return apiFetch<{ videos: any[] }>('/featured-videos');
}

export async function createFeaturedVideo(data: Record<string, any>) {
  return apiFetch<{ video: any }>('/featured-videos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateFeaturedVideo(id: string, data: Record<string, any>) {
  return apiFetch<{ video: any }>(`/featured-videos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteFeaturedVideo(id: string) {
  return apiFetch<{ message: string }>(`/featured-videos/${id}`, {
    method: 'DELETE',
  });
}

// Hero Video
export async function getHeroVideo() {
  return apiFetch<{ heroVideo: any }>('/hero-video');
}

export async function updateHeroVideo(data: Record<string, any>) {
  return apiFetch<{ heroVideo: any }>('/hero-video', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Assets
export async function getAssets() {
  return apiFetch<{ assets: any[] }>('/assets');
}

export async function getAsset(id: string) {
  return apiFetch<{ asset: any }>(`/assets/${id}`);
}

// Orders
export async function createOrder(items: Array<{ itemType: string; itemId: string }>) {
  return apiFetch<{ order: any; items: any[] }>('/orders', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

export async function getOrders() {
  return apiFetch<{ orders: any[] }>('/orders');
}

