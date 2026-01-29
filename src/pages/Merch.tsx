import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";
import { ShoppingBag } from "lucide-react";

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
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                COMING SOON
              </p>
              <h1 className="font-playfair text-4xl md:text-5xl text-foreground">
                Merch Store
              </h1>
              <p className="text-sm text-foreground/70 max-w-md mx-auto leading-relaxed">
                Official Lana Salah merchandise is on its way. T-shirts, hoodies, and more—all designed with the same sharp wit you've come to expect.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
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

            <p className="text-sm text-foreground/60 italic pt-8">
              Subscribe to the newsletter to be first in line when the store opens.
            </p>
          </div>
        </section>
      </main>

      <ComedyFooter />
    </>
  );
};

export default Merch;
