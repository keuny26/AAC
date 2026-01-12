import { useEffect } from 'react';
import { useSuggestionStore } from '../../stores/suggestionStore';
import { useMessageStore } from '../../stores/messageStore';
import { useFrequencyStore } from '../../stores/frequencyStore';
import { useTTS } from '../../hooks/useTTS';
import { useVibration } from '../../hooks/useVibration';

export default function SuggestionBar() {
  const { suggestions, updateSuggestions } = useSuggestionStore();
  const { currentMessage, setMessage } = useMessageStore();
  const { incrementWord } = useFrequencyStore();
  const { speak } = useTTS();
  const { vibrate } = useVibration();

  useEffect(() => {
    updateSuggestions(currentMessage);
  }, [currentMessage, updateSuggestions]);

  const handleSelect = (text: string, emoji: string) => {
    vibrate();
    setMessage(text, emoji);
    incrementWord(text);
    speak(text);
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
      <p className="text-xs text-blue-600 mb-2">추천 문장</p>
      <div 
        className="flex gap-2"
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSelect(suggestion.text, suggestion.emoji)}
            style={{ flexShrink: 0 }}
            className="
              h-10 px-4
              bg-white
              border border-blue-300
              rounded-full
              flex items-center gap-2
              active:scale-95 transition-transform
              shadow-sm
            "
          >
            <span>{suggestion.emoji}</span>
            <span className="text-sm font-medium text-blue-700 whitespace-nowrap">
              {suggestion.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}