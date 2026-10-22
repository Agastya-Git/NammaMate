import { useState, useEffect } from 'react';
import { Header, type Page as HeaderPage } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmergencyModal } from '@/components/EmergencyModal';
import { HomePage } from '@/pages/HomePage';
import { SituationsPage } from '@/pages/SituationsPage';
import { PhrasePage } from '@/pages/PhrasePage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { SearchPage } from '@/pages/SearchPage';
import { ManualPage } from '@/pages/ManualPage';
import { RoleplayPage } from '@/pages/RoleplayPage';
import { useFavorites } from '@/hooks/useData';

type Page = 'home' | 'situations' | 'phrase' | 'roleplay' | 'favorites' | 'search' | 'manual';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const { favorites, toggle } = useFavorites();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, currentSlug]);

  const navigate = (p: Page) => setPage(p);

  const handleSituationClick = (slug: string) => {
    setCurrentSlug(slug);
    setPage('phrase');
  };

  const navPage: HeaderPage = page === 'phrase' ? 'situations' : page;

  return (
    <div className="min-h-screen bg-warm-100 flex flex-col font-sans text-forest-900 selection:bg-lime-200 selection:text-forest-900">
      <Header
        page={navPage}
        onNavigate={navigate}
        favCount={favorites.size}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      <main className="flex-1">
        {page === 'home' && (
          <HomePage
            onNavigateSituations={() => setPage('situations')}
            onNavigateRoleplay={() => setPage('roleplay')}
            onSituationClick={handleSituationClick}
            onPhraseClick={handleSituationClick}
          />
        )}

        {page === 'situations' && (
          <SituationsPage
            onBack={() => setPage('home')}
            onSituationClick={handleSituationClick}
          />
        )}

        {page === 'phrase' && (
          <PhrasePage
            slug={currentSlug}
            onBack={() => setPage('situations')}
            onSituationClick={handleSituationClick}
            favorites={favorites}
            onToggleFavorite={toggle}
          />
        )}

        {page === 'roleplay' && (
          <RoleplayPage onBack={() => setPage('home')} />
        )}

        {page === 'favorites' && (
          <FavoritesPage
            onBack={() => setPage('home')}
            onSituationClick={handleSituationClick}
            favorites={favorites}
            onToggleFavorite={toggle}
          />
        )}

        {page === 'search' && (
          <SearchPage
            onBack={() => setPage('home')}
            favorites={favorites}
            onToggleFavorite={toggle}
          />
        )}

        {page === 'manual' && (
          <ManualPage
            onBack={() => setPage('home')}
            onNavigateHome={() => setPage('home')}
            onNavigateSituations={() => setPage('situations')}
            onNavigateSearch={() => setPage('search')}
            onNavigateFavorites={() => setPage('favorites')}
            onSituationClick={handleSituationClick}
          />
        )}
      </main>

      <Footer onNavigateManual={() => setPage('manual')} />

      {/* Emergency & SOS Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
}

export default App;
