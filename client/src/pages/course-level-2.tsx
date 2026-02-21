import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { getCurrentUser, getCourseBySlug, enrollInCourse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";

export default function CourseLevel2() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  useScrollRestoration(userData === undefined ? undefined : !!userData?.data?.user);

  const { data: courseData } = useQuery({
    queryKey: ["course", "advanced-ai-cinematography"],
    queryFn: () => getCourseBySlug("advanced-ai-cinematography"),
  });

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast({
        title: "Enrolled successfully!",
        description: "Welcome to Advanced AI Cinematography. Redirecting to your dashboard...",
      });
      setTimeout(() => setLocation("/dashboard"), 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Enrollment failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleEnroll = () => {
    setLocation("/checkout?course=advanced-ai-cinematography");
  };

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <header className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                  <div className="flex items-center gap-1.5 mb-6 text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                      <Link href="/academy" className="hover:text-white transition-colors">Academy</Link>
                      <ChevronRight className="w-3 h-3" />
                      <Link href="/academy?filter=foundation" className="text-electricBlue hover:text-white transition-colors">Foundation</Link>
                  </div>
                  <h1 className="font-header text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                      ADVANCED AI<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-cyan-400">CINEMATOGRAPHY</span>
                  </h1>
                  <p className="text-base text-gray-400 leading-relaxed font-light mb-8 max-w-lg">
                      You know how to generate. Now learn how to direct. Master the physics engine, compound camera moves, and the "Invisible Cut" in Veo 3.1.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> 6.0 HOURS CONTENT</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> 30 LESSONS</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> PRO CERTIFICATION</span>
                  </div>
                  <button onClick={handleEnroll} className="inline-block bg-white text-black px-8 py-4 text-sm font-header font-bold uppercase hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider cursor-pointer" data-testid="button-hero-enroll">
                      Start Training
                  </button>
              </div>

              {/* Right: Video Preview Card */}
              <div className="relative glass-panel p-2 group border-electricBlue/20">
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                      {/* Placeholder for Course Trailer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-electricBlue group-hover:border-electricBlue transition-colors cursor-pointer">
                              <span className="text-2xl ml-1 text-white">▶</span>
                          </div>
                      </div>
                      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black/50 px-2 py-1">TRAILER_V2_PHYSICS.MP4</div>
                  </div>
              </div>
          </div>
      </header>

      {/* CONTENT SECTION */}
      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Main Content (Left) */}
              <div className="lg:col-span-8">
                  
                  {/* WHAT YOU LEARN */}
                  <div className="mb-16">
                      <h3 className="font-header text-xl text-white mb-8 border-l-4 border-electricBlue pl-4">DEEP DIVE MODULES</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">01</div>
                              <h4 className="font-bold text-white text-sm mb-2">The Physics Engine</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">How to prompt for weight, fluid dynamics, and momentum so objects don't float.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">02</div>
                              <h4 className="font-bold text-white text-sm mb-2">Compound Camera Moves</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Executing the "Dolly Zoom", Rack Focus, and Parallax shifts for 3D depth.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">03</div>
                              <h4 className="font-bold text-white text-sm mb-2">Complex Acting</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Directing micro-expressions and sequencing actions with [0:02] timestamps.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">04</div>
                              <h4 className="font-bold text-white text-sm mb-2">The Invisible Cut</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Match cuts and masking to stitch generations into continuous long takes.</p>
                          </div>
                      </div>
                  </div>

                  {/* CURRICULUM ACCORDION */}
                  <div className="mb-16">
                      <h3 className="font-header text-xl text-white mb-8 border-l-4 border-white pl-4">CLASS SYLLABUS</h3>
                      
                      <div className="space-y-4">
                          {/* Module 1 */}
                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(1)}
                              >
                                  <span className="font-header text-sm text-white">MODULE 1: PHYSICS & DYNAMICS</span>
                                  <span className="text-electricBlue text-xl">{openModule === 1 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">1.1</span> Understanding Veo's Physics Model</li>
                                        <li className="flex gap-4"><span className="text-white">1.2</span> Prompting for Mass, Drag, and Friction</li>
                                        <li className="flex gap-4"><span className="text-white">1.3</span> Liquid Simulations (Water, Smoke, Fire)</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>

                          {/* Module 2 */}
                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(2)}
                              >
                                  <span className="font-header text-sm text-white">MODULE 2: ADVANCED CAMERA</span>
                                  <span className="text-electricBlue text-xl">{openModule === 2 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">2.1</span> The Vertigo Effect (Dolly Zoom)</li>
                                        <li className="flex gap-4"><span className="text-white">2.2</span> Rack Focus & Depth of Field</li>
                                        <li className="flex gap-4"><span className="text-white">2.3</span> High Speed & Slow Motion Cinematography</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>

                          {/* Module 3 */}
                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(3)}
                              >
                                  <span className="font-header text-sm text-white">MODULE 3: EDITING & VFX</span>
                                  <span className="text-electricBlue text-xl">{openModule === 3 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 3 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">3.1</span> The Invisible Cut Technique</li>
                                        <li className="flex gap-4"><span className="text-white">3.2</span> Color Grading AI Output</li>
                                        <li className="flex gap-4"><span className="text-white">3.3</span> Final Export & Delivery Formats</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>

              {/* Sidebar (Right) */}
              <div className="lg:col-span-4 space-y-8">
                  
                  {/* Sticky Enrollment Card */}
                  <div className="glass-panel p-8 sticky top-24 border-t-2 border-t-electricBlue">
                      <div className="text-center mb-6">
                          <span className="text-xs font-mono text-gray-400 line-through">$349</span>
                          <h2 className="text-4xl font-header font-bold text-white mt-2">$199</h2>
                          <span className="text-[10px] font-mono text-electricBlue bg-electricBlue/10 px-2 py-1 rounded mt-2 inline-block">FOUNDATION CERTIFICATION</span>
                      </div>
                      
                      <button 
                        onClick={handleEnroll}
                        data-testid="button-enroll"
                        className="w-full bg-electricBlue text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider mb-4 shadow-[0_0_20px_rgba(41,98,255,0.4)] cursor-pointer"
                      >
                          Enroll Now
                      </button>
                      
                      <p className="text-[10px] text-gray-500 text-center font-mono mb-6">
                          NO PREREQUISITE REQUIRED
                      </p>

                      <ul className="space-y-4 text-xs text-gray-400 font-mono border-t border-white/10 pt-6">
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> 6.0 Hours of Training
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> 'Physics of Dreams' eBook
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> Private Discord Access
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> Industry Certification
                          </li>
                      </ul>
                  </div>

              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
}
