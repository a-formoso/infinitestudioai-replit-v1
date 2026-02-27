import { useState, useEffect, useRef } from "react";

import { Link } from "wouter";

export function Footer() {
  const [lines, setLines] = useState<Array<{ time: string; content: string; colorClass: string }>>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prompts = [
        "> SYSTEM: Connecting to Veo 3.1 API endpoint...",
        "> SYSTEM: Uploading 'Character_Sheet_Kaelen.png' as Ingredient [Context: 85%]...",
        "> USER: 'Generate wide shot, rainy alley, neon noir style, volumetric fog'...",
        "> VEO: Rendering Physics Simulation [Fluid Dynamics: Rain]... 45%",
        "> GEMINI: Analyzing script for continuity errors in Scene 04...",
        "> SYSTEM: Audio synchronization complete. 1080p render finishing...",
        "> NANO BANANA: Inpainting costume details on frame 142 [Fixing Hands]...",
        "> MUSIC FX: Generating synthwave stem [80 BPM, Key: D Minor]...",
        "> FLOW: Stitching Scene 01 and Scene 02 with 'Morph Cut'...",
        "> SYSTEM: Asset 'Cyberpunk_City_Pack_v2' ready for download."
    ];

    let lineIndex = 0;

    const addLine = () => {
        const content = prompts[lineIndex];
        let colorClass = 'text-electricBlue';

        if(content.includes("ERROR")) colorClass = 'text-red-500';
        else if(content.includes("SYSTEM")) colorClass = 'text-gray-500';
        else if(content.includes("USER")) colorClass = 'text-white font-bold';
        else if(content.includes("VEO")) colorClass = 'text-signalOrange';
        else if(content.includes("GEMINI")) colorClass = 'text-purple-400';
        else if(content.includes("NANO")) colorClass = 'text-yellow-400';
        
        const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        setLines(prev => {
            const newLines = [...prev, { time, content, colorClass }];
            if (newLines.length > 5) return newLines.slice(newLines.length - 5);
            return newLines;
        });

        lineIndex = (lineIndex + 1) % prompts.length;
    };

    // Initial lines
    for(let i=0; i<3; i++) {
        setTimeout(addLine, i * 200);
    }
    
    // Loop
    const interval = setInterval(addLine, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black border-t border-white/10 relative z-20">
      {/* FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                  <div className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 mb-6">
                      <span className="text-electricBlue text-2xl">∞</span> INFINITE
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-mono">
                      A next-generation production house and educational platform built on the Google AI ecosystem.
                      <br /><br />
                      London • New York • The Cloud
                  </p>
              </div>
              
              <div>
                  <h5 className="font-header text-xs text-white mb-6 tracking-widest border-b border-white/10 pb-2 inline-block">ACADEMY</h5>
                  <ul className="space-y-3 text-xs text-gray-400 font-mono">
                      <li><a href="#" className="hover:text-signalOrange transition-colors">All Courses</a></li>
                      <li><Link href="/login" className="hover:text-signalOrange transition-colors">Student Login</Link></li>
                      <li><Link href="/support" className="hover:text-signalOrange transition-colors">Support Center</Link></li>
                  </ul>
              </div>

              <div>
                  <h5 className="font-header text-xs text-white mb-6 tracking-widest border-b border-white/10 pb-2 inline-block">STUDIO</h5>
                  <ul className="space-y-3 text-xs text-gray-400 font-mono">
                      <li><Link href="/about" className="hover:text-electricBlue transition-colors">About</Link></li>
                      <li><Link href="/hire" className="hover:text-electricBlue transition-colors">Services</Link></li>
                      <li><Link href="/hire" className="hover:text-electricBlue transition-colors">Contact Us</Link></li>
                  </ul>
              </div>

              <div>
                  <h5 className="font-header text-xs text-white mb-6 tracking-widest border-b border-white/10 pb-2 inline-block">CONNECT</h5>
                  <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#FE2C55] hover:border-[#FE2C55] hover:text-white text-gray-400 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white text-gray-400 transition-all duration-300">▶</a>
                      <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white text-gray-400 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      </a>
                  </div>
              </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[10px] text-gray-600 font-mono">
                  © 2025 INFINITE STUDIO. ALL SYSTEMS NOMINAL.
              </div>
              <div className="flex gap-6 text-[10px] text-gray-600 font-mono">
                  <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">TERMS_OF_EXECUTION</Link>
              </div>
          </div>
      </div>
    </footer>
  );
}
