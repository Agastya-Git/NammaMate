import { useEffect, useState } from 'react';
import { Mic, ArrowRight, Volume2, Sparkles, Smartphone, ShieldCheck, MapPin } from 'lucide-react';
import { SituationCard } from '@/components/SituationCard';
import { supabase, type Category, type Phrase } from '@/lib/supabase';
import { OFFLINE_CATEGORIES, OFFLINE_PHRASES } from '@/lib/offlineData';

type HomePageProps = {
  onNavigateSituations: () => void;
  onNavigateRoleplay?: () => void;
  onSituationClick: (slug: string) => void;
  onPhraseClick: (slug: string) => void;
};

export function HomePage({
  onNavigateSituations,
  onNavigateRoleplay,
  onSituationClick,
  onPhraseClick,
}: HomePageProps) {
  // Pre-seed immediately with offline data for instant load
  const initialCats = (OFFLINE_CATEGORIES as Category[]).filter((c) => c.slug !== 'common');
  const initialQuick = (OFFLINE_PHRASES as unknown as (Phrase & { categories?: Category })[])
    .filter((p) => p.categories?.slug === 'common')
    .slice(0, 4);

  const initialCounts: Record<string, number> = {};
  for (const row of OFFLINE_PHRASES as unknown as { categories?: Category }[]) {
    const slug = row.categories?.slug;
    if (slug) initialCounts[slug] = (initialCounts[slug] ?? 0) + 1;
  }

  const [categories, setCategories] = useState<Category[]>(initialCats);
  const [quickPhrases, setQuickPhrases] = useState<Phrase[]>(initialQuick);
  const [playing, setPlaying] = useState<string | null>(null);
  const [phraseCounts, setPhraseCounts] = useState<Record<string, number>>(initialCounts);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const cats = data as Category[];
          setCategories(cats.filter((c) => c.slug !== 'common'));
        }
      })
      .catch(() => {});

    supabase
      .from('phrases')
      .select('*, categories(*)')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const all = data as unknown as { categories: Category }[];
          const counts: Record<string, number> = {};
          for (const row of all) {
            const catSlug = row.categories?.slug;
            if (catSlug) counts[catSlug] = (counts[catSlug] ?? 0) + 1;
          }
          setPhraseCounts(counts);

          const quick = (data as unknown as Phrase & { categories: Category }[])
            .filter((p) => p.categories?.slug === 'common')
            .slice(0, 4);
          setQuickPhrases(quick);
        }
      })
      .catch(() => {});
  }, []);

  const speak = (phrase: Phrase) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.kannada);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.85;
    utterance.onstart = () => setPlaying(phrase.id);
    utterance.onend = () => setPlaying(null);
    utterance.onerror = () => setPlaying(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="animate-fade-in pb-16">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-forest-800 text-warm-100">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-lime-300 blur-3xl" />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-emerald-600 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-700/80 border border-forest-600 mb-6 animate-fade-in-up">
              <MapPin className="w-3.5 h-3.5 text-lime-300" />
              <span className="text-xs font-bold text-warm-200">
                Your Everyday Karnataka Companion
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-balance mb-6 animate-fade-in-up">
              A little Kannada. <br />
              <span className="text-lime-300">A lot more connection.</span>
            </h1>

            <p className="text-base md:text-xl text-warm-300 leading-relaxed mb-8 max-w-2xl animate-fade-in-up">
              The everyday companion for non-Kannada speakers across Karnataka. Navigate autos,
              cafés, markets, and clinics with confidence, AI pronunciation coaching, and cultural etiquette.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up">
              {onNavigateRoleplay && (
                <button
                  onClick={onNavigateRoleplay}
                  className="btn-accent flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-forest-900" />
                  Try Conversation Simulator
                </button>
              )}
              <button
                onClick={onNavigateSituations}
                className="btn-secondary !bg-forest-700/80 !text-warm-100 !border-forest-600 hover:!bg-forest-600 flex items-center justify-center gap-2"
              >
                <Mic className="w-4.5 h-4.5" />
                Browse Situations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick phrases strip */}
      {quickPhrases.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 mb-14">
          <div className="card p-6 md:p-8 shadow-lift border border-warm-200/80">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base md:text-lg font-bold text-forest-800 flex items-center gap-2.5">
                <span className="w-2.5 h-7 rounded-full bg-lime-300" />
                Quick Survival Phrases (Tap to hear)
              </h2>
              <button
                onClick={() => onPhraseClick('common')}
                className="text-xs md:text-sm font-bold text-forest-600 hover:text-forest-800 flex items-center gap-1 transition-colors"
              >
                View all ({phraseCounts['common'] ?? 10})
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickPhrases.map((phrase) => (
                <div
                  key={phrase.id}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-warm-100/80 hover:bg-warm-200 transition-all group cursor-pointer border border-warm-200/50"
                  onClick={() => speak(phrase)}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                      playing === phrase.id
                        ? 'bg-lime-300 text-forest-800 ring-2 ring-lime-200'
                        : 'bg-forest-50 text-forest-600 group-hover:bg-forest-100'
                    }`}
                  >
                    <Volume2 className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="kannada text-base md:text-lg font-bold text-forest-800 leading-tight">
                      {phrase.kannada}
                    </p>
                    <p className="text-xs font-semibold text-warm-600">{phrase.transliteration}</p>
                    <p className="text-xs text-forest-700 font-medium">{phrase.english}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Roleplay Highlight Banner */}
      {onNavigateRoleplay && (
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 text-white p-7 md:p-10 shadow-xl border border-forest-600/40">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-300/20 text-lime-300 text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  New Feature Showcase
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-snug">
                  Kannada in Action: Interactive Roleplay
                </h3>
                <p className="text-sm text-warm-200 leading-relaxed">
                  Practice real dialogues before you step out! Simulate bargaining with auto drivers,
                  ordering by-two coffee in darshinis, or asking for medicines at the pharmacy.
                </p>
              </div>
              <button
                onClick={onNavigateRoleplay}
                className="btn-accent shrink-0 flex items-center gap-2 shadow-md"
              >
                <span>Launch Roleplay Mode</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Three Pillar Features */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card p-6 border-l-4 border-l-lime-400">
            <div className="w-10 h-10 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-forest-900 mb-1">Street Mode / Driver Card</h4>
            <p className="text-xs text-warm-600 leading-relaxed">
              Show fullscreen, high-contrast Kannada text directly to auto drivers and vendors when words escape you.
            </p>
          </div>

          <div className="card p-6 border-l-4 border-l-emerald-500">
            <div className="w-10 h-10 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-forest-900 mb-1">AI Pronunciation Coach</h4>
            <p className="text-xs text-warm-600 leading-relaxed">
              Tap the microphone to practice speaking Kannada. Receive instant phonetic accuracy scores and praise!
            </p>
          </div>

          <div className="card p-6 border-l-4 border-l-amber-500">
            <div className="w-10 h-10 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-forest-900 mb-1">Politeness & Tone Guide</h4>
            <p className="text-xs text-warm-600 leading-relaxed">
              Learn when to use respectful Kannada (*Neevu / Banni*) so locals instantly appreciate your respect.
            </p>
          </div>
        </div>
      </section>

      {/* Situation cards */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-forest-800 mb-2">
            Explore Everyday Situations
          </h2>
          <p className="text-warm-600 text-sm md:text-base">
            Curated phrases for the moments you need them most in Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
            >
              <SituationCard
                category={cat}
                onClick={onSituationClick}
                phraseCount={phraseCounts[cat.slug]}
              />
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              step: '01',
              title: 'Pick a real situation',
              desc: 'Select from travel, markets, cafes, clinics, or campus life.',
            },
            {
              step: '02',
              title: 'Hear & practice audio',
              desc: 'Listen at native or slow speeds, then test your speech with the AI coach.',
            },
            {
              step: '03',
              title: 'Show or speak on the street',
              desc: 'Use Street Mode to flash phrases directly to drivers or save favorites.',
            },
          ].map((item) => (
            <div key={item.step} className="card p-6">
              <p className="text-3xl font-extrabold text-lime-400 mb-3">{item.step}</p>
              <h3 className="text-lg font-bold text-forest-800 mb-1.5">{item.title}</h3>
              <p className="text-xs text-warm-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
