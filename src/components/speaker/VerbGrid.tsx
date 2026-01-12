import { useState, useRef } from 'react';
import BigButton from '../common/BigButton';
import VariationModal from './VariationModal';
import type { VocabItem } from '../../data/vocabulary';
import { coreVerbs } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useFrequencyStore } from '../../stores/frequencyStore';
import { useVibration } from '../../hooks/useVibration';

export default function VerbGrid() {
  const [selectedVerb, setSelectedVerb] = useState<VocabItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { appendWord } = useMessageStore();
  const { incrementWord } = useFrequencyStore();
  const { vibrate } = useVibration();

  const handleVerbClick = (verb: VocabItem) => {
    vibrate();
    appendWord(verb.label, verb.emoji);
    incrementWord(verb.label);
  };

  const handleVerbLongPress = (verb: VocabItem) => {
    if (verb.variations && verb.variations.length > 0) {
      setSelectedVerb(verb);
    }
  };

  const displayedVerbs = showAll ? coreVerbs : coreVerbs.slice(0, 6);

  return (
    <>
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-medium text-gray-500">동사</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">길게 누르면 시제 변경</span>
            {coreVerbs.length > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-primary font-medium"
              >
                {showAll ? '접기' : `더보기 (${coreVerbs.length - 6}개)`}
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {displayedVerbs.map((verb) => (
            <BigButton
              key={verb.id}
              label={verb.label}
              emoji={verb.emoji}
              onClick={() => handleVerbClick(verb)}
              onLongPress={() => handleVerbLongPress(verb)}
              variant="default"
              size="lg"
            />
          ))}
        </div>
      </div>

      {selectedVerb && (
        <VariationModal
          vocab={selectedVerb}
          onClose={() => setSelectedVerb(null)}
        />
      )}
    </>
  );
}