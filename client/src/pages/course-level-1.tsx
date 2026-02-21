import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { getCurrentUser, getCourseBySlug, enrollInCourse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";

export default function CourseLevel1() {
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
    queryKey: ["course", "master-the-google-ecosystem"],
    queryFn: () => getCourseBySlug("master-the-google-ecosystem"),
  });

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast({
        title: "Enrolled successfully!",
        description: "Welcome to the Google Ecosystem course. Redirecting to your dashboard...",
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
    setLocation("/checkout?course=master-the-google-ecosystem");
  };

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <nav className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-0" data-testid="breadcrumb-nav">
        <ol className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500">
          <li><Link href="/academy" className="hover:text-white transition-colors">Academy</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li><Link href="/academy?filter=foundation" className="hover:text-white transition-colors">Foundation</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-white">Master the Google Filmmaking Ecosystem</li>
        </ol>
      </nav>

      <header className="relative pt-8 pb-20 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                  <div className="inline-block border border-electricBlue/50 px-3 py-1 mb-6 text-[10px] font-mono text-electricBlue tracking-widest uppercase">
                      Foundation Track
                  </div>
                  <h1 className="font-header text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                      MASTER THE GOOGLE<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-cyan-400">FILMMAKING ECOSYSTEM</span>
                  </h1>
                  <p className="text-base text-gray-400 leading-relaxed font-light mb-8 max-w-lg">
                      Stop using fragmented tools. Learn to run a complete Hollywood-style studio from your browser using the integrated power of Gemini 3.0, Nano Banana, and Veo.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> 4.5 HOURS CONTENT</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> 25 LESSONS</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> LIFETIME ACCESS</span>
                  </div>
                  <button onClick={handleEnroll} className="inline-block bg-white text-black px-8 py-4 text-sm font-header font-bold uppercase hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider cursor-pointer" data-testid="button-hero-enroll">
                      Start Learning Now
                  </button>
              </div>

              {/* Right: Video Preview Card */}
              <div className="relative glass-panel p-2 group">
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                      {/* Placeholder for Course Trailer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-electricBlue group-hover:border-electricBlue transition-colors cursor-pointer">
                              <span className="text-2xl ml-1 text-white">▶</span>
                          </div>
                      </div>
                      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black/50 px-2 py-1">TRAILER_V1.MP4</div>
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
                      <h3 className="font-header text-xl text-white mb-8 border-l-4 border-electricBlue pl-4">WHAT YOU WILL LEARN</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">01</div>
                              <h4 className="font-bold text-white text-sm mb-2">The "Shared Brain" Workflow</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">How to make Gemini, Imagen, and Veo "talk" to each other for seamless production.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">02</div>
                              <h4 className="font-bold text-white text-sm mb-2">Character Consistency</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Creating "Digital Actors" (Nano Banana) that look the same in every shot using Ingredient mapping.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">03</div>
                              <h4 className="font-bold text-white text-sm mb-2">The "Banana Sandwich"</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Our proprietary technique for glitch-free video transitions using Frames-to-Video.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">04</div>
                              <h4 className="font-bold text-white text-sm mb-2">Physics Directing</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Controlling camera movement, lighting, and fluid dynamics in Veo 3.1.</p>
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
                                  <span className="font-header text-sm text-white">MODULE 1: THE WRITER'S ROOM</span>
                                  <span className="text-electricBlue text-xl">{openModule === 1 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">1.1</span> The Multimodal Script: Writing with Images</li>
                                        <li className="flex gap-4"><span className="text-white">1.2</span> Context is King: Managing the 2M Token Window</li>
                                        <li className="flex gap-4"><span className="text-white">1.3</span> Generating the "Visual Bible"</li>
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
                                  <span className="font-header text-sm text-white">MODULE 2: THE ART DEPT</span>
                                  <span className="text-electricBlue text-xl">{openModule === 2 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">2.1</span> Introduction to Nano Banana (Gemini 2.5 Flash)</li>
                                        <li className="flex gap-4"><span className="text-white">2.2</span> The Character Sheet Workflow</li>
                                        <li className="flex gap-4"><span className="text-white">2.3</span> Inpainting & Virtual Set Design</li>
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
                                  <span className="font-header text-sm text-white">MODULE 3: PRINCIPAL PHOTOGRAPHY</span>
                                  <span className="text-electricBlue text-xl">{openModule === 3 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 3 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">3.1</span> Veo 3.1 Fundamentals & Physics Engine</li>
                                        <li className="flex gap-4"><span className="text-white">3.2</span> The "Ingredients" Workflow</li>
                                        <li className="flex gap-4"><span className="text-white">3.3</span> CORE SKILL: The "Banana Sandwich" Method</li>
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
                          <span className="text-xs font-mono text-gray-400 line-through">$299</span>
                          <h2 className="text-4xl font-header font-bold text-white mt-2">$149</h2>
                          <span className="text-[10px] font-mono text-electricBlue bg-electricBlue/10 px-2 py-1 rounded mt-2 inline-block">LIMITED TIME OFFER</span>
                      </div>
                      
                      <button 
                        onClick={handleEnroll}
                        data-testid="button-enroll"
                        className="w-full bg-electricBlue text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider mb-4 shadow-[0_0_20px_rgba(41,98,255,0.4)] cursor-pointer"
                      >
                          Enroll Now
                      </button>
                      
                      <p className="text-[10px] text-gray-500 text-center font-mono mb-6">
                          30-DAY MONEY BACK GUARANTEE
                      </p>

                      <ul className="space-y-4 text-xs text-gray-400 font-mono border-t border-white/10 pt-6">
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> 4.5 Hours of HD Video
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> 3 Project Files
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> Private Discord Access
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> Certificate of Completion
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
