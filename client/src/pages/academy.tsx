import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api";
import { useState } from "react";

type Filter = "all" | "foundation" | "specialist" | "workshops";

export default function Academy() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const courses = data?.data?.courses || [];

  const filteredCourses = courses.filter((course: any) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "foundation") return course.level === "Foundation";
    if (activeFilter === "specialist") return course.level === "Specialist";
    return false;
  });

  const showCoreSection = activeFilter === "all" || activeFilter === "foundation" || activeFilter === "specialist";
  const showWorkshops = activeFilter === "all" || activeFilter === "workshops";

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
          <div className="absolute inset-0 bg-[url('/images/academy-hero.jpeg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/70 to-obsidian"></div>
          <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                  <div className="inline-block border border-signalOrange/50 px-3 py-1 mb-6 text-[10px] font-mono text-signalOrange tracking-widest uppercase">
                      The Curriculum
                  </div>
                  <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                      DIRECT THE<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-500">ALGORITHM</span>
                  </h1>
                  <p className="text-lg text-gray-400 max-w-xl leading-relaxed font-light mb-8">
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
              
              <div className="hidden md:flex justify-end relative">
                  <div className="w-80 h-80 rounded-full border border-white/10 flex items-center justify-center relative">
                      <div className="absolute w-64 h-64 rounded-full border border-electricBlue/30 animate-[spin_10s_linear_infinite]"></div>
                      <div className="absolute w-48 h-48 rounded-full border border-signalOrange/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                      <div className="font-header text-5xl text-white">∞</div>
                  </div>
              </div>
          </div>
      </header>

      <section className="py-12 bg-black/50 relative z-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
              
              {showCoreSection && (
              <div className="mb-16">
                  <h2 className="font-header text-xl text-white mb-8 border-l-4 border-white pl-4 flex items-center gap-4">
                      CORE CERTIFICATION PATH
                      <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">MANDATORY</span>
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

              {showWorkshops && (
              <div className="mb-16">
                  <h2 className="font-header text-xl text-white mb-8 border-l-4 border-gray-600 pl-4 flex items-center gap-4">
                      SPECIALIZED WORKSHOPS
                      <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">OPTIONAL</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      <div className="glass-panel p-6 hover:border-white/30 transition-all duration-300 group cursor-pointer relative opacity-60 hover:opacity-100">
                          <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-1">COMING SOON</div>
                          <div className="h-32 bg-gray-800 mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614726365723-49cfae96a6d6?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-2">SCORING WITH MUSICFX</h3>
                          <p className="text-[10px] text-gray-400 font-mono mb-0">Learn to generate stems and mix your own soundtrack.</p>
                      </div>

                      <div className="glass-panel p-6 hover:border-white/30 transition-all duration-300 group cursor-pointer relative opacity-60 hover:opacity-100">
                          <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-1">COMING SOON</div>
                          <div className="h-32 bg-gray-800 mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635322966219-b75ed3a90533?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-2">EDITING IN GOOGLE VIDS</h3>
                          <p className="text-[10px] text-gray-400 font-mono mb-0">Post-production workflows for the AI era.</p>
                      </div>

                      <div className="glass-panel p-6 hover:border-white/30 transition-all duration-300 group cursor-pointer relative opacity-60 hover:opacity-100">
                          <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-1">COMING SOON</div>
                          <div className="h-32 bg-gray-800 mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-2">THE BUSINESS OF AI FILM</h3>
                          <p className="text-[10px] text-gray-400 font-mono mb-0">How to price, pitch, and sell AI video services.</p>
                      </div>

                  </div>
              </div>
              )}
          </div>
      </section>

      <Footer />
    </div>
  );
}
