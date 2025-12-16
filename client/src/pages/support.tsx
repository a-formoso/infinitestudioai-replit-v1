import { Link } from "wouter";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Plus, Search } from "lucide-react";

export default function Support() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden flex flex-col">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-electricBlue text-2xl">∞</span> INFINITE STUDIO
          </Link>
          <Link href="/" className="text-xs font-header font-bold text-gray-500 hover:text-white transition-colors">BACK TO STUDIO</Link>
        </div>
      </nav>

      {/* HEADER */}
      <header className="pt-32 pb-12 px-6 max-w-4xl mx-auto z-10 text-center w-full">
        <h1 className="font-header text-3xl md:text-5xl font-bold text-white mb-6">SYSTEM SUPPORT</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <input 
            type="text" 
            placeholder="SEARCH KNOWLEDGE BASE..." 
            className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-xs font-mono text-white focus:outline-none focus:border-electricBlue focus:bg-black/50 transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-electricBlue">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* FAQ GRID */}
      <main className="flex-grow pb-20 px-6 max-w-7xl mx-auto w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: ACADEMY FAQs */}
        <div className="space-y-8">
          <h2 className="font-header text-lg text-white border-b border-white/10 pb-4 flex justify-between items-center">
            ACADEMY & COURSES
            <span className="text-[10px] text-electricBlue font-mono">LEVEL 01</span>
          </h2>

          <div className="space-y-4">
            
            {/* Item 1 */}
            <div 
              className={`glass-panel p-6 cursor-pointer group hover:border-white/30 transition-colors ${activeFaq === 1 ? 'border-electricBlue/50' : ''}`} 
              onClick={() => toggleFaq(1)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-white pr-8">Is Veo 3.1 included in the course price?</h3>
                <Plus className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === 1 ? 'rotate-45 text-electricBlue' : ''}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === 1 ? 'max-h-[200px] mt-4' : 'max-h-0'}`}>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  No. We teach you how to use Veo 3.1, but the tool itself requires a separate subscription from Google (Google One AI Premium or Workspace). We guide you through the setup process in Module 1.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div 
              className={`glass-panel p-6 cursor-pointer group hover:border-white/30 transition-colors ${activeFaq === 2 ? 'border-electricBlue/50' : ''}`} 
              onClick={() => toggleFaq(2)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-white pr-8">Do I need a powerful PC?</h3>
                <Plus className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === 2 ? 'rotate-45 text-electricBlue' : ''}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === 2 ? 'max-h-[200px] mt-4' : 'max-h-0'}`}>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  Not necessarily. Since Gemini and Veo are cloud-based tools, you can run them on any modern laptop (Mac or PC) with a good internet connection. However, for post-production (editing/color grading), a decent machine is recommended.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div 
              className={`glass-panel p-6 cursor-pointer group hover:border-white/30 transition-colors ${activeFaq === 3 ? 'border-electricBlue/50' : ''}`} 
              onClick={() => toggleFaq(3)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-white pr-8">Is this suitable for beginners?</h3>
                <Plus className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === 3 ? 'rotate-45 text-electricBlue' : ''}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === 3 ? 'max-h-[200px] mt-4' : 'max-h-0'}`}>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  Yes. Level 1 (Master the Ecosystem) starts from zero. We assume no prior knowledge of AI or filmmaking. Level 2 (Advanced Cinematography) requires Level 1 completion or a portfolio review.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: STUDIO & BILLING */}
        <div className="space-y-8">
          <h2 className="font-header text-lg text-white border-b border-white/10 pb-4 flex justify-between items-center">
            SERVICES & BILLING
            <span className="text-[10px] text-signalOrange font-mono">LEVEL 02</span>
          </h2>

          <div className="space-y-4">
            
            {/* Item 4 */}
            <div 
              className={`glass-panel p-6 cursor-pointer group hover:border-white/30 transition-colors ${activeFaq === 4 ? 'border-electricBlue/50' : ''}`} 
              onClick={() => toggleFaq(4)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-white pr-8">How do I hire the studio?</h3>
                <Plus className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === 4 ? 'rotate-45 text-electricBlue' : ''}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === 4 ? 'max-h-[200px] mt-4' : 'max-h-0'}`}>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  Visit our <Link href="/hire" className="text-white underline">Services Page</Link> and fill out the inquiry form. We typically respond within 24 hours to schedule a discovery call. Our minimum engagement starts at $5k.
                </p>
              </div>
            </div>

            {/* Item 5 */}
            <div 
              className={`glass-panel p-6 cursor-pointer group hover:border-white/30 transition-colors ${activeFaq === 5 ? 'border-electricBlue/50' : ''}`} 
              onClick={() => toggleFaq(5)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-white pr-8">What is the refund policy?</h3>
                <Plus className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeFaq === 5 ? 'rotate-45 text-electricBlue' : ''}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === 5 ? 'max-h-[200px] mt-4' : 'max-h-0'}`}>
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  We offer a 30-day money-back guarantee for all self-paced courses if you have completed less than 30% of the content. Digital Asset downloads (textures, prompts) are non-refundable due to their nature.
                </p>
              </div>
            </div>

          </div>

          {/* CONTACT CARD */}
          <div className="glass-panel p-8 border border-white/20 mt-12">
            <h3 className="font-header text-lg text-white mb-2">STILL NEED HELP?</h3>
            <p className="text-xs text-gray-400 font-mono mb-6">Our support team is online.</p>
            <a href="mailto:support@infinitestudio.ai" className="block w-full bg-white text-black text-center py-3 text-xs font-header font-bold uppercase hover:bg-electricBlue hover:text-white transition-all">
              Open Support Ticket
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}