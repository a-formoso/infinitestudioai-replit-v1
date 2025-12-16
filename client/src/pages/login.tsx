import { Link, useLocation } from "wouter";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { login } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await login(email, password);

    if (error) {
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast({
        title: "Welcome back!",
        description: "Redirecting to dashboard...",
      });
      setLocation("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-hidden h-screen flex">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <div className="flex h-full w-full relative z-10">
        
        {/* LEFT: CINEMATIC SIDEBAR (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
            {/* Video Background Placeholder */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            
            <div className="relative z-10 max-w-md p-12">
                <div className="font-header font-bold text-4xl text-white mb-6 leading-tight">
                    DIRECT THE<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-cyan-400">ALGORITHM</span>
                </div>
                <p className="text-lg text-gray-300 font-light italic border-l-2 border-electricBlue pl-6">
                    "The camera is an instrument that teaches people how to see without a camera."
                </p>
                <p className="text-xs text-gray-500 mt-4 font-mono pl-6">— Dorothea Lange (Reimagined for AI)</p>
            </div>

            {/* Decorative Overlay Elements */}
            <div className="absolute bottom-8 left-8 text-[10px] font-mono text-electricBlue animate-pulse">
                SYSTEM STATUS: ONLINE
            </div>
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 relative">
            
            {/* Top Nav (Minimal) */}
            <div className="absolute top-8 right-8">
                <Link href="/" className="text-xs font-header font-bold text-gray-500 hover:text-white transition-colors">BACK TO HOME →</Link>
            </div>

            <div className="glass-panel p-8 md:p-12 w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="font-header font-bold text-2xl tracking-widest text-white flex justify-center items-center gap-2 mb-2">
                        <span className="text-electricBlue text-3xl">∞</span> INFINITE
                    </div>
                    <p className="text-xs text-gray-400 font-mono tracking-wider">STUDENT ACCESS PORTAL</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email"
                            name="email"
                            data-testid="input-email"
                            placeholder="director@studio.com" 
                            required
                            className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_15px_rgba(41,98,255,0.2)] transition-all"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Password</label>
                            <a href="#" className="text-[10px] text-electricBlue hover:underline">Forgot?</a>
                        </div>
                        <input 
                            type="password"
                            name="password"
                            data-testid="input-password"
                            placeholder="••••••••" 
                            required
                            className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_15px_rgba(41,98,255,0.2)] transition-all"
                        />
                    </div>

                    <button 
                      type="submit" 
                      data-testid="button-login"
                      disabled={isLoading}
                      className="w-full bg-white text-black font-header font-bold text-sm uppercase py-4 hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "CONNECTING..." : "Initialize Session"}
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <span className="text-[10px] text-gray-500 font-mono">OR ACCESS WITH</span>
                    <div className="h-px bg-white/10 flex-grow"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="border border-white/10 hover:border-white/30 bg-white/5 py-3 flex justify-center items-center gap-2 transition-all group">
                        <svg className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                        <span className="text-[10px] font-bold text-gray-300 group-hover:text-white">GOOGLE</span>
                    </button>
                    <button className="border border-white/10 hover:border-white/30 bg-white/5 py-3 flex justify-center items-center gap-2 transition-all group">
                        <svg className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.1 1.88-2.61 5.75.3 6.97-.5 1.49-1.15 2.83-2.35 4.24zm-4.13-16c-1.39.06-2.8 1.03-3.23 2.53 1.57.17 3.06-.82 3.23-2.53z"/></svg>
                        <span className="text-[10px] font-bold text-gray-300 group-hover:text-white">APPLE</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-500">
                        New to the studio? <Link href="/register" className="text-electricBlue hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}