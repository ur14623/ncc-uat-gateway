import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            {/* Profile Management */}
            <Route path="/profile/create" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/profile/info" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            
            {/* Balance Management */}
            <Route path="/balance/check" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/balance/adjust" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/balance/pinless-recharge" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/balance/voucher-recharge" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/balance/transfer" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            
            {/* Bundle Management */}
            <Route path="/bundle/detail" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/subscribe" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/subscribed" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/update-resource" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/remove" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/loan" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/gift" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/cvm" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/stop-auto-renewal" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bundle/renew" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            
            {/* Rate Management */}
            <Route path="/rate/international" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/rate/roaming" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/rate/comparison" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            
            {/* Notification Management */}
            <Route path="/notification/master" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/notification/list" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            
            {/* Utility */}
            <Route path="/utility/tax" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/utility/conversion" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            
            {/* User Management */}
            <Route path="/user/list" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            <Route path="/user/add" element={<ProtectedRoute><MainLayout><PlaceholderPage /></MainLayout></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
