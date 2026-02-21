import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { getCurrentUser, getCourseBySlug, enrollInCourse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";

export default function CourseNanoBanana() {
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
    queryKey: ["course", "nano-banana-mastery"],
    queryFn: () => getCourseBySlug("nano-banana-mastery"),
  });

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast({
        title: "Enrolled successfully!",
        description: "Welcome to Nano Banana Mastery. Redirecting to your dashboard...",
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
    setLocation("/checkout?course=nano-banana-mastery");
  };

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <nav className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-0" data-testid="breadcrumb-nav">
        <ol className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500">
          <li><Link href="/academy" className="hover:text-white transition-colors">Academy</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li><Link href="/academy?filter=foundation" className="hover:text-white transition-colors">Foundation</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-white">Nano Banana Mastery</li>
        </ol>
      </nav>

      <header className="relative pt-8 pb-20 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                  <div className="inline-block border border-electricBlue/50 px-3 py-1 mb-6 text-[10px] font-mono text-electricBlue tracking-widest uppercase">
                      Foundation Track
                  </div>
                  <h1 className="font-header text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                      NANO BANANA<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-cyan-400">MASTERY</span>
                  </h1>
                  <p className="text-base text-gray-400 leading-relaxed font-light mb-8 max-w-lg">
                      Create Consistent Digital Actors. Stop Rolling the Dice. Master character consistency and style-locking — the entry point for anyone who wants to move beyond random generation.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> 3.5 HOURS CONTENT</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> 11 LESSONS</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-electricBlue rounded-full"></div> LIFETIME ACCESS</span>
                  </div>
                  <button onClick={handleEnroll} className="inline-block bg-white text-black px-8 py-4 text-sm font-header font-bold uppercase hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider cursor-pointer" data-testid="button-hero-enroll">
                      Start Learning Now
                  </button>
              </div>

              <div className="relative glass-panel p-2 group">
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-electricBlue group-hover:border-electricBlue transition-colors cursor-pointer">
                              <span className="text-2xl ml-1 text-white">▶</span>
                          </div>
                      </div>
                      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black/50 px-2 py-1">NANO_BANANA_INTRO.MP4</div>
                  </div>
              </div>
          </div>
      </header>

      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-8">
                  
                  <div className="mb-16">
                      <h3 className="font-header text-xl text-white mb-8 border-l-4 border-electricBlue pl-4">WHAT YOU WILL LEARN</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">01</div>
                              <h4 className="font-bold text-white text-sm mb-2">Character Consistency</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Why AI usually forgets faces — and how Nano Banana's Ingredient system solves it permanently.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">02</div>
                              <h4 className="font-bold text-white text-sm mb-2">The Ingredient Workflow</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Separate Face, Costume, and Style into independent layers you can mix and match freely.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">03</div>
                              <h4 className="font-bold text-white text-sm mb-2">Advanced Inpainting</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Change wardrobe, fix artifacts, and perform "Hand & Eye Surgery" without losing the character.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-electricBlue mb-2 text-xl">04</div>
                              <h4 className="font-bold text-white text-sm mb-2">Scene Placement</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Perspective matching, relighting, and placing multiple distinct actors in the same frame.</p>
                          </div>
                      </div>
                  </div>

                  <div className="mb-16">
                      <h3 className="font-header text-xl text-white mb-8 border-l-4 border-white pl-4">CLASS SYLLABUS</h3>
                      
                      <div className="space-y-4">
                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(1)}
                                data-testid="button-toggle-module-1"
                              >
                                  <span className="font-header text-sm text-white">MODULE 1: INITIALIZATION (THE BASICS)</span>
                                  <span className="text-electricBlue text-xl">{openModule === 1 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">1.1</span> The Consistency Problem: Why AI Usually Forgets Faces</li>
                                        <li className="flex gap-4"><span className="text-white">1.2</span> Interface & Architecture: Navigating the Workspace</li>
                                        <li className="flex gap-4"><span className="text-white">1.3</span> The "Ingredient" Workflow: Face, Costume & Style Layers</li>
                                        <li className="flex gap-4"><span className="text-white">1.4</span> Your First Actor: Zero-Shot Character Profile</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>

                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(2)}
                                data-testid="button-toggle-module-2"
                              >
                                  <span className="font-header text-sm text-white">MODULE 2: THE DIGITAL WARDROBE</span>
                                  <span className="text-electricBlue text-xl">{openModule === 2 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">2.1</span> Advanced Inpainting: Changing Clothes Without Changing the Character</li>
                                        <li className="flex gap-4"><span className="text-white">2.2</span> "Hand & Eye" Surgery: Fixing Common AI Artifacts</li>
                                        <li className="flex gap-4"><span className="text-white">2.3</span> Style Transfer: Keeping the Actor, Changing the Genre</li>
                                        <li className="flex gap-4"><span className="text-white">2.4</span> Whisk & Visual Remix: Blending Inputs While Keeping Fidelity</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>

                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(3)}
                                data-testid="button-toggle-module-3"
                              >
                                  <span className="font-header text-sm text-white">MODULE 3: SCENE PLACEMENT</span>
                                  <span className="text-electricBlue text-xl">{openModule === 3 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 3 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">3.1</span> Perspective Matching: Placing Characters Into Complex Backgrounds</li>
                                        <li className="flex gap-4"><span className="text-white">3.2</span> Lighting Consistency: Relighting the Face to Match the Environment</li>
                                        <li className="flex gap-4"><span className="text-white">3.3</span> Multi-Character Scenes: Two Distinct Actors in One Frame</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>

              <div className="lg:col-span-4 space-y-8">
                  
                  <div id="enroll" className="glass-panel p-8 sticky top-24 border-t-2 border-t-electricBlue">
                      <div className="text-center mb-6">
                          <span className="text-xs font-mono text-gray-400 line-through">$249</span>
                          <h2 className="text-4xl font-header font-bold text-white mt-2">$129</h2>
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
                              <Check className="w-4 h-4 text-electricBlue" /> 3.5 Hours of HD Video
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-electricBlue" /> Character Sheet Templates
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
