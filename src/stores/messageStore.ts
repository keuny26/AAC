import { create } from 'zustand';

interface MessageState {
  currentMessage: string;
  currentEmoji: string;
  currentEnglish: string;
  messageHistory: Array<{
    text: string;
    emoji: string;
    timestamp: number;
  }>;
  
  setMessage: (msg: string, emoji?: string, english?: string) => void;
  appendWord: (word: string, emoji?: string) => void;
  clearMessage: () => void;
  addToHistory: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  currentMessage: '',
  currentEmoji: '',
  currentEnglish: '',
  messageHistory: [],
  
  setMessage: (msg, emoji = '', english = '') => set({ 
    currentMessage: msg,
    currentEmoji: emoji,
    currentEnglish: english
  }),
  
  appendWord: (word, emoji = '') => set((state) => ({
    currentMessage: state.currentMessage ? `${state.currentMessage} ${word}` : word,
    currentEmoji: emoji || state.currentEmoji,
  })),
  
  clearMessage: () => set({ 
    currentMessage: '', 
    currentEmoji: '',
    currentEnglish: '' 
  }),
  
  addToHistory: () => {
    const { currentMessage, currentEmoji } = get();
    if (!currentMessage) return;
    
    set((state) => ({
      messageHistory: [
        { text: currentMessage, emoji: currentEmoji, timestamp: Date.now() },
        ...state.messageHistory
      ].slice(0, 50)
    }));
  },
}));