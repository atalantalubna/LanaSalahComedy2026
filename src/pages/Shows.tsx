import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import UpcomingShows from "@/components/UpcomingShows";
import SEO from "@/components/SEO";
import { Typewriter } from "@/components/ui/typewriter";

const Shows = () => {
  return (
    <>
      <SEO
        title="Upcoming Shows - Lana Salah"
        description="Catch Lana Salah live! See upcoming stand-up comedy shows, festival appearances, and tour dates."
        canonicalUrl="/shows"
      />

      <ComedyHeader />
      
      <main className="pt-16">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground text-center">
            <Typewriter text="Live Shows" delay={60} startDelay={200} />
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-4 max-w-xl mx-auto">
            Catch me live at comedy clubs and festivals across the country.
          </p>
        </section>
        
        <UpcomingShows />
      </main>

      <ComedyFooter />
    </>
  );
};

export default Shows;
