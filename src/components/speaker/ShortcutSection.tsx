import { useShortcutStore } from '../../stores/shortcutStore';
import { useMessageStore } from '../../stores/messageStore';
import { useTTS } from '../../hooks/useTTS';
import { useVibration } from '../../hooks/useVibration';

export default function ShortcutSection() {
  const { shortcuts } = useShortcutStore();
  const { setMessage } = useMessageStore();
  const { speak } = useTTS();
  const { vibrate } = useVibration();

  const handleClick = (label: string, emoji: string) => {
    vibrate();
    setMessage(label, emoji);
    speak(label);
  };

  if (shortcuts.length === 0) return null;

  return (
    <div className="px-4 py-3">
      <h2 className="text-sm font-medium text-gray-500 mb-3">나의 단축어</h2>
      <div 
        className="flex gap-2 pb-2 overflow-x-scroll"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.id}
            onClick={() => handleClick(shortcut.label, shortcut.emoji)}
            style={{ flexShrink: 0 }}
            className="
              h-12 px-4
              bg-purple-50
              border-2 border-purple-400
              rounded-full
              flex items-center gap-2
              active:scale-95 transition-transform
            "
          >
            <span className="text-xl">{shortcut.emoji}</span>
            <span className="font-medium text-purple-700 whitespace-nowrap">
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
