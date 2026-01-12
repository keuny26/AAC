import { useRef, useState } from 'react';
import { coreAdjectives } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useFrequencyStore } from '../../stores/frequencyStore';
import { useVibration } from '../../hooks/useVibration';

const intensities = [
  { label: '조금', prefix: '조금 ' },
  { label: '많이', prefix: '많이 ' },
  { label: '너무', prefix: '너무 ' },
  { label: '약간', prefix: '약간 ' },
  { label: '정말', prefix: '정말 ' },
  { label: '기본', prefix: '' },
];

export default function AdjectiveScroll() {
  const { appendWord } = useMessageStore();
  const { incrementWord } = useFrequencyStore();
  const { vibrate } = useVibration();
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedAdj, setSelectedAdj] = useState<typeof coreAdjectives[0] | null>(null);
  
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const hasMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const clearTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = (adj: typeof coreAdjectives[0]) => {
    if (isLongPress.current || hasMoved.current) {
      isLongPress.current = false;
      hasMoved.current = false;
      return;
    }
    vibrate();
    appendWord(adj.label, adj.emoji);
    incrementWord(adj.label);
  };

  const handleTouchStart = (e: React.TouchEvent, adj: typeof coreAdjectives[0]) => {
    isLongPress.current = false;
    hasMoved.current = false;
    startPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    
    longPressTimer.current = setTimeout(() => {
      if (!hasMoved.current) {
        isLongPress.current = true;
        vibrate();
        setSelectedAdj(adj);
      }
    }, 800);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const moveX = Math.abs(e.touches[0].clientX - startPos.current.x);
    const moveY = Math.abs(e.touches[0].clientY - startPos.current.y);
    
    if (moveX > 10 || moveY > 10) {
      hasMoved.current = true;
      clearTimer();
    }
  };

  const handleTouchEnd = () => {
    clearTimer();
  };

  const handleSelectIntensity = (prefix: string) => {
    if (!selectedAdj) return;
    vibrate();
    const fullPhrase = prefix + selectedAdj.label;
    appendWord(fullPhrase, selectedAdj.emoji);
    incrementWord(fullPhrase);
    setSelectedAdj(null);
  };

  return (
    <>
      <div className="py-3">
        <div className="flex justify-between items-center mb-3 px-4">
          <h2 className="text-sm font-medium text-gray-500">상태</h2>
          <span className="text-xs text-gray-400">길게 누르면 정도 선택</span>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-2 px-4 select-none"
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {coreAdjectives.map((adj) => (
            <button
              key={adj.id}
              onClick={() => handleClick(adj)}
              onTouchStart={(e) => handleTouchStart(e, adj)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ flexShrink: 0 }}
              className="
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

      {/* 정도 선택 모달 */}
      {selectedAdj && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setSelectedAdj(null)}
        >
          <div 
            className="w-full bg-white rounded-t-3xl p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
            
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-5xl">{selectedAdj.emoji}</span>
                <span className="text-3xl font-bold">{selectedAdj.label}</span>
              </div>
              <p className="text-gray-500">정도를 선택하세요</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {intensities.map((intensity) => (
                <button
                  key={intensity.label}
                  onClick={() => handleSelectIntensity(intensity.prefix)}
                  className="
                    h-14
                    bg-gray-100 
                    rounded-xl
                    font-medium text-gray-800
                    active:bg-amber-100 active:scale-95
                    transition-all
                  "
                >
                  {intensity.prefix}{selectedAdj.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedAdj(null)}
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
      )}
    </>
  );
}