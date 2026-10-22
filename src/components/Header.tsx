import { Mic, Heart, Home, Search, BookOpen, Sparkles, ShieldAlert } from 'lucide-react';

export type Page = 'home' | 'situations' | 'roleplay' | 'favorites' | 'search' | 'manual';

type HeaderProps = {
  page: Page;
  onNavigate: (page: Page) => void;
  favCount: number;
  onOpenEmergency: () => void;
};

export function Header({ page, onNavigate, favCount, onOpenEmergency }: HeaderProps) {
  const navItems: { key: Page; label: string; icon: typeof Home; highlight?: boolean }[] = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'situations', label: 'Situations', icon: Mic },
    { key: 'roleplay', label: 'Roleplay AI', icon: Sparkles, highlight: true },
    { key: 'search', label: 'Search', icon: Search },
    { key: 'favorites', label: 'Favorites', icon: Heart },
    { key: 'manual', label: 'Manual', icon: BookOpen },
  ];

  return (
    <>
      {/* Desktop header */}
      <header className="hidden md:block sticky top-0 z-40 bg-warm-100/90 backdrop-blur-lg border-b border-warm-200">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-forest-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <Mic className="w-5 h-5 text-lime-300" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold text-forest-800 tracking-tight leading-none block">
                NammaMate
              </span>
              <span className="text-[10px] font-semibold text-warm-500 uppercase tracking-wider">
                Kannada Assistant
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = page === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-2xl font-semibold text-xs tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-forest-800 text-warm-100 shadow-xs'
                        : 'text-forest-700 hover:bg-warm-200/80'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        item.highlight && !isActive ? 'text-amber-600' : ''
                      }`}
                      strokeWidth={2}
                    />
                    {item.label}
                    {item.key === 'favorites' && favCount > 0 && (
                      <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-4.5 px-1 rounded-full bg-lime-300 text-forest-800 text-[10px] font-bold">
                        {favCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Emergency SOS button */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs transition-colors border border-red-200 ml-2 shadow-xs"
              title="Karnataka Helplines and Emergency Phrases"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              <span>SOS Help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-40 bg-warm-100/90 backdrop-blur-lg border-b border-warm-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-forest-800 flex items-center justify-center">
              <Mic className="w-4 h-4 text-lime-300" strokeWidth={2.5} />
            </div>
            <span className="text-base font-extrabold text-forest-800 tracking-tight">NammaMate</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-100 text-red-800 text-xs font-bold border border-red-200"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              SOS
            </button>
            {favCount > 0 && (
              <button
                onClick={() => onNavigate('favorites')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-warm-200 text-forest-800 text-xs font-bold"
              >
                <Heart className="w-3.5 h-3.5 fill-forest-800 text-forest-800" />
                {favCount}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-warm-200 px-1 py-1.5">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = page === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-forest-800 font-bold' : 'text-warm-600 font-medium'
                }`}
              >
                <Icon
                  className={`w-4.5 h-4.5 ${
                    isActive ? 'stroke-[2.5]' : 'stroke-2'
                  } ${item.highlight && !isActive ? 'text-amber-600' : ''}`}
                />
                <span className="text-[9px]">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-6 h-0.5 rounded-full bg-forest-800" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
