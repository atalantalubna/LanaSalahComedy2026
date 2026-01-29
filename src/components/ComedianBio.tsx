const ComedianBio = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="space-y-4 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl text-foreground">
          Lana Salah
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
          STAND-UP COMEDIAN & SATIRIST
        </p>
        <p className="text-sm text-foreground/80 max-w-2xl leading-relaxed mx-auto">
          Lana Salah brings a sharp-witted perspective to the stage, blending dark, satirical humor with clever storytelling and cultural insight. A Palestinian American who spent nearly a decade living in the Middle East, Lana uses her experiences to craft incisive social commentary, delivered with a signature dry and deadpan style.
        </p>
        <p className="text-sm text-foreground/70 max-w-2xl leading-relaxed mx-auto">
          Bill Hicks taught her that comedy can be a weapon. George Carlin taught her that language matters. Her Palestinian grandmother taught her that guilt is a form of love. She's still working through that last one.
        </p>
        <p className="text-sm text-foreground/60 max-w-2xl leading-relaxed mx-auto italic pt-4">
          Comedy. The only true medium that can diffuse tension between vastly different humans and perspectives. Coming soon—a deep dive into why laughter connects us all.
        </p>
      </div>
    </section>
  );
};

export default ComedianBio;
