import { Link, useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logout } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const user = data?.data?.user;
  const initials = user?.username
    ? user.username.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const handleLogout = async () => {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    setLocation("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/">
              <a className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 cursor-pointer">
                  <span className="text-electricBlue text-2xl">∞</span> INFINITE STUDIO
              </a>
            </Link>

            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                <a href="/#work" className="text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest">STUDIO</a>
                <a href="/#academy" className="text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest">ACADEMY</a>
                <a href="/#store" className="text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest">ASSET STORE</a>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/20 overflow-hidden relative cursor-pointer hover:border-electricBlue transition-colors" data-testid="avatar-user">
                         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black"></div>
                         <span className="absolute inset-0 flex items-center justify-center font-header text-white text-xs">{initials}</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-obsidian border-white/10">
                    <DropdownMenuItem className="text-gray-400 text-xs font-mono cursor-default focus:bg-transparent">
                      <User className="mr-2 h-4 w-4" />
                      {user.username}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem 
                      onClick={() => setLocation("/dashboard")}
                      className="text-white text-xs font-header cursor-pointer focus:bg-white/10"
                      data-testid="menu-dashboard"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-400 text-xs font-header cursor-pointer focus:bg-white/10 focus:text-red-400"
                      data-testid="menu-logout"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <span className="text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest cursor-pointer" data-testid="link-login">LOGIN</span>
                </Link>
              )}
            </div>
        </div>
    </nav>
  );
}
