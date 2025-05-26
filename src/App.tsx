
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Following from "./pages/Following";
import Explore from "./pages/Explore";
import Topics from "./pages/Topics";
import Authors from "./pages/Authors";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Simple authentication check - in a real app, this would use a proper auth system
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/landing" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />

              {/* Protected routes (inside Layout) */}
              <Route element={<Layout><Outlet /></Layout>}>
                <Route index element={<Index />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/write" element={<Write />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/following" element={<Following />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
