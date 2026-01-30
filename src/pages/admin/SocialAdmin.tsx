import { Share2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Social Links</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage social media links
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </Button>
      </div>

      <div className="text-center py-12 bg-muted/30 border border-border">
        <Share2 className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">Social links management coming soon</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add and organize your social media profiles
        </p>
      </div>
    </div>
  );
};

export default SocialAdmin;
