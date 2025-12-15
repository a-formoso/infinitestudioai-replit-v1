import { useState } from "react";
import { Link } from "wouter";
import { Play, Check, Circle, ChevronLeft, ChevronRight, Download, MessageSquare, Maximize, Minimize } from "lucide-react";

export default function CoursePlayer() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      {/* TOP BAR */}
      <header className="fixed top-0 w-full z-40 glass-panel border-b-0 border-b-glassBorder bg-obsidian/90 backdrop-blur-md h-20 flex items-center justify-between px-6 border-b border-white/10">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <div className="flex items-center gap-6">
                <Link href="/dashboard" className="flex items-center gap-2 text-xs font-header font-bold text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" /> DASHBOARD
                </Link>
                <div className="h-4 w-px bg-white/10"></div>
                <h1 className="text-sm font-header font-bold text-white tracking-wider">MASTER THE GOOGLE ECOSYSTEM</h1>
            </div>
            <div className="flex items-center gap-6">
                <span className="text-[10px] font-mono text-electricBlue hidden md:block">3.2 THE "INGREDIENTS" WORKFLOW</span>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-header font-bold text-white">ALEX DIRECTOR</div>
                        <div className="text-[10px] font-mono text-gray-500">PRO MEMBER</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-electricBlue flex items-center justify-center text-[10px] font-bold text-white border border-white/20">AD</div>
                </div>
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
                      {/* Placeholder Video Interface */}
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
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                      </div>

                      {/* Video Meta Overlay */}
                      <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 text-[10px] font-mono text-white rounded pointer-events-none">VEO_GENERATION_V3.MP4</div>

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
                              <h2 className="font-header text-2xl text-white mb-2">THE "INGREDIENTS" WORKFLOW</h2>
                              <p className="text-xs font-mono text-gray-400">Module 3: Principal Photography</p>
                          </div>
                          <div className="flex gap-2">
                              <button className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-header font-bold text-white transition-colors">
                                  <ChevronLeft className="w-3 h-3" /> PREV
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-electricBlue hover:text-white text-xs font-header font-bold transition-colors">
                                  NEXT LESSON <ChevronRight className="w-3 h-3" />
                              </button>
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
                              RESOURCES (3)
                          </button>
                          <button 
                            onClick={() => setActiveTab('discussion')}
                            className={`pb-4 text-xs font-header font-bold tracking-wider transition-colors border-b-2 ${activeTab === 'discussion' ? 'text-white border-electricBlue' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                          >
                              DISCUSSION
                          </button>
                      </div>

                      {/* Tab Content */}
                      <div className="text-gray-300 text-sm leading-relaxed space-y-6">
                          {activeTab === 'overview' && (
                              <div className="animate-in fade-in duration-300">
                                  <p>
                                      In this lesson, we tackle the biggest problem in AI video: <span className="text-white font-bold">Character Consistency</span>.
                                  </p>
                                  <p>
                                      You will learn how to use the "Ingredients" feature in Veo 3.1 effectively. We will take the character sheet we generated in Module 2 (Nano Banano) and upload it as a reference anchor. This prevents the dreaded "face melting" effect when the camera angles change.
                                  </p>
                                  
                                  <h3 className="text-white font-bold mt-8 mb-4">Key Takeaways:</h3>
                                  <ul className="space-y-2 list-disc pl-4 text-gray-400">
                                      <li>How to format your "Master Asset" for Veo upload.</li>
                                      <li>The correct aspect ratio for ingredient images (1:1 vs 16:9).</li>
                                      <li>Prompting strategies to force the model to "look at" the reference.</li>
                                  </ul>
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
                                              <h4 className="text-white font-bold text-xs">Character_Sheet_Template.psd</h4>
                                              <p className="text-[10px] text-gray-500 font-mono">24.5 MB • PHOTOSHOP</p>
                                          </div>
                                      </div>
                                      <Download className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                  </div>
                                  <div className="flex items-center justify-between p-4 border border-white/10 hover:bg-white/5 transition-colors group cursor-pointer">
                                      <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-purple-500/20 flex items-center justify-center text-purple-400 rounded">
                                              <Download className="w-5 h-5" />
                                          </div>
                                          <div>
                                              <h4 className="text-white font-bold text-xs">Veo_Prompt_Cheat_Sheet.pdf</h4>
                                              <p className="text-[10px] text-gray-500 font-mono">1.2 MB • PDF</p>
                                          </div>
                                      </div>
                                      <Download className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                  </div>
                              </div>
                          )}

                          {activeTab === 'discussion' && (
                              <div className="space-y-6 animate-in fade-in duration-300">
                                  <div className="flex gap-4">
                                      <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0"></div>
                                      <div>
                                          <div className="flex items-baseline gap-2 mb-1">
                                              <span className="text-white font-bold text-xs">Sarah Jenkins</span>
                                              <span className="text-[10px] text-gray-500">2 hours ago</span>
                                          </div>
                                          <p className="text-xs text-gray-400">Does this work with the legacy Veo model if I don't have access to 3.1 yet?</p>
                                          <div className="flex items-center gap-2 mt-2 text-electricBlue text-[10px] font-bold cursor-pointer hover:underline">
                                              <MessageSquare className="w-3 h-3" /> REPLY
                                          </div>
                                      </div>
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
                              <span>15/25 COMPLETED</span>
                              <span className="text-electricBlue">65%</span>
                          </div>
                          <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                              <div className="h-full bg-electricBlue w-[65%]"></div>
                          </div>
                      </div>

                      {/* Scrollable List */}
                      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                          
                          {/* Module 1 */}
                          <div className="py-4">
                              <h4 className="px-6 text-[10px] font-header font-bold text-gray-500 mb-4 uppercase">MODULE 1: WRITER'S ROOM</h4>
                              <div className="space-y-1">
                                  <div className="px-6 py-3 flex gap-3 items-start opacity-50 hover:bg-white/5 cursor-pointer">
                                      <Check className="w-4 h-4 text-electricBlue shrink-0 mt-0.5" />
                                      <div>
                                          <p className="text-xs text-white leading-tight mb-1">1.1 The Multimodal Script</p>
                                          <span className="text-[10px] font-mono text-gray-500">12:04</span>
                                      </div>
                                  </div>
                                  <div className="px-6 py-3 flex gap-3 items-start opacity-50 hover:bg-white/5 cursor-pointer">
                                      <Check className="w-4 h-4 text-electricBlue shrink-0 mt-0.5" />
                                      <div>
                                          <p className="text-xs text-white leading-tight mb-1">1.2 Context is King</p>
                                          <span className="text-[10px] font-mono text-gray-500">08:45</span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Module 2 */}
                          <div className="py-4 border-t border-white/5">
                              <h4 className="px-6 text-[10px] font-header font-bold text-gray-500 mb-4 uppercase">MODULE 2: ART DEPT</h4>
                              <div className="space-y-1">
                                  <div className="px-6 py-3 flex gap-3 items-start opacity-50 hover:bg-white/5 cursor-pointer">
                                      <Check className="w-4 h-4 text-electricBlue shrink-0 mt-0.5" />
                                      <div>
                                          <p className="text-xs text-white leading-tight mb-1">2.1 Intro to Nano Banano</p>
                                          <span className="text-[10px] font-mono text-gray-500">15:20</span>
                                      </div>
                                  </div>
                                  <div className="px-6 py-3 flex gap-3 items-start opacity-50 hover:bg-white/5 cursor-pointer">
                                      <Check className="w-4 h-4 text-electricBlue shrink-0 mt-0.5" />
                                      <div>
                                          <p className="text-xs text-white leading-tight mb-1">2.2 Character Sheet Workflow</p>
                                          <span className="text-[10px] font-mono text-gray-500">22:10</span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Module 3 (Active) */}
                          <div className="py-4 border-t border-white/5">
                              <h4 className="px-6 text-[10px] font-header font-bold text-electricBlue mb-4 uppercase">MODULE 3: PRINCIPAL PHOTOGRAPHY</h4>
                              <div className="space-y-1">
                                  <div className="px-6 py-3 flex gap-3 items-start hover:bg-white/5 cursor-pointer opacity-50">
                                      <Check className="w-4 h-4 text-electricBlue shrink-0 mt-0.5" />
                                      <div>
                                          <p className="text-xs text-white leading-tight mb-1">3.1 Veo 3.1 Fundamentals</p>
                                          <span className="text-[10px] font-mono text-gray-500">10:15</span>
                                      </div>
                                  </div>
                                  
                                  {/* Active Lesson */}
                                  <div className="px-6 py-4 flex gap-3 items-start bg-electricBlue/10 border-l-2 border-electricBlue cursor-pointer">
                                      <div className="w-4 h-4 rounded-full bg-electricBlue flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(41,98,255,0.5)]">
                                          <Play className="w-2 h-2 text-white fill-current" />
                                      </div>
                                      <div>
                                          <p className="text-xs text-white font-bold leading-tight mb-1">3.2 The "Ingredients" Workflow</p>
                                          <span className="text-[9px] font-mono text-electricBlue font-bold tracking-wider">12:45 • WATCHING NOW</span>
                                      </div>
                                  </div>

                                  <div className="px-6 py-3 flex gap-3 items-start hover:bg-white/5 cursor-pointer group">
                                      <Circle className="w-4 h-4 text-gray-600 shrink-0 mt-0.5 group-hover:text-gray-400" />
                                      <div>
                                          <p className="text-xs text-gray-400 leading-tight mb-1 group-hover:text-white transition-colors">3.3 The "Banano Sandwich" Method</p>
                                          <span className="text-[10px] font-mono text-gray-600">18:30</span>
                                      </div>
                                  </div>
                                  
                                  <div className="px-6 py-3 flex gap-3 items-start hover:bg-white/5 cursor-pointer group">
                                      <Circle className="w-4 h-4 text-gray-600 shrink-0 mt-0.5 group-hover:text-gray-400" />
                                      <div>
                                          <p className="text-xs text-gray-400 leading-tight mb-1 group-hover:text-white transition-colors">3.4 Physics & Camera Control</p>
                                          <span className="text-[10px] font-mono text-gray-600">14:00</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </main>
    </div>
  );
}
