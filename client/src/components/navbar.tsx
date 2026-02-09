import { useState } from "react";
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
import { LogOut, User, LayoutDashboard, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  const handleMobileNav = (path: string) => {
    setMobileMenuOpen(false);
    setLocation(path);
  };

  const navLinks = [
    { href: "/hire", label: "STUDIO", testId: "mobile-link-studio", isRoute: true },
    { href: "/academy", label: "ACADEMY", testId: "mobile-link-academy", isRoute: true },
    { href: "/store", label: "ASSET STORE", testId: "mobile-link-store", isRoute: true },
    { href: "/admin?tab=pipeline", label: "PIPELINE", testId: "mobile-link-pipeline", isRoute: true, highlight: true },
  ];

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
    exit: (i: number) => ({
      opacity: 0,
      x: -20,
      transition: { delay: i * 0.03, duration: 0.2 },
    }),
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 cursor-pointer">
                    <span className="text-electricBlue text-2xl">∞</span> INFINITE STUDIO
              </Link>

              <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                  <Link href="/hire" className="text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest">STUDIO</Link>
                  <Link href="/academy" className="text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest">ACADEMY</Link>
                  <Link href="/store" className="text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest">ASSET STORE</Link>
                  <Link href="/admin?tab=pipeline" className="text-xs font-header font-bold text-gray-400 hover:text-electricBlue transition-colors tracking-widest">PIPELINE</Link>
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
                  <Link href="/login" className="hidden md:inline text-xs font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest cursor-pointer" data-testid="link-login">LOGIN</Link>
                )}

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  data-testid="btn-mobile-menu"
                  className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
          </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40" data-testid="mobile-menu-overlay">
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-[64px] left-0 right-0 bg-obsidian/95 backdrop-blur-md border-b border-white/10 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex flex-col px-6 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.testId}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {link.isRoute ? (
                      <button
                        onClick={() => handleMobileNav(link.href)}
                        className={`text-left text-sm font-header font-bold transition-colors tracking-widest py-3 border-b border-white/5 w-full ${
                          link.highlight ? "text-gray-400 hover:text-electricBlue" : "text-gray-400 hover:text-white"
                        }`}
                        data-testid={link.testId}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-header font-bold text-gray-400 hover:text-white transition-colors tracking-widest py-3 border-b border-white/5"
                        data-testid={link.testId}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  custom={navLinks.length}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {!user && (
                    <button
                      onClick={() => handleMobileNav("/login")}
                      className="text-left text-sm font-header font-bold text-white hover:text-electricBlue transition-colors tracking-widest py-3 w-full"
                      data-testid="mobile-link-login"
                    >
                      LOGIN
                    </button>
                  )}
                  {user && (
                    <button
                      onClick={() => handleMobileNav("/dashboard")}
                      className="text-left text-sm font-header font-bold text-white hover:text-electricBlue transition-colors tracking-widest py-3 w-full"
                      data-testid="mobile-link-dashboard"
                    >
                      DASHBOARD
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
