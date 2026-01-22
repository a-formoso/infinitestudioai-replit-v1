import { Footer } from "@/components/footer";
import { Link } from "wouter";
import { Video, Music, Film, ChevronRight } from "lucide-react";

export default function Hire() {
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
          <a href="#contact" className="hidden md:block bg-white text-black px-6 py-2 text-xs font-header font-bold uppercase hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider">
            Book a Call
          </a>
        </div>
      </nav>

      {/* HERO HEADER */}
      <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-block border border-white/20 px-3 py-1 mb-6 text-[10px] font-mono text-gray-400 tracking-widest uppercase">
          Production Services
        </div>
        <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          WE BUILD WORLDS<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-cyan-400">FASTER THAN REALITY</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Full-service AI production. We combine traditional filmmaking discipline with next-generation generative models to deliver cinematic results at 10x speed.
        </p>
      </header>

      {/* SERVICES GRID */}
      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="glass-panel p-8 hover:border-electricBlue/50 transition-all duration-300 group">
              <div className="h-12 w-12 bg-blue-900/30 rounded flex items-center justify-center text-electricBlue mb-6 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-header text-lg text-white mb-4">COMMERCIAL PRODUCTION</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">High-end TVC and Social spots generated entirely in Veo 3.1. Photorealistic product visualization without the physical shoot.</p>
              <ul className="space-y-2 text-xs text-gray-500 font-mono border-t border-white/10 pt-4">
                <li>• AI Storyboarding</li>
                <li>• Custom Sound Design</li>
                <li>• 4K Upscaling</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="glass-panel p-8 hover:border-signalOrange/50 transition-all duration-300 group">
              <div className="h-12 w-12 bg-orange-900/30 rounded flex items-center justify-center text-signalOrange mb-6 group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-header text-lg text-white mb-4">MUSIC VIDEOS</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">Abstract, narrative, or performance-based visuals synced perfectly to your track. We create aesthetics that traditional cameras can't capture.</p>
              <ul className="space-y-2 text-xs text-gray-500 font-mono border-t border-white/10 pt-4">
                <li>• Audio-Reactive Visuals</li>
                <li>• Style Transfer</li>
                <li>• Lyric Videos</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="glass-panel p-8 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="h-12 w-12 bg-purple-900/30 rounded flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="font-header text-lg text-white mb-4">PRE-VISUALIZATION</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">For traditional directors. We turn your script into a fully animated "Rip-O-Matic" so you can sell your vision to studios before rolling camera.</p>
              <ul className="space-y-2 text-xs text-gray-500 font-mono border-t border-white/10 pt-4">
                <li>• Script-to-Animatic</li>
                <li>• Lighting Studies</li>
                <li>• Set Design Concept Art</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-panel p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="font-header text-2xl text-white mb-2">START A PROJECT</h2>
              <p className="text-sm text-gray-400 font-mono">Tell us about your vision. We respond within 24 hours.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-header text-gray-400 mb-2">NAME</label>
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-header text-gray-400 mb-2">EMAIL</label>
                  <input 
                    type="email" 
                    placeholder="EMAIL@ADDRESS.COM"
                    className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-header text-gray-400 mb-2">PROJECT TYPE</label>
                  <select className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)] appearance-none">
                    <option>Commercial / Ad</option>
                    <option>Music Video</option>
                    <option>Pre-Visualization</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-header text-gray-400 mb-2">BUDGET RANGE</label>
                  <select className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)] appearance-none">
                    <option>$1k - $5k</option>
                    <option>$5k - $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-header text-gray-400 mb-2">PROJECT DETAILS</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about the concept, timeline, and deliverables..."
                  className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-white text-black font-header font-bold text-sm uppercase py-5 hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.1)] mt-4">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}