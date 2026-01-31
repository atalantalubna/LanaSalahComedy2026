import { useState, useEffect } from "react";
import { MessageSquare, Copy, Check, X, Trash2, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string;
  email: string | null;
  relationship: "press" | "peer" | "audience";
  review_text: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const relationshipLabels = {
  press: "Press",
  peer: "Industry",
  audience: "Audience",
};

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteReview, setDeleteReview] = useState<Review | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "" as "press" | "peer" | "audience" | "",
    review_text: "",
  });

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const copyReviewLink = () => {
    const link = `${window.location.origin}/submit-review`;
    navigator.clipboard.writeText(link);
    toast.success("Review link copied!");
  };

  const resetForm = () => {
    setFormData({ name: "", relationship: "", review_text: "" });
  };

  const handleAddReview = async () => {
    if (!formData.name.trim() || !formData.relationship || !formData.review_text.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert({
          name: formData.name.trim(),
          relationship: formData.relationship,
          review_text: formData.review_text.trim(),
          status: "approved", // Admin-added reviews are auto-approved
        })
        .select()
        .single();

      if (error) throw error;

      setReviews((prev) => [data, ...prev]);
      toast.success("Review added and approved");
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    } finally {
      setIsSaving(false);
    }
  };

  const updateReviewStatus = async (
    reviewId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ status })
        .eq("id", reviewId);

      if (error) throw error;

      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
      );
      toast.success(`Review ${status}`);
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  const handleDelete = async () => {
    if (!deleteReview) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", deleteReview.id);

      if (error) throw error;

      setReviews((prev) => prev.filter((r) => r.id !== deleteReview.id));
      toast.success("Review deleted");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    } finally {
      setDeleteReview(null);
    }
  };

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((r) => r.status === activeTab);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage testimonials and reviews
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage testimonials and reviews
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={copyReviewLink} className="gap-2">
            <Copy className="w-4 h-4" />
            Copy Review Link
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Review
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-muted/30 border border-border p-4">
          <p className="text-2xl font-playfair">{reviews.length}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Total
          </p>
        </div>
        <div className="bg-muted/30 border border-border p-4">
          <p className="text-2xl font-playfair">
            {reviews.filter((r) => r.status === "pending").length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Pending
          </p>
        </div>
        <div className="bg-muted/30 border border-border p-4">
          <p className="text-2xl font-playfair">
            {reviews.filter((r) => r.status === "approved").length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Approved
          </p>
        </div>
        <div className="bg-muted/30 border border-border p-4">
          <p className="text-2xl font-playfair">
            {reviews.filter((r) => r.status === "rejected").length}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Rejected
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({reviews.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({reviews.filter((r) => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({reviews.filter((r) => r.status === "approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({reviews.filter((r) => r.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 border border-border">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No reviews yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Share your review link to start collecting testimonials
              </p>
              <Button
                variant="outline"
                onClick={copyReviewLink}
                className="mt-4 gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Review Link
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="max-w-xs">Preview</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {relationshipLabels[review.relationship]}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate text-sm text-muted-foreground">
                        {review.review_text}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === "approved"
                            ? "default"
                            : review.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(review.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => setSelectedReview(review)}
                          title="View full review"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {review.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() =>
                              updateReviewStatus(review.id, "approved")
                            }
                            title="Approve review"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        {review.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() =>
                              updateReviewStatus(review.id, "rejected")
                            }
                            title="Reject review"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                          onClick={() => setDeleteReview(review)}
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>

      {/* View Review Dialog */}
      <Dialog
        open={!!selectedReview}
        onOpenChange={() => setSelectedReview(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-playfair">Review Details</DialogTitle>
            <DialogDescription>
              Submitted by {selectedReview?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Type
                  </p>
                  <Badge variant="secondary">
                    {relationshipLabels[selectedReview.relationship]}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <Badge
                    variant={
                      selectedReview.status === "approved"
                        ? "default"
                        : selectedReview.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {selectedReview.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Date
                  </p>
                  <p>{formatDate(selectedReview.created_at)}</p>
                </div>
                {selectedReview.email && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p>{selectedReview.email}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">
                  Review
                </p>
                <blockquote className="text-sm leading-relaxed italic border-l-2 border-muted pl-4">
                  "{selectedReview.review_text}"
                </blockquote>
              </div>
              <div className="flex gap-2 pt-4">
                {selectedReview.status !== "approved" && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      updateReviewStatus(selectedReview.id, "approved");
                      setSelectedReview(null);
                    }}
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </Button>
                )}
                {selectedReview.status !== "rejected" && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      updateReviewStatus(selectedReview.id, "rejected");
                      setSelectedReview(null);
                    }}
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteReview}
        onOpenChange={() => setDeleteReview(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review from {deleteReview?.name}? This action cannot be undone.
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

      {/* Add Review Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-playfair">Add Review</DialogTitle>
            <DialogDescription>
              Manually add a testimonial. It will be auto-approved.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label>Type *</Label>
              <Select
                value={formData.relationship}
                onValueChange={(value: "press" | "peer" | "audience") =>
                  setFormData((prev) => ({ ...prev, relationship: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="press">Press / Media</SelectItem>
                  <SelectItem value="peer">Fellow Comedian / Industry</SelectItem>
                  <SelectItem value="audience">Audience Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Review *</Label>
              <Textarea
                value={formData.review_text}
                onChange={(e) => setFormData((prev) => ({ ...prev, review_text: e.target.value }))}
                placeholder="Write the testimonial here..."
                className="min-h-[120px]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReview} disabled={isSaving}>
              {isSaving ? "Adding..." : "Add Review"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
