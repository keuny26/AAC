import { useFrequencyStore } from '../../stores/frequencyStore';
import { useMessageStore } from '../../stores/messageStore';
import { useTTS } from '../../hooks/useTTS';
import { useVibration } from '../../hooks/useVibration';
import { coreVerbs, coreAdjectives, commonNouns } from '../../data/vocabulary';

export default function FrequentSection() {
  const { getTopWords } = useFrequencyStore();
  const { setMessage, appendWord } = useMessageStore();
  const { speak } = useTTS();
  const { vibrate } = useVibration();

  const topWords = getTopWords(6);
  
  const allVocab = [...coreVerbs, ...coreAdjectives, ...commonNouns];

  const getVocabItem = (word: string) => {
    return allVocab.find(v => v.label === word || v.variations?.includes(word));
  };

  const handleClick = (word: string) => {
    vibrate();
    const vocab = getVocabItem(word);
    if (vocab) {
      if (vocab.category === 'noun') {
        appendWord(word, vocab.emoji);
      } else {
        setMessage(word, vocab.emoji, vocab.englishLabel);
      }
    } else {
      appendWord(word, '');
    }
  };

  if (topWords.length === 0) return null;

  return (
    <div className="py-3">
      <h2 className="text-sm font-medium text-gray-500 mb-3 px-4">자주 사용</h2>
      <div 
        className="flex gap-2 px-4"
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '8px',
          scrollbarWidth: 'none',
        }}
      >
        {topWords.map((word, index) => {
          const vocab = getVocabItem(word);
          return (
            <button
              key={index}
              onClick={() => handleClick(word)}
              style={{ flexShrink: 0 }}
              className="
                h-12 px-4
                bg-green-50
                border-2 border-green-400
                rounded-full
                flex items-center gap-2
                active:scale-95 transition-transform
              "
            >
              <span className="text-xl">{vocab?.emoji || '⭐'}</span>
              <span className="font-medium text-green-700 whitespace-nowrap">
                {word}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}