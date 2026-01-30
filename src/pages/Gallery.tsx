import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import GalleryMasonry from "@/components/GalleryMasonry";
import SEO from "@/components/SEO";
import { Typewriter } from "@/components/ui/typewriter";

const Gallery = () => {
  return (
    <>
      <SEO
        title="Gallery - Lana Salah"
        description="Browse photos of Lana Salah from performances, studio sessions, and behind-the-scenes moments. High-quality images from comedy shows and press events."
        canonicalUrl="/gallery"
      />

      <ComedyHeader />
      
      <main className="pt-16">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground text-center">
            <Typewriter text="Gallery" delay={60} startDelay={200} />
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-4 max-w-xl mx-auto">
            Performances, studio portraits, and candid moments.
          </p>
        </section>
        
        <GalleryMasonry />
      </main>

      <ComedyFooter />
    </>
  );
};

export default Gallery;
