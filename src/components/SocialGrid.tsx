import { useState, useRef, useEffect } from "react";
import { Instagram, Youtube, Music2, ExternalLink } from "lucide-react";

interface SocialPost {
  id: string;
  type: "instagram" | "upscroll" | "youtube";
  embedUrl: string;
  thumbnail?: string;
  caption?: string;
  size: "small" | "medium" | "large" | "wide";
}

const socialPosts: SocialPost[] = [
  {
    id: "1",
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/example1/embed",
    caption: "When your family asks about your career choices...",
    size: "large",
  },
  {
    id: "2",
    type: "upscroll",
    embedUrl: "https://upscroll.com/embed/example1",
    caption: "POV: You're explaining comedy to your parents",
    size: "medium",
  },
  {
    id: "3",
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caption: "Stand-up clip from The Comedy Store",
    size: "wide",
  },
  {
    id: "4",
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/example2/embed",
    caption: "Cultural observations at the grocery store",
    size: "small",
  },
  {
    id: "5",
    type: "upscroll",
    embedUrl: "https://upscroll.com/embed/example2",
    caption: "Dating in LA be like...",
    size: "medium",
  },
  {
    id: "6",
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caption: "Full set from Laugh Factory",
    size: "large",
  },
  {
    id: "7",
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/example3/embed",
    caption: "Behind the scenes at a festival",
    size: "medium",
  },
  {
    id: "8",
    type: "upscroll",
    embedUrl: "https://upscroll.com/embed/example3",
    caption: "When the crowd finally gets it",
    size: "small",
  },
  {
    id: "9",
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caption: "Podcast appearance highlights",
    size: "wide",
  },
  {
    id: "10",
    type: "instagram",
    embedUrl: "https://www.instagram.com/reel/example4/embed",
    caption: "New material testing",
    size: "small",
  },
];

const platformIcons = {
  instagram: Instagram,
  upscroll: Music2,
  youtube: Youtube,
};

const platformColors = {
  instagram: "from-pink-500 to-purple-600",
  upscroll: "from-emerald-500 to-teal-600",
  youtube: "from-red-600 to-red-500",
};

const platformLabels = {
  instagram: "Instagram Reel",
  upscroll: "Upscroll",
  youtube: "YouTube",
};

const SocialCard = ({ post }: { post: SocialPost }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Icon = platformIcons[post.type];

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2 md:col-span-1",
    large: "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
    wide: "col-span-1 md:col-span-2 row-span-1",
  };

  const aspectClasses = {
    small: "aspect-square",
    medium: "aspect-[9/16]",
    large: "aspect-[9/16] md:aspect-square",
    wide: "aspect-video",
  };

  return (
    <div
      ref={cardRef}
      className={`${sizeClasses[post.size]} group relative overflow-hidden bg-secondary/30 transition-all duration-300 hover:shadow-lg`}
    >
      <div className={`relative w-full h-full ${aspectClasses[post.size]}`}>
        {/* Platform Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full">
          <Icon size={12} className="text-foreground" />
          <span className="text-[10px] uppercase tracking-wider text-foreground font-medium">
            {platformLabels[post.type]}
          </span>
        </div>

        {/* Lazy Load Placeholder / Embed */}
        {isInView ? (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              </div>
            )}
            <iframe
              src={post.embedUrl}
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              allowFullScreen
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              title={post.caption || `${post.type} post`}
            />
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${platformColors[post.type]} flex items-center justify-center`}>
            <Icon size={48} className="text-white/50" />
          </div>
        )}

        {/* Hover Overlay with Caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {post.caption && (
              <p className="text-white text-sm font-medium line-clamp-2">
                {post.caption}
              </p>
            )}
          </div>
        </div>

        {/* External Link */}
        <button className="absolute top-3 right-3 z-20 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background">
          <ExternalLink size={14} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

const SocialGrid = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 pb-20">
      {/* Platform Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {["All", "Instagram", "Upscroll", "YouTube"].map((platform) => (
          <button
            key={platform}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-inter transition-all duration-300 ${
              platform === "All"
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[250px]">
        {socialPosts.map((post) => (
          <SocialCard key={post.id} post={post} />
        ))}
      </div>

      {/* Social Links CTA */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-6">
          Follow for more content
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://instagram.com/thelanasalah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram size={20} />
            <span className="text-xs uppercase tracking-wider">@thelanasalah</span>
          </a>
          <a
            href="https://upscroll.com/thelanasalah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Music2 size={20} />
            <span className="text-xs uppercase tracking-wider">Upscroll</span>
          </a>
          <a
            href="https://youtube.com/@thelanasalah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Youtube size={20} />
            <span className="text-xs uppercase tracking-wider">YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialGrid;
