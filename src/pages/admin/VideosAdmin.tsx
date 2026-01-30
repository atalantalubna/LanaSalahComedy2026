import { useState, useEffect } from "react";
import {
  Play,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
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

interface Video {
  id: string;
  title: string;
  thumbnail_url: string | null;
  video_url: string;
  duration: string | null;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const categories = [
  { value: "standup", label: "Stand-up" },
  { value: "podcast", label: "Podcast" },
  { value: "interview", label: "Interview" },
  { value: "sketch", label: "Sketch" },
  { value: "clip", label: "Clip" },
];

// Extract video ID and generate thumbnail
const getYouTubeThumbnail = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[7].length === 11 ? match[7] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
};

const getVimeoThumbnail = async (url: string): Promise<string | null> => {
  const regExp = /vimeo\.com\/(\d+)/;
  const match = url.match(regExp);
  if (!match) return null;
  // For Vimeo, we'd need an API call, so just return null for now
  return null;
};

const VideosAdmin = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [deleteVideo, setDeleteVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    thumbnail_url: "",
    duration: "",
    category: "standup",
  });

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Auto-generate thumbnail when URL changes
  useEffect(() => {
    if (formData.video_url && !formData.thumbnail_url) {
      const thumbnail = getYouTubeThumbnail(formData.video_url);
      if (thumbnail) {
        setFormData((prev) => ({ ...prev, thumbnail_url: thumbnail }));
      }
    }
  }, [formData.video_url]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.video_url) {
      toast.error("Please fill in title and video URL");
      return;
    }

    try {
      if (editingVideo) {
        const { error } = await supabase
          .from("videos")
          .update({
            title: formData.title,
            video_url: formData.video_url,
            thumbnail_url: formData.thumbnail_url || null,
            duration: formData.duration || null,
            category: formData.category,
          })
          .eq("id", editingVideo.id);

        if (error) throw error;
        toast.success("Video updated");
      } else {
        const { error } = await supabase.from("videos").insert({
          title: formData.title,
          video_url: formData.video_url,
          thumbnail_url: formData.thumbnail_url || null,
          duration: formData.duration || null,
          category: formData.category,
          display_order: videos.length,
        });

        if (error) throw error;
        toast.success("Video added");
      }

      setIsDialogOpen(false);
      setEditingVideo(null);
      setFormData({
        title: "",
        video_url: "",
        thumbnail_url: "",
        duration: "",
        category: "standup",
      });
      fetchVideos();
    } catch (error) {
      console.error("Error saving video:", error);
      toast.error("Failed to save video");
    }
  };

  const handleToggleActive = async (video: Video) => {
    try {
      const { error } = await supabase
        .from("videos")
        .update({ is_active: !video.is_active })
        .eq("id", video.id);

      if (error) throw error;

      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id ? { ...v, is_active: !v.is_active } : v
        )
      );
    } catch (error) {
      console.error("Error toggling video:", error);
      toast.error("Failed to update video");
    }
  };

  const handleDelete = async () => {
    if (!deleteVideo) return;

    try {
      const { error } = await supabase
        .from("videos")
        .delete()
        .eq("id", deleteVideo.id);

      if (error) throw error;

      setVideos((prev) => prev.filter((v) => v.id !== deleteVideo.id));
      toast.success("Video deleted");
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video");
    } finally {
      setDeleteVideo(null);
    }
  };

  const openEditDialog = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || "",
      duration: video.duration || "",
      category: video.category || "standup",
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingVideo(null);
    setFormData({
      title: "",
      video_url: "",
      thumbnail_url: "",
      duration: "",
      category: "standup",
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Videos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage video library
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
          <h1 className="font-playfair text-3xl text-foreground">Videos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {videos.length} video{videos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Video
        </Button>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 border border-border">
          <Play className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No videos yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add YouTube or Vimeo videos
          </p>
          <Button onClick={openAddDialog} variant="outline" className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add Video
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`bg-card border border-border overflow-hidden ${
                !video.is_active ? "opacity-50" : ""
              }`}
            >
              <div className="relative aspect-video bg-muted">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1">
                    {video.duration}
                  </div>
                )}
                {!video.is_active && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
                    <EyeOff className="w-3 h-3" />
                    Hidden
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate">{video.title}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {video.category}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Switch
                    checked={video.is_active}
                    onCheckedChange={() => handleToggleActive(video)}
                  />
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(video.video_url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => openEditDialog(video)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                      onClick={() => setDeleteVideo(video)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-playfair">
              {editingVideo ? "Edit Video" : "Add Video"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Set at The Comedy Store"
              />
            </div>
            <div className="space-y-2">
              <Label>Video URL *</Label>
              <Input
                value={formData.video_url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, video_url: e.target.value }))
                }
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-muted-foreground">
                YouTube or Vimeo URL
              </p>
            </div>
            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <Input
                value={formData.thumbnail_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    thumbnail_url: e.target.value,
                  }))
                }
                placeholder="Auto-generated from YouTube"
              />
              {formData.thumbnail_url && (
                <img
                  src={formData.thumbnail_url}
                  alt="Preview"
                  className="w-full aspect-video object-cover mt-2 border"
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  placeholder="12:34"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingVideo ? "Save Changes" : "Add Video"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteVideo} onOpenChange={() => setDeleteVideo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Video</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteVideo?.title}"? This action
              cannot be undone.
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

export default VideosAdmin;
