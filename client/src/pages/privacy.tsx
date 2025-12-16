import { Link } from "wouter";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/footer";

export default function Privacy() {
  const [copied, setCopied] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("admin@infinitestudioai.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans selection:bg-electricBlue selection:text-white flex flex-col">
      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Link href="/">
            <span className="text-electricBlue font-header text-lg">∞</span>
            <span className="font-header text-sm tracking-widest text-white group-hover:text-electricBlue transition-colors ml-2">INFINITE STUDIO</span>
          </Link>
        </div>
        <Link href="/">
          <div className="text-[10px] font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-2">
            Close Document <span className="text-xl leading-none">×</span>
          </div>
        </Link>
      </nav>

      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* DOCUMENT HEADER */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-green-500 tracking-widest uppercase">
              System Protocol // Document ID: PRIV-001
            </span>
          </div>
          
          <h1 className="font-header text-4xl md:text-6xl text-white mb-6 tracking-wide">
            PRIVACY POLICY
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <div>
              <span className="text-gray-700 block mb-1">Effective Date</span>
              January 01, 2026
            </div>
            <div>
              <span className="text-gray-700 block mb-1">Version</span>
              2.4 (Current)
            </div>
            <div>
              <span className="text-gray-700 block mb-1">Status</span>
              Active
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 border border-white/10 rounded-sm p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="font-header text-xs text-white mb-6 tracking-widest border-b border-white/10 pb-2">CONTENTS</h3>
              <ul className="space-y-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <li>
                  <button onClick={() => scrollToSection('introduction')} className="hover:text-electricBlue transition-colors text-left w-full">
                    01. Introduction
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('data-collection')} className="hover:text-electricBlue transition-colors text-left w-full">
                    02. Data Collection
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('data-usage')} className="hover:text-electricBlue transition-colors text-left w-full">
                    03. Data Usage
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('third-party')} className="hover:text-electricBlue transition-colors text-left w-full">
                    04. Third Party Sharing
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('cookies')} className="hover:text-electricBlue transition-colors text-left w-full">
                    05. Cookies & Tracking
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('rights')} className="hover:text-electricBlue transition-colors text-left w-full">
                    06. Your Rights
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-electricBlue transition-colors text-left w-full">
                    07. Contact Protocol
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 lg:col-start-5 space-y-24">
            
            {/* 01. INTRODUCTION */}
            <section id="introduction" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">01. INTRODUCTION</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  Infinite Studio AI ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy protocol ("Privacy Policy") will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
                <p>
                  By accessing the Infinite Studio platform, engaging with our AI models (Veo, Gemini, etc.), or purchasing our educational materials, you agree to the data handling practices outlined in this document.
                </p>
              </div>
            </section>

            {/* 02. DATA COLLECTION */}
            <section id="data-collection" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">02. DATA COLLECTION PROTOCOLS</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-electricBlue">
                  <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong className="text-white">Contact Data:</strong> includes billing address, email address and telephone numbers.</li>
                  <li><strong className="text-white">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us via Lemon Squeezy.</li>
                  <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                </ul>
              </div>
            </section>

            {/* 03. DATA USAGE */}
            <section id="data-usage" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">03. DATA USAGE & PROCESSING</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-electricBlue">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., granting access to the Academy Dashboard).</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal or regulatory obligation.</li>
                </ul>
              </div>
            </section>

            {/* 04. THIRD PARTY */}
            <section id="third-party" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">04. THIRD PARTY INTEGRATIONS</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  Our ecosystem relies on specific third-party tools to function. By using our services, you acknowledge that data may be processed by:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-electricBlue">
                  <li><strong className="text-white">Lemon Squeezy:</strong> Our Merchant of Record for payments and tax compliance.</li>
                  <li><strong className="text-white">Replit:</strong> Our hosting and web infrastructure provider.</li>
                  <li><strong className="text-white">Google / DeepMind:</strong> When interacting with our AI tools (Script Doctor, Prompt Enhancer), anonymized prompt data is sent to the Gemini API for processing.</li>
                </ul>
              </div>
            </section>
            
            {/* 05. COOKIES */}
            <section id="cookies" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">05. COOKIES & TRACKING</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                </p>
                <p>
                  Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                </p>
              </div>
            </section>

             {/* 06. RIGHTS */}
             <section id="rights" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">06. YOUR RIGHTS</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
                </p>
              </div>
            </section>

            {/* 07. CONTACT */}
            <section id="contact" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">07. CONTACT PROTOCOL</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact our Data Protection Officer via email at:
                </p>
                <div className="mt-6">
                  <button 
                    onClick={copyEmail}
                    className="group inline-flex items-center gap-3 border border-white/10 bg-white/5 px-6 py-4 text-electricBlue font-mono text-xs hover:bg-electricBlue/10 hover:border-electricBlue/50 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <span>admin@infinitestudioai.com</span>
                    {copied ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                    {copied && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/90 text-green-500 font-bold tracking-widest text-[10px]">
                        COPIED TO CLIPBOARD
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
        
        <div className="mt-32 border-t border-white/10 pt-8 text-center mb-12">
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                End of Document // ID: PRIV-001
            </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}