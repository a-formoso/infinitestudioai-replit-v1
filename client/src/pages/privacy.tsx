import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Privacy() {
  const styles = `
    .scanline-overlay {
      background: linear-gradient(
        to bottom,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 50%,
        rgba(0,0,0,0.1) 50%,
        rgba(0,0,0,0.1)
      );
      background-size: 100% 4px;
      pointer-events: none;
    }
  `;

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased flex flex-col">
      <style>{styles}</style>
      <div className="fixed inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-10 pointer-events-none z-0"></div>
      <div className="fixed inset-0 scanline-overlay z-50 opacity-20 pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative z-10 px-6">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <header className="mb-16 border-b border-white/10 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-electricBlue rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-electricBlue tracking-widest">SYSTEM_DOC_V.2.0.4</span>
            </div>
            <h1 className="font-header text-4xl md:text-6xl text-white mb-4 tracking-tight">
              PRIVACY_PROTOCOL
            </h1>
            <p className="text-gray-400 font-mono text-sm max-w-2xl">
              DATA HANDLING & SURVEILLANCE PARAMETERS // INFINITE STUDIO ECOSYSTEM
            </p>
          </header>

          {/* CONTENT */}
          <div className="space-y-12 font-mono text-sm leading-relaxed text-gray-400">
            
            <section className="border-l-2 border-white/10 pl-6 hover:border-electricBlue transition-colors duration-300">
              <h2 className="text-white font-header text-xl mb-4 flex items-center gap-3">
                <span className="text-electricBlue">01.</span> DATA INGESTION
              </h2>
              <p className="mb-4">
                When you interact with the Infinite Studio ecosystem, specific data points are ingested to optimize your neural network training experience. This includes:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-gray-500">
                <li>Identity Markers (Name, Email, Creative ID)</li>
                <li>Transactional Metadata (Purchase History, Asset Downloads)</li>
                <li>Behavioral Analytics (Course Progression, System Interactions)</li>
              </ul>
            </section>

            <section className="border-l-2 border-white/10 pl-6 hover:border-signalOrange transition-colors duration-300">
              <h2 className="text-white font-header text-xl mb-4 flex items-center gap-3">
                <span className="text-signalOrange">02.</span> PROCESSING & UTILIZATION
              </h2>
              <p className="mb-4">
                Your data is processed to calibrate our algorithms and deliver personalized creative directives. We utilize this information to:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-gray-500">
                <li>Grant access to secure terminal nodes (Courses & Assets)</li>
                <li>Transmit system updates and creative intelligence (Newsletters)</li>
                <li>Optimize the rendering pipeline of our educational content</li>
              </ul>
            </section>

            <section className="border-l-2 border-white/10 pl-6 hover:border-neonPurple transition-colors duration-300">
              <h2 className="text-white font-header text-xl mb-4 flex items-center gap-3">
                <span className="text-neonPurple">03.</span> SECURITY PROTOCOLS
              </h2>
              <p className="mb-4">
                We employ military-grade encryption to shield your creative assets from unauthorized access. Your digital footprint is secured behind multiple layers of algorithmic defense.
              </p>
              <p className="text-gray-500">
                WARNING: No transmission over the global network is 100% secure. Proceed with calculated risk.
              </p>
            </section>

            <section className="border-l-2 border-white/10 pl-6 hover:border-gold transition-colors duration-300">
              <h2 className="text-white font-header text-xl mb-4 flex items-center gap-3">
                <span className="text-gold">04.</span> THIRD-PARTY NODES
              </h2>
              <p className="mb-4">
                We may interface with external subprocessors (Payment Gateways, Analytics Engines) to maintain system integrity. These nodes operate under strict data transfer agreements.
              </p>
            </section>

            <section className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h2 className="text-white font-bold mb-2">CONTACT_ADMIN</h2>
              <p className="mb-4">
                To request a data purge or export your profile logs, initiate a handshake with our support protocol.
              </p>
              <a href="mailto:system@infinitestudio.ai" className="text-electricBlue hover:text-white transition-colors underline">
                system@infinitestudio.ai
              </a>
            </section>

            <div className="text-[10px] text-gray-600 pt-12 border-t border-white/10">
              LAST_UPDATE: CYCLE_2025.04.12 // ENCRYPTION_LEVEL: MAX
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
