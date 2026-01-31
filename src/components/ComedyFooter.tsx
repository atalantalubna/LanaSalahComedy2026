import { Instagram, Youtube, Mail } from "lucide-react";
import FooterSubscribe from "./FooterSubscribe";

const ComedyFooter = () => {
  return (
    <footer className="max-w-[1600px] mx-auto px-3 md:px-5 py-16 border-t border-border">
      {/* Subscribe Form */}
      <FooterSubscribe />

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <a
          href="https://instagram.com/thelanasalah"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-inter"
          aria-label="Instagram"
        >
          <Instagram size={16} />
          <span>Instagram</span>
        </a>
        <a
          href="https://upscroll.com/thelanasalah"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-inter"
          aria-label="Upscroll"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 10h5v8h6v-8h5L12 2z"/>
            <path d="M4 20h16v2H4v-2z"/>
          </svg>
          <span>Upscroll</span>
        </a>
        <a
          href="https://youtube.com/@thelanasalah"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-inter"
          aria-label="YouTube"
        >
          <Youtube size={16} />
          <span>YouTube</span>
        </a>
        <a
          href="https://threads.net/@thelanasalah"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-inter"
          aria-label="Threads"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.51.87-6.36 2.54-8.471C5.876 1.48 8.63.264 12.186.24h.014c2.746.016 5.043.718 6.833 2.088 1.642 1.257 2.842 3.063 3.567 5.367l-2.89.814c-.55-1.766-1.43-3.12-2.613-4.022-1.254-.954-2.88-1.449-4.83-1.469h-.015c-2.746.021-4.798.957-6.098 2.787-1.2 1.688-1.813 4.048-1.823 7.015v.054c.01 2.967.623 5.327 1.823 7.015 1.3 1.83 3.352 2.766 6.098 2.787h.013c2.297-.018 4.07-.608 5.271-1.751 1.246-1.185 1.881-2.858 1.887-4.969v-.033c-.004-.928-.195-1.733-.569-2.393-.358-.632-.875-1.127-1.539-1.474a4.44 4.44 0 00-.108 1.092c-.007.936-.262 1.74-.759 2.392-.53.697-1.292 1.197-2.262 1.49-.807.244-1.73.312-2.747.202-1.193-.128-2.18-.514-2.937-1.144-.81-.675-1.287-1.569-1.423-2.656l2.93-.393c.067.546.271.962.607 1.238.416.341.991.522 1.71.537.761.015 1.37-.108 1.814-.367.39-.229.586-.544.59-.94.004-.365-.144-.67-.438-.906-.37-.297-.97-.522-1.784-.668-1.182-.213-2.12-.523-2.787-.922-.736-.44-1.268-1.006-1.58-1.681-.298-.645-.451-1.412-.454-2.28-.004-1.17.39-2.159 1.17-2.94.81-.812 1.897-1.235 3.229-1.256 1.363-.022 2.465.38 3.277 1.193.747.748 1.203 1.77 1.352 3.033l-2.892.378c-.077-.625-.271-1.1-.578-1.41-.34-.346-.821-.52-1.429-.517-.578.002-1.027.173-1.333.507-.28.306-.42.712-.418 1.207.002.529.157.928.459 1.186.33.282.84.495 1.518.633 1.33.272 2.405.653 3.196 1.132.856.52 1.482 1.175 1.862 1.948.394.803.593 1.762.593 2.855v.036c-.008 2.872-.888 5.117-2.613 6.676-1.627 1.47-3.926 2.241-6.837 2.294z"/>
          </svg>
          <span>Threads</span>
        </a>
      </div>

      {/* Contact */}
      <div className="text-center mb-8">
        <a
          href="mailto:booking@lanasalah.com"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-inter"
        >
          <Mail size={16} />
          <span>booking@lanasalah.com</span>
        </a>
      </div>

      {/* Copyright */}
      <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground/60 font-inter">
        © 2026 LANA SALAH. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default ComedyFooter;
