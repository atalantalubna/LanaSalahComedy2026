import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SocialGrid from "@/components/SocialGrid";
import SEO from "@/components/SEO";

const Social = () => {
  return (
    <>
      <SEO
        title="Social - Lana Salah"
        description="Watch Lana Salah's latest social media content. Instagram Reels, TikTok videos, and YouTube Shorts featuring stand-up clips, behind the scenes, and more."
        canonicalUrl="/social"
      />

      <ComedyHeader />
      
      <main className="pt-16">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground text-center">
            Social
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-4 max-w-xl mx-auto">
            The latest from Instagram, TikTok, and YouTube. Follow along for comedy clips, behind-the-scenes moments, and new material.
          </p>
        </section>
        
        <SocialGrid />
      </main>

      <ComedyFooter />
    </>
  );
};

export default Social;
