import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  MessageSquare,
  Users,
  Mail,
  Image,
  ArrowRight,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  pendingReviews: number;
  subscribers: number;
  unreadMessages: number;
  galleryImages: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    pendingReviews: 0,
    subscribers: 0,
    unreadMessages: 0,
    galleryImages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [reviewsRes, subscribersRes, contactsRes, galleryRes] =
          await Promise.all([
            supabase
              .from("reviews")
              .select("id", { count: "exact", head: true })
              .eq("status", "pending"),
            supabase
              .from("subscribers")
              .select("id", { count: "exact", head: true }),
            supabase
              .from("contacts")
              .select("id", { count: "exact", head: true })
              .eq("is_read", false),
            supabase
              .from("gallery_images")
              .select("id", { count: "exact", head: true }),
          ]);

        setStats({
          pendingReviews: reviewsRes.count || 0,
          subscribers: subscribersRes.count || 0,
          unreadMessages: contactsRes.count || 0,
          galleryImages: galleryRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const copyReviewLink = () => {
    const link = `${window.location.origin}/submit-review`;
    navigator.clipboard.writeText(link);
    toast.success("Review link copied!", {
      description: "Share this link to collect reviews.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-playfair text-3xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, {user?.email}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-secondary/30 border border-border p-6 space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={copyReviewLink} className="gap-2">
            <Copy className="w-4 h-4" />
            Copy Review Request Link
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/admin/gallery">
              <Image className="w-4 h-4" />
              Manage Gallery
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Pending Reviews"
          value={isLoading ? "--" : String(stats.pendingReviews)}
          icon={MessageSquare}
          href="/admin/reviews"
          description="Awaiting approval"
        />
        <StatsCard
          title="Subscribers"
          value={isLoading ? "--" : String(stats.subscribers)}
          icon={Users}
          href="/admin/subscribers"
          description="Newsletter signups"
        />
        <StatsCard
          title="Unread Messages"
          value={isLoading ? "--" : String(stats.unreadMessages)}
          icon={Mail}
          href="/admin/contacts"
          description="Contact submissions"
        />
        <StatsCard
          title="Gallery Images"
          value={isLoading ? "--" : String(stats.galleryImages)}
          icon={Image}
          href="/admin/gallery"
          description="Total photos"
        />
      </div>

      {/* Info */}
      <div className="bg-muted/30 border border-border p-6 space-y-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
          Getting Started
        </p>
        <p className="text-sm text-foreground/80">
          Use the sidebar to manage your content. Copy the review request link
          above and share it with peers, press contacts, or audience members to
          collect testimonials for your website.
        </p>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  href: string;
  description: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  href,
  description,
}: StatsCardProps) => {
  return (
    <Link
      to={href}
      className="block p-6 bg-card border border-border hover:border-foreground/20 transition-colors group"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
            {title}
          </p>
          <p className="text-3xl font-playfair text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
