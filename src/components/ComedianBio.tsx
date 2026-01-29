import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";
import heroPlaceholder from "@/assets/hero-placeholder.jpg";

const ComedianBio = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen pt-16 overflow-hidden">
        {/* Large asymmetric title - positioned above both columns */}
        <div className="absolute top-20 left-0 right-0 z-10 pointer-events-none">
          <h1 className="font-playfair text-[12vw] md:text-[10vw] lg:text-[8vw] text-foreground leading-none tracking-tight pl-4 md:pl-8 lg:pl-12 mix-blend-difference">
            <span className="block transform -rotate-2 origin-left">Lana</span>
            <span className="block transform rotate-1 origin-left ml-[15vw] md:ml-[20vw]">Salah</span>
          </h1>
        </div>

        {/* Split content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left side - Copy */}
          <div className="flex flex-col justify-end px-6 md:px-12 lg:px-16 py-12 lg:py-20 pt-[45vh] lg:pt-20 order-2 lg:order-1">
            <div className="max-w-lg space-y-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-inter">
                STAND-UP COMEDIAN & SATIRIST
              </p>
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
                  className="underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer pointer-events-auto"
                >
                  Coming soon—a deep dive into why laughter connects us all.
                </button>
              </p>
            </div>
          </div>

          {/* Right side - Hero Image */}
          <div className="order-1 lg:order-2 relative h-[50vh] lg:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-coral-50">
              <img
                src={heroPlaceholder}
                alt="Lana Salah - Stand-up comedian"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} />
    </>
  );
};

export default ComedianBio;
