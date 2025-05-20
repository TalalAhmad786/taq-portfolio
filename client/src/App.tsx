import React, { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin-dashboard";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { queryClient } from "@/lib/queryClient";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating page load time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader key="loader" />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <CustomCursor
                config={{
                  dotSize: 8,
                  ringSize: 40,
                  dotColor: "hsl(var(--primary))",
                  ringColor: "hsl(var(--primary))",
                  speed: 1,
                  magneticForce: 0.5,
                }}
              />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/auth" component={AuthPage} />
                  <ProtectedRoute path="/admin" component={AdminDashboard} />
                  <Route component={NotFound} />
                </Switch>
              </main>
              <BackToTop />
              <Toaster />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
