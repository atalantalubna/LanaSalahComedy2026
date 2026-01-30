import { Link } from "react-router-dom";
import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";
import { ShoppingBag, Bell } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { Button } from "@/components/ui/button";

const Merch = () => {
  return (
    <>
      <SEO
        title="Merch - Lana Salah"
        description="Official Lana Salah merchandise - coming soon. Sign up to be notified when the store launches."
        canonicalUrl="/merch"
      />

      <ComedyHeader />

      <main className="min-h-screen pt-20">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-12 md:py-16">
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
                COMING SOON
              </p>
              <h1 className="font-playfair text-4xl md:text-5xl text-foreground">
                <Typewriter text="Merch Store" delay={60} startDelay={200} />
              </h1>
              <p className="text-sm text-foreground/70 max-w-md mx-auto leading-relaxed">
                Official Lana Salah merchandise is on its way. T-shirts, hoodies, and more—all designed with the same sharp wit you've come to expect.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
                What to expect
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Graphic Tees", "Hoodies", "Hats", "Stickers"].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 border border-border rounded-full text-xs text-foreground/60 font-inter"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <p className="text-sm text-foreground/60">
                Be the first to shop when the store opens.
              </p>
              <Button variant="outline" asChild className="px-8">
                <Link to="/about#subscribe">
                  <Bell className="w-4 h-4 mr-2" />
                  Get Notified
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ComedyFooter />
    </>
  );
};

export default Merch;
