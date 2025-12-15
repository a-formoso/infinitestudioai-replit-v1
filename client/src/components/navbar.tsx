import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Infinity } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 text-xl font-heading font-bold tracking-wider text-white hover:text-primary transition-colors">
            <Infinity className="w-6 h-6 text-primary" />
            INFINITE STUDIO
          </a>
        </Link>

        <div className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
          <a href="#work" className="text-xs font-medium tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">Work</a>
          <a href="#academy" className="text-xs font-medium tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">Academy</a>
          <a href="#assets" className="text-xs font-medium tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">Assets</a>
        </div>

        <div className="flex items-center">
          <Button variant="outline" className="rounded-none border-primary/50 text-primary hover:bg-primary hover:text-white uppercase text-xs font-bold tracking-widest px-6 h-10 transition-all duration-300">
            Start Project
          </Button>
        </div>
      </div>
    </nav>
  );
}
