import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, Search as SearchIcon, Sparkles } from 'lucide-react';
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

// Keyword and synonym expansion map for everyday queries
const SYNONYMS: Record<string, string[]> = {
  auto: ['rickshaw', 'cab', 'taxi', 'travel', 'meter', 'ride'],
  cab: ['auto', 'taxi', 'travel', 'meter'],
  taxi: ['auto', 'cab', 'travel', 'meter'],
  meter: ['auto', 'cab', 'fare', 'price', 'haaki'],
  pay: ['money', 'cash', 'upi', 'gpay', 'cost', 'price', 'bill', 'change', 'roopaayi'],
  upi: ['pay', 'gpay', 'phonepe', 'qr', 'online', 'money'],
  price: ['cost', 'how much', 'rate', 'yestu', 'bill', 'kammi', 'kilo', 'cheap', 'discount', 'bargain'],
  cheap: ['discount', 'bargain', 'reduce', 'kammi', 'solpa'],
  discount: ['kammi', 'reduce', 'bargain', 'cheap', 'price'],
  bargain: ['kammi', 'solpa', 'reduce', 'discount', 'market'],
  coffee: ['tea', 'drink', 'beverage', 'by-two', 'hotel', 'darshini'],
  food: ['eat', 'breakfast', 'lunch', 'dinner', 'dosa', 'idli', 'thindi', 'oota', 'hotel', 'darshini', 'restaurant'],
  water: ['drink', 'thirsty', 'neeru', 'kudiyoke', 'hotel'],
  washroom: ['toilet', 'bathroom', 'restroom', 'ellide', 'where'],
  toilet: ['washroom', 'bathroom', 'restroom', 'ellide', 'where'],
  doctor: ['clinic', 'hospital', 'medicine', 'tablet', 'fever', 'headache', 'novu', 'sick', 'pharmacy'],
  medicine: ['tablet', 'pill', 'pharmacy', 'doctor', 'clinic', 'fever', 'mathre'],
  pain: ['fever', 'headache', 'stomach', 'hurt', 'sick', 'novu', 'doctor'],
  fever: ['sick', 'ill', 'jvara', 'doctor', 'medicine', 'tablet'],
  help: ['urgent', 'emergency', 'sahaya', 'police', 'accident', 'lost', 'kaledhu'],
  police: ['emergency', 'help', 'station', '112'],
  bus: ['stop', 'station', 'ticket', 'travel', 'conductor', 'route'],
  train: ['station', 'metro', 'ticket', 'travel'],
  where: ['ellide', 'direction', 'location', 'route', 'how to go'],
  thank: ['thanks', 'welcome', 'dhanyavada', 'polite'],
  hello: ['namaskara', 'hi', 'greetings'],
  sorry: ['shameesi', 'apologize', 'mistake', 'polite'],
};

const SUGGESTED_TAGS = [
  { label: '🛺 Auto & Meter', query: 'auto' },
  { label: '☕ By-two Coffee', query: 'coffee' },
  { label: '💰 Price & Bargain', query: 'price' },
  { label: '💊 Doctor & Medicine', query: 'medicine' },
  { label: '🚌 Bus & Station', query: 'bus' },
  { label: '💧 Water & Food', query: 'food' },
  { label: '🚨 Emergency Help', query: 'help' },
];

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
    const raw = query.trim().toLowerCase();
    if (!raw) return allPhrases;

    // Collect search terms including synonyms
    const searchTerms = [raw];
    for (const [key, synonyms] of Object.entries(SYNONYMS)) {
      if (raw.includes(key) || key.includes(raw)) {
        searchTerms.push(...synonyms);
      }
      for (const syn of synonyms) {
        if (raw.includes(syn) || syn.includes(raw)) {
          searchTerms.push(key, ...synonyms);
          break;
        }
      }
    }

    const uniqueTerms = Array.from(new Set(searchTerms));

    return allPhrases.filter((p) => {
      const catTitle = (p as unknown as { categories?: Category }).categories?.title?.toLowerCase() || '';
      const english = p.english.toLowerCase();
      const kannada = p.kannada.toLowerCase();
      const trans = p.transliteration.toLowerCase();
      const ctx = (p.context || '').toLowerCase();

      // Check if ANY of the search terms match
      return uniqueTerms.some(
        (term) =>
          catTitle.includes(term) ||
          english.includes(term) ||
          kannada.includes(term) ||
          trans.includes(term) ||
          ctx.includes(term)
      );
    });
  }, [allPhrases, query]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-forest-600 hover:text-forest-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      <h1 className="text-2xl md:text-3xl font-extrabold text-forest-800 mb-2">
        Smart Search
      </h1>
      <p className="text-warm-600 mb-6 text-sm md:text-base">
        Search across all situations by Kannada script, English meaning, pronunciation, or keyword.
      </p>

      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Try 'auto', 'coffee', 'medicine', 'price', 'water'..."
        />
      </div>

      {/* Quick Search Suggestion Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs">
        <span className="text-warm-500 font-bold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-lime-500" />
          Quick tags:
        </span>
        {SUGGESTED_TAGS.map((tag) => (
          <button
            key={tag.query}
            onClick={() => setQuery(tag.query)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              query.toLowerCase() === tag.query
                ? 'bg-forest-800 text-warm-100 shadow-xs'
                : 'bg-warm-200/80 hover:bg-warm-300 text-forest-700'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {!loading && query && filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-3xl bg-warm-200 flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-8 h-8 text-warm-400" />
          </div>
          <p className="text-warm-600 text-lg">
            No phrases match "<span className="font-semibold text-forest-700">{query}</span>"
          </p>
          <p className="text-warm-400 text-sm mt-1">
            Try a simpler keyword like "auto", "price", "ticket", or "food".
          </p>
        </div>
      )}

      {!loading && !query && (
        <p className="text-xs font-semibold text-warm-500 text-center py-4">
          {allPhrases.length} phrases ready. Tap any quick tag above or type in the search bar.
        </p>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <p className="text-xs font-bold text-warm-500 mb-4">
            Showing {filtered.length} {filtered.length === 1 ? 'phrase' : 'phrases'}
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
