import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emergencyPhrases } from '../data/vocabulary';
import { useMessageStore } from '../stores/messageStore';
import { useTTS } from '../hooks/useTTS';
import { useVibration } from '../hooks/useVibration';

export default function EmergencyMode() {
  const navigate = useNavigate();
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const { setMessage } = useMessageStore();
  const { speak } = useTTS();
  const { vibrate } = useVibration();

  const handleEmergency = (item: typeof emergencyPhrases[0]) => {
    vibrate([100, 50, 100]);
    setMessage(item.label, item.emoji, item.englishLabel);
    speak(item.label);
  };

  const handlePainSelect = (level: number) => {
    setPainLevel(level);
    vibrate();
    const message = `통증 ${level}단계`;
    setMessage(message, '😣');
    speak(message);
  };

  const getPainColor = (level: number) => {
    if (level <= 3) return 'bg-success';
    if (level <= 6) return 'bg-warning';
    return 'bg-emergency';
  };

  return (
    <div className="h-full bg-gradient-to-b from-red-900 to-emergency flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚨</span>
          <h1 className="text-2xl font-bold text-white">긴급 모드</h1>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white/20 rounded-lg text-white font-medium"
        >
          닫기
        </button>
      </header>

      {/* Emergency Buttons Grid */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {emergencyPhrases.map((item) => (
            <button
              key={item.id}
              onClick={() => handleEmergency(item)}
              className="
                aspect-square
                bg-white
                rounded-3xl
                flex flex-col items-center justify-center
                shadow-xl
                active:scale-95 transition-transform
              "
            >
              <span className="text-5xl mb-2">{item.emoji}</span>
              <span className="text-xl font-bold text-gray-800">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Pain Scale */}
        <div className="mt-6 bg-white/95 rounded-3xl p-5">
          <h2 className="font-bold text-gray-800 mb-4">통증 정도를 선택하세요</h2>
          <div className="flex gap-1 justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <button
                key={level}
                onClick={() => handlePainSelect(level)}
                className={`
                  w-8 h-8 rounded-full
                  flex items-center justify-center
                  text-white font-bold text-sm
                  transition-all
                  ${getPainColor(level)}
                  ${painLevel === level ? 'scale-125 ring-2 ring-white' : ''}
                `}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>약함</span>
            <span>심함</span>
          </div>
        </div>
      </div>

      {/* Bottom Notice */}
      <div className="p-4 text-center">
        <p className="text-white/70 text-sm">
          버튼을 누르면 즉시 음성이 재생됩니다
        </p>
      </div>
    </div>
  );
}