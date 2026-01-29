import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  source: string;
  publication?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Lana Salah delivers the kind of sharp, unflinching comedy that makes you laugh and think in equal measure.",
    source: "Comedy Festival Review",
    publication: "LA Weekly",
  },
  {
    id: "2",
    quote: "A fresh voice in stand-up. Her material on identity and culture is both hilarious and deeply insightful.",
    source: "Festival Programmer",
    publication: "Just For Laughs",
  },
  {
    id: "3",
    quote: "Fearless comedy that channels the spirit of the greats while remaining completely original.",
    source: "Industry Review",
    publication: "The Comedy Bureau",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-20 bg-muted/30">
      <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter text-center mb-12">
        PRESS & REVIEWS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="text-center px-4">
            <Quote size={24} className="mx-auto text-muted-foreground/40 mb-4" />
            <blockquote className="text-sm leading-relaxed text-foreground mb-4 italic">
              "{testimonial.quote}"
            </blockquote>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                {testimonial.source}
              </p>
              {testimonial.publication && (
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-inter">
                  {testimonial.publication}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
