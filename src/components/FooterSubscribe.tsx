import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const subscribeSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }).max(50),
  lastName: z.string().trim().min(1, { message: "Last name is required" }).max(50),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  phone: z.string().trim().min(10, { message: "Please enter a valid phone number" }).max(20),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

const FooterSubscribe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeFormData) => {
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "You're in!",
      description: "You'll be the first to know about shows in your area.",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto text-center space-y-4 mb-12">
      <h3 className="text-[11px] uppercase tracking-widest text-foreground font-inter font-medium">
        Subscribe for Updates
      </h3>
      <p className="text-sm text-muted-foreground">
        Join our mailing list and get notified when we have shows in your area
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Input
              type="text"
              placeholder="First Name *"
              {...register("firstName")}
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
            {errors.firstName && (
              <p className="text-xs text-destructive mt-1 text-left">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Last Name *"
              {...register("lastName")}
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
            {errors.lastName && (
              <p className="text-xs text-destructive mt-1 text-left">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Input
              type="email"
              placeholder="Email *"
              {...register("email")}
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1 text-left">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Phone Number *"
              {...register("phone")}
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
            {errors.phone && (
              <p className="text-xs text-destructive mt-1 text-left">{errors.phone.message}</p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium px-8"
        >
          {isSubmitting ? "..." : "Let Me In!"}
        </Button>
      </form>
    </div>
  );
};

export default FooterSubscribe;
