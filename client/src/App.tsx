import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LatticeNavigation from "@/components/LatticNavigation";
import Home from "@/pages/Home";
import Laboratory from "@/pages/Laboratory";
import Constellation from "@/pages/Constellation";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/laboratory" component={Laboratory} />
      <Route path="/constellation" component={Constellation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen flex flex-col bg-background">
          <LatticeNavigation />
          <div className="flex-1 overflow-hidden">
            <Router />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
