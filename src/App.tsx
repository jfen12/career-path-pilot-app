import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Import layout component
import AppLayout from "./components/layout/AppLayout";

// Import pages
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/onboarding/Onboarding";
import Dashboard from "./pages/Dashboard";
import Networking from "./pages/Networking";
import Development from "./pages/Development";
import JobsMain from "./pages/jobs/JobsMain";
import JobApplications from "./pages/jobs/JobApplications";
import More from "./pages/More";
import { BusinessMarketplace } from "./pages/business/Marketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* App routes - wrapped in AppLayout with bottom nav */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/development" element={<Development />} />
            <Route path="/jobs" element={<JobsMain />} />
            <Route path="/jobs/applications" element={<JobApplications />} />
            <Route path="/business/marketplace" element={<BusinessMarketplace />} />
            <Route path="/more" element={<More />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
