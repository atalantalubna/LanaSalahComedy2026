import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReviewCard from "./ReviewCard";

interface Review {
  id: string;
  name: string;
  relationship: "press" | "peer" | "audience";
  review_text: string;
  created_at: string;
}

// Sample reviews to show before real reviews are added
const sampleReviews: Review[] = [
  {
    id: "sample-1",
    name: "Sarah Chen",
    relationship: "press",
    review_text:
      "Lana Salah delivers the kind of sharp, unflinching comedy that makes you laugh and think in equal measure. Her takes on identity and belonging are both hilarious and deeply resonant.",
    created_at: "2025-12-15T00:00:00Z",
  },
  {
    id: "sample-2",
    name: "Marcus Williams",
    relationship: "peer",
    review_text:
      "I've shared stages with a lot of comics, but Lana's timing and presence are next level. She commands the room from the first word and doesn't let go until the last laugh.",
    created_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "sample-3",
    name: "Jamie Rodriguez",
    relationship: "audience",
    review_text:
      "Saw her at The Comedy Store last month and I'm still thinking about her set. The way she weaves personal stories with sharp political commentary is unlike anything I've seen. Already bought tickets to her next show.",
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "sample-4",
    name: "Rachel Foster",
    relationship: "press",
    review_text:
      "A fresh voice in stand-up comedy. Salah's material on culture, family, and the immigrant experience is both hilarious and deeply insightful. One to watch.",
    created_at: "2025-10-05T00:00:00Z",
  },
  {
    id: "sample-5",
    name: "David Park",
    relationship: "peer",
    review_text:
      "Lana is fearless on stage. She goes places other comics won't, and she does it with such charm that you're laughing before you even realize she just said something profound.",
    created_at: "2025-09-18T00:00:00Z",
  },
];

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("id, name, relationship, review_text, created_at")
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Use database reviews if available, otherwise use samples
        if (data && data.length > 0) {
          setReviews(data);
        } else {
          setReviews(sampleReviews);
        }
      } catch (error) {
        // If database fetch fails, use sample reviews
        console.error("Error fetching reviews:", error);
        setReviews(sampleReviews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-rotate every 5 seconds when not hovered
  useEffect(() => {
    if (!emblaApi || isHovered || reviews.length <= 1) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi, isHovered, reviews.length]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-20 bg-muted/30">
        <h2 className="text-xl md:text-2xl uppercase tracking-widest text-foreground font-playfair text-center mb-12">
          Press, Peers & Audience
        </h2>
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-muted-foreground text-sm">
            Loading reviews...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-20 bg-muted/30">
      <h2 className="text-xl md:text-2xl uppercase tracking-widest text-foreground font-playfair text-center mb-12">
        Press, Peers & Audience
      </h2>

      <div
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {reviews.map((review) => (
              <div key={review.id} className="flex-[0_0_100%] min-w-0">
                <ReviewCard
                  quote={review.review_text}
                  name={review.name}
                  relationship={review.relationship}
                  date={formatDate(review.created_at)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  selectedIndex === index
                    ? "bg-foreground"
                    : "bg-foreground/20"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewCarousel;
