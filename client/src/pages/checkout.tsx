import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, getCourseBySlug, enrollInCourse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const searchParams = new URLSearchParams(window.location.search);
  const courseSlug = searchParams.get("course") || "";
  
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseSlug],
    queryFn: () => getCourseBySlug(courseSlug),
    enabled: !!courseSlug,
  });

  const user = userData?.data?.user;
  const isLoggedIn = !!user;
  const isVerified = user?.emailVerified === true;

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast({
        title: "Payment Successful!",
        description: "You are now enrolled. Redirecting to your course...",
      });
      setTimeout(() => setLocation("/course/player"), 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setLocation(`/register?redirect=/checkout?course=${courseSlug}`);
      return;
    }
    
    if (!isVerified) {
      toast({
        title: "Email Not Verified",
        description: "Please check your email and click the verification link before purchasing.",
        variant: "destructive",
      });
      return;
    }
    
    const courseId = course?.id;
    if (courseId) {
      enrollMutation.mutate(courseId.toString());
    }
  };

  if (courseLoading || userLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-electricBlue font-mono text-sm animate-pulse">Loading...</div>
      </div>
    );
  }

  const course = courseData?.data?.course;

  if (!course) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-4">
        <div className="text-white font-header text-xl">Course not found</div>
        <Link href="/academy" className="text-electricBlue text-sm font-mono hover:underline">Back to Academy</Link>
      </div>
    );
  }

  const courseName = course.title?.toUpperCase() || "COURSE";
  const courseLevel = course.level === "specialist" ? "02" : "01";
  const rawPrice = course.price ?? 149;
  const coursePrice = Math.floor(typeof rawPrice === "string" ? parseFloat(rawPrice) : rawPrice);
  const isSpecialist = course.level === "specialist";
  const accentColor = isSpecialist ? "signalOrange" : "electricBlue";
  const gradientFrom = isSpecialist ? "orange-900/40" : "blue-900/40";

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className={`text-${accentColor} text-2xl`}>∞</span> INFINITE STUDIO
          </Link>
          <div className="flex gap-2 items-center text-[10px] font-mono text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> SECURE SSL ENCRYPTED
          </div>
        </div>
      </nav>

      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto z-10 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="glass-panel p-8 sticky top-32">
              <h2 className="font-header text-lg text-white mb-6 border-b border-white/10 pb-4" data-testid="text-order-summary">ORDER SUMMARY</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-24 h-24 bg-gray-900 overflow-hidden relative shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br from-${gradientFrom} to-black`}></div>
                  <div className="absolute bottom-2 left-2 font-header font-bold text-lg text-white z-10">{courseLevel}</div>
                </div>
                <div>
                  <h3 className="font-header text-sm text-white mb-1" data-testid="text-course-name">{courseName}</h3>
                  <p className="text-xs text-gray-400 font-mono mb-2">Level {courseLevel} · {course.level === "specialist" ? "Specialist" : "Foundation"}</p>
                  <span className={`font-header font-bold text-${accentColor}`} data-testid="text-course-price">${coursePrice}.00</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6 mb-6 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${coursePrice}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (Estimated)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-4 border-t border-white/10 mt-4">
                  <span>TOTAL DUE</span>
                  <span data-testid="text-total">${coursePrice}.00</span>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded text-center space-y-2">
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Guaranteed Safe Checkout</div>
                <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                  <div className="w-8 h-5 bg-white/20 rounded"></div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-400 italic mb-2">"The only AI course that actually teaches you how to direct, not just prompt."</p>
                <p className={`text-[10px] font-header text-${accentColor}`}>- SARAH J., FILMMAKER</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="glass-panel p-8 md:p-12">
              <h1 className="font-header text-2xl text-white mb-8" data-testid="text-checkout-title">COMPLETE ENROLLMENT</h1>
              
              <form className="space-y-6" onSubmit={handlePayment}>
                <div>
                  <label className="block text-xs font-header text-gray-400 mb-2">ACCOUNT EMAIL</label>
                  {isLoggedIn ? (
                    <input 
                      type="email" 
                      value={user?.email || ""}
                      readOnly
                      data-testid="input-email"
                      className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none opacity-70 cursor-not-allowed"
                    />
                  ) : (
                    <div className="w-full bg-black/50 border border-white/10 p-4 text-sm">
                      <p className="text-gray-500 font-mono text-xs">You'll create an account when you click Pay below</p>
                    </div>
                  )}
                </div>

                {isLoggedIn && !isVerified && (
                  <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 text-sm" data-testid="banner-verify-email">
                    <p className="text-yellow-400 font-mono text-xs mb-1">EMAIL NOT VERIFIED</p>
                    <p className="text-yellow-200/70 text-xs">Check your inbox for a verification link. You must verify your email before purchasing.</p>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10">
                  <label className="block text-xs font-header text-gray-400 mb-4">PAYMENT METHOD</label>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">CARD NUMBER</label>
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        data-testid="input-card-number"
                        className={`font-mono w-full bg-black/50 border border-white/10 text-white p-4 text-sm focus:outline-none focus:border-${accentColor} focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-1">EXPIRY</label>
                        <input 
                          type="text" 
                          placeholder="MM / YY"
                          data-testid="input-expiry"
                          className={`font-mono w-full bg-black/50 border border-white/10 text-white p-4 text-sm focus:outline-none focus:border-${accentColor} focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-1">CVC</label>
                        <input 
                          type="text" 
                          placeholder="123"
                          data-testid="input-cvc"
                          className={`font-mono w-full bg-black/50 border border-white/10 text-white p-4 text-sm focus:outline-none focus:border-${accentColor} focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">CARDHOLDER NAME</label>
                      <input 
                        type="text" 
                        placeholder="ALEX SMITH"
                        data-testid="input-cardholder"
                        className={`w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-${accentColor} focus:shadow-[0_0_10px_rgba(41,98,255,0.2)]`}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={enrollMutation.isPending || (isLoggedIn && !isVerified)}
                  data-testid="button-pay"
                  className={`w-full ${isSpecialist ? 'bg-signalOrange' : 'bg-electricBlue'} text-white font-header font-bold text-sm uppercase py-5 hover:bg-white hover:text-black transition-all duration-300 tracking-wider shadow-[0_0_30px_rgba(41,98,255,0.3)] mt-8 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {enrollMutation.isPending 
                    ? "Processing..." 
                    : isLoggedIn 
                      ? `Pay $${coursePrice}.00 & Access Course`
                      : `Create Account & Pay $${coursePrice}.00`
                  }
                </button>
                
                {!isLoggedIn && (
                  <p className="text-[10px] text-center text-gray-500 mt-2">
                    Already have an account? <Link href={`/login?redirect=/checkout?course=${courseSlug}`} className={`text-${accentColor} underline`} data-testid="link-login">Sign in here</Link>
                  </p>
                )}
                
                <p className="text-[10px] text-center text-gray-500 mt-4">
                  By clicking the button above, you agree to our <Link href="/terms" className={`text-${accentColor} underline`}>Terms of Service</Link> and <Link href="/privacy" className={`text-${accentColor} underline`}>Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-8 text-center relative z-20">
        <div className="text-[10px] text-gray-600 font-mono">
          © 2025 INFINITE STUDIO. SECURE PAYMENT PROCESSING.
        </div>
      </footer>
    </div>
  );
}
