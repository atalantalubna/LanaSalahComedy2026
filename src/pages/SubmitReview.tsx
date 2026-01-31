import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Quote, ShieldCheck } from "lucide-react";

// Generate random math problem
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, answer: num1 + num2 };
};

const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  relationship: z.enum(["press", "peer", "audience"], {
    required_error: "Please select how you know Lana's work",
  }),
  where_seen: z.string().optional(),
  how_found: z.string().optional(),
  review: z
    .string()
    .trim()
    .min(10, { message: "Review must be at least 10 characters" })
    .max(1000, { message: "Review must be less than 1000 characters" }),
  permission: z.boolean().refine((val) => val === true, {
    message: "You must agree to allow your review to be displayed",
  }),
  captcha: z.string().min(1, { message: "Please complete the verification" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface Show {
  id: string;
  name: string;
  venue: string;
  date: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const SubmitReview = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [shows, setShows] = useState<Show[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const { toast } = useToast();

  // Honeypot field for additional bot protection
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    // Fetch shows for dropdown
    const fetchShows = async () => {
      try {
        const { data } = await supabase
          .from("shows")
          .select("id, name, venue, date")
          .eq("is_active", true)
          .order("date", { ascending: false });
        setShows(data || []);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    // Fetch social links for dropdown
    const fetchSocialLinks = async () => {
      try {
        const { data } = await supabase
          .from("social_links")
          .select("id, platform, url")
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        setSocialLinks(data || []);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchShows();
    fetchSocialLinks();
  }, []);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      relationship: undefined,
      where_seen: "",
      how_found: "",
      review: "",
      permission: false,
      captcha: "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    // Check honeypot (bots will fill this)
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
      form.setValue("captcha", "");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        name: data.name,
        email: data.email,
        relationship: data.relationship,
        review_text: data.review,
        where_seen: data.where_seen || null,
        how_found: data.how_found || null,
        status: "pending",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Review submitted",
        description:
          "Thank you for your review! It will be displayed after approval.",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
      setCaptcha(generateCaptcha());
    } finally {
      setIsSubmitting(false);
    }
  };

  const relationshipLabels = {
    press: "Press / Media",
    peer: "Fellow Comedian / Industry",
    audience: "Audience Member",
  };

  if (isSubmitted) {
    return (
      <>
        <SEO
          title="Review Submitted - Lana Salah"
          description="Thank you for submitting your review."
          canonicalUrl="/submit-review"
        />

        <ComedyHeader />

        <main className="min-h-screen">
          <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-12 md:pt-24 md:pb-16">
            <div className="max-w-xl mx-auto text-center space-y-6 py-16">
              <Quote size={48} className="mx-auto text-muted-foreground/40" />
              <h1 className="font-playfair text-3xl md:text-4xl text-foreground">
                Thank You
              </h1>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Your review has been submitted and is pending approval. Once
                approved, it will appear on the website.
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="mt-8 px-8 py-6 text-sm uppercase tracking-widest font-inter border-foreground/40 hover:bg-foreground hover:text-background transition-all"
              >
                Back to Home
              </Button>
            </div>
          </section>
        </main>

        <ComedyFooter />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Submit a Review - Lana Salah"
        description="Share your experience with Lana Salah's comedy. Submit a review to be featured on the website."
        canonicalUrl="/submit-review"
      />

      <ComedyHeader />

      <main className="min-h-screen">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-12 md:pt-24 md:pb-16">
          <div className="text-center space-y-4 mb-12">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
              SHARE YOUR EXPERIENCE
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl text-foreground">
              Submit a Review
            </h1>
            <p className="text-foreground/80 text-sm leading-relaxed max-w-xl mx-auto">
              Seen a show? Worked together? Your words help share the laughter.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Honeypot - hidden from humans, bots will fill it */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground">
                        Required for verification. Never displayed publicly.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        How do you know Lana's work? *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="press">
                            {relationshipLabels.press}
                          </SelectItem>
                          <SelectItem value="peer">
                            {relationshipLabels.peer}
                          </SelectItem>
                          <SelectItem value="audience">
                            {relationshipLabels.audience}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {shows.length > 0 && (
                  <FormField
                    control={form.control}
                    name="where_seen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                          Where did you see Lana?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors">
                              <SelectValue placeholder="Select a show or event" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shows.map((show) => (
                              <SelectItem key={show.id} value={show.name}>
                                {show.name} - {show.venue}
                              </SelectItem>
                            ))}
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {socialLinks.length > 0 && (
                  <FormField
                    control={form.control}
                    name="how_found"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                          How did you find us?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors">
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {socialLinks.map((link) => (
                              <SelectItem key={link.id} value={link.platform}>
                                {link.platform.charAt(0).toUpperCase() +
                                  link.platform.slice(1)}
                              </SelectItem>
                            ))}
                            <SelectItem value="word-of-mouth">
                              Word of Mouth
                            </SelectItem>
                            <SelectItem value="search">
                              Search Engine
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Your Review *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your experience..."
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground min-h-[150px] px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="permission"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-foreground/70 font-inter font-normal">
                          I give permission for this review to be displayed on
                          the website with my name.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Human Verification */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                      Human Verification *
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="captcha"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-4">
                          <span className="text-foreground font-medium">
                            What is {captcha.num1} + {captcha.num2}?
                          </span>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="?"
                              className="w-20 border border-foreground/20 rounded bg-transparent text-foreground text-center focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4 text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full md:w-auto px-12 py-6 text-sm uppercase tracking-widest font-inter border-foreground/40 hover:bg-foreground hover:text-background transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <ComedyFooter />
    </>
  );
};

export default SubmitReview;
