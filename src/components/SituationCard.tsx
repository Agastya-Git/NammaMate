import { ArrowRight } from 'lucide-react';
import { getIcon } from '@/lib/icon';
import type { Category } from '@/lib/supabase';

type SituationCardProps = {
  category: Category;
  onClick: (slug: string) => void;
  phraseCount?: number;
};

export function SituationCard({ category, onClick, phraseCount }: SituationCardProps) {
  const Icon = getIcon(category.icon);

  return (
    <button
      onClick={() => onClick(category.slug)}
      className="card p-6 text-left hover:shadow-lift hover:-translate-y-1 group w-full"
      style={{ animationDelay: '0.05s' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: category.color }}
        >
          <Icon className="w-7 h-7 text-lime-300" strokeWidth={1.75} />
        </div>
        <ArrowRight className="w-5 h-5 text-warm-400 group-hover:text-forest-600 group-hover:translate-x-1 transition-all duration-300" />
      </div>
      <h3 className="text-lg font-bold text-forest-800 mb-1.5 leading-tight">
        {category.title}
      </h3>
      <p className="text-sm text-warm-600 leading-relaxed mb-3">{category.description}</p>
      {phraseCount !== undefined && (
        <p className="text-xs font-medium text-forest-500">{phraseCount} phrases</p>
      )}
    </button>
  );
}
