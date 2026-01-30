import ComedyHeader from "@/components/ComedyHeader";
import ComedianBio from "@/components/ComedianBio";
import VideoGrid from "@/components/VideoGrid";
import UpcomingShows from "@/components/UpcomingShows";
import ReviewCarousel from "@/components/reviews/ReviewCarousel";
import ComingSoonSection from "@/components/ComingSoonSection";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lana Salah",
    "jobTitle": "Stand-up Comedian & Satirist",
    "description": "Palestinian-American stand-up comedian celebrating sharp wit, political satire, and cultural insight. A Los Angeles-based performer whose material explores identity, family, and uncomfortable truths.",
    "url": "https://lanasalah.com",
    "image": "https://lanasalah.com/og-image.jpg",
    "sameAs": [
      "https://instagram.com/thelanasalah",
      "https://tiktok.com/@thelanasalah",
      "https://youtube.com/@thelanasalah",
      "https://threads.net/@thelanasalah"
    ],
    "knowsAbout": [
      "Stand-up Comedy",
      "Political Satire",
      "Cultural Commentary",
      "Observational Comedy"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US"
    }
  };

  return (
    <>
      <SEO
        title="Lana Salah - Stand-up Comedian & Satirist"
        description="Palestinian-American stand-up comedian celebrating sharp wit, political satire, and cultural insight. Los Angeles-based performer exploring identity, family, and uncomfortable truths."
        canonicalUrl="/"
        ogType="profile"
        jsonLd={jsonLd}
      />

      <ComedyHeader />
      
      <main>
        <ComedianBio />
        <VideoGrid />
        <UpcomingShows />
        <ComingSoonSection />
        <ReviewCarousel />
      </main>

      <ComedyFooter />
    </>
  );
};

export default Index;
