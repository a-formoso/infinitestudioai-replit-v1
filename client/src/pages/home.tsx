import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <Hero />
      
      {/* Selected Works Section Teaser */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-primary text-xs font-mono mb-4">
            <span>///</span>
            <span className="tracking-widest uppercase">Selected Works</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter">
              Production
            </h2>
            
            <a href="#works" className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors pb-2">
              View All Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="mt-12 aspect-video bg-white/5 rounded-sm border border-white/10 flex items-center justify-center">
            <p className="text-muted-foreground font-mono text-sm">Showreel Placeholder</p>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="container px-6 text-center text-muted-foreground text-xs font-mono">
          <p>&copy; 2024 Infinite Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
