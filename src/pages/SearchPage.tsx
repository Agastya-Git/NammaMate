import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { PhraseCard } from '@/components/PhraseCard';
import { StreetModeModal } from '@/components/StreetModeModal';
import { supabase, type Phrase, type Category } from '@/lib/supabase';
import { OFFLINE_PHRASES } from '@/lib/offlineData';

type SearchPageProps = {
  onBack: () => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

export function SearchPage({ onBack, favorites, onToggleFavorite }: SearchPageProps) {
  const [allPhrases, setAllPhrases] = useState<Phrase[]>(OFFLINE_PHRASES as unknown as Phrase[]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [streetPhrase, setStreetPhrase] = useState<Phrase | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from('phrases')
      .select('*, categories(*)')
      .order('sort_order')
      .then(({ data }) => {
        if (!active) return;
        if (data && data.length > 0) {
          setAllPhrases(data as unknown as Phrase[]);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allPhrases;
    const q = query.toLowerCase();
    return allPhrases.filter(
      (p) =>
        (p as unknown as { categories?: Category }).categories?.title?.toLowerCase().includes(q) ||
        p.english.toLowerCase().includes(q) ||
        p.kannada.toLowerCase().includes(q) ||
        p.transliteration.toLowerCase().includes(q)
    );
  }, [allPhrases, query]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-forest-800 mb-2">
        Search phrases
      </h1>
      <p className="text-warm-600 mb-6">
        Find any phrase across all situations by Kannada, English, or pronunciation.
      </p>

      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Try 'ticket', 'fever', 'ನಮಸ್ಕಾರ'..."
        />
      </div>

      {!loading && query && filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-3xl bg-warm-200 flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-8 h-8 text-warm-400" />
          </div>
          <p className="text-warm-600 text-lg">
            No phrases match "<span className="font-semibold text-forest-700">{query}</span>"
          </p>
          <p className="text-warm-400 text-sm mt-1">Try a different word or phrase.</p>
        </div>
      )}

      {!loading && !query && (
        <p className="text-sm text-warm-500 text-center py-8">
          {allPhrases.length} phrases ready to search.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <p className="text-sm text-warm-500 mb-4">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                isFavorite={favorites.has(phrase.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenStreetMode={(p) => setStreetPhrase(p)}
              />
            ))}
          </div>
        </>
      )}

      {streetPhrase && (
        <StreetModeModal phrase={streetPhrase} onClose={() => setStreetPhrase(null)} />
      )}
    </div>
  );
}
