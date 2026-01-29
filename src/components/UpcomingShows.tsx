import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  soldOut?: boolean;
  festival?: boolean;
}

const upcomingShows: Show[] = [
  {
    id: "1",
    date: "MAR 15, 2025",
    venue: "The Comedy Store",
    city: "Los Angeles, CA",
    ticketUrl: "#",
  },
  {
    id: "2",
    date: "MAR 22, 2025",
    venue: "Laugh Factory",
    city: "Hollywood, CA",
    ticketUrl: "#",
  },
  {
    id: "3",
    date: "APR 5, 2025",
    venue: "Netflix Is A Joke Festival",
    city: "Los Angeles, CA",
    festival: true,
    ticketUrl: "#",
  },
  {
    id: "4",
    date: "APR 18, 2025",
    venue: "Cobbs Comedy Club",
    city: "San Francisco, CA",
    ticketUrl: "#",
  },
  {
    id: "5",
    date: "MAY 3, 2025",
    venue: "Just For Laughs",
    city: "Montreal, QC",
    festival: true,
    soldOut: true,
  },
];

const UpcomingShows = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 md:py-20">
      <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter text-center mb-10">
        UPCOMING SHOWS
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {upcomingShows.map((show) => (
          <div
            key={show.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium tracking-wide">{show.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-muted-foreground" />
                <div>
                  <span className="text-sm text-foreground">{show.venue}</span>
                  {show.festival && (
                    <span className="ml-2 text-[9px] uppercase tracking-widest bg-accent text-accent-foreground px-2 py-0.5">
                      Festival
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground ml-2">— {show.city}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {show.soldOut ? (
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                  Sold Out
                </span>
              ) : show.ticketUrl ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[10px] uppercase tracking-widest font-inter"
                  asChild
                >
                  <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
                    <Ticket size={14} className="mr-2" />
                    Tickets
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
          For booking inquiries: <a href="mailto:booking@lanasalah.com" className="hover:text-foreground transition-colors">booking@lanasalah.com</a>
        </p>
      </div>
    </section>
  );
};

export default UpcomingShows;
