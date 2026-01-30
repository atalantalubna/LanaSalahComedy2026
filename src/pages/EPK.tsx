import { Download, Mail, FileText, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import ComedyHeader from "@/components/ComedyHeader";
import ComedyFooter from "@/components/ComedyFooter";
import SEO from "@/components/SEO";
import { Typewriter } from "@/components/ui/typewriter";

const EPK = () => {
  return (
    <>
      <SEO
        title="Festival EPK - Lana Salah"
        description="Electronic Press Kit for Lana Salah. Bio, headshots, press materials, and booking information for festival programmers and venues."
        canonicalUrl="/epk"
      />

      <ComedyHeader />
      
      <main className="pt-16">
        <section className="max-w-[1600px] mx-auto px-3 md:px-5 pt-20 pb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground text-center">
            <Typewriter text="Festival EPK" delay={60} startDelay={200} />
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-4 max-w-xl mx-auto">
            Press materials and booking information for programmers and venues.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-3 md:px-5 py-12">
          {/* Bio Section */}
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-inter mb-4">
              ARTIST BIO
            </h2>
            <div className="space-y-4 text-sm text-foreground/90 leading-relaxed">
              <p>
                <strong>Lana Salah</strong> is a Palestinian-American stand-up comedian based in Los Angeles. 
                Her sharp, incisive comedy draws from her bicultural upbringing, exploring themes of identity, 
                family dynamics, and the absurdities of modern life with fearless honesty.
              </p>
              <p>
                Inspired by the legacy of Bill Hicks and George Carlin, Lana's material combines political 
                satire with deeply personal storytelling. Her performances have been described as "comedy 
                that makes you think while you laugh" — addressing uncomfortable truths with wit and warmth.
              </p>
              <p>
                Lana has performed at major venues including The Comedy Store, Laugh Factory, and various 
                comedy festivals. She's a rising voice in stand-up comedy, bringing fresh perspectives to 
                stages across the country.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 py-8 border-y border-border">
            <div className="text-center">
              <p className="text-2xl font-playfair text-foreground">LA</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Based In</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-playfair text-foreground">45-60</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Set Length (min)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-playfair text-foreground">18+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Recommended</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-playfair text-foreground">English</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Language</p>
            </div>
          </div>

          {/* Downloads */}
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-inter mb-6">
              PRESS MATERIALS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto py-4 px-5">
                <FileText size={18} className="mr-3" />
                <div className="text-left">
                  <p className="text-sm font-medium">Press Bio (PDF)</p>
                  <p className="text-xs text-muted-foreground">Short and long versions</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4 px-5">
                <ImageIcon size={18} className="mr-3" />
                <div className="text-left">
                  <p className="text-sm font-medium">Headshots (ZIP)</p>
                  <p className="text-xs text-muted-foreground">High-res press photos</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4 px-5">
                <Video size={18} className="mr-3" />
                <div className="text-left">
                  <p className="text-sm font-medium">Demo Reel</p>
                  <p className="text-xs text-muted-foreground">5-minute performance clip</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4 px-5">
                <Download size={18} className="mr-3" />
                <div className="text-left">
                  <p className="text-sm font-medium">Full EPK (PDF)</p>
                  <p className="text-xs text-muted-foreground">Complete press kit</p>
                </div>
              </Button>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-inter mb-4">
              TECHNICAL REQUIREMENTS
            </h2>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li>• Standard comedy club lighting</li>
              <li>• Wireless handheld microphone preferred</li>
              <li>• Stool optional</li>
              <li>• No opening act required (can provide own host if needed)</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center py-8 border-t border-border">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-inter mb-4">
              BOOKING INQUIRIES
            </h2>
            <Button asChild>
              <a href="mailto:booking@lanasalah.com">
                <Mail size={16} className="mr-2" />
                booking@lanasalah.com
              </a>
            </Button>
          </div>
        </section>
      </main>

      <ComedyFooter />
    </>
  );
};

export default EPK;
