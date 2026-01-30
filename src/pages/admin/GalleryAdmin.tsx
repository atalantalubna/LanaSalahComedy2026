import { useState, useEffect, useRef } from "react";
import {
  ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Upload,
  X,
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

interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  aspect_ratio: string;
  category: string | null;
  display_order: number | null;
  created_at: string;
  location?: string | null;
}

const categories = [
  { value: "performance", label: "Performance" },
  { value: "studio", label: "Studio" },
  { value: "candid", label: "Candid" },
  { value: "press", label: "Press" },
];

const aspectRatios = [
  { value: "square", label: "Square" },
  { value: "tall", label: "Portrait (Tall)" },
  { value: "wide", label: "Landscape (Wide)" },
];

const GalleryAdmin = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deleteImage, setDeleteImage] = useState<GalleryImage | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "performance",
    aspect_ratio: "square",
    image_url: "",
  });

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!editingImage && !selectedFile && !formData.image_url) {
      toast.error("Please select an image or provide a URL");
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload file if selected
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      if (editingImage) {
        const { error } = await supabase
          .from("gallery_images")
          .update({
            title: formData.title || null,
            location: formData.location || null,
            category: formData.category,
            aspect_ratio: formData.aspect_ratio,
            image_url: imageUrl || editingImage.image_url,
          })
          .eq("id", editingImage.id);

        if (error) throw error;
        toast.success("Image updated");
      } else {
        const { error } = await supabase.from("gallery_images").insert({
          title: formData.title || null,
          location: formData.location || null,
          category: formData.category,
          aspect_ratio: formData.aspect_ratio,
          image_url: imageUrl,
          display_order: images.length,
        });

        if (error) throw error;
        toast.success("Image added");
      }

      closeDialog();
      fetchImages();
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to save image. Make sure storage bucket exists.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteImage) return;

    try {
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", deleteImage.id);

      if (error) throw error;

      setImages((prev) => prev.filter((img) => img.id !== deleteImage.id));
      toast.success("Image deleted");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setDeleteImage(null);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingImage(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData({
      title: "",
      location: "",
      category: "performance",
      aspect_ratio: "square",
      image_url: "",
    });
  };

  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title || "",
      location: image.location || "",
      category: image.category || "performance",
      aspect_ratio: image.aspect_ratio || "square",
      image_url: image.image_url,
    });
    setPreviewUrl(image.image_url);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingImage(null);
    setFormData({
      title: "",
      location: "",
      category: "performance",
      aspect_ratio: "square",
      image_url: "",
    });
    setPreviewUrl(null);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Gallery</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage gallery images
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
          <h1 className="font-playfair text-3xl text-foreground">Gallery</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {images.length} image{images.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Image
        </Button>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 border border-border">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No images yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload images to your gallery
          </p>
          <Button onClick={openAddDialog} variant="outline" className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add Image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative bg-card border border-border overflow-hidden"
            >
              <div className="aspect-square">
                <img
                  src={image.image_url}
                  alt={image.title || "Gallery image"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={() => openEditDialog(image)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 hover:bg-red-600 hover:text-white"
                    onClick={() => setDeleteImage(image)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  {image.title && (
                    <p className="text-white text-sm font-medium truncate">
                      {image.title}
                    </p>
                  )}
                  {image.location && (
                    <p className="text-white/70 text-xs truncate">
                      {image.location}
                    </p>
                  )}
                  <p className="text-white/50 text-xs mt-1 capitalize">
                    {image.category} • {image.aspect_ratio}
                  </p>
                </div>
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
              {editingImage ? "Edit Image" : "Add Image"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Image Upload/Preview */}
            <div className="space-y-2">
              <Label>Image</Label>
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full aspect-video object-cover border"
                  />
                  {!editingImage && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                        setFormData((prev) => ({ ...prev, image_url: "" }));
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload image
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Or use URL */}
            {!selectedFile && !editingImage && (
              <div className="space-y-2">
                <Label>Or paste image URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, image_url: e.target.value }));
                    if (e.target.value) setPreviewUrl(e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="The Comedy Store"
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="West Hollywood, CA"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select
                  value={formData.aspect_ratio}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, aspect_ratio: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ar) => (
                      <SelectItem key={ar.value} value={ar.value}>
                        {ar.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isUploading}>
              {isUploading
                ? "Uploading..."
                : editingImage
                ? "Save Changes"
                : "Add Image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteImage} onOpenChange={() => setDeleteImage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
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

export default GalleryAdmin;
