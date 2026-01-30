import { Quote } from "lucide-react";

interface ReviewCardProps {
  quote: string;
  name: string;
  relationship: "press" | "peer" | "audience";
  date?: string;
}

const relationshipLabels = {
  press: "Press",
  peer: "Industry",
  audience: "Audience",
};

const ReviewCard = ({ quote, name, relationship, date }: ReviewCardProps) => {
  return (
    <div className="text-center px-4 py-8">
      <Quote size={24} className="mx-auto text-muted-foreground/40 mb-4" />
      <blockquote className="text-sm md:text-base leading-relaxed text-foreground mb-6 italic max-w-2xl mx-auto">
        "{quote}"
      </blockquote>
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-widest text-foreground font-inter font-medium">
          {name}
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-inter">
            {relationshipLabels[relationship]}
          </span>
          {date && (
            <>
              <span className="text-muted-foreground/30">|</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-inter">
                {date}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
