import { commonNouns } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useVibration } from '../../hooks/useVibration';

export default function NounSection() {
  const { appendWord } = useMessageStore();
  const { vibrate } = useVibration();

  const handleClick = (noun: typeof commonNouns[0]) => {
    vibrate();
    appendWord(noun.label, noun.emoji);
  };

  return (
    <div className="px-4 py-3">
      <h2 className="text-sm font-medium text-gray-500 mb-3">명사</h2>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {commonNouns.map((noun) => (
          <button
            key={noun.id}
            onClick={() => handleClick(noun)}
            className="
              flex-shrink-0
              h-12 px-4
              bg-blue-50
              border-2 border-primary
              rounded-full
              flex items-center gap-2
              active:scale-95 transition-transform
            "
          >
            <span className="text-xl">{noun.emoji}</span>
            <span className="font-medium text-primary whitespace-nowrap">
              {noun.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}