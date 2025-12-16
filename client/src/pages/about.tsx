import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-electricBlue text-2xl">∞</span> INFINITE STUDIO
          </Link>
          <Link href="/hire" className="hidden md:block border border-white/20 text-white px-6 py-2 text-xs font-header font-bold uppercase hover:bg-white hover:text-black transition-all duration-300 tracking-wider">
            Work With Us
          </Link>
        </div>
      </nav>

      {/* HERO HEADER */}
      <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-block border border-white/20 px-3 py-1 mb-6 text-[10px] font-mono text-gray-400 tracking-widest uppercase">
          The Manifesto
        </div>
        <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
          WE ARE THE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-cyan-400">ENGINE ROOM</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
          Infinite Studio exists to bridge the gap between traditional cinema and generative AI. We believe the future of storytelling belongs to those who can direct the algorithm, not just prompt it.
        </p>
      </header>

      {/* CONTENT SECTION */}
      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image */}
          <div className="glass-panel p-2 rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[4/5] bg-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-header text-2xl text-white mb-4">THE MISSION</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                For decades, high-end visual storytelling was gated by budget. You needed a million dollars to show a cyberpunk city or a space battle.
                <br /><br />
                Today, you need a laptop and a vision. But the tools are complex. They change daily. That's where we come in. We decode the chaos of AI research papers and turn them into actionable filmmaking workflows.
              </p>
            </div>

            <div>
              <h2 className="font-header text-2xl text-white mb-4">THE FOUNDER</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                <strong className="text-white">ALEX DIRECTOR</strong><br />
                Lead Cinematographer & Educator
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Alex spent 10 years in traditional VFX pipelines before pivoting to Generative AI. His work focuses on "Character Consistency" and "Physics Simulation," solving the two hardest problems in AI video.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 flex gap-12">
              <div>
                <div className="font-header text-3xl text-electricBlue font-bold">5K+</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">Students Trained</div>
              </div>
              <div>
                <div className="font-header text-3xl text-signalOrange font-bold">10M+</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">Views Generated</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}