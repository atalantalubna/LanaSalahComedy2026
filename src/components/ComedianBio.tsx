import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";
import heroPlaceholder from "@/assets/hero-placeholder.jpg";

const ComedianBio = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <>
      <section className="pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Title centered above both columns */}
          <div className="text-center mb-10 md:mb-14">
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-foreground">
              Lana Salah
            </h1>
            <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-inter">
              STAND-UP COMEDIAN & SATIRIST
            </p>
          </div>

          {/* Two columns side by side: Copy | Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left column - Copy */}
            <div className="space-y-5 text-center md:text-left">
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                Lana Salah brings a sharp-witted perspective to the stage, blending dark, satirical humor with clever storytelling and cultural insight. A Palestinian American who spent nearly a decade living in the Middle East, Lana uses her experiences to craft incisive social commentary, delivered with a signature dry and deadpan style.
              </p>
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                Bill Hicks taught her that comedy can be a weapon. George Carlin taught her that language matters. Her Palestinian grandmother taught her that guilt is a form of love. She's still working through that last one.
              </p>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed italic">
                Comedy. The only true medium that can diffuse tension between vastly different humans and perspectives.{" "}
                <button
                  onClick={() => setComingSoonOpen(true)}
                  className="underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer"
                >
                  Coming soon—a deep dive into why laughter connects us all.
                </button>
              </p>
            </div>

            {/* Right column - Photo */}
            <div>
              <img
                src={heroPlaceholder}
                alt="Lana Salah - Stand-up comedian"
                className="w-full h-auto object-cover rounded-lg"
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
