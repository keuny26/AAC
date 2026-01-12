import { useNavigate } from 'react-router-dom';
import { useMessageStore } from '../stores/messageStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useFeedbackStore } from '../stores/feedbackStore';
import { useTTS } from '../hooks/useTTS';
import { useVibration } from '../hooks/useVibration';
import { useEffect } from 'react';

export default function ListenerScreen() {
  const navigate = useNavigate();
  const { currentMessage, currentEmoji, currentEnglish } = useMessageStore();
  const { showEnglish } = useSettingsStore();
  const { setFeedback } = useFeedbackStore();
  const { speak } = useTTS();
  const { vibrateSuccess } = useVibration();

  useEffect(() => {
    if (currentMessage) {
      speak(currentMessage);
    }
  }, []);

  const handleUnderstood = () => {
    vibrateSuccess();
    setFeedback('understood');
    navigate('/');
  };

  const handleRepeat = () => {
    setFeedback('repeat');
    speak(currentMessage);
  };

  if (!currentMessage) {
    navigate('/');
    return null;
  }

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Close Button */}
      <div className="p-4 flex justify-end">
        <button
          onClick={() => navigate('/')}
          className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-2xl">✕</span>
        </button>
      </div>

      {/* Main Message */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <p className="text-listener-text text-6xl sm:text-8xl font-black text-center leading-tight listener-glow">
          {currentMessage}
        </p>
        
        {currentEmoji && (
          <span className="text-6xl mt-6">{currentEmoji}</span>
        )}
        
        {showEnglish && currentEnglish && (
          <p className="text-white/70 text-2xl mt-8">
            {currentEnglish}
          </p>
        )}
      </div>

      {/* Feedback Buttons */}
      <div className="p-6 pb-12 flex gap-4">
        <button
          onClick={handleUnderstood}
          className="
            flex-1 h-[72px]
            bg-success text-white
            rounded-2xl
            font-bold text-xl
            flex items-center justify-center gap-2
            active:scale-95 transition-transform
          "
        >
          <span className="text-2xl">✅</span>
          알겠어요
        </button>
        
        <button
          onClick={handleRepeat}
          className="
            flex-1 h-[72px]
            bg-primary text-white
            rounded-2xl
            font-bold text-xl
            flex items-center justify-center gap-2
            active:scale-95 transition-transform
          "
        >
          <span className="text-2xl">🔄</span>
          다시 말해줘
        </button>
      </div>
    </div>
  );
}