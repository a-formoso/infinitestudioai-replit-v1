import { Switch, Route, useLocation } from "wouter";
import { useEffect, useRef } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Academy from "@/pages/academy";
import CourseLevel2 from "@/pages/course-level-2";
import Dashboard from "@/pages/dashboard";
import CoursePlayer from "@/pages/course-player";
import Hire from "@/pages/hire";
import AssetStore from "@/pages/asset-store";
import Checkout from "@/pages/checkout";
import Support from "@/pages/support";
import About from "@/pages/about";
import Login from "@/pages/login";
import Register from "@/pages/register";
import AdminDashboard from "@/pages/admin-dashboard";
import Links from "@/pages/links";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import CourseNanoBanana from "@/pages/course-nano-banana";
import CourseAIFilmmakingEcosystem from "@/pages/course-ai-filmmaking-ecosystem";
import Mentorship from "@/pages/mentorship";
import ResetPassword from "@/pages/reset-password";

const SCROLL_RESTORED_PATHS = [
  "/academy/foundation/advanced-ai-cinematography",
  "/academy/foundation/nano-banana-mastery",
  "/academy/specialist/google-ai-filmmaking-ecosystem",
  "/dashboard",
  "/course/player",
];

function ScrollToTop() {
  const [location] = useLocation();
  const prevLocation = useRef(location);

  useEffect(() => {
    if (prevLocation.current !== location) {
      if (!SCROLL_RESTORED_PATHS.includes(location)) {
        window.scrollTo(0, 0);
      }
      prevLocation.current = location;
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/links" component={Links} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/hire" component={Hire} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/store" component={AssetStore} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/support" component={Support} />
      <Route path="/academy" component={Academy} />
      <Route path="/academy/foundation/advanced-ai-cinematography" component={CourseLevel2} />
      <Route path="/academy/foundation/nano-banana-mastery" component={CourseNanoBanana} />
      <Route path="/academy/specialist/google-ai-filmmaking-ecosystem" component={CourseAIFilmmakingEcosystem} />
      <Route path="/mentorship" component={Mentorship} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/course/player" component={CoursePlayer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
