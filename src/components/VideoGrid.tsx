import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import lanaLogo from "@/assets/lana-hero.png";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: "performance" | "clip" | "podcast";
  embedUrl?: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Set at The Comedy Store",
    thumbnail: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "12:34",
    category: "performance",
  },
  {
    id: "2",
    title: "Political Satire - Identity",
    thumbnail: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "5:42",
    category: "clip",
  },
  {
    id: "3",
    title: "Family Stories",
    thumbnail: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "7:18",
    category: "clip",
  },
  {
    id: "4",
    title: "Live at Laugh Factory",
    thumbnail: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "15:22",
    category: "performance",
  },
  {
    id: "5",
    title: "Podcast Appearance - Comedy Talk",
    thumbnail: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "45:00",
    category: "podcast",
  },
  {
    id: "6",
    title: "Cultural Commentary",
    thumbnail: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "6:55",
    category: "clip",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "performance", label: "Performances" },
  { id: "clip", label: "Clips" },
  { id: "podcast", label: "Podcasts" },
];

const VideoGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  // Prevent right-click on thumbnails
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Prevent drag
  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    return false;
  }, []);

  const filteredVideos = activeCategory === "all"
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-20">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-inter text-center mb-8">
        VIDEOS
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs uppercase tracking-widest font-inter transition-colors ${
              activeCategory === cat.id
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group cursor-pointer"
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <div
              className="relative aspect-video overflow-hidden bg-muted select-none"
              onContextMenu={handleContextMenu}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                className={`w-full h-full object-cover transition-all duration-300 pointer-events-none ${
                  hoveredVideo === video.id ? "scale-105" : ""
                }`}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              />

              {/* Logo Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                  src={lanaLogo}
                  alt=""
                  className="w-12 md:w-16 opacity-20"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />
              </div>

              {/* Play Overlay */}
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                hoveredVideo === video.id ? "opacity-100" : "opacity-0"
              }`}>
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={24} className="text-foreground ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 font-inter">
                {video.duration}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-medium text-foreground">{video.title}</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {video.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VideoGrid;
