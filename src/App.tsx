import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layout/Navbar";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import ChatBot from "./components/chat/ChatBot";

// Pages
import Dashboard from "./pages/Dashboard";
import Networking from "./pages/Networking";
import Development from "./pages/Development";
import Jobs from "./pages/Jobs";
import Hiring from "./pages/Hiring";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-soft-sand">
          <Navbar />
          <main className="container mx-auto px-4 pt-20 pb-24 md:pb-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/networking" element={<Networking />} />
              <Route path="/development" element={<Development />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/hiring" element={<Hiring />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
          <MobileBottomNav />
          <ChatBot />
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
