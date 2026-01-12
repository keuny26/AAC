import { create } from 'zustand';

interface FeedbackState {
  lastFeedback: 'understood' | 'repeat' | null;
  feedbackTime: number | null;
  setFeedback: (feedback: 'understood' | 'repeat') => void;
  clearFeedback: () => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  lastFeedback: null,
  feedbackTime: null,
  
  setFeedback: (feedback) => set({ 
    lastFeedback: feedback, 
    feedbackTime: Date.now() 
  }),
  
  clearFeedback: () => set({ 
    lastFeedback: null, 
    feedbackTime: null 
  }),
}));