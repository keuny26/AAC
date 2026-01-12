import { create } from 'zustand';

interface Suggestion {
  text: string;
  emoji: string;
}

interface SuggestionState {
  suggestions: Suggestion[];
  updateSuggestions: (currentWord: string) => void;
}

const quickCombos: Record<string, Suggestion[]> = {
  '물': [
    { text: '물 주세요', emoji: '💧' },
    { text: '물 마시고 싶어요', emoji: '💧' },
    { text: '물 필요해요', emoji: '💧' },
  ],
  '밥': [
    { text: '밥 먹고 싶어요', emoji: '🍚' },
    { text: '밥 주세요', emoji: '🍚' },
    { text: '밥 먹었어요', emoji: '🍚' },
  ],
  '화장실': [
    { text: '화장실 가고 싶어요', emoji: '🚽' },
    { text: '화장실 어디예요?', emoji: '🚽' },
    { text: '화장실 급해요', emoji: '🚽' },
  ],
  '약': [
    { text: '약 주세요', emoji: '💊' },
    { text: '약 먹을 시간이에요', emoji: '💊' },
    { text: '약 먹었어요', emoji: '💊' },
  ],
  '아파요': [
    { text: '많이 아파요', emoji: '😣' },
    { text: '여기가 아파요', emoji: '😣' },
    { text: '조금 아파요', emoji: '😣' },
  ],
  '병원': [
    { text: '병원 가고 싶어요', emoji: '🏥' },
    { text: '병원 데려다 주세요', emoji: '🏥' },
    { text: '병원 예약했어요', emoji: '🏥' },
  ],
  '집': [
    { text: '집에 가고 싶어요', emoji: '🏠' },
    { text: '집에 있어요', emoji: '🏠' },
    { text: '집에 데려다 주세요', emoji: '🏠' },
  ],
};

export const useSuggestionStore = create<SuggestionState>((set) => ({
  suggestions: [],
  
  updateSuggestions: (currentWord) => {
    const lastWord = currentWord.split(' ').pop() || '';
    const matches = quickCombos[lastWord] || [];
    set({ suggestions: matches });
  },
}));