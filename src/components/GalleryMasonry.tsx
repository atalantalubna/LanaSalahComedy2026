import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  aspect_ratio: string;
  category: string | null;
  display_order: number | null;
}

const GalleryMasonry = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching gallery images:", error);
      } else {
        setImages(data || []);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  // Prevent right-click on images
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Prevent drag
  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    return false;
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const categories = ["all", "performance", "studio", "candid", "press"];

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const aspectClasses: Record<string, string> = {
    tall: "row-span-2",
    wide: "md:col-span-2",
    square: "",
  };

  if (loading) {
    return (
      <section className="max-w-[1600px] mx-auto px-3 md:px-5 pb-20">
        <div className="flex justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Skeleton key={cat} className="h-10 w-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {[...Array(9)].map((_, i) => (
            <Skeleton
              key={i}
              className={`${i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 pb-20">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-inter transition-all duration-200 ${
              selectedCategory === category
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={`relative overflow-hidden group cursor-pointer bg-secondary/30 select-none ${aspectClasses[image.aspect_ratio]}`}
            onContextMenu={handleContextMenu}
          >
            <div className="relative w-full h-full">
              {/* Blurred placeholder */}
              <div 
                className={`absolute inset-0 bg-secondary transition-opacity duration-500 ${
                  loadedImages.has(image.id) ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  backgroundImage: `url(${image.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)',
                }}
              />
              
              {/* Image */}
              <img
                src={image.image_url}
                alt={image.title || "Gallery image"}
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 pointer-events-none ${
                  loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                }`}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              />

              {/* Watermark overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ userSelect: 'none' }}
              >
                <span className="text-white/30 text-lg md:text-xl font-inter uppercase tracking-widest rotate-[-25deg]">
                  lanasalah.com
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {image.title && (
                    <p className="text-white text-sm font-medium">
                      {image.title}
                    </p>
                  )}
                  {image.category && (
                    <span className="text-white/70 text-xs uppercase tracking-wider">
                      {image.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No images in this category yet.</p>
        </div>
      )}
    </section>
  );
};

export default GalleryMasonry;
