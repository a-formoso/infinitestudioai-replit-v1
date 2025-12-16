import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      {/* NAV (Minimal for Checkout) */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-electricBlue text-2xl">∞</span> INFINITE STUDIO
          </Link>
          <div className="flex gap-2 items-center text-[10px] font-mono text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> SECURE SSL ENCRYPTED
          </div>
        </div>
      </nav>

      {/* CHECKOUT CONTENT */}
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto z-10 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          
          {/* LEFT: ORDER SUMMARY */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="glass-panel p-8 sticky top-32">
              <h2 className="font-header text-lg text-white mb-6 border-b border-white/10 pb-4">ORDER SUMMARY</h2>
              
              {/* Product Card */}
              <div className="flex gap-4 mb-6">
                <div className="w-24 h-24 bg-gray-900 overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black"></div>
                  <div className="absolute bottom-2 left-2 font-header font-bold text-lg text-white z-10">01</div>
                </div>
                <div>
                  <h3 className="font-header text-sm text-white mb-1">MASTER THE GOOGLE ECOSYSTEM</h3>
                  <p className="text-xs text-gray-400 font-mono mb-2">Level 01 Certification</p>
                  <span className="font-header font-bold text-electricBlue">$149.00</span>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3 border-t border-white/10 pt-6 mb-6 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$149.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (Estimated)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-4 border-t border-white/10 mt-4">
                  <span>TOTAL DUE</span>
                  <span>$149.00</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/5 p-4 rounded text-center space-y-2">
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Guaranteed Safe Checkout</div>
                <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                  {/* Placeholder Credit Card Icons */}
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                </div>
              </div>
              
              {/* Testimonial Mini */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-400 italic mb-2">"The only AI course that actually teaches you how to direct, not just prompt."</p>
                <p className="text-[10px] font-header text-electricBlue">- SARAH J., FILMMAKER</p>
              </div>
            </div>
          </div>

          {/* RIGHT: PAYMENT DETAILS */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="glass-panel p-8 md:p-12">
              <h1 className="font-header text-2xl text-white mb-8">COMPLETE ENROLLMENT</h1>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Email Section */}
                <div>
                  <label className="block text-xs font-header text-gray-400 mb-2">ACCOUNT EMAIL</label>
                  <input 
                    type="email" 
                    placeholder="director@studio.com" 
                    required 
                    className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                  />
                </div>

                {/* Card Section */}
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-xs font-header text-gray-400 mb-4">PAYMENT METHOD</label>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">CARD NUMBER</label>
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        className="font-mono w-full bg-black/50 border border-white/10 text-white p-4 text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-1">EXPIRY</label>
                        <input 
                          type="text" 
                          placeholder="MM / YY" 
                          className="font-mono w-full bg-black/50 border border-white/10 text-white p-4 text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-1">CVC</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          className="font-mono w-full bg-black/50 border border-white/10 text-white p-4 text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">CARDHOLDER NAME</label>
                      <input 
                        type="text" 
                        placeholder="ALEX SMITH"
                        className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-electricBlue text-white font-header font-bold text-sm uppercase py-5 hover:bg-white hover:text-black transition-all duration-300 tracking-wider shadow-[0_0_30px_rgba(41,98,255,0.3)] mt-8">
                  Pay $149.00 & Access Course
                </button>
                
                <p className="text-[10px] text-center text-gray-500 mt-4">
                  By clicking the button above, you agree to our <a href="#" className="text-electricBlue underline">Terms of Service</a> and <a href="#" className="text-electricBlue underline">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER (Minimal) */}
      <footer className="bg-black border-t border-white/10 py-8 text-center relative z-20">
        <div className="text-[10px] text-gray-600 font-mono">
          © 2025 INFINITE STUDIO. SECURE PAYMENT PROCESSING.
        </div>
      </footer>
    </div>
  );
}