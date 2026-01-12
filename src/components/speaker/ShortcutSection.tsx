import { useRef } from 'react';
import { useShortcutStore } from '../../stores/shortcutStore';
import { useMessageStore } from '../../stores/messageStore';
import { useTTS } from '../../hooks/useTTS';
import { useVibration } from '../../hooks/useVibration';

export default function ShortcutSection() {
  const { shortcuts } = useShortcutStore();
  const { setMessage } = useMessageStore();
  const { speak } = useTTS();
  const { vibrate } = useVibration();
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleClick = (label: string, emoji: string) => {
    vibrate();
    setMessage(label, emoji);
    speak(label);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  if (shortcuts.length === 0) return null;

  return (
    <div className="py-3">
      <h2 className="text-sm font-medium text-gray-500 mb-3 px-4">나의 단축어</h2>
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex gap-2 px-4 cursor-grab active:cursor-grabbing select-none"
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
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