
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Layout Components
import DashboardLayout from "./components/dashboard/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/sentiment" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/predictions" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/alerts" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/settings" element={<Dashboard />} /> {/* Placeholder */}
          </Route>
          
          {/* Admin Routes */}
          <Route path="/" element={<DashboardLayout isAdmin={true} />}>
            <Route path="/admin/users" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/admin/data-sources" element={<Dashboard />} /> {/* Placeholder */}
            <Route path="/admin/ml-models" element={<Dashboard />} /> {/* Placeholder */}
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
