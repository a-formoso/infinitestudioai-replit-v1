import { Link } from "wouter";
import { useEffect } from "react";

export default function Links() {
  // Custom styles for this page
  const styles = `
    .glass-btn {
        background: rgba(20, 20, 20, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Specific Glow Colors */
    .glow-gold:hover {
        border-color: #FFD700;
        box-shadow: 0 0 25px rgba(255, 215, 0, 0.2);
        transform: scale(1.02);
    }
    .glow-blue:hover {
        border-color: #2962FF;
        box-shadow: 0 0 25px rgba(41, 98, 255, 0.3);
        transform: scale(1.02);
    }
    .glow-purple:hover {
        border-color: #D500F9;
        box-shadow: 0 0 25px rgba(213, 0, 249, 0.3);
        transform: scale(1.02);
    }
    .glow-orange:hover {
        border-color: #FF3D00;
        box-shadow: 0 0 25px rgba(255, 61, 0, 0.3);
        transform: scale(1.02);
    }

    /* Scanline effect */
    .scanlines {
        background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.2)
        );
        background-size: 100% 4px;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        z-index: 50;
        opacity: 0.3;
    }
    
    .bg-radial-glow {
        background: radial-gradient(circle at center, rgba(41, 98, 255, 0.15) 0%, transparent 70%);
    }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in-up {
        opacity: 0; /* Start hidden */
        animation: fadeInUp 0.8s ease-out forwards;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="bg-obsidian text-offWhite font-body antialiased min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background FX */}
        <div className="fixed inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-20 pointer-events-none z-0"></div>
        <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0"></div>
        <div className="scanlines"></div>

        {/* MAIN CONTAINER */}
        <main className="w-full max-w-md px-6 py-12 relative z-10 flex flex-col gap-8">
          {/* HEADER / PROFILE */}
          <header className="text-center animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-24 h-24 mx-auto bg-black rounded-full border border-electricBlue/50 p-1 mb-6 relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-transparent opacity-50 group-hover:opacity-80 transition-opacity"></div>
              {/* Logo Character */}
              <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center relative z-10">
                <span className="text-4xl text-electricBlue font-header">∞</span>
              </div>
              {/* Status Dot */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full z-20 animate-pulse"></div>
            </div>

            <h1 className="font-header text-xl tracking-widest text-white mb-2">
              INFINITE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-neonPurple">
                STUDIO
              </span>
            </h1>
            <p className="text-xs text-gray-400 font-mono tracking-wide">
              DIRECT THE ALGORITHM.<br />
              NEXT-GEN AI PRODUCTION & EDUCATION.
            </p>
          </header>

          {/* LINKS STACK */}
          <div className="flex flex-col gap-4 w-full">
            {/* 1. LEAD MAGNET (FREE VALUE) */}
            <a
              href="https://drive.google.com/file/d/1NQ-Y6hhJ6h36BEJpZo-5UPL3P6nETE4l/view?usp=drive_link"
              className="glass-btn glow-gold rounded-xl p-4 flex items-center gap-4 group animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="font-header text-xs text-white group-hover:text-gold transition-colors mb-1">
                  FREE AI FILMMAKING EBOOK
                </h2>
                <p className="text-[10px] text-gray-400 font-mono">
                  Unlock Your Creative Potential
                </p>
              </div>
              <div className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </a>

            {/* 2. CORE COURSE (MAIN REVENUE) */}
            <Link
              href="/course/level-1"
              className="glass-btn glow-blue rounded-xl p-4 flex items-center gap-4 group animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-electricBlue/10 flex items-center justify-center shrink-0 border border-electricBlue/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-electricBlue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="font-header text-xs text-white group-hover:text-electricBlue transition-colors mb-1">
                  MASTER THE ECOSYSTEM
                </h2>
                <p className="text-[10px] text-gray-400 font-mono">
                  The Complete Google AI Course
                </p>
              </div>
              <div className="text-electricBlue opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </Link>

            {/* 3. ASSET STORE (PASSIVE) */}
            <Link
              href="/store"
              className="glass-btn glow-purple rounded-xl p-4 flex items-center gap-4 group animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-neonPurple/10 flex items-center justify-center shrink-0 border border-neonPurple/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-neonPurple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="font-header text-xs text-white group-hover:text-neonPurple transition-colors mb-1">
                  SHOP DIGITAL ASSETS
                </h2>
                <p className="text-[10px] text-gray-400 font-mono">
                  Textures, Prompts & Gear
                </p>
              </div>
              <div className="text-neonPurple opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </Link>

            {/* 4. SERVICES (HIGH TICKET) */}
            <Link
              href="/hire"
              className="glass-btn glow-orange rounded-xl p-4 flex items-center gap-4 group animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-12 h-12 rounded-lg bg-signalOrange/10 flex items-center justify-center shrink-0 border border-signalOrange/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-signalOrange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="font-header text-xs text-white group-hover:text-signalOrange transition-colors mb-1">
                  HIRE THE STUDIO
                </h2>
                <p className="text-[10px] text-gray-400 font-mono">
                  Book Commercial Production
                </p>
              </div>
              <div className="text-signalOrange opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </Link>
          </div>

          {/* FOOTER SOCIALS */}
          <footer
            className="mt-12 flex flex-col items-center gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex gap-6">
              <a
                href="#"
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all"
              >
                {/* Instagram Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all"
              >
                {/* YouTube Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <Link
                href="/"
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all"
              >
                {/* Website Icon */}
                <svg
                  className="w-4 h-4 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </Link>
            </div>

            <Link
              href="/"
              className="text-[10px] font-mono text-gray-600 hover:text-electricBlue transition-colors"
            >
              POWERED BY INFINITE STUDIO
            </Link>
          </footer>
        </main>
      </div>
    </>
  );
}
