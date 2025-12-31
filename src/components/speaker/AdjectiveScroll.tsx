import { coreAdjectives } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useVibration } from '../../hooks/useVibration';

export default function AdjectiveScroll() {
  const { setMessage } = useMessageStore();
  const { vibrate } = useVibration();

  const handleClick = (adj: typeof coreAdjectives[0]) => {
    vibrate();
    setMessage(adj.label, adj.emoji, adj.englishLabel);
  };

  return (
    <div className="px-4 py-3">
      <h2 className="text-sm font-medium text-gray-500 mb-3">상태</h2>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {coreAdjectives.map((adj) => (
          <button
            key={adj.id}
            onClick={() => handleClick(adj)}
            className="
              flex-shrink-0
              h-12 px-4
              bg-amber-50 
              border-2 border-warning
              rounded-full
              flex items-center gap-2
              active:scale-95 transition-transform
            "
          >
            <span className="text-xl">{adj.emoji}</span>
            <span className="font-medium text-amber-900 whitespace-nowrap">
              {adj.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}