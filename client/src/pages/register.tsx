import { Link, useLocation } from "wouter";
import { useState } from "react";
import { register } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryClient = useQueryClient();
  
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const { data, error } = await register(username, email, password);

    if (error) {
      toast({
        title: "Registration failed",
        description: error,
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast({
        title: "Account created!",
        description: "Welcome to Infinite Studio. Redirecting...",
      });
      setLocation(redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-hidden h-screen flex">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <div className="flex h-full w-full relative z-10">
        
        <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            
            <div className="relative z-10 max-w-md p-12">
                <div className="font-header font-bold text-4xl text-white mb-6 leading-tight">
                    JOIN THE<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-400">REVOLUTION</span>
                </div>
                <p className="text-lg text-gray-300 font-light italic border-l-2 border-signalOrange pl-6">
                    "Every great film starts with a single frame. Your journey begins now."
                </p>
                <p className="text-xs text-gray-500 mt-4 font-mono pl-6">— Infinite Studio</p>
            </div>

            <div className="absolute bottom-8 left-8 text-[10px] font-mono text-signalOrange animate-pulse">
                NEW DIRECTOR REGISTRATION
            </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 relative">
            
            <div className="absolute top-8 right-8">
                <Link href="/" className="text-xs font-header font-bold text-gray-500 hover:text-white transition-colors">BACK TO HOME →</Link>
            </div>

            <div className="glass-panel p-8 md:p-12 w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="font-header font-bold text-2xl tracking-widest text-white flex justify-center items-center gap-2 mb-2">
                        <span className="text-signalOrange text-3xl">∞</span> INFINITE
                    </div>
                    <p className="text-xs text-gray-400 font-mono tracking-wider">CREATE YOUR DIRECTOR ACCOUNT</p>
                </div>

                <form className="space-y-5" onSubmit={handleRegister}>
                    <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Director Name</label>
                        <input 
                            type="text"
                            name="username"
                            data-testid="input-username"
                            placeholder="Your name or alias" 
                            required
                            className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-signalOrange focus:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email"
                            name="email"
                            data-testid="input-email"
                            placeholder="director@studio.com" 
                            required
                            className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-signalOrange focus:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Password</label>
                        <div className="relative">
                          <input 
                              type={showPassword ? "text" : "password"}
                              name="password"
                              data-testid="input-password"
                              placeholder="••••••••" 
                              required
                              minLength={6}
                              className="w-full bg-black/50 border border-white/10 text-white p-4 pr-12 font-body text-sm focus:outline-none focus:border-signalOrange focus:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Confirm Password</label>
                        <div className="relative">
                          <input 
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              data-testid="input-confirm-password"
                              placeholder="••••••••" 
                              required
                              minLength={6}
                              className="w-full bg-black/50 border border-white/10 text-white p-4 pr-12 font-body text-sm focus:outline-none focus:border-signalOrange focus:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            data-testid="button-toggle-confirm-password"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                    </div>

                    <button 
                      type="submit" 
                      data-testid="button-register"
                      disabled={isLoading}
                      className="w-full bg-signalOrange text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider shadow-[0_0_20px_rgba(255,107,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "CREATING ACCOUNT..." : "Begin Your Journey"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-500">
                        Already have an account? <Link href="/login" className="text-signalOrange hover:underline">Sign in here</Link>
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
