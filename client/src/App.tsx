import React, { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "next-themes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating page load time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return React.createElement(
    ThemeProvider, 
    { attribute: "class", defaultTheme: "dark", enableSystem: true },
    React.createElement(
      TooltipProvider,
      null,
      React.createElement(
        AnimatePresence,
        { mode: "wait" },
        loading 
          ? React.createElement(Loader, { key: "loader" })
          : React.createElement(
              React.Fragment,
              null,
              React.createElement(Header),
              React.createElement(
                Switch,
                null,
                React.createElement(Route, { path: "/", component: Home }),
                React.createElement(Route, { component: NotFound })
              ),
              React.createElement(BackToTop),
              React.createElement(Toaster)
            )
      )
    )
  );
}

export default App;
