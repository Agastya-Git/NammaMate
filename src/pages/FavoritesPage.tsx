import { useEffect, useState } from 'react';
import { Heart, ArrowLeft, Mic } from 'lucide-react';
import { PhraseCard } from '@/components/PhraseCard';
import { StreetModeModal } from '@/components/StreetModeModal';
import { supabase, type Phrase, type Category } from '@/lib/supabase';
import { getDeviceId } from '@/lib/device';
import { OFFLINE_PHRASES } from '@/lib/offlineData';

type FavoritesPageProps = {
  onBack: () => void;
  onSituationClick: (slug: string) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

export function FavoritesPage({
  onBack,
  favorites,
  onToggleFavorite,
}: FavoritesPageProps) {
  // Initial fallback from offline
  const initialFavPhrases = (OFFLINE_PHRASES as unknown as Phrase[]).filter((p) =>
    favorites.has(p.id)
  );

  const [phrases, setPhrases] = useState<Phrase[]>(initialFavPhrases);
  const [loading, setLoading] = useState(false);
  const [streetPhrase, setStreetPhrase] = useState<Phrase | null>(null);

  useEffect(() => {
    const deviceId = getDeviceId();
    let active = true;

    // Filter immediately
    const local = (OFFLINE_PHRASES as unknown as Phrase[]).filter((p) =>
      favorites.has(p.id)
    );
    setPhrases(local);

    supabase
      .from('favorites')
      .select('phrase_id, phrases(*, categories(*))')
      .eq('device_id', deviceId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!active) return;
        if (data && data.length > 0) {
          const favPhrases = (
            data as unknown as {
              phrase_id: string;
              phrases: Phrase & { categories: Category };
            }[]
          )
            .map((d) => d.phrases)
            .filter(Boolean);
          if (favPhrases.length > 0) {
            setPhrases(favPhrases);
          }
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [favorites]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-forest-800 flex items-center justify-center">
          <Heart className="w-6 h-6 text-lime-300 fill-lime-300" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-forest-800">
            Your favorite phrases
          </h1>
          <p className="text-warm-600">
            {phrases.length} saved {phrases.length === 1 ? 'phrase' : 'phrases'}
          </p>
        </div>
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
      ) : phrases.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-3xl bg-warm-200 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-warm-400" />
          </div>
          <h3 className="text-lg font-semibold text-forest-800 mb-2">
            No favorites yet
          </h3>
          <p className="text-warm-500 max-w-sm mx-auto mb-6">
            Tap the heart icon on any phrase to save it here for quick access.
          </p>
          <button onClick={onBack} className="btn-primary">
            <Mic className="w-5 h-5" />
            Browse phrases
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phrases.map((phrase) => (
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

      {streetPhrase && (
        <StreetModeModal phrase={streetPhrase} onClose={() => setStreetPhrase(null)} />
      )}
    </div>
  );
}
