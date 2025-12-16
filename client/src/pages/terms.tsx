import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function Terms() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-red-500 tracking-widest uppercase">
              System Protocol // Document ID: TERMS-001
            </span>
          </div>
          
          <h1 className="font-header text-4xl md:text-6xl text-white mb-6 tracking-wide">
            TERMS OF EXECUTION
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <div>
              <span className="text-gray-700 block mb-1">Effective Date</span>
              January 01, 2026
            </div>
            <div>
              <span className="text-gray-700 block mb-1">Version</span>
              1.0 (Initial Deployment)
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
                  <button onClick={() => scrollToSection('acceptance')} className="hover:text-electricBlue transition-colors text-left w-full">
                    1.0 Acceptance of Terms
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-electricBlue transition-colors text-left w-full">
                    2.0 Studio Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('intellectual-property')} className="hover:text-electricBlue transition-colors text-left w-full">
                    3.0 Intellectual Property
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('payments')} className="hover:text-electricBlue transition-colors text-left w-full">
                    4.0 Payments & Refunds
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('conduct')} className="hover:text-electricBlue transition-colors text-left w-full">
                    5.0 User Conduct
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('liability')} className="hover:text-electricBlue transition-colors text-left w-full">
                    6.0 Limitation of Liability
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('termination')} className="hover:text-electricBlue transition-colors text-left w-full">
                    7.0 Termination Protocol
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 lg:col-start-5 space-y-24">
            
            {/* 1.0 ACCEPTANCE */}
            <section id="acceptance" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">1.0 ACCEPTANCE OF TERMS</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  These Terms of Execution ("Terms") constitute a legally binding agreement between you ("The User") and Infinite Studio AI ("The Studio"). By accessing our website, purchasing our courses, or utilizing our digital assets, you agree to be bound by these Terms and all applicable laws and regulations.
                </p>
                <p>
                  If you do not agree with any of these Terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                </p>
              </div>
            </section>

            {/* 2.0 SERVICES */}
            <section id="services" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">2.0 STUDIO SERVICES & ACADEMY</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  Infinite Studio provides educational content ("The Academy") and digital production services ("Studio Services").
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-electricBlue">
                  <li><strong className="text-white">The Academy:</strong> Includes pre-recorded video courses, downloadable assets, and community access. We reserve the right to modify, update, or discontinue course content at any time.</li>
                  <li><strong className="text-white">Studio Services:</strong> Custom production work is governed by a separate Master Services Agreement (MSA) signed upon project commencement.</li>
                </ul>
              </div>
            </section>

            {/* 3.0 INTELLECTUAL PROPERTY */}
            <section id="intellectual-property" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">3.0 INTELLECTUAL PROPERTY RIGHTS</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  <strong className="text-white">3.1 Course Materials:</strong> All content included in the Academy (videos, text, code snippets, proprietary workflows) is the property of Infinite Studio AI and is protected by international copyright laws. You are granted a limited, non-exclusive, non-transferable license to access the content for personal educational use only.
                </p>
                <p>
                  <strong className="text-white">3.2 User Generated Content:</strong> You retain full ownership of any video, image, or audio content you create using the techniques taught in our courses. We claim no ownership over your creative output.
                </p>
                <p>
                  <strong className="text-white">3.3 Digital Assets:</strong> Texture packs and 3D assets purchased from the Asset Store are Royalty-Free for commercial use, but may not be resold or redistributed as standalone assets.
                </p>
              </div>
            </section>

            {/* 4.0 PAYMENTS */}
            <section id="payments" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">4.0 PAYMENTS & REFUNDS</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  <strong className="text-white">4.1 Pricing:</strong> All prices are listed in USD. We reserve the right to change prices at any time.
                </p>
                <p>
                  <strong className="text-white">4.2 Refund Protocol:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-electricBlue">
                  <li><strong className="text-white">Courses:</strong> We offer a 30-day money-back guarantee for course purchases, provided you have viewed less than 30% of the course content.</li>
                  <li><strong className="text-white">Digital Assets:</strong> All sales of downloadable asset packs (textures, prompts, LUTs) are final and non-refundable.</li>
                  <li><strong className="text-white">Mentorship:</strong> Mentorship subscriptions are non-refundable but can be cancelled at any time before the next billing cycle.</li>
                </ul>
              </div>
            </section>
            
            {/* 5.0 CONDUCT */}
            <section id="conduct" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">5.0 USER CONDUCT</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  Users agree not to use the Studio's resources to generate content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable. Violation of this protocol will result in immediate termination of access without refund.
                </p>
              </div>
            </section>

             {/* 6.0 LIABILITY */}
             <section id="liability" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">6.0 LIMITATION OF LIABILITY</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  In no event shall Infinite Studio AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Infinite Studio AI's website, even if Infinite Studio AI or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </section>

            {/* 7.0 TERMINATION */}
            <section id="termination" className="border-t border-white/10 pt-8">
              <h2 className="font-header text-xl text-white mb-8">7.0 TERMINATION PROTOCOL</h2>
              <div className="space-y-6 text-sm leading-relaxed text-gray-400 font-body">
                <p>
                  We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                </p>
              </div>
            </section>

          </div>
        </div>
        
        <div className="mt-32 border-t border-white/10 pt-8 text-center mb-12">
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                End of Document // ID: TERMS-001
            </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}