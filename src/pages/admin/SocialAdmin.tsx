import { useState, useEffect } from "react";
import {
  Share2,
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  ExternalLink,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  tiktok: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  threads: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.51.87-6.36 2.54-8.471C5.876 1.48 8.63.264 12.186.24h.014c2.746.016 5.043.718 6.833 2.088 1.642 1.257 2.842 3.063 3.567 5.367l-2.89.814c-.55-1.766-1.43-3.12-2.613-4.022-1.254-.954-2.88-1.449-4.83-1.469h-.015c-2.746.021-4.798.957-6.098 2.787-1.2 1.688-1.813 4.048-1.823 7.015v.054c.01 2.967.623 5.327 1.823 7.015 1.3 1.83 3.352 2.766 6.098 2.787h.013c2.297-.018 4.07-.608 5.271-1.751 1.246-1.185 1.881-2.858 1.887-4.969v-.033c-.004-.928-.195-1.733-.569-2.393-.358-.632-.875-1.127-1.539-1.474a4.44 4.44 0 00-.108 1.092c-.007.936-.262 1.74-.759 2.392-.53.697-1.292 1.197-2.262 1.49-.807.244-1.73.312-2.747.202-1.193-.128-2.18-.514-2.937-1.144-.81-.675-1.287-1.569-1.423-2.656l2.93-.393c.067.546.271.962.607 1.238.416.341.991.522 1.71.537.761.015 1.37-.108 1.814-.367.39-.229.586-.544.59-.94.004-.365-.144-.67-.438-.906-.37-.297-.97-.522-1.784-.668-1.182-.213-2.12-.523-2.787-.922-.736-.44-1.268-1.006-1.58-1.681-.298-.645-.451-1.412-.454-2.28-.004-1.17.39-2.159 1.17-2.94.81-.812 1.897-1.235 3.229-1.256 1.363-.022 2.465.38 3.277 1.193.747.748 1.203 1.77 1.352 3.033l-2.892.378c-.077-.625-.271-1.1-.578-1.41-.34-.346-.821-.52-1.429-.517-.578.002-1.027.173-1.333.507-.28.306-.42.712-.418 1.207.002.529.157.928.459 1.186.33.282.84.495 1.518.633 1.33.272 2.405.653 3.196 1.132.856.52 1.482 1.175 1.862 1.948.394.803.593 1.762.593 2.855v.036c-.008 2.872-.888 5.117-2.613 6.676-1.627 1.47-3.926 2.241-6.837 2.294z" />
    </svg>
  ),
  other: <Globe className="w-5 h-5" />,
};

const platforms = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter / X" },
  { value: "threads", label: "Threads" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Other" },
];

const SocialAdmin = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [deleteLink, setDeleteLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
  });

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error("Error fetching social links:", error);
      toast.error("Failed to load social links");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async () => {
    if (!formData.platform || !formData.url) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingLink) {
        const { error } = await supabase
          .from("social_links")
          .update({
            platform: formData.platform,
            url: formData.url,
          })
          .eq("id", editingLink.id);

        if (error) throw error;
        toast.success("Link updated");
      } else {
        const { error } = await supabase.from("social_links").insert({
          platform: formData.platform,
          url: formData.url,
          display_order: links.length,
        });

        if (error) throw error;
        toast.success("Link added");
      }

      setIsDialogOpen(false);
      setEditingLink(null);
      setFormData({ platform: "", url: "" });
      fetchLinks();
    } catch (error) {
      console.error("Error saving link:", error);
      toast.error("Failed to save link");
    }
  };

  const handleToggleActive = async (link: SocialLink) => {
    try {
      const { error } = await supabase
        .from("social_links")
        .update({ is_active: !link.is_active })
        .eq("id", link.id);

      if (error) throw error;

      setLinks((prev) =>
        prev.map((l) =>
          l.id === link.id ? { ...l, is_active: !l.is_active } : l
        )
      );
    } catch (error) {
      console.error("Error toggling link:", error);
      toast.error("Failed to update link");
    }
  };

  const handleDelete = async () => {
    if (!deleteLink) return;

    try {
      const { error } = await supabase
        .from("social_links")
        .delete()
        .eq("id", deleteLink.id);

      if (error) throw error;

      setLinks((prev) => prev.filter((l) => l.id !== deleteLink.id));
      toast.success("Link deleted");
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("Failed to delete link");
    } finally {
      setDeleteLink(null);
    }
  };

  const openEditDialog = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingLink(null);
    setFormData({ platform: "", url: "" });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Social Links</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage social media links
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Social Links</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {links.length} social link{links.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </Button>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 border border-border">
          <Share2 className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No social links yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your social media profiles
          </p>
          <Button onClick={openAddDialog} variant="outline" className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add Link
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className={`flex items-center gap-4 p-4 bg-card border border-border ${
                !link.is_active ? "opacity-50" : ""
              }`}
            >
              <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />

              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {platformIcons[link.platform] || platformIcons.other}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium capitalize">{link.platform}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {link.url}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={link.is_active}
                  onCheckedChange={() => handleToggleActive(link)}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => openEditDialog(link)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                  onClick={() => setDeleteLink(link)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-playfair">
              {editingLink ? "Edit Social Link" : "Add Social Link"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, platform: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <div className="flex items-center gap-2">
                        {platformIcons[p.value]}
                        {p.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={formData.url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingLink ? "Save Changes" : "Add Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteLink} onOpenChange={() => setDeleteLink(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Social Link</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your {deleteLink?.platform} link?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SocialAdmin;
