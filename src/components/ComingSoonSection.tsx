import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const notifySchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
});

type NotifyFormData = z.infer<typeof notifySchema>;

const ComingSoonSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotifyFormData>({
    resolver: zodResolver(notifySchema),
  });

  const onSubmit = async (data: NotifyFormData) => {
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "You're on the list!",
      description: "We'll notify you when The Lana Salah Show launches.",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
        {/* Heading */}
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
          COMING SOON
        </p>
        
        <h2 className="font-playfair text-3xl md:text-4xl text-foreground">
          THE LANA SALAH SHOW
        </h2>
        
        {/* Description */}
        <p className="text-sm text-foreground/70 leading-relaxed max-w-xl mx-auto">
          A world viewed through the lens of the oldest and most universal art form—comedy. 
          The only true medium that can diffuse tension between vastly different humans and perspectives. 
          Coming soon—a deep dive into why laughter connects us all.
        </p>

        {/* Email Signup */}
        <div className="pt-4 space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
            Get Notified at Launch
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1 text-left">{errors.email.message}</p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap"
            >
              {isSubmitting ? "..." : "Notify Me"}
            </Button>
          </form>
        </div>

        {/* Quote */}
        <p className="text-xs text-muted-foreground italic pt-4">
          "The best comedy makes you laugh at yourself while questioning everything else."
        </p>
      </div>
    </section>
  );
};

export default ComingSoonSection;
