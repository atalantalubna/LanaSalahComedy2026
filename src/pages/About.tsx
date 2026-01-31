import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";
import { Typewriter } from "@/components/ui/typewriter";

const About = () => {
  return (
    <>
      <SEO
        title="About - Lana Salah"
        description="Learn about Lana Salah, a Palestinian-American stand-up comedian and satirist based in Los Angeles."
        canonicalUrl="/about"
      />

      <ComedyHeader />
      
      <main className="pt-16">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground text-center">
            <Typewriter text="About" delay={60} startDelay={200} />
          </h1>
        </section>

        <section className="max-w-3xl mx-auto px-3 md:px-5 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo Placeholders - Two stacked vertically */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Photo Coming Soon
                </p>
              </div>
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Photo Coming Soon
                </p>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              <div className="space-y-4 text-sm text-foreground/90 leading-relaxed">
                <p>
                  Growing up between two cultures taught me one thing: nobody's 
                  version of normal is actually normal. That's where the comedy lives.
                </p>
                <p>
                  I started doing stand-up because I was tired of being the "funny friend" 
                  for free. Now I get paid, and strangers have to listen to me talk about 
                  my mom for 45 minutes.
                </p>
                <p>
                  My comedy is political, personal, and occasionally uncomfortable — 
                  exactly the way dinner at my family's house always was. I believe 
                  the best comedy tells the truth in a way that makes it impossible 
                  not to laugh.
                </p>
                <p>
                  Bill Hicks taught me that comedy can be a weapon. George Carlin 
                  taught me that language matters. My Palestinian grandmother taught 
                  me that guilt is a form of love. I'm still working through that last one.
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  INFLUENCES
                </p>
                <p className="text-sm text-foreground/80">
                  Bill Hicks, George Carlin, Richard Pryor, Mo Amer, Maysoon Zayid
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  TOPICS
                </p>
                <p className="text-sm text-foreground/80">
                  Identity, politics, family dynamics, cultural commentary, uncomfortable truths
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ComedyFooter />
    </>
  );
};

export default About;
