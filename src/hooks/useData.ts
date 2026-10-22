import { useState, useEffect, useCallback } from 'react';
import { supabase, type Category, type Phrase, type Favorite } from '@/lib/supabase';
import { getDeviceId } from '@/lib/device';
import { OFFLINE_CATEGORIES, OFFLINE_PHRASES } from '@/lib/offlineData';

const LOCAL_STORAGE_FAVS_KEY = 'nammamate_local_favorites';

function getLocalFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_FAVS_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {
    // ignore
  }
  return new Set();
}

function saveLocalFavorites(favs: Set<string>) {
  try {
    localStorage.setItem(LOCAL_STORAGE_FAVS_KEY, JSON.stringify(Array.from(favs)));
  } catch {
    // ignore
  }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(OFFLINE_CATEGORIES as Category[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from('categories')
      .select('*')
      .order('sort_order')
      .then(({ data, error }) => {
        if (active && data && !error && data.length > 0) {
          setCategories(data as Category[]);
        }
      })
      .catch(() => {
        // fallback to offline data
      });
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading };
}

export function usePhrases(categoryId: string | null) {
  const initialPhrases = categoryId
    ? (OFFLINE_PHRASES as unknown as Phrase[]).filter((p) => p.category_id === categoryId)
    : [];

  const [phrases, setPhrases] = useState<Phrase[]>(initialPhrases);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (!categoryId) {
      setPhrases([]);
      return;
    }

    const filteredOffline = (OFFLINE_PHRASES as unknown as Phrase[]).filter(
      (p) => p.category_id === categoryId
    );
    setPhrases(filteredOffline);

    supabase
      .from('phrases')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order')
      .then(({ data, error }) => {
        if (active && data && !error && data.length > 0) {
          setPhrases(data as Phrase[]);
        }
      })
      .catch(() => {
        // fallback to offline
      });

    return () => {
      active = false;
    };
  }, [categoryId]);

  return { phrases, loading };
}

export function useAllPhrases() {
  const [phrases, setPhrases] = useState<Phrase[]>(OFFLINE_PHRASES as unknown as Phrase[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from('phrases')
      .select('*, categories(*)')
      .order('sort_order')
      .then(({ data, error }) => {
        if (active && data && !error && data.length > 0) {
          setPhrases(data as unknown as Phrase[]);
        }
      })
      .catch(() => {
        // keep offline
      });

    return () => {
      active = false;
    };
  }, []);

  return { phrases, loading };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => getLocalFavorites());
  const [loading, setLoading] = useState(false);
  const deviceId = getDeviceId();

  const refresh = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('phrase_id')
        .eq('device_id', deviceId);
      if (data && !error) {
        const merged = new Set([...Array.from(getLocalFavorites()), ...data.map((f: Favorite) => f.phrase_id)]);
        setFavorites(merged);
        saveLocalFavorites(merged);
      }
    } catch {
      // use local
    }
    setLoading(false);
  }, [deviceId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (phraseId: string) => {
      const isFav = favorites.has(phraseId);
      const next = new Set(favorites);
      if (isFav) {
        next.delete(phraseId);
      } else {
        next.add(phraseId);
      }
      setFavorites(next);
      saveLocalFavorites(next);

      try {
        if (isFav) {
          await supabase
            .from('favorites')
            .delete()
            .eq('device_id', deviceId)
            .eq('phrase_id', phraseId);
        } else {
          await supabase.from('favorites').insert({
            device_id: deviceId,
            phrase_id: phraseId,
          });
        }
      } catch {
        // local storage saved already
      }
    },
    [deviceId, favorites]
  );

  const favoritePhrases = useCallback(async (): Promise<Phrase[]> => {
    const all = OFFLINE_PHRASES as unknown as Phrase[];
    const favSet = getLocalFavorites();
    const localMatches = all.filter((p) => favSet.has(p.id));

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('phrase_id, phrases(*)')
        .eq('device_id', deviceId)
        .order('created_at', { ascending: false });
      if (data && !error && data.length > 0) {
        const fetched = (data as unknown as { phrase_id: string; phrases: Phrase }[])
          .map((d) => d.phrases)
          .filter(Boolean);
        return fetched;
      }
    } catch {
      // return local
    }

    return localMatches;
  }, [deviceId]);

  return { favorites, toggle, loading, favoritePhrases, refresh };
}
