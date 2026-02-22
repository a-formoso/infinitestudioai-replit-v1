import { Link, useLocation } from "wouter";
import { useState } from "react";
import { resetPassword } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { data, error } = await resetPassword(token, newPassword);
    setIsLoading(false);

    if (error) {
      toast({ title: "Reset failed", description: error, variant: "destructive" });
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-hidden flex">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <div className="flex h-full w-full relative z-10">
        <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            <div className="relative z-10 max-w-md p-12">
                <div className="font-header font-bold text-4xl text-white mb-6 leading-tight">
                    RESET YOUR<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-500">PASSWORD</span>
                </div>
                <p className="text-lg text-gray-300 font-light italic border-l-2 border-signalOrange pl-6">
                    "Every new beginning comes from some other beginning's end."
                </p>
                <p className="text-xs text-gray-500 mt-4 font-mono pl-6">— Seneca (Reimagined)</p>
            </div>
            <div className="absolute bottom-8 left-8 text-[10px] font-mono text-signalOrange animate-pulse">
                SYSTEM STATUS: PASSWORD RECOVERY
            </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 relative overflow-hidden">
            <div className="absolute top-8 left-6 lg:left-auto lg:right-8">
                <Link href="/" className="text-xs font-header font-bold text-gray-500 hover:text-white transition-colors"><span className="lg:hidden">← </span>BACK TO HOME<span className="hidden lg:inline"> →</span></Link>
            </div>

            <div className="glass-panel p-6 md:p-12 w-full max-w-md">
                <div className="text-center mb-6 md:mb-10">
                    <div className="font-header font-bold text-2xl tracking-widest text-white flex justify-center items-center gap-2 mb-2">
                        <span className="text-signalOrange text-3xl">∞</span> INFINITE
                    </div>
                    <p className="text-xs text-gray-400 font-mono tracking-wider">SET NEW PASSWORD</p>
                </div>

                {!token ? (
                  <div className="text-center space-y-6">
                    <p className="text-xs text-gray-400 font-mono leading-relaxed">
                      Invalid reset link. Please request a new password reset from the login page.
                    </p>
                    <Link href="/login" className="block w-full border border-white/20 text-white font-header font-bold text-sm uppercase py-4 hover:bg-white/10 transition-all duration-300 tracking-wider text-center" data-testid="link-go-to-login">
                      Go to Login
                    </Link>
                  </div>
                ) : success ? (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 mx-auto border border-green-500/30 flex items-center justify-center">
                      <span className="text-green-500 text-2xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-header text-sm text-white mb-2">PASSWORD RESET COMPLETE</h3>
                      <p className="text-xs text-gray-400 font-mono leading-relaxed">
                        Your password has been updated. You can now log in with your new password.
                      </p>
                    </div>
                    <Link href="/login" data-testid="link-login-after-reset" className="block w-full bg-electricBlue text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider text-center">
                      Go to Login
                    </Link>
                  </div>
                ) : (
                  <form className="space-y-4 md:space-y-6" onSubmit={handleReset}>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">New Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          data-testid="input-new-password"
                          placeholder="••••••••" 
                          required
                          minLength={6}
                          className="w-full bg-black/50 border border-white/10 text-white p-4 pr-12 font-body text-sm focus:outline-none focus:border-signalOrange focus:shadow-[0_0_15px_rgba(255,61,0,0.2)] transition-all"
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
                      <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Confirm New Password</label>
                      <input 
                        type="password"
                        name="confirmPassword"
                        data-testid="input-confirm-password"
                        placeholder="••••••••" 
                        required
                        minLength={6}
                        className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-signalOrange focus:shadow-[0_0_15px_rgba(255,61,0,0.2)] transition-all"
                      />
                    </div>
                    <button 
                      type="submit" 
                      data-testid="button-reset-password"
                      disabled={isLoading}
                      className="w-full bg-signalOrange text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "RESETTING..." : "Reset Password"}
                    </button>
                  </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
