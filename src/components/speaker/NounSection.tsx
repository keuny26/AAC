import { useRef, useState } from 'react';
import { commonNouns } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useFrequencyStore } from '../../stores/frequencyStore';
import { useVibration } from '../../hooks/useVibration';

const particles = [
  { label: '이/가', value: '이' },
  { label: '을/를', value: '을' },
  { label: '은/는', value: '은' },
  { label: '에', value: '에' },
  { label: '에서', value: '에서' },
  { label: '으로', value: '으로' },
  { label: '와/과', value: '와' },
  { label: '도', value: '도' },
  { label: '만', value: '만' },
  { label: '부터', value: '부터' },
  { label: '까지', value: '까지' },
  { label: '없음', value: '' },
];

export default function NounSection() {
  const { appendWord } = useMessageStore();
  const { incrementWord } = useFrequencyStore();
  const { vibrate } = useVibration();
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedNoun, setSelectedNoun] = useState<typeof commonNouns[0] | null>(null);
  
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

  const handleClick = (noun: typeof commonNouns[0]) => {
    if (isLongPress.current || hasMoved.current) {
      isLongPress.current = false;
      hasMoved.current = false;
      return;
    }
    vibrate();
    appendWord(noun.label, noun.emoji);
    incrementWord(noun.label);
  };

  const handleTouchStart = (e: React.TouchEvent, noun: typeof commonNouns[0]) => {
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
        setSelectedNoun(noun);
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

  const handleSelectParticle = (particle: string) => {
    if (!selectedNoun) return;
    vibrate();
    const wordWithParticle = particle ? selectedNoun.label + particle : selectedNoun.label;
    appendWord(wordWithParticle, selectedNoun.emoji);
    incrementWord(wordWithParticle);
    setSelectedNoun(null);
  };

  return (
    <>
      <div className="py-3">
        <div className="flex justify-between items-center mb-3 px-4">
          <h2 className="text-sm font-medium text-gray-500">명사</h2>
          <span className="text-xs text-gray-400">길게 누르면 조사 선택</span>
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
          {commonNouns.map((noun) => (
            <button
              key={noun.id}
              onClick={() => handleClick(noun)}
              onTouchStart={(e) => handleTouchStart(e, noun)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ flexShrink: 0 }}
              className="
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

      {/* 조사 선택 모달 */}
      {selectedNoun && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setSelectedNoun(null)}
        >
          <div 
            className="w-full bg-white rounded-t-3xl p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
            
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-5xl">{selectedNoun.emoji}</span>
                <span className="text-3xl font-bold">{selectedNoun.label}</span>
              </div>
              <p className="text-gray-500">조사를 선택하세요</p>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {particles.map((particle) => (
                <button
                  key={particle.label}
                  onClick={() => handleSelectParticle(particle.value)}
                  className="
                    h-12
                    bg-gray-100 
                    rounded-xl
                    font-medium text-gray-800
                    active:bg-blue-100 active:scale-95
                    transition-all
                  "
                >
                  {particle.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedNoun(null)}
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