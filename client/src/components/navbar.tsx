import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-heading font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70 hover:to-primary transition-colors cursor-pointer">
          Lumina
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white hover:text-primary transition-colors hidden sm:block">
            Log in
          </Link>
          <Button className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-6">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
