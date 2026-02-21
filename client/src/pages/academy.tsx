import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api";
import { useState } from "react";

type Filter = "all" | "foundation" | "specialist" | "workshops";

function getInitialFilter(): Filter {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");
  if (filter === "foundation" || filter === "specialist" || filter === "workshops") return filter;
  return "all";
}

export default function Academy() {
  const [activeFilter, setActiveFilter] = useState<Filter>(getInitialFilter);

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const allCourses = data?.data?.courses || [];

  const publishedCourses = allCourses.filter((course: any) => course.status === "published");
  const draftCourses = allCourses.filter((course: any) => course.status === "draft");

  const filteredCourses = publishedCourses.filter((course: any) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "foundation") return course.level === "Foundation";
    if (activeFilter === "specialist") return course.level === "Specialist";
    return false;
  });

  const showCoreSection = activeFilter === "all" || activeFilter === "foundation" || activeFilter === "specialist";
  const showComingSoon = activeFilter === "all" || activeFilter === "workshops";

  const filters: { label: string; value: Filter }[] = [
    { label: "ALL COURSES", value: "all" },
    { label: "FOUNDATION", value: "foundation" },
    { label: "SPECIALIST", value: "specialist" },
    { label: "WORKSHOPS", value: "workshops" },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-signalOrange selection:text-white overflow-x-hidden">
      
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <header className="relative pt-40 pb-12 px-6 z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/academy-hero.jpeg')] bg-cover bg-center bg-no-repeat opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/70 to-obsidian"></div>
          <div className="relative max-w-7xl mx-auto">
                  <div className="inline-block border border-signalOrange/50 px-3 py-1 mb-6 text-[10px] font-mono text-signalOrange tracking-widest uppercase">
                      The Curriculum
                  </div>
                  <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                      DIRECT THE<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-500">ALGORITHM</span>
                  </h1>
                  <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-light mb-8">
                      From your first prompt to your final render. A structured education path for the modern AI Filmmaker.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                      {filters.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setActiveFilter(f.value)}
                          className={`border border-white/20 px-6 py-2 rounded-full text-xs font-header font-bold transition-all ${
                            activeFilter === f.value
                              ? "bg-white text-black hover:bg-white/90"
                              : "hover:bg-white/10"
                          }`}
                          data-testid={`filter-${f.value}`}
                        >
                          {f.label}
                        </button>
                      ))}
                  </div>
          </div>
      </header>

      <section className="py-12 bg-black/50 relative z-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
              
              {showCoreSection && (
              <div className="mb-16">
                  <h2 className="font-header text-xl text-white mb-8 border-l-4 border-white pl-4">
                      CORE COURSES
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {isLoading ? (
                        <>
                          <div className="glass-panel p-0 animate-pulse h-96"></div>
                          <div className="glass-panel p-0 animate-pulse h-96"></div>
                        </>
                      ) : filteredCourses.length > 0 ? (
                        filteredCourses.map((course: any) => {
                          const tier = course.level === 'Foundation' ? 'foundation' : 'specialist';
                          return (
                            <Link key={course.id} href={`/academy/${tier}/${course.slug}`} className={`glass-panel p-0 group cursor-pointer hover:border-${course.color === 'electricBlue' ? 'electricBlue' : 'signalOrange'}/50 transition-all duration-300 block`} data-testid={`card-course-${course.slug}`}>
                                <div className="h-48 bg-gray-900 relative overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${course.color === 'electricBlue' ? 'from-blue-900/40' : 'from-orange-900/40'} to-black`}></div>
                                    {course.badge && (
                                      <div className={`absolute top-4 right-4 ${course.color === 'electricBlue' ? 'bg-electricBlue text-white' : 'bg-signalOrange text-black'} text-[10px] font-bold px-2 py-1`}>{course.badge}</div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <h3 className={`font-header text-xl text-white mb-2 group-hover:text-${course.color === 'electricBlue' ? 'electricBlue' : 'signalOrange'} transition-colors`} data-testid={`text-course-title-${course.slug}`}>{course.title}</h3>
                                    <p className="text-xs text-gray-400 font-mono mb-4 leading-relaxed">
                                        {course.shortDescription}
                                    </p>
                                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                        <span className="text-xs font-mono text-white">{course.duration} • {course.lessonsCount} LESSONS</span>
                                        <span className="text-sm font-header font-bold text-white" data-testid={`text-price-${course.slug}`}>${parseFloat(course.price).toFixed(0)}</span>
                                    </div>
                                </div>
                            </Link>
                          );
                        })
                      ) : (
                        <div className="col-span-2 text-center py-12">
                          <p className="text-gray-500 font-mono text-sm">No courses found for this filter.</p>
                        </div>
                      )}
                  </div>
              </div>
              )}

              {showComingSoon && draftCourses.length > 0 && (
              <div className="mb-16">
                  <h2 className="font-header text-xl text-white mb-8 border-l-4 border-gray-600 pl-4">
                      COMING SOON
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {draftCourses.map((course: any) => (
                        <div key={course.id} className="glass-panel p-6 hover:border-white/30 transition-all duration-300 group cursor-pointer relative opacity-60 hover:opacity-100" data-testid={`card-draft-${course.slug}`}>
                            <div className={`absolute top-2 right-2 z-10 text-[10px] font-mono ${course.level === 'Specialist' ? 'text-signalOrange border-signalOrange/30' : 'text-electricBlue border-electricBlue/30'} border px-2 py-1`}>{course.level === 'Specialist' ? 'SPECIALIST' : 'FOUNDATION'}</div>
                            <div className="h-32 bg-gray-800 mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                                {course.imageUrl && (
                                  <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${course.imageUrl})` }}></div>
                                )}
                            </div>
                            <h3 className="font-header text-sm text-white mb-2">{course.title}</h3>
                            <p className="text-[10px] text-gray-400 font-mono mb-0">{course.shortDescription}</p>
                        </div>
                      ))}
                  </div>
              </div>
              )}
          </div>
      </section>

      <Footer />
    </div>
  );
}
