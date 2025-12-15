import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

export default function CourseLevel2() {
  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-signalOrange selection:text-white overflow-x-hidden">
      
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      {/* HERO */}
      <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-8">
                  <div className="inline-block border border-signalOrange/50 px-3 py-1 mb-6 text-[10px] font-mono text-signalOrange tracking-widest">
                      COURSE LEVEL 02 // ADVANCED
                  </div>
                  <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                      ADVANCED AI<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-500">CINEMATOGRAPHY</span>
                  </h1>
                  <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-light">
                      You know how to generate. Now learn how to direct. Master the physics engine, compound camera moves, and the "Invisible Cut" in Veo 3.1.
                  </p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-end">
                  <div className="glass-panel p-6 space-y-4 border-signalOrange/20">
                      <div className="flex justify-between text-sm font-mono text-gray-400 border-b border-white/10 pb-2">
                          <span>DURATION</span>
                          <span className="text-white">6.0 HOURS</span>
                      </div>
                      <div className="flex justify-between text-sm font-mono text-gray-400 border-b border-white/10 pb-2">
                          <span>SKILL LEVEL</span>
                          <span className="text-white">ADVANCED / PRO</span>
                      </div>
                      <div className="flex justify-between text-sm font-mono text-gray-400 pb-2">
                          <span>PREREQUISITE</span>
                          <span className="text-white">LEVEL 01 OR EQUIV.</span>
                      </div>
                  </div>
              </div>
          </div>
      </header>

      {/* CURRICULUM GRID */}
      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
              <h2 className="font-header text-2xl text-white mb-12 border-l-4 border-signalOrange pl-4">DEEP DIVE MODULES</h2>
              
              <div className="space-y-6">
                  
                  {/* Module 1 */}
                  <div className="glass-panel p-8 hover:border-signalOrange/30 transition-colors group grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="col-span-1 md:col-span-2 text-5xl font-header text-white/10 group-hover:text-signalOrange/20">01</div>
                      <div className="col-span-1 md:col-span-4">
                          <h3 className="font-header text-xl text-white">THE PHYSICS ENGINE</h3>
                          <p className="text-xs text-signalOrange font-mono mt-1">CONTROLLING MASS & GRAVITY</p>
                      </div>
                      <div className="col-span-1 md:col-span-6 text-sm text-gray-400">
                          The "Uncanny Valley" of motion. How to prompt for weight, fluid dynamics, crash physics, and momentum so objects don't float.
                      </div>
                  </div>

                  {/* Module 2 */}
                  <div className="glass-panel p-8 hover:border-signalOrange/30 transition-colors group grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="col-span-1 md:col-span-2 text-5xl font-header text-white/10 group-hover:text-signalOrange/20">02</div>
                      <div className="col-span-1 md:col-span-4">
                          <h3 className="font-header text-xl text-white">ADVANCED CAMERA</h3>
                          <p className="text-xs text-signalOrange font-mono mt-1">COMPOUND MOVES</p>
                      </div>
                      <div className="col-span-1 md:col-span-6 text-sm text-gray-400">
                          Beyond the Pan. Executing the "Dolly Zoom" (Vertigo Effect), Rack Focus, and Parallax shifts to force 3D depth perception.
                      </div>
                  </div>

                  {/* Module 3 */}
                  <div className="glass-panel p-8 hover:border-signalOrange/30 transition-colors group grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="col-span-1 md:col-span-2 text-5xl font-header text-white/10 group-hover:text-signalOrange/20">03</div>
                      <div className="col-span-1 md:col-span-4">
                          <h3 className="font-header text-xl text-white">COMPLEX ACTING</h3>
                          <p className="text-xs text-signalOrange font-mono mt-1">TIMESTAMP PROMPTING</p>
                      </div>
                      <div className="col-span-1 md:col-span-6 text-sm text-gray-400">
                          Directing micro-expressions. Using brackets [0:02] to sequence actions. Advanced "Ingredients" workflow for 10+ shot consistency.
                      </div>
                  </div>

                  {/* Module 4 */}
                  <div className="glass-panel p-8 hover:border-signalOrange/30 transition-colors group grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="col-span-1 md:col-span-2 text-5xl font-header text-white/10 group-hover:text-signalOrange/20">04</div>
                      <div className="col-span-1 md:col-span-4">
                          <h3 className="font-header text-xl text-white">THE INVISIBLE CUT</h3>
                          <p className="text-xs text-signalOrange font-mono mt-1">SEAMLESS EDITING</p>
                      </div>
                      <div className="col-span-1 md:col-span-6 text-sm text-gray-400">
                          Match cuts, masking, and the "Veo Bridge" technique to stitch two completely different generations into a continuous long take.
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 text-center px-6">
          <h2 className="font-header text-3xl md:text-4xl text-white mb-8">BREAK THE SIMULATION</h2>
          <button className="bg-signalOrange text-black font-header font-bold text-sm uppercase px-12 py-5 hover:bg-white transition-all duration-300 tracking-wider shadow-[0_0_30px_rgba(255,61,0,0.3)]">
              Start Advanced Training - $199
          </button>
          <p className="text-xs text-gray-500 mt-6 font-mono">INCLUDES 'PHYSICS OF DREAMS' EBOOK • PROMPT LIBRARY ACCESS</p>
      </section>

      <Footer />
    </div>
  );
}
