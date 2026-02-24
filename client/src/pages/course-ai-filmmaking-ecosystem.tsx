import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Check, ChevronRight, Pencil } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
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

      <header className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                  <div className="flex items-center gap-1.5 mb-6 text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                      <Link href="/academy" className="hover:text-white transition-colors">Academy</Link>
                      <ChevronRight className="w-3 h-3" />
                      <Link href="/academy?filter=specialist" className="text-signalOrange hover:text-white transition-colors">Specialist</Link>
                  </div>
                  <h1 className="font-header text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                      THE GOOGLE AI<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-500">FILMMAKING ECOSYSTEM</span>
                  </h1>
                  <p className="text-base text-gray-400 leading-relaxed font-light mb-8 max-w-lg">
                      The complete AI Production Pipeline. From Narrative Seed to Final Render — learn to direct Gemini, ImageFX, and Veo as a single production system using the Operations Guide methodology.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-signalOrange rounded-full"></div> 8.0 HOURS</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-signalOrange rounded-full"></div> 14 LESSONS</span>
                      <span className="flex items-center gap-2"><div className="w-2 h-2 bg-signalOrange rounded-full"></div> LIFETIME ACCESS</span>
                  </div>
                  <button onClick={handleEnroll} className="inline-block bg-white text-black px-8 py-4 text-sm font-header font-bold uppercase hover:bg-signalOrange hover:text-white transition-all duration-300 tracking-wider cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,61,0,0.4)]" data-testid="button-hero-enroll">
                      Start Training
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
                              <h4 className="font-bold text-white text-sm mb-2">The Writer's Room</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Build the complete narrative blueprint — from Narrative Seed extraction through logline stress-testing, character sheets, and structured scene breakdowns.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-signalOrange mb-2 text-xl">02</div>
                              <h4 className="font-bold text-white text-sm mb-2">The Art Department</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Lock your visual identity with Style Presets, Digital LUTs, and the Master Prompt Formula. Build reusable cinematic lexicons for mathematical consistency.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-signalOrange mb-2 text-xl">03</div>
                              <h4 className="font-bold text-white text-sm mb-2">The Shooting</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Master the Veo "Delta" logic, the Physics Trinity (Weight, Tempo, Texture), Ghost Track dialogue synthesis, and timeline assembly.</p>
                          </div>
                          <div className="glass-panel p-6 hover:border-white/20 transition-colors">
                              <div className="text-signalOrange mb-2 text-xl">04</div>
                              <h4 className="font-bold text-white text-sm mb-2">The Operations Guide</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">Every phase produces real deliverables — Narrative_Seed.md, CharacterSheets, CinematicLexicon.json, VeoMotion.json, and EditManifest.json.</p>
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
                                  <span className="font-header text-sm text-white">MODULE 1: THE WRITER'S ROOM</span>
                                  <span className="text-xs font-mono text-gray-500 ml-2 hidden md:inline">PHASE 1 — FOUNDATION</span>
                                  <span className="text-signalOrange text-xl ml-auto">{openModule === 1 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 1 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">1.1</span> The Narrative Seed: The Creative Interview & Data Locking</li>
                                        <li className="flex gap-4"><span className="text-white">1.2</span> The "What If" Engine: Logline Stress-Testing with 3 Angles</li>
                                        <li className="flex gap-4"><span className="text-white">1.3</span> Framework Selection & Narrative Expansion</li>
                                        <li className="flex gap-4"><span className="text-white">1.4</span> Casting the Digital Soul: Character Sheets & Visual Synthesis</li>
                                        <li className="flex gap-4"><span className="text-white">1.5</span> The Scene Breakdown: Synopsis to Structured JSON</li>
                                        <li className="flex gap-4"><span className="text-white">1.6</span> The Dialogue Pass: Voice, Subtext & Performance Directives</li>
                                    </ul>
                                    <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono">
                                        DELIVERABLES: Narrative_Seed.md · Synopsis_v1.md · CharacterSheet.md · SceneBreakdown.json
                                    </div>
                                  </div>
                              </div>
                          </div>

                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(2)}
                                data-testid="button-toggle-module-2"
                              >
                                  <span className="font-header text-sm text-white">MODULE 2: THE ART DEPARTMENT</span>
                                  <span className="text-xs font-mono text-gray-500 ml-2 hidden md:inline">PHASE 2 — PRE-PRODUCTION</span>
                                  <span className="text-signalOrange text-xl ml-auto">{openModule === 2 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">2.1</span> The Audiovisual Blueprint: Building Style Presets & Digital LUTs</li>
                                        <li className="flex gap-4"><span className="text-white">2.2</span> The Cinematic Lexicon: Master Prompt Formula & Variable Mapping</li>
                                        <li className="flex gap-4"><span className="text-white">2.3</span> The Palette Limit: Constraining Your Film to 3–4 Visual Presets</li>
                                        <li className="flex gap-4"><span className="text-white">2.4</span> Shot Design & Keyframes: Camera Plans and Start/End Frame Pairs</li>
                                    </ul>
                                    <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono">
                                        DELIVERABLES: CinematicLexicon.json · Scene_XX_ShotList.json · Keyframe Prompts
                                    </div>
                                  </div>
                              </div>
                          </div>

                          <div className="border border-white/10 bg-white/5">
                              <button 
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors" 
                                onClick={() => toggleModule(3)}
                                data-testid="button-toggle-module-3"
                              >
                                  <span className="font-header text-sm text-white">MODULE 3: THE SHOOTING</span>
                                  <span className="text-xs font-mono text-gray-500 ml-2 hidden md:inline">PHASE 3 — PRODUCTION</span>
                                  <span className="text-signalOrange text-xl ml-auto">{openModule === 3 ? '−' : '+'}</span>
                              </button>
                              <div className={`transition-all duration-300 ease-out overflow-hidden ${openModule === 3 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="bg-black/30 p-6">
                                    <ul className="space-y-3 text-xs text-gray-400 font-mono">
                                        <li className="flex gap-4"><span className="text-white">3.1</span> The Veo Prompt Structure: "Delta" Logic — Describing Motion, Not Appearance</li>
                                        <li className="flex gap-4"><span className="text-white">3.2</span> The Motion Package: Physics Trinity (Weight, Tempo, Texture)</li>
                                        <li className="flex gap-4"><span className="text-white">3.3</span> The Ghost Track Method: Dialogue Synthesis & Lip-Sync</li>
                                        <li className="flex gap-4"><span className="text-white">3.4</span> The Edit Assembly: Layering Video, Dialogue, SFX, Ambience & Score</li>
                                    </ul>
                                    <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono">
                                        DELIVERABLES: VeoMotion.json · Dialogue Audio · EditManifest.json
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>

              <div className="lg:col-span-4 space-y-8">
                  
                  <div id="enroll" className="glass-panel p-8 sticky top-24" style={{ borderTop: '4px solid #FF3D00' }}>
                      <div className="text-center mb-6">
                          <span className="text-xs font-mono text-gray-400 line-through">$399</span>
                          <h2 className="text-4xl font-header font-bold text-white mt-2">$249</h2>
                          <span className="text-[10px] font-mono text-signalOrange bg-signalOrange/10 px-2 py-1 rounded mt-2 inline-block">LIFETIME ACCESS</span>
                      </div>
                      
                      <button 
                        onClick={handleEnroll}
                        data-testid="button-enroll"
                        className="w-full bg-signalOrange text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider mb-4 shadow-[0_0_20px_rgba(255,61,0,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
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
                              <Check className="w-4 h-4 text-signalOrange" /> Private WhatsApp Access
                          </li>
                      </ul>
                  </div>

              </div>
          </div>
      </section>

      {userData?.data?.user?.isAdmin && courseData?.data?.course?.id && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setLocation(`/dashboard?edit=${courseData?.data?.course?.id}`)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-mono px-4 py-3 hover:bg-white/20 transition-colors cursor-pointer"
            data-testid="button-admin-edit"
          >
            <Pencil className="w-3.5 h-3.5" /> EDIT COURSE
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
