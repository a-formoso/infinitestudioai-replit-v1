import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/80">
        <div className="container px-6 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Lumina Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
