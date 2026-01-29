import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";
import heroPlaceholder from "@/assets/hero-placeholder.jpg";

const ComedianBio = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <>
      <section className="relative pt-16 overflow-hidden">
        {/* Top section - Hero Image (50vh) */}
        <div className="relative h-[50vh] bg-gradient-to-br from-pink-100 to-pink-50">
          <img
            src={heroPlaceholder}
            alt="Lana Salah - Stand-up comedian"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>

        {/* Title positioned at the center divider - half on image, half on copy */}
        <div className="relative z-10 -mt-20 md:-mt-24 lg:-mt-28 text-center px-4">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-none tracking-tight">
            Lana Salah
          </h1>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-inter mt-4">
            STAND-UP COMEDIAN & SATIRIST
          </p>
        </div>

        {/* Bottom section - Copy */}
        <div className="relative px-6 md:px-12 lg:px-16 py-12 md:py-16 bg-background">
          <div className="max-w-2xl mx-auto space-y-5 text-center">
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
              Lana Salah brings a sharp-witted perspective to the stage, blending dark, satirical humor with clever storytelling and cultural insight. A Palestinian American who spent nearly a decade living in the Middle East, Lana uses her experiences to craft incisive social commentary, delivered with a signature dry and deadpan style.
            </p>
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
              Bill Hicks taught her that comedy can be a weapon. George Carlin taught her that language matters. Her Palestinian grandmother taught her that guilt is a form of love. She's still working through that last one.
            </p>
            <p className="text-sm md:text-base text-foreground/60 leading-relaxed italic pt-2">
              Comedy. The only true medium that can diffuse tension between vastly different humans and perspectives.{" "}
              <button
                onClick={() => setComingSoonOpen(true)}
                className="underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer"
              >
                Coming soon—a deep dive into why laughter connects us all.
              </button>
            </p>
          </div>
        </div>
      </section>

      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} />
    </>
  );
};

export default ComedianBio;
