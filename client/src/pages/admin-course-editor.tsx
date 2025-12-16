import { Link } from "wouter";
import { LayoutDashboard, BookOpen, Users, ShoppingBag, BarChart2, Bold, Italic, Underline, Link as LinkIcon, Code, Upload, X } from "lucide-react";

export default function AdminCourseEditor() {
  return (
    <div className="bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-hidden h-screen flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black border-r border-white/10 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="font-header font-bold text-lg tracking-widest text-white flex items-center gap-2">
              <span className="text-electricBlue text-xl">∞</span> ADMIN
            </Link>
          </div>
          
          <nav className="p-4 space-y-2">
            <p className="text-[10px] font-mono text-gray-500 px-4 py-2 uppercase tracking-widest">Main Menu</p>
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 text-xs font-header font-bold rounded hover:bg-white/5 hover:text-white transition-colors">
              <LayoutDashboard className="w-4 h-4" /> DASHBOARD
            </Link>
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white text-xs font-header font-bold rounded hover:bg-white/20 transition-colors border-l-2 border-electricBlue">
              <BookOpen className="w-4 h-4" /> COURSES
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 text-xs font-header font-bold rounded hover:bg-white/5 hover:text-white transition-colors">
              <Users className="w-4 h-4" /> STUDENTS
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 text-xs font-header font-bold rounded hover:bg-white/5 hover:text-white transition-colors">
              <ShoppingBag className="w-4 h-4" /> ASSET STORE
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 text-xs font-header font-bold rounded hover:bg-white/5 hover:text-white transition-colors">
              <BarChart2 className="w-4 h-4" /> ANALYTICS
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black"></div>
              <span className="absolute inset-0 flex items-center justify-center font-header text-white text-[10px]">AD</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">ALEX DIRECTOR</p>
              <p className="text-[10px] text-green-500 font-mono">SYSTEM ADMIN</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow overflow-y-auto relative">
        {/* GRID OVERLAY */}
        <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          
          {/* BREADCRUMBS & HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 mb-2">
              <a href="#" className="hover:text-white">COURSES</a>
              <span>/</span>
              <a href="#" className="hover:text-white">MASTER THE GOOGLE ECOSYSTEM</a>
              <span>/</span>
              <span className="text-electricBlue">EDIT CONTENT</span>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="font-header text-2xl text-white">COURSE EDITOR</h1>
              <div className="flex gap-4">
                <button className="text-gray-400 text-xs hover:text-white transition-colors underline">Preview</button>
                <button className="bg-green-500 text-black px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* EDITOR LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: STRUCTURE TREE */}
            <div className="lg:col-span-1 glass-panel p-0 overflow-hidden border border-white/10 h-[calc(100vh-200px)] flex flex-col">
              <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="font-header text-xs text-white">CURRICULUM</h3>
                <button className="text-electricBlue text-xs hover:underline">+ New Module</button>
              </div>
              
              <div className="overflow-y-auto flex-grow p-2 space-y-2">
                {/* Module 1 */}
                <div className="bg-white/5 rounded border border-white/5">
                  <div className="p-3 text-xs font-bold text-gray-300 flex justify-between cursor-pointer hover:bg-white/5">
                    <span>MODULE 1: WRITER'S ROOM</span>
                    <span className="text-[10px] text-gray-500">Draft</span>
                  </div>
                  <div className="pl-2 pr-2 pb-2 space-y-1">
                    <div className="p-2 text-[10px] text-gray-400 hover:bg-electricBlue/20 hover:text-white rounded cursor-pointer flex justify-between items-center group">
                      <span>1.1 The Multimodal Script</span>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-2 text-[10px] text-gray-400 hover:bg-electricBlue/20 hover:text-white rounded cursor-pointer flex justify-between items-center group">
                      <span>1.2 Context is King</span>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-2 text-[10px] bg-electricBlue/20 text-white rounded cursor-pointer flex justify-between items-center border-l-2 border-electricBlue">
                      <span>1.3 Visual Bible (Editing)</span>
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Add Lesson Button */}
                <button className="w-full py-2 border border-dashed border-white/10 text-[10px] text-gray-500 hover:text-white hover:border-white/30 rounded transition-colors">
                  + Add Lesson to Module 1
                </button>
              </div>
            </div>

            {/* RIGHT: CONTENT EDITOR */}
            <div className="lg:col-span-2 glass-panel p-8 border border-white/10 relative">
              
              {/* Lesson Metadata */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">LESSON TITLE</label>
                  <input type="text" defaultValue="Generating the Visual Bible" className="bg-black/50 border border-white/10 text-white text-sm px-4 py-3 w-full focus:border-electricBlue outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">DURATION (MIN)</label>
                  <input type="text" defaultValue="12:45" className="bg-black/50 border border-white/10 text-white text-sm px-4 py-3 w-full focus:border-electricBlue outline-none font-mono" />
                </div>
              </div>

              {/* Video Upload */}
              <div className="mb-8">
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">VIDEO SOURCE</label>
                <div className="h-48 bg-black/50 border-2 border-dashed border-white/10 rounded flex flex-col items-center justify-center cursor-pointer hover:border-electricBlue/50 transition-colors group relative overflow-hidden">
                  {/* Placeholder for uploaded video state */}
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <span className="text-xs font-mono text-white">Visual_Bible_Final_v2.mp4</span>
                  </div>
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <button className="bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/20 hover:border-white">Replace</button>
                  </div>
                </div>
              </div>

              {/* Description Editor (Rich Text Mockup) */}
              <div className="mb-8">
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">LESSON NOTES</label>
                <div className="bg-black/50 border border-white/10 min-h-[200px] p-4 text-sm text-gray-300 font-sans">
                  <div className="flex gap-2 border-b border-white/10 pb-2 mb-4 text-gray-500">
                    <button className="hover:text-white"><Bold className="w-4 h-4" /></button>
                    <button className="hover:text-white"><Italic className="w-4 h-4" /></button>
                    <button className="hover:text-white"><Underline className="w-4 h-4" /></button>
                    <span className="w-px bg-white/10 h-4"></span>
                    <button className="hover:text-white"><LinkIcon className="w-4 h-4" /></button>
                    <button className="hover:text-white"><Code className="w-4 h-4" /></button>
                  </div>
                  <p>In this lesson, we cover how to reverse-engineer a cinematic look using Gemini 3.0.</p>
                  <br />
                  <p><b>Key Prompts:</b></p>
                  <p className="font-mono bg-white/5 p-2 rounded mt-2 text-xs text-electricBlue">"Analyze this image as a Director of Photography..."</p>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-mono text-gray-500 uppercase">DOWNLOADABLE RESOURCES</label>
                  <button className="text-[10px] text-electricBlue hover:underline flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Upload File
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">PDF</div>
                      <span className="text-xs text-white">Visual_Bible_Template.pdf</span>
                    </div>
                    <button className="text-gray-500 hover:text-red-500"><X className="w-4 h-4" /></button>
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