import { Footer } from "@/components/footer";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourseBySlug, getEnrollments, updateProgress, getEnrollmentProgress } from "@/lib/api";
import { Play, Check, Circle, ChevronLeft, ChevronRight, Download, MessageSquare, Maximize, Minimize } from "lucide-react";
import type { Lesson } from "@shared/schema";

export default function CoursePlayer() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const courseSlug = params.courseSlug || "level-1";
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseSlug],
    queryFn: () => getCourseBySlug(courseSlug),
  });

  const { data: enrollmentsData } = useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
  });

  const course = courseData?.data?.course;
  const lessons = courseData?.data?.lessons || [];
  const enrollment = enrollmentsData?.data?.enrollments?.find(
    (e: any) => e.course.slug === courseSlug
  );

  const { data: progressData } = useQuery({
    queryKey: ["progress", enrollment?.id],
    queryFn: () => getEnrollmentProgress(enrollment?.id?.toString()),
    enabled: !!enrollment?.id,
  });

  const progressList = progressData?.data?.progress || [];
  const completedLessonIds = new Set(
    progressList.filter((p: any) => p.completed).map((p: any) => p.lessonId)
  );

  useEffect(() => {
    if (lessons.length > 0 && !currentLessonId) {
      const firstIncomplete = lessons.find((l: Lesson) => !completedLessonIds.has(l.id));
      setCurrentLessonId(firstIncomplete?.id || lessons[0].id);
    }
  }, [lessons, currentLessonId, completedLessonIds]);

  const currentLesson = lessons.find((l: Lesson) => l.id === currentLessonId);
  const currentLessonIndex = lessons.findIndex((l: Lesson) => l.id === currentLessonId);

  const progressMutation = useMutation({
    mutationFn: ({ lessonId, completed }: { lessonId: number; completed: boolean }) =>
      updateProgress(enrollment?.id?.toString(), lessonId.toString(), completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", enrollment?.id] });
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });

  const handleMarkComplete = () => {
    if (currentLessonId && enrollment) {
      progressMutation.mutate({ lessonId: currentLessonId, completed: true });
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonId(lessons[currentLessonIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonId(lessons[currentLessonIndex - 1].id);
    }
  };

  const groupedLessons = lessons.reduce((acc: Record<string, Lesson[]>, lesson: Lesson) => {
    const moduleName = (lesson as any).moduleName || "Lessons";
    if (!acc[moduleName]) acc[moduleName] = [];
    acc[moduleName].push(lesson);
    return acc;
  }, {});

  const completedCount = lessons.filter((l: Lesson) => completedLessonIds.has(l.id)).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-electricBlue font-mono text-sm animate-pulse">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center flex-col gap-4">
        <div className="text-white font-header text-xl">Course not found</div>
        <Link href="/dashboard" className="text-electricBlue hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center flex-col gap-4">
        <div className="text-white font-header text-xl">You're not enrolled in this course</div>
        <Link href={`/course/${courseSlug}`} className="text-electricBlue hover:underline">View Course Details</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
      
      {/* TOP BAR */}
      <header className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 text-xs font-header font-bold text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" /> DASHBOARD
            </Link>
            <div className="h-4 w-px bg-white/10"></div>
            <h1 className="text-sm font-header font-bold text-white tracking-wider">{course.title}</h1>
          </div>
          <div className="flex items-center gap-6">
            {currentLesson && (
              <span className="text-[10px] font-mono text-electricBlue hidden md:block">
                {currentLesson.title}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: PLAYER & INFO */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* VIDEO PLAYER AREA */}
            <div className={`${isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen bg-black' : 'w-full aspect-video rounded-lg overflow-hidden'} bg-black relative group transition-all duration-300 shadow-2xl border border-white/10`}>
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={() => setIsFullscreen(true)}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-electricBlue hover:border-electricBlue transition-all group-hover:scale-110">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
              
              {/* Scrubber */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 cursor-pointer z-10">
                <div className="h-full bg-electricBlue w-1/3 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                </div>
              </div>

              {/* Video Meta Overlay */}
              {currentLesson && (
                <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 text-[10px] font-mono text-white rounded pointer-events-none">
                  {currentLesson.title}
                </div>
              )}

              {/* Fullscreen Toggle */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(!isFullscreen);
                }}
                className="absolute bottom-4 right-4 text-white/70 hover:text-white transition-colors z-20 p-2 hover:bg-white/10 rounded"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>

            {/* CONTENT AREA */}
            <div className="glass-panel p-8">
              {/* Title & Nav */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/10 pb-8">
                <div>
                  <h2 className="font-header text-2xl text-white mb-2">{currentLesson?.title || "Select a Lesson"}</h2>
                  <p className="text-xs text-gray-400 font-mono">{(currentLesson as any)?.moduleName || ""}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex <= 0}
                    className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-header font-bold text-white transition-colors disabled:opacity-30"
                  >
                    <ChevronLeft className="w-3 h-3" /> PREV
                  </button>
                  {completedLessonIds.has(currentLessonId!) ? (
                    <button 
                      onClick={handleNextLesson}
                      disabled={currentLessonIndex >= lessons.length - 1}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-electricBlue hover:text-white text-xs font-header font-bold transition-colors disabled:opacity-30"
                    >
                      NEXT LESSON <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleMarkComplete}
                      disabled={progressMutation.isPending}
                      className="flex items-center gap-2 px-4 py-2 bg-electricBlue text-white hover:bg-white hover:text-black text-xs font-header font-bold transition-colors"
                    >
                      <Check className="w-3 h-3" /> MARK COMPLETE
                    </button>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 border-b border-white/10 mb-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 text-xs font-header font-bold tracking-wider transition-colors border-b-2 ${activeTab === 'overview' ? 'text-white border-electricBlue' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                >
                  OVERVIEW
                </button>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className={`pb-4 text-xs font-header font-bold tracking-wider transition-colors border-b-2 ${activeTab === 'resources' ? 'text-white border-electricBlue' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                >
                  RESOURCES
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-gray-300 text-sm leading-relaxed space-y-6">
                {activeTab === 'overview' && (
                  <div className="animate-in fade-in duration-300">
                    <p>{currentLesson?.description || "No description available for this lesson."}</p>
                    
                    {currentLesson?.duration && (
                      <div className="mt-8">
                        <h3 className="text-white font-bold mb-4">Duration:</h3>
                        <p className="text-gray-400">{currentLesson.duration}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'resources' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between p-4 border border-white/10 hover:bg-white/5 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-electricBlue/20 flex items-center justify-center text-electricBlue rounded">
                          <Download className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">Lesson Resources</h4>
                          <p className="text-[10px] text-gray-500 font-mono">Coming soon</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-gray-500 group-hover:text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PLAYLIST */}
          <div className="space-y-8">
            <div className="glass-panel sticky top-32">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h3 className="font-header text-xs font-bold text-gray-400 mb-4 tracking-wider">COURSE CONTENT</h3>
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-2">
                  <span>{completedCount}/{lessons.length} COMPLETED</span>
                  <span className="text-electricBlue">{progressPercent}%</span>
                </div>
                <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-electricBlue transition-all" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              {/* Scrollable List */}
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {Object.entries(groupedLessons).map(([moduleName, moduleLessons], moduleIndex) => (
                  <div key={moduleName} className={`py-4 ${moduleIndex > 0 ? 'border-t border-white/5' : ''}`}>
                    <h4 className={`px-6 text-[10px] font-header font-bold mb-4 uppercase ${
                      moduleLessons.some((l: Lesson) => l.id === currentLessonId) ? 'text-electricBlue' : 'text-gray-500'
                    }`}>
                      {moduleName}
                    </h4>
                    <div className="space-y-1">
                      {moduleLessons.map((lesson: Lesson) => {
                        const isActive = lesson.id === currentLessonId;
                        const isCompleted = completedLessonIds.has(lesson.id);
                        
                        return (
                          <div 
                            key={lesson.id}
                            onClick={() => setCurrentLessonId(lesson.id)}
                            className={`px-6 py-3 flex gap-3 items-start cursor-pointer transition-all ${
                              isActive 
                                ? 'bg-electricBlue/10 border-l-2 border-electricBlue py-4' 
                                : isCompleted 
                                  ? 'opacity-50 hover:bg-white/5'
                                  : 'hover:bg-white/5 group'
                            }`}
                            data-testid={`lesson-${lesson.id}`}
                          >
                            {isActive ? (
                              <div className="w-4 h-4 rounded-full bg-electricBlue flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(41,98,255,0.5)]">
                                <Play className="w-2 h-2 text-white fill-current" />
                              </div>
                            ) : isCompleted ? (
                              <Check className="w-4 h-4 text-electricBlue shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-600 shrink-0 mt-0.5 group-hover:text-gray-400" />
                            )}
                            <div>
                              <p className={`text-xs leading-tight mb-1 ${
                                isActive 
                                  ? 'text-white font-bold' 
                                  : isCompleted 
                                    ? 'text-white'
                                    : 'text-gray-400 group-hover:text-white transition-colors'
                              }`}>
                                {lesson.title}
                              </p>
                              <span className={`text-[10px] font-mono ${
                                isActive ? 'text-electricBlue font-bold tracking-wider' : 'text-gray-600'
                              }`}>
                                {isActive ? 'WATCHING NOW' : lesson.duration || ''}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
