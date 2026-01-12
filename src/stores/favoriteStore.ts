import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Favorite {
  id: string;
  text: string;
  emoji: string;
  createdAt: number;
}

interface FavoriteState {
  favorites: Favorite[];
  addFavorite: (text: string, emoji: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (text: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (text, emoji) => set((state) => ({
        favorites: [
          { id: Date.now().toString(), text, emoji, createdAt: Date.now() },
          ...state.favorites
        ].slice(0, 20)
      })),
      
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(f => f.id !== id)
      })),
      
      isFavorite: (text) => {
        return get().favorites.some(f => f.text === text);
      }
    }),
    {
      name: 'aac-favorites',
    }
  )
);