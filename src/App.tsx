import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";

// Public pages
import Index from "./pages/Index";
import About from "./pages/About";
import Videos from "./pages/Videos";
import Social from "./pages/Social";
import Gallery from "./pages/Gallery";
import Shows from "./pages/Shows";
import EPK from "./pages/EPK";
import Podcast from "./pages/Podcast";
import Merch from "./pages/Merch";
import NotFound from "./pages/NotFound";
import SubmitReview from "./pages/SubmitReview";

// Admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminReviews from "./pages/admin/Reviews";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import VideosAdmin from "./pages/admin/VideosAdmin";
import SocialAdmin from "./pages/admin/SocialAdmin";
import Subscribers from "./pages/admin/Subscribers";
import Contacts from "./pages/admin/Contacts";

// Components
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/social" element={<Social />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/shows" element={<Shows />} />
                <Route path="/epk" element={<EPK />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/submit-review" element={<SubmitReview />} />

                {/* Admin Login - Public */}
                <Route path="/admin/login" element={<Login />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="gallery" element={<GalleryAdmin />} />
                    <Route path="videos" element={<VideosAdmin />} />
                    <Route path="social" element={<SocialAdmin />} />
                    <Route path="subscribers" element={<Subscribers />} />
                    <Route path="contacts" element={<Contacts />} />
                  </Route>
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
