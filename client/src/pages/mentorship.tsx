import { useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Check } from "lucide-react";

function getNextQuarter(): string {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const currentQ = Math.floor(month / 3) + 1;
  if (currentQ < 4) {
    return `Q${currentQ + 1} ${year}`;
  }
  return `Q1 ${year + 1}`;
}

export default function Mentorship() {
  const nextQuarter = useMemo(() => getNextQuarter(), []);

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
      <Navbar />
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block border border-gold/50 px-4 py-1.5 mb-8" data-testid="badge-applications">
            <span className="text-[10px] font-header font-bold text-gold tracking-[0.3em]">ACCEPTING APPLICATIONS FOR {nextQuarter}</span>
          </div>

          <h1 className="font-header text-3xl md:text-5xl font-bold text-white leading-tight mb-2" data-testid="text-hero-title">
            THE INNER
          </h1>
          <h1 className="font-header text-3xl md:text-5xl font-bold text-gold leading-tight mb-6">
            CIRCLE
          </h1>

          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Direct access to Alex Director. Weekly critique sessions, career strategy, and advanced "Beta" workflows not available in the public courses.
          </p>
        </div>
      </section>
      <section className="relative z-10 pb-32 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="glass-panel p-8 md:p-10 relative" data-testid="card-studio-lot">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-header font-bold text-lg md:text-xl text-white tracking-wide" data-testid="text-tier1-title">THE STUDIO LOT</h2>
                <p className="text-[10px] font-header text-gray-500 tracking-[0.3em] mt-1">GROUP COACHING PROGRAM</p>
              </div>
              <span className="font-header font-bold text-4xl md:text-5xl text-white/10 leading-none">01</span>
            </div>

            <div className="space-y-4 mt-8 mb-10">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Bi-Weekly Live Q&A Calls</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Access to "WIP" Feedback Channel</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Early Access to New Asset Packs</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Guest Lectures from Industry Pros</span>
              </div>
            </div>

            <div className="flex items-end justify-between mt-auto pt-6 border-t border-white/10">
              <div>
                <p className="text-[10px] font-header text-gray-500 tracking-[0.3em] mb-1">MEMBERSHIP</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-header font-bold text-2xl text-white" data-testid="text-tier1-price">$99</span>
                  <span className="text-xs text-gray-500">/mo</span>
                </div>
              </div>
              <a
                href="https://forms.gle"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-join-waitlist"
                className="px-6 py-3 border border-white/20 text-xs font-header font-bold text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider"
              >
                JOIN WAITLIST
              </a>
            </div>
          </div>

          <div className="glass-panel p-8 md:p-10 relative border-gold/30" data-testid="card-executive-producer">
            <div className="absolute -top-3 right-8">
              <div className="bg-gold px-4 py-1">
                <span className="text-[10px] font-header font-bold text-black tracking-[0.2em]">LIMITED TO 3 SPOTS</span>
              </div>
            </div>

            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-header font-bold text-lg md:text-xl text-white tracking-wide" data-testid="text-tier2-title">EXECUTIVE PRODUCER</h2>
                <p className="text-[10px] font-header text-gold tracking-[0.3em] mt-1">1-ON-1 MENTORSHIP</p>
              </div>
              <span className="font-header font-bold text-4xl md:text-5xl text-white/10 leading-none">02</span>
            </div>

            <div className="space-y-4 mt-8 mb-10">
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Weekly 1-on-1 Strategy Calls (Zoom)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Direct Line Slack/WhatsApp Access</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">"Done For You" Career Roadmap</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">Personal Intro to Agency Clients</span>
              </div>
            </div>

            <div className="flex items-end justify-between mt-auto pt-6 border-t border-gold/20">
              <div>
                <p className="text-[10px] font-header text-gray-500 tracking-[0.3em] mb-1">INVESTMENT</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-header font-bold text-2xl text-white" data-testid="text-tier2-price">$1,500</span>
                  <span className="text-xs text-gray-500">/mo</span>
                </div>
              </div>
              <a
                href="https://forms.gle"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-apply-now"
                className="px-6 py-3 bg-gold text-black text-xs font-header font-bold hover:bg-white transition-all duration-300 tracking-wider"
              >
                APPLY NOW
              </a>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
