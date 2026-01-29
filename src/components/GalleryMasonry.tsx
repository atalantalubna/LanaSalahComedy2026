import { useState, useEffect, useRef } from "react";
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

  const aspectRatioStyles: Record<string, string> = {
    tall: "aspect-[3/4]",
    wide: "aspect-[16/9]",
    square: "aspect-square",
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
            className={`relative overflow-hidden group cursor-pointer bg-secondary/30 ${aspectClasses[image.aspect_ratio]}`}
          >
            <div className={`relative w-full h-full`}>
              {/* Loading skeleton */}
              {!loadedImages.has(image.id) && (
                <div className="absolute inset-0 bg-secondary animate-pulse" />
              )}
              
              {/* Image */}
              <img
                src={image.image_url}
                alt={image.title || "Gallery image"}
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                }`}
              />

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
