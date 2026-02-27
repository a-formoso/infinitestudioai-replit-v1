import { Link, useLocation } from "wouter";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { login, forgotPassword } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import loginBg from "@assets/1)_Couple_1772164792533.jpeg";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const queryClient = useQueryClient();
  
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

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
        description: "Redirecting...",
      });
      setLocation(redirectUrl);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForgotLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("forgot-email") as string;
    const { error } = await forgotPassword(email);
    setForgotLoading(false);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      setForgotSent(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-hidden flex">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <div className="flex h-full w-full relative z-10">
        
        {/* LEFT: CINEMATIC SIDEBAR (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
            {/* Video Background Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${loginBg})` }}></div>
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
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 relative overflow-hidden">
            
            {/* Top Nav (Minimal) */}
            <div className="absolute top-8 left-6 lg:left-auto lg:right-8">
                <Link href="/" className="text-xs font-header font-bold text-gray-500 hover:text-white transition-colors"><span className="lg:hidden">← </span>BACK TO HOME<span className="hidden lg:inline"> →</span></Link>
            </div>

            <div className="glass-panel p-6 md:p-12 w-full max-w-md">
                <div className="text-center mb-6 md:mb-10">
                    <div className="font-header font-bold text-2xl tracking-widest text-white flex justify-center items-center gap-2 mb-2">
                        <span className="text-electricBlue text-3xl">∞</span> INFINITE
                    </div>
                    <p className="text-xs text-gray-400 font-mono tracking-wider">
                      {showForgot ? "PASSWORD RECOVERY" : "STUDENT ACCESS PORTAL"}
                    </p>
                </div>

                {showForgot ? (
                  forgotSent ? (
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 mx-auto border border-electricBlue/30 flex items-center justify-center">
                        <span className="text-electricBlue text-2xl">✓</span>
                      </div>
                      <div>
                        <h3 className="font-header text-sm text-white mb-2">CHECK YOUR EMAIL</h3>
                        <p className="text-xs text-gray-400 font-mono leading-relaxed">
                          If an account exists with that email, we've sent a password reset link. It expires in 1 hour.
                        </p>
                      </div>
                      <button
                        onClick={() => { setShowForgot(false); setForgotSent(false); }}
                        data-testid="button-back-to-login"
                        className="w-full border border-white/20 text-white font-header font-bold text-sm uppercase py-4 hover:bg-white/10 transition-all duration-300 tracking-wider"
                      >
                        Back to Login
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-4 md:space-y-6" onSubmit={handleForgotPassword}>
                      <p className="text-xs text-gray-400 font-mono leading-relaxed">
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email"
                          name="forgot-email"
                          data-testid="input-forgot-email"
                          placeholder="director@studio.com" 
                          required
                          className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_15px_rgba(41,98,255,0.2)] transition-all"
                        />
                      </div>
                      <button 
                        type="submit" 
                        data-testid="button-send-reset"
                        disabled={forgotLoading}
                        className="w-full bg-signalOrange text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {forgotLoading ? "SENDING..." : "Send Reset Link"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForgot(false)}
                        data-testid="button-back-to-login-form"
                        className="w-full border border-white/20 text-white font-header font-bold text-sm uppercase py-3 hover:bg-white/10 transition-all duration-300 tracking-wider text-xs"
                      >
                        Back to Login
                      </button>
                    </form>
                  )
                ) : (
                  <>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
                                <button type="button" onClick={() => setShowForgot(true)} data-testid="link-forgot-password" className="text-[10px] text-electricBlue hover:underline">Forgot?</button>
                            </div>
                            <div className="relative">
                              <input 
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  data-testid="input-password"
                                  placeholder="••••••••" 
                                  required
                                  className="w-full bg-black/50 border border-white/10 text-white p-4 pr-12 font-body text-sm focus:outline-none focus:border-electricBlue focus:shadow-[0_0_15px_rgba(41,98,255,0.2)] transition-all"
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

                        <button 
                          type="submit" 
                          data-testid="button-login"
                          disabled={isLoading}
                          className="w-full bg-white text-black font-header font-bold text-sm uppercase py-4 hover:bg-electricBlue hover:text-white transition-all duration-300 tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "CONNECTING..." : "Initialise Session"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-gray-500">
                            New to the studio? <Link href={`/register${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`} className="text-electricBlue hover:underline">Create an account</Link>
                        </p>
                    </div>
                  </>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}