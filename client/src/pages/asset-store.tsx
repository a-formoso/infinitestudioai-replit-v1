import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AssetStore() {
  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-neonPurple selection:text-white overflow-x-hidden">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      {/* HERO */}
      <header className="relative pt-40 pb-12 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-block border border-neonPurple/50 px-3 py-1 mb-6 text-[10px] font-mono text-neonPurple tracking-widest uppercase">
          Official Studio Assets
        </div>
        <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          THE INGREDIENT<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-blue-500">LIBRARY</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Production-ready assets for Veo 3.1 & Nano Banana. High-fidelity character sheets, textures, and sound profiles pre-optimized for AI ingestion.
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-black border-white px-6 py-2 rounded-full text-xs font-header font-bold hover:bg-white/10 hover:text-white border transition-all">ALL</button>
          <button className="border border-white/20 px-6 py-2 rounded-full text-xs font-header font-bold hover:bg-white/10 transition-all">CHARACTER SHEETS</button>
          <button className="border border-white/20 px-6 py-2 rounded-full text-xs font-header font-bold hover:bg-white/10 transition-all">TEXTURES</button>
          <button className="border border-white/20 px-6 py-2 rounded-full text-xs font-header font-bold hover:bg-white/10 transition-all">AUDIO / SFX</button>
          <button className="border border-white/20 px-6 py-2 rounded-full text-xs font-header font-bold hover:bg-white/10 transition-all">PROMPTS</button>
        </div>
      </header>

      {/* STORE GRID */}
      <section className="py-12 bg-black/50 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product 1: Character Pack */}
            <div className="glass-panel p-0 group cursor-pointer hover:border-neonPurple/50 transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/9] bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"></div>
                <div className="absolute top-4 left-4 bg-neonPurple text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">Bestseller</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-header text-lg text-white group-hover:text-neonPurple transition-colors">SCI-FI CHARACTERS VOL. 1</h3>
                  <span className="font-mono text-white">$49</span>
                </div>
                <p className="text-xs text-gray-400 font-mono mb-4 border-b border-white/10 pb-4">50+ Consistent Character Sheets (Front/Side/45) ready for Veo Ingredients.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 font-header">PNG + PROMPT JSON</span>
                  <button className="text-xs font-bold text-white hover:text-neonPurple transition-colors flex items-center gap-1">
                    ADD TO CART <span>+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 2: Texture Pack */}
            <div className="glass-panel p-0 group cursor-pointer hover:border-electricBlue/50 transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/9] bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"></div>
                <div className="absolute top-4 left-4 bg-electricBlue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">New</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-header text-lg text-white group-hover:text-electricBlue transition-colors">NEON NOIR TEXTURES</h3>
                  <span className="font-mono text-white">$29</span>
                </div>
                <p className="text-xs text-gray-400 font-mono mb-4 border-b border-white/10 pb-4">100+ High-Res Cyberpunk environment textures generated with Nano Banana.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 font-header">4K JPG</span>
                  <button className="text-xs font-bold text-white hover:text-electricBlue transition-colors flex items-center gap-1">
                    ADD TO CART <span>+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 3: Audio Pack */}
            <div className="glass-panel p-0 group cursor-pointer hover:border-signalOrange/50 transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/9] bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-header text-lg text-white group-hover:text-signalOrange transition-colors">CINEMATIC SFX PACK</h3>
                  <span className="font-mono text-white">$19</span>
                </div>
                <p className="text-xs text-gray-400 font-mono mb-4 border-b border-white/10 pb-4">Pre-mixed Foley stems for Sci-Fi films. Impacts, Risers, and Ambience.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 font-header">WAV / MP3</span>
                  <button className="text-xs font-bold text-white hover:text-signalOrange transition-colors flex items-center gap-1">
                    ADD TO CART <span>+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 4: Prompt Library */}
            <div className="glass-panel p-0 group cursor-pointer hover:border-white/50 transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/9] bg-gray-900 relative overflow-hidden flex items-center justify-center">
                <div className="font-mono text-xs text-green-500 opacity-70 p-8 leading-relaxed">
                  &gt; PROMPT: Cinematic wide...<br />
                  &gt; LENS: 35mm Anamorphic...<br />
                  &gt; LIGHT: Volumetric Fog...
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-header text-lg text-white group-hover:text-gray-300 transition-colors">MASTER PROMPT LIBRARY</h3>
                  <span className="font-mono text-white">$39</span>
                </div>
                <p className="text-xs text-gray-400 font-mono mb-4 border-b border-white/10 pb-4">500+ Curated Prompts for Veo 3.1 and Midjourney. Copy/Paste ready.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 font-header">PDF / NOTION</span>
                  <button className="text-xs font-bold text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                    ADD TO CART <span>+</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}