export type VocabItem = {
  id: string;
  label: string;
  emoji: string;
  category: 'verb' | 'adjective' | 'emergency' | 'noun';
  variations?: string[];
  englishLabel?: string;
};

export const coreVerbs: VocabItem[] = [
  { 
    id: 'go', 
    label: '가다', 
    emoji: '🚶', 
    category: 'verb',
    variations: ['가요', '갈게요', '가고 싶어요', '가지 마세요'],
    englishLabel: 'Go'
  },
  { 
    id: 'come', 
    label: '오다', 
    emoji: '🙋', 
    category: 'verb',
    variations: ['와요', '와 주세요', '오고 있어요', '오지 마세요'],
    englishLabel: 'Come'
  },
  { 
    id: 'eat', 
    label: '먹다', 
    emoji: '🍽️', 
    category: 'verb',
    variations: ['먹어요', '먹고 싶어요', '먹을게요', '먹었어요', '먹지 마세요'],
    englishLabel: 'Eat'
  },
  { 
    id: 'drink', 
    label: '마시다', 
    emoji: '🥤', 
    category: 'verb',
    variations: ['마셔요', '마시고 싶어요', '마실게요', '마셨어요'],
    englishLabel: 'Drink'
  },
  { 
    id: 'help', 
    label: '도와주다', 
    emoji: '🤝', 
    category: 'verb',
    variations: ['도와주세요', '도와줘요', '도와줄게요'],
    englishLabel: 'Help'
  },
  { 
    id: 'wait', 
    label: '기다리다', 
    emoji: '✋', 
    category: 'verb',
    variations: ['기다려요', '기다려 주세요', '기다릴게요'],
    englishLabel: 'Wait'
  },
  { 
    id: 'stop', 
    label: '멈추다', 
    emoji: '🛑', 
    category: 'verb',
    variations: ['멈춰요', '멈춰 주세요', '멈출게요'],
    englishLabel: 'Stop'
  },
  { 
    id: 'sleep', 
    label: '자다', 
    emoji: '😴', 
    category: 'verb',
    variations: ['자요', '자고 싶어요', '잘게요', '잤어요'],
    englishLabel: 'Sleep'
  },
  { 
    id: 'sit', 
    label: '앉다', 
    emoji: '🪑', 
    category: 'verb',
    variations: ['앉아요', '앉고 싶어요', '앉을게요'],
    englishLabel: 'Sit'
  },
  { 
    id: 'stand', 
    label: '서다', 
    emoji: '🧍', 
    category: 'verb',
    variations: ['서요', '서 주세요', '설게요'],
    englishLabel: 'Stand'
  },
  { 
    id: 'see', 
    label: '보다', 
    emoji: '👀', 
    category: 'verb',
    variations: ['봐요', '보고 싶어요', '볼게요', '봤어요'],
    englishLabel: 'See'
  },
  { 
    id: 'listen', 
    label: '듣다', 
    emoji: '👂', 
    category: 'verb',
    variations: ['들어요', '듣고 싶어요', '들을게요'],
    englishLabel: 'Listen'
  },
];

export const coreAdjectives: VocabItem[] = [
  { id: 'pain', label: '아파요', emoji: '😣', category: 'adjective', englishLabel: 'Hurts' },
  { id: 'dizzy', label: '어지러워요', emoji: '😵', category: 'adjective', englishLabel: 'Dizzy' },
  { id: 'hot', label: '더워요', emoji: '🥵', category: 'adjective', englishLabel: 'Hot' },
  { id: 'cold', label: '추워요', emoji: '🥶', category: 'adjective', englishLabel: 'Cold' },
  { id: 'tired', label: '피곤해요', emoji: '😩', category: 'adjective', englishLabel: 'Tired' },
  { id: 'anxious', label: '불안해요', emoji: '😰', category: 'adjective', englishLabel: 'Anxious' },
  { id: 'urgent', label: '급해요', emoji: '⚡', category: 'adjective', englishLabel: 'Urgent' },
  { id: 'thirsty', label: '목말라요', emoji: '💧', category: 'adjective', englishLabel: 'Thirsty' },
  { id: 'hungry', label: '배고파요', emoji: '🍚', category: 'adjective', englishLabel: 'Hungry' },
  { id: 'good', label: '좋아요', emoji: '😊', category: 'adjective', englishLabel: 'Good' },
  { id: 'bad', label: '싫어요', emoji: '😤', category: 'adjective', englishLabel: 'Bad' },
  { id: 'scared', label: '무서워요', emoji: '😨', category: 'adjective', englishLabel: 'Scared' },
];

export const emergencyPhrases: VocabItem[] = [
  { id: 'emergency_help', label: '도와주세요!', emoji: '🆘', category: 'emergency', englishLabel: 'Help!' },
  { id: 'emergency_pain', label: '아파요!', emoji: '😰', category: 'emergency', englishLabel: 'Pain!' },
  { id: 'emergency_toilet', label: '화장실!', emoji: '🚽', category: 'emergency', englishLabel: 'Toilet!' },
  { id: 'emergency_medicine', label: '약 필요!', emoji: '💊', category: 'emergency', englishLabel: 'Medicine!' },
  { id: 'emergency_water', label: '물!', emoji: '💧', category: 'emergency', englishLabel: 'Water!' },
  { id: 'emergency_stop', label: '멈춰요!', emoji: '🛑', category: 'emergency', englishLabel: 'Stop!' },
];

export const commonNouns: VocabItem[] = [
  { id: 'water', label: '물', emoji: '💧', category: 'noun', englishLabel: 'Water' },
  { id: 'food', label: '밥', emoji: '🍚', category: 'noun', englishLabel: 'Food' },
  { id: 'medicine', label: '약', emoji: '💊', category: 'noun', englishLabel: 'Medicine' },
  { id: 'toilet', label: '화장실', emoji: '🚽', category: 'noun', englishLabel: 'Toilet' },
  { id: 'home', label: '집', emoji: '🏠', category: 'noun', englishLabel: 'Home' },
  { id: 'hospital', label: '병원', emoji: '🏥', category: 'noun', englishLabel: 'Hospital' },
  { id: 'phone', label: '전화', emoji: '📱', category: 'noun', englishLabel: 'Phone' },
  { id: 'money', label: '돈', emoji: '💰', category: 'noun', englishLabel: 'Money' },
];