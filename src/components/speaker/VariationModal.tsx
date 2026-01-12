import type { VocabItem } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useFrequencyStore } from '../../stores/frequencyStore';
import { useVibration } from '../../hooks/useVibration';

interface VariationModalProps {
  vocab: VocabItem;
  onClose: () => void;
}

export default function VariationModal({ vocab, onClose }: VariationModalProps) {
  const { appendWord } = useMessageStore();
  const { incrementWord } = useFrequencyStore();
  const { vibrate } = useVibration();

  const handleSelect = (variation: string) => {
    vibrate();
    appendWord(variation, vocab.emoji);
    incrementWord(variation);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onClose}
    >
      <div 
        className="w-full bg-white rounded-t-3xl p-6 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl">{vocab.emoji}</span>
            <span className="text-3xl font-bold">{vocab.label}</span>
          </div>
          <p className="text-gray-500">표현을 선택하세요</p>
        </div>

        {/* Variations Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {vocab.variations?.map((variation, index) => (
            <button
              key={index}
              onClick={() => handleSelect(variation)}
              className="
                h-14 
                bg-gray-100 
                rounded-2xl
                font-medium text-lg text-gray-800
                active:bg-blue-100 active:scale-95
                transition-all
              "
            >
              {variation}
            </button>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            w-full h-14
            bg-gray-200 text-gray-600
            rounded-2xl
            font-bold text-lg
            active:scale-95 transition-transform
          "
        >
          닫기
        </button>
      </div>
    </div>
  );
}