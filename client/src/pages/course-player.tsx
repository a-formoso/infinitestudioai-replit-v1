import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Play, CheckCircle, FileText, Download, ChevronRight, ChevronLeft, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function CoursePlayer() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-hidden flex flex-col">
      
      {/* NAVBAR - Simplified for Focus Mode */}
      <nav className="border-b border-white/10 bg-obsidian/95 backdrop-blur z-50 h-16 flex items-center justify-between px-6 sticky top-0">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
              <span className="font-header text-xs font-bold text-gray-400 uppercase tracking-wider">Back to Dashboard</span>
          </Link>
          <div className="font-header text-sm font-bold text-white tracking-widest hidden md:block">
            MASTER THE GOOGLE ECOSYSTEM
          </div>
          <div className="w-8 h-8 rounded-full bg-electricBlue flex items-center justify-center text-white text-xs font-bold">
              AD
          </div>
      </nav>

      <div className="flex flex-grow overflow-hidden h-[calc(100vh-64px)]">
          
          {/* MAIN CONTENT AREA */}
          <main className="flex-grow flex flex-col overflow-y-auto bg-black relative">
              
              {/* VIDEO PLAYER CONTAINER */}
              <div className="w-full aspect-video bg-gray-900 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black/50"></div>
                  
                  {/* Mock Video Controls Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-electricBlue hover:border-electricBlue transition-all cursor-pointer group-hover:scale-110">
                          <Play className="w-8 h-8 text-white ml-1 fill-white" />
                      </div>
                  </div>
                  
                  {/* Bottom Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-1 bg-white/20 rounded-full mb-4 cursor-pointer overflow-hidden">
                          <div className="h-full bg-electricBlue w-[35%] relative">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                          </div>
                      </div>
                      <div className="flex justify-between items-center text-white text-xs font-mono">
                          <div className="flex gap-4">
                              <span>04:20 / 12:45</span>
                          </div>
                          <div className="flex gap-4">
                              <span>HD</span>
                              <span>CC</span>
                              <span>1.0x</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* LESSON CONTENT */}
              <div className="max-w-4xl mx-auto w-full p-8 pb-20">
                  
                  <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                      <div>
                          <h1 className="text-2xl font-bold text-white mb-2">3.2 The "Ingredients" Workflow</h1>
                          <p className="text-gray-400 text-sm">Module 3: Principal Photography</p>
                      </div>
                      <div className="flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider text-gray-400">
                              Previous
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-electricBlue text-white rounded hover:bg-blue-600 transition-colors text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(41,98,255,0.4)]">
                              Mark Complete <ChevronRight className="w-4 h-4" />
                          </button>
                      </div>
                  </div>

                  {/* TABS */}
                  <div className="flex gap-8 border-b border-white/10 mb-8">
                      <button 
                          onClick={() => setActiveTab("overview")}
                          className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "overview" ? "text-electricBlue border-b-2 border-electricBlue" : "text-gray-500 hover:text-white"}`}
                      >
                          Overview
                      </button>
                      <button 
                          onClick={() => setActiveTab("resources")}
                          className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "resources" ? "text-electricBlue border-b-2 border-electricBlue" : "text-gray-500 hover:text-white"}`}
                      >
                          Resources
                      </button>
                      <button 
                          onClick={() => setActiveTab("notes")}
                          className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "notes" ? "text-electricBlue border-b-2 border-electricBlue" : "text-gray-500 hover:text-white"}`}
                      >
                          Notes
                      </button>
                  </div>

                  {/* TAB CONTENT */}
                  {activeTab === "overview" && (
                      <div className="space-y-6 text-gray-300 leading-relaxed font-light">
                          <p>
                              In this lesson, we dive deep into the "Ingredients" workflow within Veo 3.1. This is the secret sauce for maintaining consistent character identity across multiple generated shots.
                          </p>
                          <p>
                              We'll cover how to import your Nano Banano character reference sheets and map them to specific "ingredient slots" in the Veo interface. You'll learn why "weighting" your ingredients correctly is crucial for avoiding the "shimmer" effect common in AI video.
                          </p>
                          <div className="p-4 bg-white/5 border border-white/10 rounded mt-6">
                              <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                                  <span className="text-electricBlue">💡</span> PRO TIP
                              </h4>
                              <p className="text-xs text-gray-400">
                                  Always keep your reference images at a 1:1 aspect ratio when uploading as ingredients. Veo's internal cropper can sometimes cut off crucial details if you use 16:9 references.
                              </p>
                          </div>
                      </div>
                  )}

                  {activeTab === "resources" && (
                      <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border border-white/10 bg-white/5 hover:border-electricBlue/50 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-gray-800 rounded text-electricBlue">
                                      <FileText className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold text-sm group-hover:text-electricBlue transition-colors">Ingredient Mapping Cheat Sheet</h4>
                                      <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                                  </div>
                              </div>
                              <Download className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex items-center justify-between p-4 border border-white/10 bg-white/5 hover:border-electricBlue/50 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-gray-800 rounded text-electricBlue">
                                      <FileText className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold text-sm group-hover:text-electricBlue transition-colors">Sample Character Reference Pack</h4>
                                      <p className="text-xs text-gray-500">ZIP • 45 MB</p>
                                  </div>
                              </div>
                              <Download className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                          </div>
                      </div>
                  )}
                  
                  {activeTab === "notes" && (
                      <div className="space-y-4">
                          <textarea 
                              className="w-full bg-black/50 border border-white/10 rounded p-4 text-gray-300 text-sm focus:outline-none focus:border-electricBlue h-32"
                              placeholder="Start typing your notes here... (Auto-saved)"
                          ></textarea>
                          <div className="flex justify-end">
                              <button className="bg-white/10 text-white px-4 py-2 text-xs font-bold uppercase hover:bg-white/20 transition-colors">
                                  Save Note
                              </button>
                          </div>
                      </div>
                  )}

              </div>
          </main>

          {/* RIGHT SIDEBAR (CURRICULUM) */}
          <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 bg-obsidian border-l border-white/10 transition-all duration-300 overflow-y-auto hidden lg:block`}>
              <div className="p-6 border-b border-white/10">
                  <h3 className="font-header text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Course Content</h3>
                  <div className="flex justify-between items-end">
                      <span className="text-white font-bold text-lg">15/25 Lessons</span>
                      <span className="text-electricBlue text-xs font-bold">60%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-electricBlue w-[60%]"></div>
                  </div>
              </div>

              {/* Module List */}
              <div className="pb-20">
                  
                  {/* Module 1 (Completed) */}
                  <div className="border-b border-white/5">
                      <div className="p-4 bg-white/5 flex justify-between items-center cursor-pointer">
                          <h4 className="font-bold text-xs text-gray-300 uppercase">Module 1: Writer's Room</h4>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                  </div>

                  {/* Module 2 (Completed) */}
                  <div className="border-b border-white/5">
                      <div className="p-4 bg-white/5 flex justify-between items-center cursor-pointer">
                          <h4 className="font-bold text-xs text-gray-300 uppercase">Module 2: Art Dept</h4>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                  </div>

                  {/* Module 3 (Active) */}
                  <div className="border-b border-white/5">
                      <div className="p-4 bg-electricBlue/10 border-l-2 border-electricBlue flex justify-between items-center cursor-pointer">
                          <h4 className="font-bold text-xs text-white uppercase">Module 3: Photography</h4>
                          <span className="text-xs text-electricBlue font-mono">2/3</span>
                      </div>
                      <div className="bg-black/20">
                          <div className="p-3 pl-6 border-b border-white/5 flex gap-3 items-center opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-gray-400">3.1 Veo 3.1 Fundamentals</span>
                          </div>
                          {/* Active Lesson */}
                          <div className="p-3 pl-6 border-b border-white/5 flex gap-3 items-center bg-electricBlue/5 border-l-2 border-electricBlue cursor-pointer">
                              <div className="w-3 h-3 rounded-full border-2 border-electricBlue"></div>
                              <span className="text-xs text-white font-bold">3.2 The "Ingredients" Workflow</span>
                          </div>
                          <div className="p-3 pl-6 border-b border-white/5 flex gap-3 items-center hover:bg-white/5 cursor-pointer transition-colors">
                              <div className="w-3 h-3 rounded-full border-2 border-gray-600"></div>
                              <span className="text-xs text-gray-400">3.3 Banano Sandwich Method</span>
                          </div>
                      </div>
                  </div>
              </div>
          </aside>
      </div>
    </div>
  );
}
