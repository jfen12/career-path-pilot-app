
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome page
    navigate("/");
  }, [navigate]);

  // This component won't actually render since we redirect immediately
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
};

export default Index;
