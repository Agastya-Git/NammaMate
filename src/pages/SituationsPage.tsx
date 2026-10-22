import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SituationCard } from '@/components/SituationCard';
import { supabase, type Category } from '@/lib/supabase';
import { OFFLINE_CATEGORIES, OFFLINE_PHRASES } from '@/lib/offlineData';

type SituationsPageProps = {
  onBack: () => void;
  onSituationClick: (slug: string) => void;
};

export function SituationsPage({ onBack, onSituationClick }: SituationsPageProps) {
  const initialCounts: Record<string, number> = {};
  for (const row of OFFLINE_PHRASES as unknown as { categories?: Category }[]) {
    const slug = row.categories?.slug;
    if (slug) initialCounts[slug] = (initialCounts[slug] ?? 0) + 1;
  }

  const [categories, setCategories] = useState<Category[]>(OFFLINE_CATEGORIES as Category[]);
  const [phraseCounts, setPhraseCounts] = useState<Record<string, number>>(initialCounts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setCategories(data as Category[]);
      })
      .catch(() => {});

    supabase
      .from('phrases')
      .select('*, categories(*)')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const counts: Record<string, number> = {};
          for (const row of data as unknown as { categories: Category }[]) {
            const slug = row.categories?.slug;
            if (slug) counts[slug] = (counts[slug] ?? 0) + 1;
          }
          setPhraseCounts(counts);
        }
      })
      .catch(() => {});
  }, []);

  const mainCategories = categories.filter((c) => c.slug !== 'common');

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-24 md:pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      <h1 className="text-3xl md:text-4xl font-extrabold text-forest-800 mb-2">
        Choose a situation
      </h1>
      <p className="text-warm-600 mb-8 max-w-xl text-sm md:text-base">
        Every situation has carefully chosen phrases to help you communicate naturally in everyday life.
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="card p-6 h-48 animate-pulse"
              style={{ background: 'rgba(16, 43, 40, 0.04)' }}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {mainCategories.map((cat) => (
              <SituationCard
                key={cat.id}
                category={cat}
                onClick={onSituationClick}
                phraseCount={phraseCounts[cat.slug]}
              />
            ))}
          </div>

          {/* Quick essentials featured */}
          {categories.find((c) => c.slug === 'common') && (
            <div
              className="card p-6 md:p-8 cursor-pointer hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300 border-2 border-forest-800/10"
              onClick={() => onSituationClick('common')}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-forest-800 mb-1">
                    {categories.find((c) => c.slug === 'common')?.title}
                  </h3>
                  <p className="text-warm-600 text-sm">
                    {categories.find((c) => c.slug === 'common')?.description}
                  </p>
                  <p className="text-xs font-bold text-forest-600 mt-2">
                    {phraseCounts['common'] ?? 10} survival phrases
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-forest-800 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-5 h-5 text-lime-300" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
