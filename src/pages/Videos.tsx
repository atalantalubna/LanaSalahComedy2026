import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import VideoGrid from "@/components/VideoGrid";
import SEO from "@/components/SEO";

const Videos = () => {
  return (
    <>
      <SEO
        title="Videos - Lana Salah"
        description="Watch Lana Salah's stand-up performances, comedy clips, and podcast appearances. Sharp wit and political satire at its finest."
        canonicalUrl="/videos"
      />

      <ComedyHeader />
      
      <main className="pt-16">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground text-center">
            Videos
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-4 max-w-xl mx-auto">
            Stand-up performances, comedy clips, and podcast appearances.
          </p>
        </section>
        
        <VideoGrid />
      </main>

      <ComedyFooter />
    </>
  );
};

export default Videos;
