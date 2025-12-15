import { useState } from "react";
import { Link } from "wouter";
import { 
  Menu, 
  Plus, 
  MessageSquare, 
  MoreVertical, 
  Send, 
  Mic, 
  Image as ImageIcon,
  Sparkles,
  History,
  Settings,
  HelpCircle,
  Play,
  CheckCircle2
} from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function CoursePlayer() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#131314] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR (Gemini Style) */}
      <aside 
        className={`${sidebarOpen ? 'w-[260px]' : 'w-0'} bg-[#1E1F20] flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col border-r border-white/5 relative overflow-hidden`}
      >
        <div className="p-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 hover:bg-white/10 rounded-full mb-4 text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <button className="flex items-center gap-3 bg-[#131314] hover:bg-[#28292A] text-gray-300 hover:text-white px-4 py-3 rounded-full w-full transition-colors border border-white/10 mb-6">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Chat</span>
          </button>

          <div className="mb-2 px-2">
            <h3 className="text-xs font-medium text-gray-500 mb-2">Recent</h3>
            <div className="space-y-1">
              <div className="group flex items-center gap-3 px-3 py-2 bg-[#004A77]/30 text-[#A8C7FA] rounded-full cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm truncate">1.1 The Multimodal Script</span>
              </div>
              <div className="group flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-gray-300 hover:text-white rounded-full cursor-pointer transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm truncate">1.2 Context is King</span>
              </div>
              <div className="group flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-gray-300 hover:text-white rounded-full cursor-pointer transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm truncate">1.3 Visual Bible Gen</span>
              </div>
            </div>
          </div>

          <div className="mt-6 px-2">
            <h3 className="text-xs font-medium text-gray-500 mb-2">Yesterday</h3>
            <div className="space-y-1">
               <div className="group flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-gray-300 hover:text-white rounded-full cursor-pointer transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm truncate">Prompt Engineering 101</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-white/5 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-gray-300 rounded-lg cursor-pointer">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-gray-300 rounded-lg cursor-pointer">
            <History className="w-4 h-4" />
            <span className="text-sm">Activity</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-gray-300 rounded-lg cursor-pointer">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative min-w-0">
        
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-6 bg-[#131314] z-10">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 mr-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <span className="text-xl font-medium bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] text-transparent bg-clip-text">Gemini 3.0 Pro</span>
            <span className="text-gray-500 text-sm ml-2">▼</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-red-500 p-[1px]">
               <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs">AD</div>
             </div>
          </div>
        </header>

        {/* Chat / Content Stream */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto pt-8 pb-32 px-4 md:px-8">
            
            {/* AI Message (The Lesson) */}
            <div className="flex gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 space-y-6">
                
                {/* Video Player Container */}
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative group border border-white/10 shadow-lg">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                   <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-2xl font-bold text-white mb-2">1.1 The Multimodal Script</h2>
                      <p className="text-gray-300 text-sm line-clamp-2">Learning to write for AI means understanding how LLMs process visual context differently than text. In this lesson...</p>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all hover:scale-105">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                   </div>
                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono">
                      12:45
                   </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-300">
                  <p>Here is a breakdown of the key concepts from the video:</p>
                  <ul className="space-y-2 list-disc pl-4">
                     <li><strong>Token Windows:</strong> Why 2 million tokens changes how we structure screenplays.</li>
                     <li><strong>Visual Prompting:</strong> Using reference images as "adjectives" in your prompt chain.</li>
                     <li><strong>The "Director's Statement":</strong> Framing your initial context to align the model's creative output.</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-[#1E1F20] border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-[#2D2E30] transition-colors flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Mark Complete
                   </button>
                   <button className="px-4 py-2 bg-[#1E1F20] border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-[#2D2E30] transition-colors">
                      Download Resources
                   </button>
                </div>
              </div>
            </div>

            {/* User Message (Previous Interaction) */}
            <div className="flex gap-4 mb-8 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1 text-xs">AD</div>
              <div className="max-w-[80%] bg-[#28292A] rounded-2xl rounded-tr-sm px-5 py-3 text-gray-200">
                <p>How do I calculate the token cost for a 120-page script if I'm using image references for every scene?</p>
              </div>
            </div>

             {/* AI Response (Answer) */}
            <div className="flex gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 space-y-2">
                 <div className="text-gray-300">
                    <p>That's a great question regarding budget. Here is the formula:</p>
                    <div className="bg-[#1E1F20] p-4 rounded-lg font-mono text-sm my-3 border border-white/5">
                       (Text Tokens) + (Image Count * 258 tokens) = Total Context
                    </div>
                    <p>For a 120-page script (~20,000 words), you are looking at roughly 25k text tokens. If you add 1 reference image per scene (approx 60 scenes), that adds another ~15k tokens. You are well within the 1M limit of Gemini 1.5 Pro.</p>
                 </div>
              </div>
            </div>

          </div>
        </div>

        {/* Input Area (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#131314] p-4 pt-0">
          <div className="max-w-4xl mx-auto">
             <div className="bg-[#1E1F20] rounded-3xl border border-white/10 p-2 relative">
                <div className="flex items-center gap-2 px-2 mb-2">
                   <input 
                      type="text" 
                      placeholder="Ask your AI Tutor about this lesson..." 
                      className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 py-3 px-2"
                   />
                </div>
                <div className="flex justify-between items-center px-2 pb-1">
                   <div className="flex gap-2 text-gray-400">
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><ImageIcon className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Mic className="w-5 h-5" /></button>
                   </div>
                   <button className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                      <Send className="w-4 h-4 ml-0.5" />
                   </button>
                </div>
             </div>
             <div className="text-center mt-2">
                <p className="text-[10px] text-gray-500">Gemini may display inaccurate info, including about people, so double-check its responses.</p>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
}
