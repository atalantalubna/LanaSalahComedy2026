import { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Edit2,
  MapPin,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface Show {
  id: string;
  name: string;
  venue: string;
  city: string;
  date: string;
  time: string | null;
  ticket_url: string | null;
  description: string | null;
  is_active: boolean;
  display_order: number | null;
  created_at: string;
}

const ShowsAdmin = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [deleteShow, setDeleteShow] = useState<Show | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    city: "",
    date: "",
    time: "",
    ticket_url: "",
    description: "",
    is_active: true,
  });

  const fetchShows = async () => {
    try {
      const { data, error } = await supabase
        .from("shows")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setShows(data || []);
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to load shows");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.venue.trim() || !formData.city.trim() || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);

    try {
      if (editingShow) {
        const { error } = await supabase
          .from("shows")
          .update({
            name: formData.name.trim(),
            venue: formData.venue.trim(),
            city: formData.city.trim(),
            date: formData.date,
            time: formData.time || null,
            ticket_url: formData.ticket_url || null,
            description: formData.description || null,
            is_active: formData.is_active,
          })
          .eq("id", editingShow.id);

        if (error) throw error;
        toast.success("Show updated");
      } else {
        const { error } = await supabase.from("shows").insert({
          name: formData.name.trim(),
          venue: formData.venue.trim(),
          city: formData.city.trim(),
          date: formData.date,
          time: formData.time || null,
          ticket_url: formData.ticket_url || null,
          description: formData.description || null,
          is_active: formData.is_active,
          display_order: shows.length,
        });

        if (error) throw error;
        toast.success("Show added");
      }

      closeDialog();
      fetchShows();
    } catch (error) {
      console.error("Error saving show:", error);
      toast.error("Failed to save show");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteShow) return;

    try {
      const { error } = await supabase
        .from("shows")
        .delete()
        .eq("id", deleteShow.id);

      if (error) throw error;

      setShows((prev) => prev.filter((s) => s.id !== deleteShow.id));
      toast.success("Show deleted");
    } catch (error) {
      console.error("Error deleting show:", error);
      toast.error("Failed to delete show");
    } finally {
      setDeleteShow(null);
    }
  };

  const toggleActive = async (show: Show) => {
    try {
      const { error } = await supabase
        .from("shows")
        .update({ is_active: !show.is_active })
        .eq("id", show.id);

      if (error) throw error;

      setShows((prev) =>
        prev.map((s) =>
          s.id === show.id ? { ...s, is_active: !s.is_active } : s
        )
      );
      toast.success(show.is_active ? "Show hidden" : "Show visible");
    } catch (error) {
      console.error("Error updating show:", error);
      toast.error("Failed to update show");
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingShow(null);
    setFormData({
      name: "",
      venue: "",
      city: "",
      date: "",
      time: "",
      ticket_url: "",
      description: "",
      is_active: true,
    });
  };

  const openEditDialog = (show: Show) => {
    setEditingShow(show);
    setFormData({
      name: show.name,
      venue: show.venue,
      city: show.city,
      date: show.date,
      time: show.time || "",
      ticket_url: show.ticket_url || "",
      description: show.description || "",
      is_active: show.is_active,
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingShow(null);
    setFormData({
      name: "",
      venue: "",
      city: "",
      date: "",
      time: "",
      ticket_url: "",
      description: "",
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Shows</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your shows and events
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
          <h1 className="font-playfair text-3xl text-foreground">Shows</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {shows.length} show{shows.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Show
        </Button>
      </div>

      {shows.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 border border-border rounded-lg">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No shows yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your upcoming shows and events
          </p>
          <Button onClick={openAddDialog} variant="outline" className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add Show
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {shows.map((show) => (
            <div
              key={show.id}
              className={`flex items-center gap-4 p-4 bg-card border border-border rounded-lg ${
                !show.is_active ? "opacity-60" : ""
              }`}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground uppercase">
                  {new Date(show.date).toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-xl font-bold text-foreground">
                  {new Date(show.date).getDate()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground truncate">
                    {show.name}
                  </h3>
                  {!show.is_active && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">
                    {show.venue}, {show.city}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(show.date)}
                  {show.time && ` at ${show.time}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {show.ticket_url && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => window.open(show.ticket_url!, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => toggleActive(show)}
                >
                  {show.is_active ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => openEditDialog(show)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  onClick={() => setDeleteShow(show)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-playfair">
              {editingShow ? "Edit Show" : "Add Show"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Show Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Stand-Up Night"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Venue *</Label>
                <Input
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, venue: e.target.value }))
                  }
                  placeholder="The Comedy Store"
                />
              </div>
              <div className="space-y-2">
                <Label>City *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Los Angeles, CA"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, time: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ticket URL</Label>
              <Input
                value={formData.ticket_url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ticket_url: e.target.value }))
                }
                placeholder="https://tickets.example.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Optional show details..."
                className="min-h-[80px]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label>Visible on website</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? "Saving..." : editingShow ? "Save Changes" : "Add Show"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteShow} onOpenChange={() => setDeleteShow(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Show</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteShow?.name}"? This action
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

export default ShowsAdmin;
