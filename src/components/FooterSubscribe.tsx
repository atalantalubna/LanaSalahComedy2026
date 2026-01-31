import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, CheckCircle2, PartyPopper } from "lucide-react";

// Generate random math problem
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, answer: num1 + num2 };
};

const subscribeSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }).max(50),
  lastName: z.string().trim().min(1, { message: "Last name is required" }).max(50),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  phone: z.string().trim().min(10, { message: "Please enter a valid phone number" }).max(20),
  captcha: z.string().min(1, { message: "Please complete verification" }),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

const FooterSubscribe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [subscriberName, setSubscriberName] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeFormData) => {
    // Check honeypot
    if (honeypot) {
      toast({
        title: "Error",
        description: "Submission blocked.",
        variant: "destructive",
      });
      return;
    }

    // Verify CAPTCHA
    if (parseInt(data.captcha) !== captcha.answer) {
      toast({
        title: "Verification failed",
        description: "Please solve the math problem correctly.",
        variant: "destructive",
      });
      setCaptcha(generateCaptcha());
      setValue("captcha", "");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("subscribers").insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "This email is already on our list!",
          });
        } else {
          throw error;
        }
      } else {
        setSubscriberName(data.firstName);
        setIsSuccess(true);
        toast({
          title: "You're in!",
          description: "You'll be the first to know about shows in your area.",
        });
        reset();
        setCaptcha(generateCaptcha());
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
      setCaptcha(generateCaptcha());
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success confirmation state
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-4 mb-12 animate-fade-in">
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <PartyPopper className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>
        <h3 className="text-xl font-playfair text-foreground">
          You're on the list, {subscriberName}!
        </h3>
        <p className="text-sm text-muted-foreground">
          Thanks for subscribing! You'll be the first to know about upcoming shows in your area.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-xs uppercase tracking-widest font-inter"
        >
          Subscribe Another Email
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto text-center space-y-4 mb-12">
      <h3 className="text-[11px] uppercase tracking-widest text-foreground font-inter font-medium">
        Subscribe for Updates
      </h3>
      <p className="text-sm text-muted-foreground">
        Join our mailing list and get notified when we have shows in your area
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

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

        {/* Human Verification */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {captcha.num1} + {captcha.num2} =
          </span>
          <Input
            type="number"
            placeholder="?"
            {...register("captcha")}
            className="w-16 bg-background border-input text-foreground text-center"
          />
        </div>
        {errors.captcha && (
          <p className="text-xs text-destructive">{errors.captcha.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-medium px-8 rounded-full shadow-lg"
        >
          {isSubmitting ? "..." : "Yay Human Connection!"}
        </Button>
      </form>
    </div>
  );
};

export default FooterSubscribe;
