import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, Mic, Sparkles, Smartphone } from 'lucide-react';
import { PhraseCard } from '@/components/PhraseCard';
import { StreetModeModal } from '@/components/StreetModeModal';
import { getIcon } from '@/lib/icon';
import { supabase, type Category, type Phrase } from '@/lib/supabase';
import { OFFLINE_CATEGORIES, OFFLINE_PHRASES } from '@/lib/offlineData';

type PhrasePageProps = {
  slug: string;
  onBack: () => void;
  onSituationClick: (slug: string) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

type ToneFilter = 'all' | 'polite' | 'standard';

export function PhrasePage({
  slug,
  onBack,
  favorites,
  onToggleFavorite,
}: PhrasePageProps) {
  // Pre-populate immediately from offline cache
  const initialCategory = (OFFLINE_CATEGORIES as Category[]).find((c) => c.slug === slug) ?? null;
  const initialPhrases = (OFFLINE_PHRASES as unknown as (Phrase & { categories?: Category })[]).filter(
    (p) => p.categories?.slug === slug
  );

  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [phrases, setPhrases] = useState<Phrase[]>(initialPhrases);
  const [loading, setLoading] = useState(false);
  const [toneFilter, setToneFilter] = useState<ToneFilter>('all');
  const [streetPhrase, setStreetPhrase] = useState<Phrase | null>(null);

  useEffect(() => {
    let active = true;

    // Check remote supabase for updates
    supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        if (data) setCategory(data as Category);
      })
      .catch(() => {});

    supabase
      .from('phrases')
      .select('*, categories(*)')
      .order('sort_order')
      .then(({ data }) => {
        if (!active) return;
        if (data && data.length > 0) {
          const filtered = (data as unknown as { categories: Category }[] & Phrase[]).filter(
            (p) => p.categories?.slug === slug
          ) as unknown as Phrase[];
          setPhrases(filtered);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [slug]);

  const Icon = category ? getIcon(category.icon) : Mic;

  // Filter phrases based on tone
  const filteredPhrases = useMemo(() => {
    if (toneFilter === 'all') return phrases;
    return phrases.filter((phrase) => {
      const text = (phrase.kannada + ' ' + phrase.transliteration).toLowerCase();
      const isPolite =
        text.includes('kodi') ||
        text.includes('banni') ||
        text.includes('hogi') ||
        text.includes('maadi') ||
        text.includes('barteera') ||
        text.includes('sir') ||
        text.includes('dhanyavada');
      return toneFilter === 'polite' ? isPolite : !isPolite;
    });
  }, [phrases, toneFilter]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-12">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {phrases.length > 0 && (
          <button
            onClick={() => setStreetPhrase(phrases[0])}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-800 text-warm-100 text-xs font-bold hover:bg-forest-700 transition-colors shadow-xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-lime-300" />
            Launch Street Mode
          </button>
        )}
      </div>

      {category && (
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-xs"
            style={{ backgroundColor: category.color }}
          >
            <Icon className="w-8 h-8 text-lime-300" strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-forest-800 leading-tight">
              {category.title}
            </h1>
            <p className="text-warm-600 mt-1 text-sm md:text-base">{category.description}</p>
          </div>
        </div>
      )}

      {/* Tone & Etiquette Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setToneFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            toneFilter === 'all'
              ? 'bg-forest-800 text-warm-100'
              : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
          }`}
        >
          All Phrases ({phrases.length})
        </button>
        <button
          onClick={() => setToneFilter('polite')}
          className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            toneFilter === 'polite'
              ? 'bg-forest-800 text-warm-100'
              : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-lime-400" />
          ✨ Polite & Respectful
        </button>
        <button
          onClick={() => setToneFilter('standard')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            toneFilter === 'standard'
              ? 'bg-forest-800 text-warm-100'
              : 'bg-warm-200 text-warm-700 hover:bg-warm-300'
          }`}
        >
          Everyday Standard
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="card p-5 h-32 animate-pulse"
              style={{ background: 'rgba(16, 43, 40, 0.04)' }}
            />
          ))}
        </div>
      ) : filteredPhrases.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-500 text-lg">No phrases found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPhrases.map((phrase) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              isFavorite={favorites.has(phrase.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenStreetMode={(p) => setStreetPhrase(p)}
            />
          ))}
        </div>
      )}

      {/* Street Mode Modal */}
      {streetPhrase && (
        <StreetModeModal phrase={streetPhrase} onClose={() => setStreetPhrase(null)} />
      )}
    </div>
  );
}
