import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEnrollments, getCurrentUser, updateProfile, getOrders } from "@/lib/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
  });

  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const user = userData?.data?.user;
  const orders = ordersData?.data?.orders || [];

  const updateMutation = useMutation({
    mutationFn: ({ username, email }: { username: string; email: string }) =>
      updateProfile(username, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    updateMutation.mutate({ username, email });
  };

  const enrollments = data?.data?.enrollments || [];

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden flex flex-col">
      
      {/* GRID BACKGROUND OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      {/* DASHBOARD CONTENT */}
      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full z-10">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                  <h1 className="font-header text-3xl md:text-4xl text-white mb-2">MISSION CONTROL</h1>
                  <p className="text-sm text-gray-400 font-mono">Welcome back, Director. Systems online.</p>
              </div>
              <div className="flex gap-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button 
                        className="border border-white/20 text-white px-6 py-3 text-xs font-header font-bold uppercase hover:bg-white/10 transition-colors"
                        data-testid="button-edit-profile"
                      >
                          Edit Profile
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-obsidian border-white/10 text-white max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-header text-xl text-white">EDIT PROFILE</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div>
                          <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Director Name</label>
                          <input 
                            type="text"
                            name="username"
                            defaultValue={user?.username || ""}
                            data-testid="input-edit-username"
                            className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                          <input 
                            type="email"
                            name="email"
                            defaultValue={user?.email || ""}
                            data-testid="input-edit-email"
                            className="w-full bg-black/50 border border-white/10 text-white p-4 font-body text-sm focus:outline-none focus:border-electricBlue transition-all"
                            required
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={updateMutation.isPending}
                          data-testid="button-save-profile"
                          className="w-full bg-electricBlue text-white font-header font-bold text-sm uppercase py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider disabled:opacity-50"
                        >
                          {updateMutation.isPending ? "SAVING..." : "Save Changes"}
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
              </div>
          </div>

          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN (Main Learning) */}
              <div className="lg:col-span-2 space-y-8">
                  
                  {/* Hero: Resume Learning */}
                  <Link href={enrollments.length > 0 ? `/course/player/${enrollments[0]?.course?.slug || 'level-1'}` : "/academy"}>
                    <div className="glass-panel p-0 overflow-hidden relative group cursor-pointer border border-electricBlue/30 hover:border-electricBlue transition-all duration-300">
                        <div className="h-64 bg-gray-900 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-black"></div>
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                                <div className="w-16 h-16 rounded-full bg-electricBlue flex items-center justify-center text-white pl-1 shadow-[0_0_30px_rgba(41,98,255,0.5)] transform group-hover:scale-110 transition-transform">▶</div>
                            </div>
                            <div className="absolute top-6 left-6">
                                <span className="bg-electricBlue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">RESUME PLAYING</span>
                            </div>
                        </div>
                        <div className="p-8 relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-header text-xl text-white mb-1">MASTER THE GOOGLE ECOSYSTEM</h3>
                                    <p className="text-xs text-gray-400 font-mono">Module 3.2: The "Ingredients" Workflow</p>
                                </div>
                                <span className="text-electricBlue font-mono text-xl font-bold">65%</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-electricBlue w-[65%] shadow-[0_0_10px_rgba(41,98,255,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                  </Link>

                  {/* My Courses List */}
                  <div className="glass-panel p-8">
                      <h3 className="font-header text-sm text-white mb-6 border-b border-white/10 pb-4">ENROLLED COURSES</h3>
                      {isLoading ? (
                        <div className="space-y-6">
                          <div className="h-20 bg-white/5 animate-pulse rounded"></div>
                          <div className="h-20 bg-white/5 animate-pulse rounded"></div>
                        </div>
                      ) : enrollments.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-400 text-sm mb-4">No enrollments yet</p>
                          <Link href="/academy" className="text-electricBlue hover:underline text-xs font-header">
                            Browse Courses →
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {enrollments.map((enrollment: any) => (
                            <Link key={enrollment.id} href={`/course/player/${enrollment.course.slug}`}>
                              <div className="flex gap-4 items-center group cursor-pointer" data-testid={`card-enrollment-${enrollment.course.slug}`}>
                                  <div className={`w-16 h-16 bg-gray-800 shrink-0 relative overflow-hidden rounded border border-white/10 group-hover:border-${enrollment.course.color === 'electricBlue' ? 'electricBlue' : 'signalOrange'}/50 transition-colors`}>
                                      <div className={`absolute inset-0 bg-gradient-to-br ${enrollment.course.color === 'electricBlue' ? 'from-blue-900/40' : 'from-orange-900/40'} to-black`}></div>
                                  </div>
                                  <div className="flex-grow">
                                      <h4 className={`font-header text-sm text-white group-hover:text-${enrollment.course.color === 'electricBlue' ? 'electricBlue' : 'signalOrange'} transition-colors`}>{enrollment.course.title}</h4>
                                      <div className="flex justify-between items-center mt-2">
                                          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                              <div className={`h-full bg-${enrollment.course.color === 'electricBlue' ? 'electricBlue' : 'signalOrange'} w-[${enrollment.progress.percentage}%]`}></div>
                                          </div>
                                          <span className="text-[10px] text-gray-500 font-mono">{enrollment.progress.completed}/{enrollment.progress.total} LESSONS</span>
                                      </div>
                                  </div>
                                  <button className={`text-white hover:text-${enrollment.course.color === 'electricBlue' ? 'electricBlue' : 'signalOrange'} transition-colors`}>→</button>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>

              </div>

              {/* RIGHT COLUMN (Assets & Tools) */}
              <div className="space-y-8">
                  
                  {/* Quick Downloads */}
                  <div className="glass-panel p-8">
                      <h3 className="font-header text-sm text-white mb-6 border-b border-white/10 pb-4">MY ASSETS</h3>
                      <div className="space-y-4">
                          <a href="#" className="block p-4 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
                              <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-header text-purple-500">ZIP FILE</span>
                                  <span className="text-[10px] font-mono text-gray-500">240MB</span>
                              </div>
                              <h4 className="text-sm font-bold text-white group-hover:text-purple-500 transition-colors">Nano Banana Texture Pack</h4>
                              <p className="text-[10px] text-gray-400 mt-1">Version 2.1 • Updated Yesterday</p>
                          </a>
                          <a href="#" className="block p-4 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group">
                              <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-header text-gray-400">PDF</span>
                                  <span className="text-[10px] font-mono text-gray-500">12MB</span>
                              </div>
                              <h4 className="text-sm font-bold text-white group-hover:text-gray-300 transition-colors">Master Prompt Library</h4>
                              <p className="text-[10px] text-gray-400 mt-1">Level 1 Course Supplement</p>
                          </a>
                      </div>
                  </div>

                  {/* Order History */}
                  <div className="glass-panel p-8">
                      <h3 className="font-header text-sm text-white mb-6 border-b border-white/10 pb-4">ORDER HISTORY</h3>
                      {orders.length === 0 ? (
                        <p className="text-gray-400 text-xs text-center py-4">No orders yet</p>
                      ) : (
                        <div className="space-y-4">
                          {orders.slice(0, 5).map((order: any) => (
                            <div key={order.id} className="p-4 border border-white/10 hover:border-electricBlue/30 transition-colors" data-testid={`order-${order.id}`}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-mono text-electricBlue">ORDER #{order.id}</span>
                                <span className="text-[10px] font-mono text-gray-500">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-white font-bold">${parseFloat(order.total).toFixed(2)}</span>
                                <span className={`text-[10px] font-mono uppercase ${order.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Community Feed (Mockup) */}
                  <div className="glass-panel p-8">
                      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                          <h3 className="font-header text-sm text-white">STUDIO FEED</h3>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                              <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">S</div>
                              <div>
                                  <p className="text-[10px] text-gray-300"><span className="text-electricBlue font-bold">@SarahJ</span> posted a new critique in #wip-feedback</p>
                                  <span className="text-[8px] text-gray-600 font-mono">2 MIN AGO</span>
                              </div>
                          </div>
                          <div className="flex gap-3 items-start">
                              <div className="w-6 h-6 rounded bg-signalOrange flex items-center justify-center text-[10px] font-bold text-black">M</div>
                              <div>
                                  <p className="text-[10px] text-gray-300"><span className="text-electricBlue font-bold">@MikeV</span> uploaded a new texture asset</p>
                                  <span className="text-[8px] text-gray-600 font-mono">45 MIN AGO</span>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </main>

      <Footer />
    </div>
  );
}
