import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Check, ChevronRight, AlertTriangle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link, useRoute } from "wouter";
import { getCurrentUser, getCourseBySlug, getCourseTiers } from "@/lib/api";

export default function CourseDetail() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const [, paramsFoundation] = useRoute("/academy/foundation/:slug");
  const [, paramsSpecialist] = useRoute("/academy/specialist/:slug");
  const [, paramsTier] = useRoute("/academy/:tierSlug/:slug");
  const slug = paramsFoundation?.slug || paramsSpecialist?.slug || paramsTier?.slug || "";

  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: courseData, isLoading, error } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug(slug),
    enabled: !!slug,
  });

  const { data: tiersData } = useQuery({
    queryKey: ["courseTiers"],
    queryFn: getCourseTiers,
  });

  const dbTiers = tiersData?.data?.tiers || [];
  const course = courseData?.data?.course;
  const lessons = courseData?.data?.lessons || [];
  const isDraft = course?.status === "draft" || course?.status === "archived";
  const matchedTier = dbTiers.find((t: any) => t.name === course?.level);
  const tierColor = matchedTier?.color || (course?.level === "Specialist" ? "#FF3D00" : "#2962FF");
  const tierLabel = course?.level || "Foundation";
  const tierFilter = matchedTier?.slug || (course?.level === "Specialist" ? "specialist" : "foundation");

  const modules: Record<number, { name: string; lessons: any[] }> = {};
  lessons.forEach((lesson: any) => {
    if (!modules[lesson.moduleNumber]) {
      modules[lesson.moduleNumber] = { name: lesson.moduleName, lessons: [] };
    }
    modules[lesson.moduleNumber].lessons.push(lesson);
  });

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  const handleEnroll = () => {
    setLocation(`/checkout?course=${slug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian text-offWhite font-body flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-electricBlue" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <AlertTriangle className="w-12 h-12 text-signalOrange mb-4" />
          <h1 className="font-header text-2xl text-white mb-2">COURSE NOT FOUND</h1>
          <p className="text-gray-400 text-sm mb-6">This course doesn't exist or you don't have access to preview it.</p>
          <Link href="/academy" className="text-electricBlue text-sm font-mono hover:underline" data-testid="link-back-to-academy">
            &larr; Back to Academy
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const titleParts = course.title?.split(" ") || [];
  const firstHalf = titleParts.slice(0, Math.ceil(titleParts.length / 2)).join(" ");
  const secondHalf = titleParts.slice(Math.ceil(titleParts.length / 2)).join(" ");

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      {isDraft && (
        <div className="bg-neonPurple/20 border-b border-neonPurple/40 px-6 py-3 text-center relative z-20">
          <span className="text-[10px] font-mono text-neonPurple tracking-widest">ADMIN PREVIEW — THIS COURSE IS NOT YET PUBLISHED</span>
        </div>
      )}

      <header className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-1.5 mb-6 text-[10px] font-mono text-gray-500 tracking-widest uppercase">
              <Link href="/academy" className="hover:text-white transition-colors">Academy</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/academy?filter=${tierFilter}`} className="hover:text-white transition-colors" style={{ color: tierColor }}>{tierLabel}</Link>
            </div>
            <h1 className="font-header text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {firstHalf}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${tierColor}, ${tierColor}80)` }}>{secondHalf}</span>
            </h1>
            <p className="text-base text-gray-400 leading-relaxed font-light mb-8 max-w-lg">
              {course.description || course.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-gray-500">
              {course.duration && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: tierColor }}></div> {course.duration}</span>}
              {course.lessonsCount && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: tierColor }}></div> {course.lessonsCount} LESSONS</span>}
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: tierColor }}></div> LIFETIME ACCESS</span>
            </div>
            {!isDraft && (
              <button
                onClick={handleEnroll}
                className="group inline-block bg-white text-black px-8 py-4 text-sm font-header font-bold uppercase transition-all duration-300 tracking-wider cursor-pointer"
                style={{ boxShadow: `0 0 20px rgba(255,255,255,0.2)` }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tierColor; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 0 20px ${tierColor}66`; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)'; }}
                data-testid="button-hero-enroll"
              >
                Start Training
              </button>
            )}
            {isDraft && (
              <div className="inline-block border border-neonPurple/40 text-neonPurple px-8 py-4 text-sm font-header font-bold uppercase tracking-wider">
                Coming Soon
              </div>
            )}
          </div>

          <div className="relative glass-panel p-2 group" style={{ borderColor: `${tierColor}33` }}>
            <div className="aspect-video bg-gray-900 relative overflow-hidden">
              {course.imageUrl ? (
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${course.imageUrl})` }}></div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" style={{ background: `linear-gradient(to bottom right, ${tierColor}30, black)` }}>
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 cursor-pointer">
                    <span className="text-2xl ml-1 text-white">▶</span>
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black/50 px-2 py-1">COURSE_TRAILER.MP4</div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {(() => {
              let parsedOutcomes: Array<{ title: string; description: string }> = [];
              try {
                if (course.learningOutcomes) {
                  parsedOutcomes = typeof course.learningOutcomes === 'string' ? JSON.parse(course.learningOutcomes) : course.learningOutcomes;
                }
              } catch {}
              return parsedOutcomes.length > 0 ? (
                <div className="mb-16">
                  <h3 className="font-header text-xl text-white mb-8 border-l-4 pl-4" style={{ borderColor: tierColor }}>WHAT YOU WILL LEARN</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {parsedOutcomes.map((outcome, idx) => (
                      <div key={idx} className="glass-panel p-6 hover:border-white/20 transition-colors" data-testid={`card-outcome-${idx}`}>
                        <div className="mb-2 text-xl" style={{ color: tierColor }}>{String(idx + 1).padStart(2, '0')}</div>
                        <h4 className="font-bold text-white text-sm mb-2">{outcome.title}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{outcome.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {Object.keys(modules).length > 0 && (
              <div className="mb-16">
                <h3 className="font-header text-xl text-white mb-8 border-l-4 border-white pl-4">CLASS SYLLABUS</h3>
                <div className="space-y-4">
                  {Object.entries(modules).map(([num, mod]) => (
                    <div key={num} className="border border-white/10 bg-white/5">
                      <button
                        className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors"
                        onClick={() => toggleModule(Number(num))}
                        data-testid={`button-module-${num}`}
                      >
                        <span className="font-header text-sm text-white">MODULE {num}: {mod.name}</span>
                        <span className="text-xl" style={{ color: tierColor }}>{openModule === Number(num) ? '−' : '+'}</span>
                      </button>
                      <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === Number(num) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-black/30 p-6">
                          <ul className="space-y-3 text-xs text-gray-400 font-mono">
                            {mod.lessons.map((lesson: any) => (
                              <li key={lesson.id} className="flex gap-4">
                                <span className="text-white">{lesson.moduleNumber}.{lesson.lessonNumber}</span>
                                {lesson.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(modules).length === 0 && (
              <div className="mb-16">
                <h3 className="font-header text-xl text-white mb-8 border-l-4 border-white pl-4">CURRICULUM</h3>
                <div className="glass-panel p-8 text-center">
                  <p className="text-gray-400 text-sm font-mono">Curriculum details coming soon.</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 sticky top-24 border-t-4" style={{ borderTopColor: tierColor }}>
              <div className="text-center mb-6">
                {course.price && (
                  <>
                    <h2 className="text-4xl font-header font-bold text-white mt-2">${course.price}</h2>
                    <span className="text-[10px] font-mono px-2 py-1 rounded mt-2 inline-block" style={{ color: tierColor, backgroundColor: `${tierColor}15` }}>LIFETIME ACCESS</span>
                  </>
                )}
                {!course.price && isDraft && (
                  <h2 className="text-2xl font-header font-bold text-gray-500 mt-2">PRICING TBD</h2>
                )}
              </div>

              {!isDraft && (
                <button
                  onClick={handleEnroll}
                  data-testid="button-enroll"
                  className="w-full text-white font-header font-bold text-sm uppercase py-4 transition-all duration-300 tracking-wider mb-4 cursor-pointer"
                  style={{ backgroundColor: tierColor, boxShadow: `0 0 20px ${tierColor}66` }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = tierColor; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 0 20px ${tierColor}66`; }}
                >
                  Enroll Now
                </button>
              )}
              {isDraft && (
                <div className="w-full border border-neonPurple/40 text-neonPurple font-header font-bold text-sm uppercase py-4 text-center tracking-wider mb-4">
                  Coming Soon
                </div>
              )}

              {course.prerequisiteNote && (
                <p className="text-[10px] text-gray-500 text-center font-mono mb-6" data-testid="text-prerequisite-note">
                  {course.prerequisiteNote}
                </p>
              )}

              <ul className="space-y-4 text-xs text-gray-400 font-mono border-t border-white/10 pt-6">
                {(() => {
                  let parsedFeatures: string[] = [];
                  try {
                    if (course.features) {
                      parsedFeatures = typeof course.features === 'string' ? JSON.parse(course.features) : course.features;
                    }
                  } catch {}
                  if (parsedFeatures.length > 0) {
                    return parsedFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3" data-testid={`text-feature-${idx}`}>
                        <Check className="w-4 h-4" style={{ color: tierColor }} /> {feature}
                      </li>
                    ));
                  }
                  return (
                    <>
                      {course.duration && (
                        <li className="flex items-center gap-3">
                          <Check className="w-4 h-4" style={{ color: tierColor }} /> {course.duration} of Training
                        </li>
                      )}
                      <li className="flex items-center gap-3">
                        <Check className="w-4 h-4" style={{ color: tierColor }} /> Private WhatsApp Access
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-4 h-4" style={{ color: tierColor }} /> Lifetime Access
                      </li>
                    </>
                  );
                })()}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}