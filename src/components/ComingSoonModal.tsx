import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ComingSoonModal = ({ open, onOpenChange }: ComingSoonModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "You're on the list!",
      description: "We'll notify you when the deep dive launches.",
    });
    
    setEmail("");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="font-playfair text-2xl md:text-3xl text-foreground">
            Coming Soon
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            A deep dive into why laughter connects us all—exploring the power of comedy 
            to bridge divides and transform tension into understanding.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
              What to expect
            </p>
            <ul className="text-sm text-foreground/80 space-y-2">
              <li>• Essays on comedy as social commentary</li>
              <li>• Behind-the-scenes of crafting satire</li>
              <li>• Conversations with fellow comedians</li>
              <li>• The art of finding humor in darkness</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter text-center">
              Get notified at launch
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background border-input text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {isSubmitting ? "..." : "Notify Me"}
              </Button>
            </div>
          </form>

          <p className="text-xs text-center text-muted-foreground italic">
            "The best comedy makes you laugh at yourself while questioning everything else."
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonModal;
