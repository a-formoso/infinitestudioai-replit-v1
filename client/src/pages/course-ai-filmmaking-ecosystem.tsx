import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Check } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { getCurrentUser, getCourseBySlug, enrollInCourse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";

export default function CourseAIFilmmakingEcosystem() {
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
    queryKey: ["course", "google-ai-filmmaking-ecosystem"],
    queryFn: () => getCourseBySlug("google-ai-filmmaking-ecosystem"),
  });

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast({
        title: "Enrolled successfully!",
        description: "Welcome to The Google AI Filmmaking Ecosystem. Redirecting to your dashboard...",
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
    setLocation("/checkout?course=google-ai-filmmaking-ecosystem");
  };

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-signalOrange selection:text-white overflow-x-hidden">
      
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                  <div className="inline-block border border-signalOrange/50 px-3 py-1 mb-6 text-[10px] font-mono text-signalOrange tracking-widest uppercase">
                      Specialist Track
                  </div>
                  <h1 className="font-header text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                      THE GOOGLE AI<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-500">FILMMAKING ECOSYSTEM</span>
                  </h1>
                  <p className="text-base text-gray-400 leading-relaxed font-light mb-8 max-w-lg">
                      The "Shared Brain" Workflow. Run a Hollywood Studio from your Browser. A comprehensive deep-dive connecting Gemini, ImageFX, and Veo into a single pipeline.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-signalOrange rounded-full"></div> 8.0 HOURS CONTENT</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-signalOrange rounded-full"></div> 18 LESSONS</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-signalOrange rounded-full"></div> PRO CERTIFICATION</span>
                  </div>
                  <button onClick={handleEnroll} className="inline-block bg-white text-black px-8 py-4 text-sm font-header font-bold uppercase hover:bg-signalOrange hover:text-white transition-all duration-300 tracking-wider cursor-pointer" data-testid="button-hero-enroll">
                      Start Advanced Training
                  </button>
              </div>

              <div className="relative glass-panel p-2 group border-signalOrange/20">
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-signalOrange group-hover:border-signalOrange transition-colors cursor-pointer">
                              <span className="text-2xl ml-1 text-white">▶</span>
                          </div>
                      </div>
                      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black/50 px-2 py-1">ECOSYSTEM_OVERVIEW.MP4</div>
                  </div>
              </div>
          </div>
      </header>

      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-8">
                  
                  <div className="mb-16">
                      <h3 className="font-header text-xl text-white mb-8 border-l-4 border-signalOrange pl-4">WHAT YOU WILL LEARN</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-signalOrange mb-2 text-xl">01</div>
                              <h4 className="font-bold text-white text-sm mb-2">The "Shared Brain" Pipeline</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Connect Gemini, ImageFX, and Veo into a single seamless production workflow from script to final render.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-signalOrange mb-2 text-xl">02</div>
                              <h4 className="font-bold text-white text-sm mb-2">Visual Development</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Master ImageFX diffusion, mixboarding, and aspect ratio math for cinema-grade visual assets.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-signalOrange mb-2 text-xl">03</div>
                              <h4 className="font-bold text-white text-sm mb-2">Directing in Veo 3.1</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Camera movement, physics directing, acting prompts, and the "Invisible Cut" stitching technique.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-signalOrange mb-2 text-xl">04</div>
                              <h4 className="font-bold text-white text-sm mb-2">Sound & Post-Production</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Score generation with MusicFX, AI voice synthesis, lip-syncing, and final assembly for delivery.</p>
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
                                  <span className="font-header text-sm text-white">MODULE 1: PRE-PRODUCTION (THE WRITER'S ROOM)</span>
                                  <span className="text-signalOrange text-xl">{openModule === 1 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">1.1</span> Intro to Gemini 3.0: Why It's the Best LLM for Filmmakers</li>
                                        <li className="flex gap-4"><span className="text-white">1.2</span> The "4-Element" Prompt Structure: Context, Subject, Art Style, Technical Specs</li>
                                        <li className="flex gap-4"><span className="text-white">1.3</span> Building Custom "Gems": Screenwriter & Cinematographer Personas</li>
                                        <li className="flex gap-4"><span className="text-white">1.4</span> Deep Research with NotebookLM: Analyzing Scripts for Structure & Pacing</li>
                                        <li className="flex gap-4"><span className="text-white">1.5</span> The "Bible" Generation: Characters, Locations & Lore Document</li>
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
                                  <span className="font-header text-sm text-white">MODULE 2: VISUAL DEVELOPMENT (THE ART DEPT)</span>
                                  <span className="text-signalOrange text-xl">{openModule === 2 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">2.1</span> Mastering ImageFX: Understanding the Diffusion Model</li>
                                        <li className="flex gap-4"><span className="text-white">2.2</span> Mixboarding: Creating Mood Boards the AI Understands</li>
                                        <li className="flex gap-4"><span className="text-white">2.3</span> "Product Stills" Workflow: High-Fidelity Props & Assets</li>
                                        <li className="flex gap-4"><span className="text-white">2.4</span> Aspect Ratio Math: Preparing Images for Veo (16:9 vs 2.35:1)</li>
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
                                  <span className="font-header text-sm text-white">MODULE 3: PRODUCTION (THE DIRECTOR'S CHAIR)</span>
                                  <span className="text-signalOrange text-xl">{openModule === 3 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 3 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">3.1</span> Veo 3.1 Architecture: How the Video Model Interprets Static Images</li>
                                        <li className="flex gap-4"><span className="text-white">3.2</span> Camera Movement 101: Pan, Tilt, Truck, Jib & Rack Focus</li>
                                        <li className="flex gap-4"><span className="text-white">3.3</span> Physics Directing: Controlling Fluid Dynamics, Smoke & Gravity</li>
                                        <li className="flex gap-4"><span className="text-white">3.4</span> The "Invisible Cut": Stitching 5-Second Clips Into Seamless Sequences</li>
                                        <li className="flex gap-4"><span className="text-white">3.5</span> Acting Direction: Controlling Micro-Expressions via Prompts</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>

                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(4)}
                                data-testid="button-toggle-module-4"
                              >
                                  <span className="font-header text-sm text-white">MODULE 4: POST-PRODUCTION & SOUND (THE EDIT BAY)</span>
                                  <span className="text-signalOrange text-xl">{openModule === 4 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 4 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">4.1</span> Sonic Synthesis with MusicFX: Generating the Score</li>
                                        <li className="flex gap-4"><span className="text-white">4.2</span> Voice & Dialogue: Using Google AI Studio (TTS) for Narration</li>
                                        <li className="flex gap-4"><span className="text-white">4.3</span> Lip-Syncing: Matching Generated Audio to Veo Video</li>
                                        <li className="flex gap-4"><span className="text-white">4.4</span> Final Assembly: Handoff to Premiere/DaVinci for Delivery</li>
                                    </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>

              <div className="lg:col-span-4 space-y-8">
                  
                  <div id="enroll" className="glass-panel p-8 sticky top-24 border-t-2 border-t-signalOrange">
                      <div className="text-center mb-6">
                          <span className="text-xs font-mono text-gray-400 line-through">$399</span>
                          <h2 className="text-4xl font-header font-bold text-white mt-2">$249</h2>
                          <span className="text-[10px] font-mono text-signalOrange bg-signalOrange/10 px-2 py-1 rounded mt-2 inline-block">PRO CERTIFICATION</span>
                      </div>
                      
                      <button 
                        onClick={handleEnroll}
                        data-testid="button-enroll"
                        className="w-full bg-signalOrange text-black font-header font-bold text-sm uppercase py-4 hover:bg-white transition-all duration-300 tracking-wider mb-4 shadow-[0_0_20px_rgba(255,61,0,0.4)] cursor-pointer"
                      >
                          Enroll Now
                      </button>
                      
                      <p className="text-[10px] text-gray-500 text-center font-mono mb-6">
                          RECOMMENDED: FOUNDATION TRACK COMPLETION
                      </p>

                      <ul className="space-y-4 text-xs text-gray-400 font-mono border-t border-white/10 pt-6">
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-signalOrange" /> 8.0 Hours of Advanced Training
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-signalOrange" /> Complete Project Files & Prompts
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-signalOrange" /> Private Discord Access
                          </li>
                          <li className="flex items-center gap-3">
                              <Check className="w-4 h-4 text-signalOrange" /> Industry Certification
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
