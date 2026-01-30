import { useState, useCallback } from "react";

// Import gallery images and logo
import lanaLogo from "@/assets/lana-hero.png";
import lanaStage1 from "@/assets/gallery/lana-stage-1.jpg";
import lanaHeadshot1 from "@/assets/gallery/lana-headshot-1.jpg";
import lanaFestival1 from "@/assets/gallery/lana-festival-1.jpg";
import lanaPortraitCloseup from "@/assets/gallery/lana-portrait-closeup.jpg";
import lanaBackstage1 from "@/assets/gallery/lana-backstage-1.jpg";
import lanaStage2 from "@/assets/gallery/lana-stage-2.jpg";
import lanaEditorialLa from "@/assets/gallery/lana-editorial-la.jpg";
import lanaGreenroom from "@/assets/gallery/lana-greenroom.jpg";
import lanaBwPortrait from "@/assets/gallery/lana-bw-portrait.jpg";
import lanaTheaterEntrance from "@/assets/gallery/lana-theater-entrance.jpg";
import lanaRooftop from "@/assets/gallery/lana-rooftop.jpg";
import lanaPodcast from "@/assets/gallery/lana-podcast.jpg";

interface GalleryImage {
  id: string;
  title: string;
  location: string;
  image_url: string;
  aspect_ratio: "tall" | "wide" | "square";
  category: "performance" | "studio" | "candid" | "press";
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "The Comedy Store",
    location: "West Hollywood, CA",
    image_url: lanaStage1,
    aspect_ratio: "tall",
    category: "performance",
  },
  {
    id: "2",
    title: "Studio Headshot",
    location: "Los Angeles, CA",
    image_url: lanaHeadshot1,
    aspect_ratio: "square",
    category: "studio",
  },
  {
    id: "3",
    title: "Comedy Festival",
    location: "Austin, TX",
    image_url: lanaFestival1,
    aspect_ratio: "wide",
    category: "performance",
  },
  {
    id: "4",
    title: "Golden Hour",
    location: "Santa Monica, CA",
    image_url: lanaPortraitCloseup,
    aspect_ratio: "tall",
    category: "studio",
  },
  {
    id: "5",
    title: "Backstage Prep",
    location: "Hollywood, CA",
    image_url: lanaBackstage1,
    aspect_ratio: "square",
    category: "candid",
  },
  {
    id: "6",
    title: "Laugh Factory Set",
    location: "Hollywood, CA",
    image_url: lanaStage2,
    aspect_ratio: "tall",
    category: "performance",
  },
  {
    id: "7",
    title: "Los Angeles Editorial",
    location: "Downtown LA",
    image_url: lanaEditorialLa,
    aspect_ratio: "wide",
    category: "press",
  },
  {
    id: "8",
    title: "Green Room Vibes",
    location: "The Improv, LA",
    image_url: lanaGreenroom,
    aspect_ratio: "tall",
    category: "candid",
  },
  {
    id: "9",
    title: "Black & White Portrait",
    location: "Los Angeles, CA",
    image_url: lanaBwPortrait,
    aspect_ratio: "square",
    category: "studio",
  },
  {
    id: "10",
    title: "Grand Theater Performance",
    location: "The Wiltern, LA",
    image_url: lanaTheaterEntrance,
    aspect_ratio: "wide",
    category: "performance",
  },
  {
    id: "11",
    title: "LA Rooftop",
    location: "DTLA Rooftop",
    image_url: lanaRooftop,
    aspect_ratio: "tall",
    category: "press",
  },
  {
    id: "12",
    title: "Podcast Recording",
    location: "Studio City, CA",
    image_url: lanaPodcast,
    aspect_ratio: "square",
    category: "candid",
  },
];

const GalleryMasonry = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

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
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const aspectClasses: Record<string, string> = {
    tall: "row-span-2",
    wide: "md:col-span-2",
    square: "",
  };

  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 pb-20">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-inter transition-all duration-300 ${
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[250px]">
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
                alt={image.title}
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 pointer-events-none ${
                  loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                }`}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              />

              {/* Logo Watermark - always visible */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ userSelect: 'none' }}
              >
                <img
                  src={lanaLogo}
                  alt=""
                  className="w-16 md:w-20 opacity-20 rotate-[-15deg]"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />
              </div>

              {/* Hover Overlay with title and location */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium mb-1">
                    {image.title}
                  </p>
                  <span className="text-white/80 text-xs font-inter">
                    {image.location}
                  </span>
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
