import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

export default function CourseLevel1() {
  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      {/* HERO */}
      <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-8">
                  <div className="inline-block border border-electricBlue/50 px-3 py-1 mb-6 text-[10px] font-mono text-electricBlue tracking-widest">
                      COURSE LEVEL 01 // FOUNDATION
                  </div>
                  <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                      MASTER THE GOOGLE<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-white">FILMMAKING ECOSYSTEM</span>
                  </h1>
                  <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-light">
                      Stop using fragmented tools. Learn to run a complete Hollywood-style studio from your browser using the integrated power of Gemini 3.0, Nano Banano, and Veo.
                  </p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-end">
                  <div className="glass-panel p-6 space-y-4">
                      <div className="flex justify-between text-sm font-mono text-gray-400 border-b border-white/10 pb-2">
                          <span>DURATION</span>
                          <span className="text-white">4.5 HOURS</span>
                      </div>
                      <div className="flex justify-between text-sm font-mono text-gray-400 border-b border-white/10 pb-2">
                          <span>SKILL LEVEL</span>
                          <span className="text-white">BEGINNER / INTERMEDIATE</span>
                      </div>
                      <div className="flex justify-between text-sm font-mono text-gray-400 pb-2">
                          <span>ASSETS INCLUDED</span>
                          <span className="text-white">YES</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>

      {/* CURRICULUM GRID */}
      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
              <h2 className="font-header text-2xl text-white mb-12 border-l-4 border-electricBlue pl-4">CURRICULUM</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Module 1 */}
                  <div className="glass-panel p-8 hover:border-electricBlue/30 transition-colors group">
                      <span className="text-4xl font-header text-white/10 group-hover:text-electricBlue/20 transition-colors">01</span>
                      <h3 className="font-header text-xl text-white mt-4 mb-2">THE WRITER'S ROOM</h3>
                      <p className="text-sm text-gray-400 mb-4">Tool: Gemini 3.0 Thinking</p>
                      <ul className="space-y-2 text-xs text-gray-300 font-mono list-disc list-inside">
                          <li>The Multimodal Script: Writing with images</li>
                          <li>Context is King: 2M Token Window</li>
                          <li>The Visual Bible generation</li>
                      </ul>
                  </div>

                  {/* Module 2 */}
                  <div className="glass-panel p-8 hover:border-electricBlue/30 transition-colors group">
                      <span className="text-4xl font-header text-white/10 group-hover:text-electricBlue/20 transition-colors">02</span>
                      <h3 className="font-header text-xl text-white mt-4 mb-2">THE ART DEPT</h3>
                      <p className="text-sm text-gray-400 mb-4">Tool: Nano Banano (Gemini 2.5 Flash)</p>
                      <ul className="space-y-2 text-xs text-gray-300 font-mono list-disc list-inside">
                          <li>Casting & The "Turnaround" Sheet</li>
                          <li>Virtual Set Design & Inpainting</li>
                          <li>Prop Fabrication (Legible Text)</li>
                      </ul>
                  </div>

                  {/* Module 3 */}
                  <div className="glass-panel p-8 hover:border-electricBlue/30 transition-colors group">
                      <span className="text-4xl font-header text-white/10 group-hover:text-electricBlue/20 transition-colors">03</span>
                      <h3 className="font-header text-xl text-white mt-4 mb-2">PRINCIPAL PHOTOGRAPHY</h3>
                      <p className="text-sm text-gray-400 mb-4">Tool: Veo 3.1</p>
                      <ul className="space-y-2 text-xs text-gray-300 font-mono list-disc list-inside">
                          <li>The "Ingredients" Workflow (Consistency)</li>
                          <li>The "Sandwich" Technique (Frames-to-Video)</li>
                          <li>Camera Directing (Truck, Pan, Roll)</li>
                      </ul>
                  </div>

                  {/* Module 4 */}
                  <div className="glass-panel p-8 hover:border-electricBlue/30 transition-colors group">
                      <span className="text-4xl font-header text-white/10 group-hover:text-electricBlue/20 transition-colors">04</span>
                      <h3 className="font-header text-xl text-white mt-4 mb-2">THE SOUNDSTAGE</h3>
                      <p className="text-sm text-gray-400 mb-4">Tool: MusicFX</p>
                      <ul className="space-y-2 text-xs text-gray-300 font-mono list-disc list-inside">
                          <li>Generative Scoring & Stem Separation</li>
                          <li>Foley & SFX Synchronization</li>
                          <li>Final Assembly in Google Vids</li>
                      </ul>
                  </div>

              </div>
          </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 text-center px-6">
          <h2 className="font-header text-3xl md:text-4xl text-white mb-8">START YOUR STUDIO TODAY</h2>
          <button className="bg-electricBlue text-white font-header font-bold text-sm uppercase px-12 py-5 hover:bg-white hover:text-black transition-all duration-300 tracking-wider shadow-[0_0_30px_rgba(41,98,255,0.3)]">
              Secure Your Seat - $149
          </button>
          <p className="text-xs text-gray-500 mt-6 font-mono">INSTANT ACCESS • LIFETIME UPDATES • COMMUNITY DISCORD</p>
      </section>

      <Footer />
    </div>
  );
}
