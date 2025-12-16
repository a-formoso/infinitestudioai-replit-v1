import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, BookOpen, Users, ShoppingBag, BarChart2, Plus, Download, Bold, Italic, Underline, Link as LinkIcon, Code, X } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adminLogs = [
      "[SYS] New user registration: ID #9942",
      "[PAYMENT] Stripe Webhook received: success",
      "[EMAIL] Welcome sequence triggered for user #9942",
      "[VEO] Rendering preview for Asset Store item #04",
      "[SYS] Database backup complete (145ms)",
      "[SEC] Failed login attempt from IP 192.168.x.x",
      "[CMS] Course content updated: Module 3.2",
      "[ANALYTICS] Daily traffic report generated"
    ];

    const addLog = () => {
      const log = adminLogs[Math.floor(Math.random() * adminLogs.length)];
      const time = new Date().toLocaleTimeString([], { hour12: false });
      const formattedLog = `<span class="text-gray-600">[${time}]</span> <span class="text-green-400">></span> ${log}`;
      
      setLogs(prev => {
        const newLogs = [...prev, formattedLog];
        if (newLogs.length > 15) return newLogs.slice(newLogs.length - 15);
        return newLogs;
      });
    };

    // Fill initial
    for(let i=0; i<8; i++) addLog();

    const interval = setInterval(addLog, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const renderDashboard = () => (
    <div className="relative z-10 p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-header text-2xl text-white mb-1">SYSTEM OVERVIEW</h1>
          <p className="text-xs text-gray-400 font-mono">Last Sync: Just now</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-electricBlue text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors">
            <Plus className="w-3 h-3" /> New Course
          </button>
          <button className="flex items-center gap-2 border border-white/20 text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export Report
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Stat 1 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Total Revenue</span>
            <span className="text-green-500 text-xs font-mono">+12%</span>
          </div>
          <h2 className="font-header text-3xl text-white">$124,500</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[75%]"></div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Active Students</span>
            <span className="text-electricBlue text-xs font-mono">+54</span>
          </div>
          <h2 className="font-header text-3xl text-white">5,204</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-electricBlue w-[60%]"></div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Asset Downloads</span>
            <span className="text-neonPurple text-xs font-mono">NEW</span>
          </div>
          <h2 className="font-header text-3xl text-white">12.5K</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-neonPurple w-[85%]"></div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Server Load</span>
            <span className="text-signalOrange text-xs font-mono">STABLE</span>
          </div>
          <h2 className="font-header text-3xl text-white">24%</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-signalOrange w-[24%]"></div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Sales (Table) */}
        <div className="lg:col-span-2 glass-panel p-0 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-header text-sm text-white">RECENT TRANSACTIONS</h3>
            <a href="#" className="text-[10px] font-mono text-electricBlue hover:underline">VIEW ALL</a>
          </div>
          <table className="w-full text-left text-xs text-gray-400">
            <thead className="bg-white/5 text-gray-200 font-header border-b border-white/10">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">sarah_j_films</td>
                <td className="p-4">Level 01 Certification</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">PAID</span></td>
                <td className="p-4 text-right">$149.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">mike_vfx_pro</td>
                <td className="p-4">Advanced Cinematography</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">PAID</span></td>
                <td className="p-4 text-right">$199.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">studio_asset_bot</td>
                <td className="p-4">Nano Texture Pack</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">PAID</span></td>
                <td className="p-4 text-right">$29.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">guest_user_22</td>
                <td className="p-4">Level 01 Certification</td>
                <td className="p-4"><span className="bg-red-500/20 text-red-500 px-2 py-1 rounded">FAILED</span></td>
                <td className="p-4 text-right">$149.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* System Logs (Live Terminal Feed) */}
        <div className="glass-panel p-0 overflow-hidden flex flex-col h-full bg-black/50 border border-white/10 min-h-[300px]">
          <div className="p-4 border-b border-white/10 bg-[#050505]">
            <h3 className="font-header text-xs text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              LIVE SYSTEM LOGS
            </h3>
          </div>
          <div 
            className="p-4 font-mono text-[10px] space-y-2 text-gray-400 overflow-y-auto flex-grow" 
            ref={terminalRef}
          >
            {logs.map((log, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: log }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  const renderCourses = () => (
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
  );

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
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "dashboard" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <LayoutDashboard className="w-4 h-4" /> DASHBOARD
            </button>
            <button 
              onClick={() => setActiveTab("courses")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "courses" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <BookOpen className="w-4 h-4" /> COURSES
            </button>
            <button 
              onClick={() => setActiveTab("students")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "students" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <Users className="w-4 h-4" /> STUDENTS
            </button>
            <button 
              onClick={() => setActiveTab("store")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "store" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <ShoppingBag className="w-4 h-4" /> ASSET STORE
            </button>
            <button 
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "analytics" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <BarChart2 className="w-4 h-4" /> ANALYTICS
            </button>
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

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "courses" && renderCourses()}
        {activeTab === "students" && (
          <div className="relative z-10 p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-header text-gray-400">STUDENTS MODULE COMING SOON</h2>
            </div>
          </div>
        )}
        {activeTab === "store" && (
          <div className="relative z-10 p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-header text-gray-400">STORE MANAGEMENT COMING SOON</h2>
            </div>
          </div>
        )}
        {activeTab === "analytics" && (
          <div className="relative z-10 p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <BarChart2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-header text-gray-400">ANALYTICS MODULE COMING SOON</h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}