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
          Palestinian-American stand-up comedian celebrating sharp wit, political satire, and cultural insight.
          A Los Angeles-based performer whose material explores identity, family, and uncomfortable truths.
          Known for fearless comedy inspired by Bill Hicks and George Carlin.
        </p>
      </div>
    </section>
  );
};

export default ComedianBio;
