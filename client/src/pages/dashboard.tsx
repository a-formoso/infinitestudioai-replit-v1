import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden flex flex-col">
      
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      {/* DASHBOARD CONTENT */}
      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full z-10">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                  <h1 className="font-header text-3xl md:text-4xl text-white mb-2">MISSION CONTROL</h1>
                  <p className="text-sm text-gray-400 font-mono">Welcome back, Director. Systems online.</p>
              </div>
              <div className="flex gap-4">
                  <button className="border border-white/20 text-white px-6 py-3 text-xs font-header font-bold uppercase hover:bg-white/10 transition-colors">
                      Edit Profile
                  </button>
                  <button className="bg-electricBlue text-white px-6 py-3 text-xs font-header font-bold uppercase hover:bg-white hover:text-black transition-colors">
                      Access Community
                  </button>
              </div>
          </div>

          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN (Main Learning) */}
              <div className="lg:col-span-2 space-y-8">
                  
                  {/* Hero: Resume Learning */}
                  <div className="glass-panel p-0 overflow-hidden relative group cursor-pointer border border-electricBlue/30 hover:border-electricBlue transition-all duration-300">
                      <div className="h-64 bg-gray-900 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black"></div>
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                              <div className="w-16 h-16 rounded-full bg-electricBlue flex items-center justify-center text-white pl-1 shadow-[0_0_30px_rgba(41,98,255,0.5)] transform group-hover:scale-110 transition-transform">▶</div>
                          </div>
                          <div className="absolute top-6 left-6">
                              <span className="bg-electricBlue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">RESUME PLAYING</span>
                          </div>
                      </div>
                      <div className="p-8 relative">
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <h3 className="font-header text-xl text-white mb-1">MASTER THE GOOGLE ECOSYSTEM</h3>
                                  <p className="text-xs text-gray-400 font-mono">Module 3.2: The "Ingredients" Workflow</p>
                              </div>
                              <span className="text-electricBlue font-mono text-xl font-bold">65%</span>
                          </div>
                          {/* Progress Bar */}
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-electricBlue w-[65%] shadow-[0_0_10px_rgba(41,98,255,0.5)]"></div>
                          </div>
                      </div>
                  </div>

                  {/* My Courses List */}
                  <div className="glass-panel p-8">
                      <h3 className="font-header text-sm text-white mb-6 border-b border-white/10 pb-4">ENROLLED COURSES</h3>
                      <div className="space-y-6">
                          
                          {/* Course Item 1 (Active) */}
                          <div className="flex gap-4 items-center group cursor-pointer">
                              <div className="w-16 h-16 bg-gray-800 shrink-0 relative overflow-hidden rounded border border-white/10 group-hover:border-electricBlue/50 transition-colors">
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black"></div>
                              </div>
                              <div className="flex-grow">
                                  <h4 className="font-header text-sm text-white group-hover:text-electricBlue transition-colors">MASTER THE GOOGLE ECOSYSTEM</h4>
                                  <div className="flex justify-between items-center mt-2">
                                      <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                          <div className="h-full bg-electricBlue w-[65%]"></div>
                                      </div>
                                      <span className="text-[10px] text-gray-500 font-mono">15/25 LESSONS</span>
                                  </div>
                              </div>
                              <button className="text-white hover:text-electricBlue transition-colors">→</button>
                          </div>

                          {/* Course Item 2 (Not Started) */}
                          <div className="flex gap-4 items-center group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 bg-gray-800 shrink-0 relative overflow-hidden rounded border border-white/10 group-hover:border-signalOrange/50 transition-colors">
                                  <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-black"></div>
                              </div>
                              <div className="flex-grow">
                                  <h4 className="font-header text-sm text-white group-hover:text-signalOrange transition-colors">ADVANCED AI CINEMATOGRAPHY</h4>
                                  <div className="flex justify-between items-center mt-2">
                                      <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                          <div className="h-full bg-signalOrange w-[0%]"></div>
                                      </div>
                                      <span className="text-[10px] text-gray-500 font-mono">NOT STARTED</span>
                                  </div>
                              </div>
                              <button className="text-white hover:text-signalOrange transition-colors">→</button>
                          </div>

                      </div>
                  </div>

              </div>

              {/* RIGHT COLUMN (Assets & Tools) */}
              <div className="space-y-8">
                  
                  {/* Quick Downloads */}
                  <div className="glass-panel p-8">
                      <h3 className="font-header text-sm text-white mb-6 border-b border-white/10 pb-4">MY ASSETS</h3>
                      <div className="space-y-4">
                          <a href="#" className="block p-4 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
                              <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-header text-purple-500">ZIP FILE</span>
                                  <span className="text-[10px] font-mono text-gray-500">240MB</span>
                              </div>
                              <h4 className="text-sm font-bold text-white group-hover:text-purple-500 transition-colors">Nano Banano Texture Pack</h4>
                              <p className="text-[10px] text-gray-400 mt-1">Version 2.1 • Updated Yesterday</p>
                          </a>
                          <a href="#" className="block p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group">
                              <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-header text-gray-400">PDF</span>
                                  <span className="text-[10px] font-mono text-gray-500">12MB</span>
                              </div>
                              <h4 className="text-sm font-bold text-white group-hover:text-gray-300 transition-colors">Master Prompt Library</h4>
                              <p className="text-[10px] text-gray-400 mt-1">Level 1 Course Supplement</p>
                          </a>
                      </div>
                  </div>

                  {/* Community Feed (Mockup) */}
                  <div className="glass-panel p-8">
                      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                          <h3 className="font-header text-sm text-white">STUDIO FEED</h3>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                              <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">S</div>
                              <div>
                                  <p className="text-[10px] text-gray-300"><span className="text-electricBlue font-bold">@SarahJ</span> posted a new critique in #wip-feedback</p>
                                  <span className="text-[8px] text-gray-600 font-mono">2 MIN AGO</span>
                              </div>
                          </div>
                          <div className="flex gap-3 items-start">
                              <div className="w-6 h-6 rounded bg-signalOrange flex items-center justify-center text-[10px] font-bold text-black">M</div>
                              <div>
                                  <p className="text-[10px] text-gray-300"><span className="text-electricBlue font-bold">@MikeV</span> uploaded a new texture asset</p>
                                  <span className="text-[8px] text-gray-600 font-mono">45 MIN AGO</span>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </main>

      <Footer />
    </div>
  );
}
