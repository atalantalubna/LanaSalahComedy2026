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

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("id, name, relationship, review_text, created_at")
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
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
    }, 5000);

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
        <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter text-center mb-12">
          PRESS & REVIEWS
        </h2>
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-muted-foreground text-sm">
            Loading reviews...
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-20 bg-muted/30">
        <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter text-center mb-12">
          PRESS & REVIEWS
        </h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            Reviews coming soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-20 bg-muted/30">
      <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter text-center mb-12">
        PRESS & REVIEWS
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
                  emblaApi?.selectedScrollSnap() === index
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
