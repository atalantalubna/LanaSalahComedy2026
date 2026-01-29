import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";

const ComedianBio = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  return (
    <>
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
            Lana Salah
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-inter">
            STAND-UP COMEDIAN & SATIRIST
          </p>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Lana Salah brings a sharp-witted perspective to the stage, blending dark, satirical humor with clever storytelling and cultural insight. A Palestinian American who spent nearly a decade living in the Middle East, Lana uses her experiences to craft incisive social commentary, delivered with a signature dry and deadpan style.
          </p>
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Bill Hicks taught her that comedy can be a weapon. George Carlin taught her that language matters. Her Palestinian grandmother taught her that guilt is a form of love. She's still working through that last one.
          </p>
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed max-w-2xl mx-auto italic pt-2">
            Comedy. The only true medium that can diffuse tension between vastly different humans and perspectives.{" "}
            <button
              onClick={() => setComingSoonOpen(true)}
              className="underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer"
            >
              Coming soon—a deep dive into why laughter connects us all.
            </button>
          </p>
        </div>
      </section>

      <ComingSoonModal open={comingSoonOpen} onOpenChange={setComingSoonOpen} />
    </>
  );
};

export default ComedianBio;
