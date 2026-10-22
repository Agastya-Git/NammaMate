import { Mic, BookOpen } from 'lucide-react';

type FooterProps = {
  onNavigateManual?: () => void;
};

export function Footer({ onNavigateManual }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-warm-200 bg-forest-800 text-warm-100">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-lime-300 flex items-center justify-center">
              <Mic className="w-5 h-5 text-forest-800" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-lg font-bold">NammaMate</p>
              <p className="text-sm text-warm-300">A little Kannada. A lot more connection.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-warm-300">
            <p>Designed for the Kannada Technology Challenge</p>
            <p>Problem Statement 03 — Kannada in Everyday Life</p>
            {onNavigateManual && (
              <button
                onClick={onNavigateManual}
                className="inline-flex items-center gap-1.5 text-warm-300 hover:text-lime-300 transition-colors mt-1"
              >
                <BookOpen className="w-4 h-4" />
                Read the user manual
              </button>
            )}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-forest-700 text-sm text-warm-400">
          <p>Built with care for the people of Karnataka.</p>
        </div>
      </div>
    </footer>
  );
}
