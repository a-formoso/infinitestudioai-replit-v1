import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
      <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
          {/* GRID BACKGROUND OVERLAY */}
          <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
          <Navbar />
          {/* HERO SECTION: THE DASHBOARD */}
          <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10">
              {/* BENTO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                  
                  {/* MAIN SHOWREEL (Top Left - 60%) */}
                  <div className="md:col-span-8 glass-panel relative overflow-hidden group h-[400px] md:h-full border border-white/10 hover:border-electricBlue/30 transition-colors duration-500">
                      {/* Placeholder for Video */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                          {/* Simulating a video loop */}
                          <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                              <div className="text-6xl mb-4 text-electricBlue animate-pulse">▶</div>
                              <p className="font-header tracking-widest text-xs md:text-sm">SHOWREEL_2025.MP4</p>
                          </div>
                          {/* Decorative UI elements mimicking software */}
                          <div className="absolute top-4 left-4 text-[10px] font-mono text-electricBlue flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div> REC ● [00:01:24:12]
                          </div>
                          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white opacity-50">VEO 3.1 RENDER</div>
                          <div className="absolute inset-0 border border-white/5 m-4 pointer-events-none"></div>
                          
                           {/* Scanlines Overlay */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
                      </div>
                      
                      {/* Overlay Text */}
                      <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                          <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight glitch-hover cursor-default drop-shadow-lg">
                              DIRECT THE<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-purple-600">ALGORITHM</span>
                          </h1>
                      </div>
                  </div>

                  {/* ACADEMY CTA (Top Right - 40%) */}
                  <div className="md:col-span-4 flex flex-col gap-6 h-full">
                      <div className="glass-panel flex-1 p-8 flex flex-col justify-center relative overflow-hidden hover:border-signalOrange/50 transition-colors duration-300 group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-header font-bold text-white group-hover:text-signalOrange transition-colors duration-300">01</div>
                          
                          <div className="relative z-10">
                              <h2 className="font-header text-2xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">THE ACADEMY</h2>
                              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Stop prompting blindly. Master the Google Filmmaking Ecosystem from Gemini to Veo.</p>
                              <a href="/academy" className="inline-block bg-signalOrange text-black px-6 py-3 font-header text-xs font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300">
                                  View Courses
                              </a>
                          </div>
                      </div>

                      <div className="glass-panel flex-1 p-8 flex flex-col justify-center relative hover:border-electricBlue/50 transition-colors duration-300 group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-header font-bold text-white group-hover:text-electricBlue transition-colors duration-300">02</div>
                          
                          <div className="relative z-10">
                              <h2 className="font-header text-2xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">STUDIO SERVICES</h2>
                              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Full-service AI production. Commercials, music videos, and pre-viz.</p>
                              <a href="#work" className="inline-block border border-white/30 text-white px-6 py-3 font-header text-xs font-bold uppercase tracking-wider hover:border-electricBlue hover:text-electricBlue hover:scale-105 transition-all duration-300">
                                  Hire Us
                              </a>
                          </div>
                      </div>
                  </div>

              </div>

              {/* TRUST STRIP */}
              <div className="mt-12 border-t border-white/10 pt-6 flex flex-wrap gap-8 md:gap-16 justify-center md:justify-start items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                  <span className="text-[10px] font-mono tracking-widest text-electricBlue">TECHNIQUES USED BY CREATORS AT:</span>
                  {/* Fake Logos for Mockup */}
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">VEO</div>
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">NANO BANANA</div>
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">VEO</div>
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">FLOW</div>
              </div>
          </header>
          {/* WORK SECTION */}
          <section id="work" className="py-20 border-t border-white/10 bg-black/50 relative z-10">
              <div className="max-w-7xl mx-auto px-6">
                  <div className="flex justify-between items-end mb-12">
                      <div>
                          <p className="text-electricBlue font-mono text-xs mb-2 tracking-widest">/// SELECTED WORKS</p>
                          <h2 className="font-header text-4xl font-bold text-white">PRODUCTION</h2>
                      </div>
                      <a href="#" className="text-xs font-header font-bold border-b border-signalOrange pb-1 hover:text-signalOrange transition-colors tracking-wider">VIEW ALL CASE STUDIES</a>
                  </div>

                  {/* Project Cards */}
                  <div className="space-y-12">
                      
                      {/* Project 1 */}
                      <div className="group relative h-[450px] w-full glass-panel overflow-hidden cursor-pointer border border-white/5 hover:border-electricBlue/50 transition-all duration-500">
                          <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                               {/* Placeholder Image */}
                              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-30 transition-opacity duration-500"></div>
                          </div>
                          
                          {/* Prompt Reveal Overlay */}
                          <div className="absolute inset-0 bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center p-8 md:p-16">
                              <p className="text-electricBlue font-mono text-xs mb-4 tracking-widest">/// PROMPT DATA REVEALED</p>
                              <p className="font-mono text-base md:text-xl text-gray-300 mb-8 border-l-2 border-signalOrange pl-6 leading-relaxed italic">
                                  "Cinematic wide shot of a cyberpunk detective standing in neon rain, 35mm anamorphic lens, Blade Runner 2049 aesthetic, high contrast, volumetric fog..."
                              </p>
                              <div className="flex flex-wrap gap-3 text-[10px] md:text-xs font-header text-white/70">
                                  <span className="border border-white/20 px-3 py-1 rounded-full hover:bg-electricBlue/20 hover:border-electricBlue transition-colors">GEMINI 3.0</span>
                                  <span className="border border-white/20 px-3 py-1 rounded-full hover:bg-electricBlue/20 hover:border-electricBlue transition-colors">NANO BANANO (3 PRO PREVIEW)</span>
                                  <span className="border border-white/20 px-3 py-1 rounded-full hover:bg-electricBlue/20 hover:border-electricBlue transition-colors">VEO 3.1</span>
                              </div>
                          </div>

                          {/* Title (Always Visible) */}
                          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                              <h3 className="font-header text-3xl md:text-5xl text-white mb-2 group-hover:text-electricBlue transition-colors duration-300">ECHO PROTOCOL</h3>
                              <p className="text-sm text-gray-400 font-mono tracking-wide border-l border-white/30 pl-3">Sci-Fi Short Film</p>
                          </div>
                      </div>

                      {/* Project 2 */}
                      <div className="group relative h-[450px] w-full glass-panel overflow-hidden cursor-pointer border border-white/5 hover:border-signalOrange/50 transition-all duration-500">
                          <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-30 transition-opacity duration-500"></div>
                          </div>
                          
                          <div className="absolute inset-0 bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center p-8 md:p-16">
                              <p className="text-signalOrange font-mono text-xs mb-4 tracking-widest">/// PROMPT DATA REVEALED</p>
                              <p className="font-mono text-base md:text-xl text-gray-300 mb-8 border-l-2 border-electricBlue pl-6 leading-relaxed italic">
                                  "Macro photography of liquid gold merging with obsidian rock, fluid dynamics simulation, 8k resolution, luxury commercial lighting..."
                              </p>
                              <div className="flex flex-wrap gap-3 text-[10px] md:text-xs font-header text-white/70">
                                  <span className="border border-white/20 px-3 py-1 rounded-full hover:bg-signalOrange/20 hover:border-signalOrange transition-colors">VEO 3.1 PHYSICS</span>
                                  <span className="border border-white/20 px-3 py-1 rounded-full hover:bg-signalOrange/20 hover:border-signalOrange transition-colors">MUSIC FX</span>
                              </div>
                          </div>

                          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                              <h3 className="font-header text-3xl md:text-5xl text-white mb-2 group-hover:text-signalOrange transition-colors duration-300">AURUM DYNAMICS</h3>
                              <p className="text-sm text-gray-400 font-mono tracking-wide border-l border-white/30 pl-3">Luxury Brand Commercial</p>
                          </div>
                      </div>

                  </div>
              </div>
          </section>
          {/* ACADEMY SECTION */}
          <section id="academy" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex justify-between items-end mb-12">
                  <div>
                      <p className="text-signalOrange font-mono text-xs mb-2 tracking-widest">/// KNOWLEDGE TRANSFER</p>
                      <h2 className="font-header text-4xl font-bold text-white">THE ACADEMY</h2>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Course 1 */}
                  <div className="glass-panel p-1 hover:border-electricBlue/50 transition-all duration-300 group cursor-pointer">
                      <div className="bg-gray-900 h-56 mb-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black"></div>
                          {/* Abstract course graphic */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                               <div className="w-24 h-24 rounded-full border border-electricBlue animate-pulse"></div>
                               <div className="w-16 h-16 rounded-full border border-white absolute"></div>
                          </div>
                          <div className="absolute bottom-4 left-4 font-header font-bold text-3xl text-white z-10">LEVEL 01</div>
                      </div>
                      <div className="px-6 pb-8">
                          <h3 className="font-header text-xl text-white mb-3 group-hover:text-electricBlue transition-colors leading-tight">MASTER THE GOOGLE ECOSYSTEM</h3>
                          <p className="text-sm text-gray-400 mb-6 leading-relaxed">The foundational course. Learn the connected workflow of Gemini, Nano Banano (Gemini 3 Pro Preview), and Veo.</p>
                          <div className="flex justify-between items-center border-t border-white/10 pt-4">
                              <span className="font-mono text-xs text-electricBlue bg-electricBlue/10 px-2 py-1 rounded">4.5 HOURS</span>
                              <span className="font-header font-bold text-xl text-white group-hover:text-electricBlue transition-colors">$149</span>
                          </div>
                      </div>
                  </div>

                  {/* Course 2 */}
                  <div className="glass-panel p-1 hover:border-signalOrange/50 transition-all duration-300 group cursor-pointer">
                      <div className="bg-gray-900 h-56 mb-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-black"></div>
                           {/* Abstract course graphic */}
                           <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                              <div className="w-24 h-24 border-2 border-signalOrange rotate-45 transform transition-transform group-hover:rotate-90 duration-700"></div>
                              <div className="w-24 h-24 border-2 border-white -rotate-45 absolute transform transition-transform group-hover:-rotate-90 duration-700"></div>
                         </div>
                          <div className="absolute bottom-4 left-4 font-header font-bold text-3xl text-white z-10">LEVEL 02</div>
                      </div>
                      <div className="px-6 pb-8">
                          <h3 className="font-header text-xl text-white mb-3 group-hover:text-signalOrange transition-colors leading-tight">ADVANCED AI CINEMATOGRAPHY</h3>
                          <p className="text-sm text-gray-400 mb-6 leading-relaxed">Mastering physics, compound camera moves, and the uncanny valley in Veo 3.1. Deep dive into motion control.</p>
                          <div className="flex justify-between items-center border-t border-white/10 pt-4">
                              <span className="font-mono text-xs text-signalOrange bg-signalOrange/10 px-2 py-1 rounded">6.0 HOURS</span>
                              <span className="font-header font-bold text-xl text-white group-hover:text-signalOrange transition-colors">$199</span>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* ASSET STORE & FOOTER CONTAINER */}
          <div className="bg-black border-t border-white/10 relative z-20">
              
              {/* ASSET STORE (Added Here) */}
              <div id="store" className="max-w-7xl mx-auto px-6 py-16 border-b border-white/10">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                      <div>
                          <p className="text-purple-500 font-mono text-xs mb-2 tracking-widest">/// RESOURCE LIBRARY</p>
                          <h2 className="font-header text-4xl font-bold text-white">ASSET STORE</h2>
                      </div>
                      <a href="#" className="text-xs font-header font-bold border-b border-purple-500 pb-1 hover:text-purple-500 transition-colors tracking-wider">VIEW ALL PACKS</a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Asset 1 */}
                      <div className="glass-panel p-6 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                          <div className="aspect-video bg-gray-800 mb-4 overflow-hidden relative">
                               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                               <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1">NEW</div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-1">CYBERPUNK TEXTURES VOL. 1</h3>
                          <p className="text-xs text-gray-500 font-mono mb-4">50+ Nano Banano Generated Surfaces</p>
                          <div className="flex justify-between items-center">
                              <span className="text-white font-bold">$29</span>
                              <span className="text-[10px] text-purple-400 group-hover:translate-x-1 transition-transform">GET PACK →</span>
                          </div>
                      </div>

                      {/* Asset 2 */}
                      <div className="glass-panel p-6 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                          <div className="aspect-video bg-gray-800 mb-4 overflow-hidden relative">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-1">SCI-FI CHARACTER SHEETS</h3>
                          <p className="text-xs text-gray-500 font-mono mb-4">Ready-to-use 'Ingredients' for Veo</p>
                          <div className="flex justify-between items-center">
                              <span className="text-white font-bold">$49</span>
                              <span className="text-[10px] text-purple-400 group-hover:translate-x-1 transition-transform">GET PACK →</span>
                          </div>
                      </div>

                      {/* Asset 3 */}
                      <div className="glass-panel p-6 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                          <div className="aspect-video bg-gray-800 mb-4 overflow-hidden relative">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-1">CINEMATIC LUTS PACK</h3>
                          <p className="text-xs text-gray-500 font-mono mb-4">Color grading for AI video output</p>
                          <div className="flex justify-between items-center">
                              <span className="text-white font-bold">$19</span>
                              <span className="text-[10px] text-purple-400 group-hover:translate-x-1 transition-transform">GET PACK →</span>
                          </div>
                      </div>
                  </div>
              </div>
              
          </div>
          <Footer />
      </div>
  );
}
