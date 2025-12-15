import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Academy from "@/pages/academy";
import CourseLevel1 from "@/pages/course-level-1";
import CourseLevel2 from "@/pages/course-level-2";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/academy" component={Academy} />
      <Route path="/course/level-1" component={CourseLevel1} />
      <Route path="/course/level-2" component={CourseLevel2} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
