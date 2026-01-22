import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/mentorship/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, tier: "studio_lot" }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Failed to join waitlist");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-obsidian border border-white/20 p-8 max-w-md w-full z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          data-testid="button-close-waitlist-modal"
        >
          ×
        </button>
        
        {success ? (
          <div className="text-center py-8">
            <div className="text-electricBlue text-4xl mb-4">✓</div>
            <h3 className="font-header text-xl text-white mb-2">You're on the list!</h3>
            <p className="text-sm text-gray-400">We'll notify you when spots open up for The Studio Lot.</p>
          </div>
        ) : (
          <>
            <h3 className="font-header text-xl text-white mb-2">JOIN THE WAITLIST</h3>
            <p className="text-xs text-gray-400 font-mono mb-6">The Studio Lot · $99/mo</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 font-mono mb-2">NAME (OPTIONAL)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white text-sm focus:border-electricBlue focus:outline-none"
                  placeholder="Your name"
                  data-testid="input-waitlist-name"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-mono mb-2">EMAIL *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white text-sm focus:border-electricBlue focus:outline-none"
                  placeholder="your@email.com"
                  data-testid="input-waitlist-email"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-electricBlue text-white px-6 py-3 text-xs font-header font-bold uppercase hover:bg-blue-600 transition-all disabled:opacity-50"
                data-testid="button-submit-waitlist"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ApplicationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    experience: "",
    goals: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/mentorship/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Failed to submit application");
    }
    setIsSubmitting(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-obsidian border border-yellow-500/30 p-8 max-w-lg w-full z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          data-testid="button-close-apply-modal"
        >
          ×
        </button>
        
        {success ? (
          <div className="text-center py-8">
            <div className="text-yellow-500 text-4xl mb-4">✓</div>
            <h3 className="font-header text-xl text-white mb-2">Application Submitted!</h3>
            <p className="text-sm text-gray-400">We'll review your application and get back to you within 48 hours.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-header text-xl text-white">EXECUTIVE PRODUCER</h3>
                <p className="text-xs text-yellow-500 font-mono">Application · Step {step} of 3</p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-1 ${s <= step ? "bg-yellow-500" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
            
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-2">YOUR NAME *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none"
                    placeholder="Full name"
                    data-testid="input-apply-name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-2">EMAIL *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none"
                    placeholder="your@email.com"
                    data-testid="input-apply-email"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-2">PORTFOLIO / WEBSITE (OPTIONAL)</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none"
                    placeholder="https://yourportfolio.com"
                    data-testid="input-apply-portfolio"
                  />
                </div>
                <button
                  onClick={nextStep}
                  disabled={!formData.name || !formData.email}
                  className="w-full bg-yellow-500 text-black px-6 py-3 text-xs font-header font-bold uppercase hover:bg-yellow-400 transition-all disabled:opacity-50"
                  data-testid="button-apply-next-1"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-2">YOUR EXPERIENCE *</label>
                  <p className="text-[10px] text-gray-500 mb-2">Tell us about your background in filmmaking, AI tools, or creative work.</p>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none resize-none"
                    placeholder="I've been working with..."
                    data-testid="input-apply-experience"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="flex-1 border border-white/20 text-white px-6 py-3 text-xs font-header font-bold uppercase hover:bg-white/10 transition-all"
                    data-testid="button-apply-back-2"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!formData.experience}
                    className="flex-1 bg-yellow-500 text-black px-6 py-3 text-xs font-header font-bold uppercase hover:bg-yellow-400 transition-all disabled:opacity-50"
                    data-testid="button-apply-next-2"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-2">YOUR GOALS *</label>
                  <p className="text-[10px] text-gray-500 mb-2">What do you hope to achieve with Executive Producer mentorship?</p>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none resize-none"
                    placeholder="My goals are..."
                    data-testid="input-apply-goals"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="flex-1 border border-white/20 text-white px-6 py-3 text-xs font-header font-bold uppercase hover:bg-white/10 transition-all"
                    data-testid="button-apply-back-3"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.goals || isSubmitting}
                    className="flex-1 bg-yellow-500 text-black px-6 py-3 text-xs font-header font-bold uppercase hover:bg-yellow-400 transition-all disabled:opacity-50"
                    data-testid="button-submit-application"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Mentorship() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showApplication, setShowApplication] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
      <Navbar />

      <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-block border border-yellow-500/50 px-3 py-1 mb-6 text-[10px] font-mono text-yellow-500 tracking-widest uppercase animate-pulse">
          Accepting Applications for Q1 2026
        </div>
        <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          THE INNER<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">CIRCLE</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Direct access to Alex Director. Weekly critique sessions, career strategy, and advanced "Beta" workflows not available in the public courses.
        </p>
      </header>

      <section className="py-20 border-t border-white/10 bg-black/50 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="glass-panel p-8 hover:border-white/30 transition-all duration-300 group relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-header font-bold text-white">01</div>
            <h3 className="font-header text-2xl text-white mb-2">THE STUDIO LOT</h3>
            <p className="text-xs font-mono text-gray-500 mb-8 uppercase tracking-widest">Group Coaching Program</p>
            
            <ul className="space-y-4 mb-8 text-sm text-gray-300">
              <li className="flex gap-3"><span className="text-electricBlue">✓</span> Bi-Weekly Live Q&A Calls</li>
              <li className="flex gap-3"><span className="text-electricBlue">✓</span> Access to "WIP" Feedback Channel</li>
              <li className="flex gap-3"><span className="text-electricBlue">✓</span> Early Access to New Asset Packs</li>
              <li className="flex gap-3"><span className="text-electricBlue">✓</span> Guest lectures from Industry Pros</li>
            </ul>

            <div className="flex justify-between items-end border-t border-white/10 pt-6">
              <div>
                <span className="block text-xs text-gray-500 font-mono mb-1">MEMBERSHIP</span>
                <span className="text-2xl font-header font-bold text-white">$99<span className="text-sm font-normal text-gray-500">/mo</span></span>
              </div>
              <button 
                onClick={() => setShowWaitlist(true)}
                data-testid="button-join-waitlist"
                className="border border-white/20 text-white px-6 py-3 text-xs font-header font-bold uppercase hover:bg-electricBlue hover:border-electricBlue transition-all"
              >
                Join Waitlist
              </button>
            </div>
          </div>

          <div className="glass-panel p-8 border-yellow-500/30 shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:border-yellow-500 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all duration-300 group relative transform md:scale-105 bg-black/80">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 text-[10px] font-header font-bold uppercase tracking-wider">
              Limited to 5 Spots
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-header font-bold text-yellow-500">02</div>
            
            <h3 className="font-header text-2xl text-white mb-2">EXECUTIVE PRODUCER</h3>
            <p className="text-xs font-mono text-yellow-500 mb-8 uppercase tracking-widest">1-on-1 Mentorship</p>
            
            <ul className="space-y-4 mb-8 text-sm text-gray-300">
              <li className="flex gap-3"><span className="text-yellow-500">✓</span> Weekly 1-on-1 Strategy Calls (Zoom)</li>
              <li className="flex gap-3"><span className="text-yellow-500">✓</span> Direct Line (Slack/WhatsApp) Access</li>
              <li className="flex gap-3"><span className="text-yellow-500">✓</span> "Done For You" Career Roadmap</li>
              <li className="flex gap-3"><span className="text-yellow-500">✓</span> Personal Intro to Agency Clients</li>
            </ul>

            <div className="flex justify-between items-end border-t border-white/10 pt-6">
              <div>
                <span className="block text-xs text-gray-500 font-mono mb-1">INVESTMENT</span>
                <span className="text-2xl font-header font-bold text-white">$1,500<span className="text-sm font-normal text-gray-500">/mo</span></span>
              </div>
              <button 
                onClick={() => setShowApplication(true)}
                data-testid="button-apply-now"
                className="bg-yellow-500 text-black px-6 py-3 text-xs font-header font-bold uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)]"
              >
                Apply Now
              </button>
            </div>
          </div>

        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-header text-xl text-white mb-12">SUCCESS STORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 text-left">
              <p className="text-sm text-gray-400 italic mb-6">"Before the Inner Circle, I was just making cool clips. Alex helped me package my skills into a service. I closed my first $5k client within 3 weeks of mentorship."</p>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                <div>
                  <p className="text-xs font-bold text-white">MARCUS T.</p>
                  <p className="text-[10px] text-electricBlue font-mono">FREELANCE DIRECTOR</p>
                </div>
              </div>
            </div>
            <div className="glass-panel p-8 text-left">
              <p className="text-sm text-gray-400 italic mb-6">"The technical feedback is unmatched. Alex spotted a lighting inconsistency in my Veo workflow that I had missed for months. Instant level up."</p>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                <div>
                  <p className="text-xs font-bold text-white">JESSICA L.</p>
                  <p className="text-[10px] text-electricBlue font-mono">VFX ARTIST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
      <ApplicationModal isOpen={showApplication} onClose={() => setShowApplication(false)} />
    </div>
  );
}
