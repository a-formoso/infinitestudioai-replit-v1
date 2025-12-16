import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api";

export function Navbar() {
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const user = data?.data?.user;
  const initials = user?.username
    ? user.username.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

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
                <Link href="/dashboard">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/20 overflow-hidden relative cursor-pointer hover:border-electricBlue transition-colors" data-testid="avatar-user">
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black"></div>
                       <span className="absolute inset-0 flex items-center justify-center font-header text-white text-xs">{initials}</span>
                  </div>
                </Link>
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
