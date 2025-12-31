import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Shortcut {
  id: string;
  label: string;
  emoji: string;
}

interface ShortcutState {
  shortcuts: Shortcut[];
  addShortcut: (shortcut: Omit<Shortcut, 'id'>) => void;
  removeShortcut: (id: string) => void;
  updateShortcut: (id: string, shortcut: Omit<Shortcut, 'id'>) => void;
  reorderShortcuts: (shortcuts: Shortcut[]) => void;
}

const defaultShortcuts: Shortcut[] = [
  { id: '1', label: '약 먹을 시간이에요', emoji: '💊' },
  { id: '2', label: '물 주세요', emoji: '💧' },
  { id: '3', label: '화장실 가고 싶어요', emoji: '🚽' },
];

export const useShortcutStore = create<ShortcutState>()(
  persist(
    (set) => ({
      shortcuts: defaultShortcuts,

      addShortcut: (shortcut) =>
        set((state) => {
          if (state.shortcuts.length >= 12) return state;
          return {
            shortcuts: [
              ...state.shortcuts,
              { ...shortcut, id: Date.now().toString() },
            ],
          };
        }),

      removeShortcut: (id) =>
        set((state) => ({
          shortcuts: state.shortcuts.filter((s) => s.id !== id),
        })),

      updateShortcut: (id, shortcut) =>
        set((state) => ({
          shortcuts: state.shortcuts.map((s) =>
            s.id === id ? { ...s, ...shortcut } : s
          ),
        })),

      reorderShortcuts: (shortcuts) => set({ shortcuts }),
    }),
    {
      name: 'aac-shortcuts',
    }
  )
);
