import { Link } from "react-router-dom";
import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";
import { Mic, Headphones, Play, Bell } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { Button } from "@/components/ui/button";

const podcastEpisodes = [
  {
    id: 1,
    title: "The Art of Finding Funny in Chaos",
    description: "Exploring how comedy becomes a survival mechanism in turbulent times.",
    duration: "45 min",
    date: "Coming Soon",
  },
  {
    id: 2,
    title: "Identity, Humor & Everything In Between",
    description: "A deep conversation about navigating multiple cultural identities through laughter.",
    duration: "52 min",
    date: "Coming Soon",
  },
  {
    id: 3,
    title: "When Satire Meets Reality",
    description: "How political comedy walks the fine line between entertainment and activism.",
    duration: "38 min",
    date: "Coming Soon",
  },
];

const Podcast = () => {
  return (
    <>
      <SEO
        title="Podcast - Lana Salah"
        description="The Lana Salah Show podcast - exploring comedy, culture, and the art of finding humor in life's complexities."
        canonicalUrl="/podcast"
      />

      <ComedyHeader />

      <main className="min-h-screen pt-20">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-12 md:py-16">
          {/* Header */}
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
              COMING SOON
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl text-foreground">
              <Typewriter text="The Podcast" delay={60} startDelay={200} />
            </h1>
            <p className="text-sm text-foreground/70 max-w-xl mx-auto leading-relaxed">
              Conversations about comedy, culture, and the uncomfortable truths we laugh about to survive.
            </p>
          </div>

          {/* Featured Podcast Image */}
          <div className="max-w-2xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex flex-col items-center justify-center border border-border">
              <div className="w-24 h-24 rounded-full bg-foreground/10 flex items-center justify-center mb-6">
                <Mic className="w-12 h-12 text-foreground/40" />
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl text-foreground mb-2">
                THE LANA SALAH SHOW
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
                Launching 2026
              </p>
            </div>
          </div>

          {/* Episode Previews */}
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-inter text-center mb-6">
              Upcoming Episodes
            </h3>
            
            {podcastEpisodes.map((episode, index) => (
              <div
                key={episode.id}
                className="group p-6 border border-border rounded-lg hover:border-foreground/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/10 transition-colors">
                    <Headphones className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground font-inter">
                        {episode.date}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground font-inter">
                        {episode.duration}
                      </span>
                    </div>
                    <h4 className="font-playfair text-lg text-foreground mb-1">
                      {episode.title}
                    </h4>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {episode.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full"
                    disabled
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="text-center mt-12 space-y-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-foreground/60">
              Be the first to know when the podcast launches.
            </p>
            <Button variant="outline" asChild className="px-8">
              <Link to="/about#subscribe">
                <Bell className="w-4 h-4 mr-2" />
                Get Notified
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <ComedyFooter />
    </>
  );
};

export default Podcast;
