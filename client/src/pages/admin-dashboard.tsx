import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, BookOpen, Users, ShoppingBag, BarChart2, Plus, Download } from "lucide-react";

export default function AdminDashboard() {
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
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white text-xs font-header font-bold rounded hover:bg-white/20 transition-colors border-l-2 border-electricBlue">
              <LayoutDashboard className="w-4 h-4" /> DASHBOARD
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 text-xs font-header font-bold rounded hover:bg-white/5 hover:text-white transition-colors">
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
      </main>
    </div>
  );
}