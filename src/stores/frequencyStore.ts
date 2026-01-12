import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FrequencyState {
  wordCounts: Record<string, number>;
  incrementWord: (word: string) => void;
  getTopWords: (limit: number) => string[];
}

export const useFrequencyStore = create<FrequencyState>()(
  persist(
    (set, get) => ({
      wordCounts: {},
      
      incrementWord: (word) => set((state) => ({
        wordCounts: {
          ...state.wordCounts,
          [word]: (state.wordCounts[word] || 0) + 1
        }
      })),
      
      getTopWords: (limit) => {
        const { wordCounts } = get();
        return Object.entries(wordCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, limit)
          .map(([word]) => word);
      }
    }),
    {
      name: 'aac-frequency',
    }
  )
);