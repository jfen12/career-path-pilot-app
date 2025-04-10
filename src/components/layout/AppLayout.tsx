
import { Outlet } from "react-router-dom";
import MobileBottomNav from "./MobileBottomNav";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <Outlet />
        </main>
        <MobileBottomNav />
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default AppLayout;
