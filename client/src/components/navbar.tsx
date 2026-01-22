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
import { LogOut, User, LayoutDashboard } from "lucide-react";

/**
 * NAVBAR NAVIGATION LOGIC
 * ========================
 * 
 * This navbar implements a "scroll-first, navigate-second" pattern for homepage sections.
 * 
 * BEHAVIOR:
 * 1. If user is NOT on homepage → Always navigate directly to the dedicated page
 * 2. If user IS on homepage:
 *    a. First click → Scroll to the section on the homepage
 *    b. Second click (same link) → Navigate to the dedicated page
 * 
 * WHY THIS PATTERN?
 * - Homepage visitors can quickly preview content by scrolling to sections
 * - If they want to dive deeper, clicking again takes them to the full page
 * - Users on other pages always get direct navigation (no confusion)
 * 
 * STATE TRACKING:
 * - `lastClickedSection`: Tracks which section was last scrolled to on homepage
 * - Resets to null when user navigates away from homepage
 * 
 * LINK MAPPING:
 * - Academy: #academy section → /academy page
 * - Studio: #work section → /hire page  
 * - Asset Store: #store section → /store page
 * - Mentorship: Always navigates to /mentorship (no homepage section)
 */

export function Navbar() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [lastClickedSection, setLastClickedSection] = useState<string | null>(null);
  
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

  const isHomepage = location === "/";
  const isAcademyActive = location.startsWith("/academy") || location.startsWith("/course");
  const isMentorshipActive = location === "/mentorship";
  const isStudioActive = location === "/hire" || location === "/about";
  const isStoreActive = location === "/store";

  /**
   * Handles navigation link clicks with scroll-first, navigate-second logic.
   * @param e - Click event
   * @param sectionId - The homepage section anchor (e.g., "academy", "work", "store")
   * @param pagePath - The dedicated page path (e.g., "/academy", "/hire", "/store")
   */
  const handleNavClick = (e: React.MouseEvent, sectionId: string, pagePath: string) => {
    e.preventDefault();
    
    if (!isHomepage) {
      // Not on homepage: always navigate to the dedicated page
      setLocation(pagePath);
      setLastClickedSection(null);
      return;
    }
    
    // On homepage: check if this is a repeat click
    if (lastClickedSection === sectionId) {
      // Second click on same section: navigate to dedicated page
      setLocation(pagePath);
      setLastClickedSection(null);
    } else {
      // First click: scroll to section and remember it
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setLastClickedSection(sectionId);
    }
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
                <a 
                  href="#academy" 
                  onClick={(e) => handleNavClick(e, "academy", "/academy")}
                  className={`text-xs font-header font-bold transition-colors tracking-widest ${isAcademyActive ? "text-electricBlue" : "text-gray-400 hover:text-electricBlue"}`}
                >
                  ACADEMY
                </a>
                <Link href="/mentorship" className={`text-xs font-header font-bold transition-colors tracking-widest ${isMentorshipActive ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}>MENTORSHIP</Link>
                <a 
                  href="#work" 
                  onClick={(e) => handleNavClick(e, "work", "/hire")}
                  className={`text-xs font-header font-bold transition-colors tracking-widest ${isStudioActive ? "text-signalOrange" : "text-gray-400 hover:text-signalOrange"}`}
                >
                  STUDIO
                </a>
                <a 
                  href="#store" 
                  onClick={(e) => handleNavClick(e, "store", "/store")}
                  className={`text-xs font-header font-bold transition-colors tracking-widest ${isStoreActive ? "text-purple-500" : "text-gray-400 hover:text-purple-500"}`}
                >
                  ASSET STORE
                </a>
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
