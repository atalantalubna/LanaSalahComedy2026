import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";
import lanaHero from "@/assets/lana-hero.png";

const ComedianBio = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <>
      <section className="min-h-[calc(100vh-60px)] pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-60px)]">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:py-16 order-2 lg:order-1">
            <div className="max-w-xl mx-auto lg:mx-0 space-y-5 text-center lg:text-left">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight">
                Lana Salah
              </h1>
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
                  className="underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer"
                >
                  Coming soon—a deep dive into why laughter connects us all.
                </button>
              </p>
            </div>
          </div>

          {/* Right side - Photo (50% width on desktop) */}
          <div className="order-1 lg:order-2 relative overflow-hidden bg-gradient-to-br from-pink-100 to-pink-50">
            <div className="h-[50vh] lg:h-full w-full animate-fade-in">
              <img
                src={lanaHero}
                alt="Lana Salah - Stand-up comedian wearing a colorful rainbow crochet top"
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
