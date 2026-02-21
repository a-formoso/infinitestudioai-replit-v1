import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-background flex flex-col justify-center">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.05),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
          
          {/* Main Video Block (Left) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 relative aspect-video bg-black/40 border border-white/10 rounded-sm overflow-hidden group cursor-pointer"
          >
            {/* UI Overlays */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-mono text-blue-400 tracking-widest">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC • 00:01:24:12
            </div>
            
            <div className="absolute bottom-6 right-6 text-[10px] font-mono text-muted-foreground tracking-widest">
              VER 3.1 RENDER
            </div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-8 bg-white/5 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-center tracking-tighter uppercase leading-none">
                <span className="block text-white">Direct The</span>
                <span className="block bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-purple-600">
                  Algorithm
                </span>
              </h1>
            </div>

            {/* Grid Overlay Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          </motion.div>

          {/* Right Column Stack */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Card 01 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 bg-white/[0.02] border border-white/10 p-8 relative group hover:bg-white/[0.04] transition-colors"
            >
              <span className="absolute top-6 right-6 text-4xl font-heading font-bold text-white/5 group-hover:text-white/10 transition-colors">01</span>
              
              <h3 className="text-xl font-heading font-medium text-white mb-4 tracking-wide uppercase">The Academy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[90%]">
                Stop prompting blindly. Learn the full AI filmmaking pipeline from Gemini to Veo.
              </p>
              
              <Button className="bg-[#FF4400] hover:bg-[#FF4400]/90 text-white rounded-none uppercase text-xs font-bold tracking-widest px-8">
                View Courses
              </Button>
            </motion.div>

            {/* Card 02 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 bg-white/[0.02] border border-white/10 p-8 relative group hover:bg-white/[0.04] transition-colors"
            >
              <span className="absolute top-6 right-6 text-4xl font-heading font-bold text-white/5 group-hover:text-white/10 transition-colors">02</span>
              
              <h3 className="text-xl font-heading font-medium text-white mb-4 tracking-wide uppercase">Studio Services</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[90%]">
                Full-service AI production. Commercials, music videos, and pre-viz.
              </p>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none uppercase text-xs font-bold tracking-widest px-8">
                Hire Us
              </Button>
            </motion.div>

          </div>
        </div>

        {/* Logo Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/5 pt-12"
        >
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-6 md:mb-0">
            Trusted and created by
          </span>
          
          <div className="flex flex-wrap gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Netflix */}
            <span className="font-heading font-bold text-xl tracking-widest hover:text-red-600 transition-colors cursor-default">NETFLIX</span>
            {/* HBO */}
            <span className="font-heading font-bold text-xl tracking-widest hover:text-white transition-colors cursor-default">HBO</span>
            {/* Google Deepmind */}
            <span className="font-heading font-bold text-lg tracking-wider hover:text-blue-400 transition-colors cursor-default">GOOGLE DEEPMIND</span>
            {/* A24 */}
            <span className="font-heading font-bold text-xl tracking-widest hover:text-white transition-colors cursor-default">A24</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
