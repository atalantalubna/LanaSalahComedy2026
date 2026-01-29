import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your inquiry. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <SEO
        title="About - Lana Salah"
        description="Learn about Lana Salah, a Palestinian-American stand-up comedian and satirist based in Los Angeles."
        canonicalUrl="/about"
      />

      <ComedyHeader />
      
      <main className="pt-16">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground text-center">
            About
          </h1>
        </section>

        <section className="max-w-3xl mx-auto px-3 md:px-5 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo Placeholder */}
            <div className="aspect-[3/4] bg-muted flex items-center justify-center">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Photo Coming Soon
              </p>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              <div className="space-y-4 text-sm text-foreground/90 leading-relaxed">
                <p>
                  Growing up between two cultures taught me one thing: nobody's 
                  version of normal is actually normal. That's where the comedy lives.
                </p>
                <p>
                  I started doing stand-up because I was tired of being the "funny friend" 
                  for free. Now I get paid, and strangers have to listen to me talk about 
                  my mom for 45 minutes.
                </p>
                <p>
                  My comedy is political, personal, and occasionally uncomfortable — 
                  exactly the way dinner at my family's house always was. I believe 
                  the best comedy tells the truth in a way that makes it impossible 
                  not to laugh.
                </p>
                <p>
                  Bill Hicks taught me that comedy can be a weapon. George Carlin 
                  taught me that language matters. My Palestinian grandmother taught 
                  me that guilt is a form of love. I'm still working through that last one.
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                  INFLUENCES
                </p>
                <p className="text-sm text-foreground/80">
                  Bill Hicks, George Carlin, Richard Pryor, Mo Amer, Maysoon Zayid
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                  TOPICS
                </p>
                <p className="text-sm text-foreground/80">
                  Identity, politics, family dynamics, cultural commentary, uncomfortable truths
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-xl mx-auto px-3 md:px-5 py-16">
          <div className="text-center space-y-4 mb-12">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
              GET IN TOUCH
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-foreground">
              Contact
            </h2>
            <p className="text-foreground/80 text-sm leading-relaxed">
              For booking inquiries, press requests, or just to say hello.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                      Message *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your event or project..."
                        className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground min-h-[150px] px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full md:w-auto px-12 py-6 text-sm uppercase tracking-widest font-inter border-foreground/40 hover:bg-foreground hover:text-background transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </main>

      <ComedyFooter />
    </>
  );
};

export default About;
