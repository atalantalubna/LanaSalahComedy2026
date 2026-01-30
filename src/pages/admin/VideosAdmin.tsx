import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideosAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl text-foreground">Videos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage video library
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Video
        </Button>
      </div>

      <div className="text-center py-12 bg-muted/30 border border-border">
        <Play className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">Video management coming soon</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add YouTube and Vimeo videos
        </p>
      </div>
    </div>
  );
};

export default VideosAdmin;
