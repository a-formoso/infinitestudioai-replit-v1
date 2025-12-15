import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Infinity } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/">
              <a className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 cursor-pointer">
                  <span className="text-electricBlue text-2xl">∞</span> INFINITE STUDIO
              </a>
            </Link>
            <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-semibold">
                <a href="#work" className="hover:text-electricBlue transition-colors duration-300">Work</a>
                <a href="#academy" className="hover:text-signalOrange transition-colors duration-300">Academy</a>
                <a href="#store" className="hover:text-white transition-colors duration-300 opacity-60">Assets</a>
            </div>
            <a href="#" className="hidden md:block border border-electricBlue text-electricBlue px-6 py-2 text-xs font-header font-bold uppercase hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider">
                Start Project
            </a>
             {/* Mobile Menu Button (Hidden on Desktop) */}
             <div className="md:hidden text-white text-2xl cursor-pointer">
                ☰
            </div>
        </div>
    </nav>
  );
}
