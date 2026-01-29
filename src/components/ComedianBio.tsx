import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";
import lanaHero from "@/assets/lana-hero.png";

const ComedianBio = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <>
      <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-4 text-center lg:text-left order-2 lg:order-1">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-foreground">
              Lana Salah
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
              STAND-UP COMEDIAN & SATIRIST
            </p>
            <p className="text-sm text-foreground/80 max-w-xl leading-relaxed lg:mx-0 mx-auto">
              Lana Salah brings a sharp-witted perspective to the stage, blending dark, satirical humor with clever storytelling and cultural insight. A Palestinian American who spent nearly a decade living in the Middle East, Lana uses her experiences to craft incisive social commentary, delivered with a signature dry and deadpan style.
            </p>
            <p className="text-sm text-foreground/70 max-w-xl leading-relaxed lg:mx-0 mx-auto">
              Bill Hicks taught her that comedy can be a weapon. George Carlin taught her that language matters. Her Palestinian grandmother taught her that guilt is a form of love. She's still working through that last one.
            </p>
            <p className="text-sm text-foreground/60 max-w-xl leading-relaxed lg:mx-0 mx-auto italic pt-4">
              Comedy. The only true medium that can diffuse tension between vastly different humans and perspectives.{" "}
              <button
                onClick={() => setComingSoonOpen(true)}
                className="underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer"
              >
                Coming soon—a deep dive into why laughter connects us all.
              </button>
            </p>
          </div>

          {/* Right side - Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg animate-fade-in">
              <img
                src={lanaHero}
                alt="Lana Salah - Stand-up comedian wearing a colorful rainbow crochet top"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
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
