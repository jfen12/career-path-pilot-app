import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PricingSection } from "@/components/billing/PricingSection";

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      navigate("/sign-up");
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-career-purple text-white flex items-center justify-center mb-6">
          <Sparkles size={32} />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-center text-career-dark-gray">
          Your Career Co-Pilot
        </h1>
        
        <p className="text-center text-career-gray mb-8 max-w-md">
          Take control of your professional journey with smart networking, career planning, and job tracking tools.
        </p>
        
        <div className="space-y-4 w-full max-w-xs">
          <Button 
            className="w-full bg-career-purple hover:bg-career-dark-purple text-white h-12 rounded-lg font-medium"
            onClick={handleGetStarted}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              <div className="flex items-center">
                Get Started <ArrowRight size={16} className="ml-1" />
              </div>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-career-purple text-career-purple h-12 rounded-lg font-medium"
            onClick={() => handleLoginClick}
          >
            I already have an account
          </Button>
        </div>
      </div>
      
      {/* Add Pricing Section */}
      <PricingSection />
      
      <footer className="py-4 text-center text-sm text-career-gray">
        <p>© {new Date().getFullYear()} Career Co-Pilot</p>
      </footer>
    </div>
  );
};

export default Welcome;
