import { useState } from 'react';
import BigButton from '../common/BigButton';
import VariationModal from './VariationModal';
import type { VocabItem } from '../../data/vocabulary';
import { coreVerbs } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useVibration } from '../../hooks/useVibration';

export default function VerbGrid() {
  const [selectedVerb, setSelectedVerb] = useState<VocabItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { setMessage } = useMessageStore();
  const { vibrate } = useVibration();

  const handleVerbClick = (verb: VocabItem) => {
    vibrate();
    setMessage(verb.label, verb.emoji, verb.englishLabel);
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
          {coreVerbs.length > 6 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-primary font-medium"
            >
              {showAll ? '접기' : `더보기 (${coreVerbs.length - 6}개)`}
            </button>
          )}
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