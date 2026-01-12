import { useNavigate } from 'react-router-dom';
import { useMessageStore } from '../../stores/messageStore';
import { useTTS } from '../../hooks/useTTS';
import { useVibration } from '../../hooks/useVibration';

export default function ActionButtons() {
  const navigate = useNavigate();
  const { currentMessage, clearMessage, addToHistory } = useMessageStore();
  const { speak } = useTTS();
  const { vibrateSuccess } = useVibration();

  const handleSpeak = () => {
    if (!currentMessage) return;
    vibrateSuccess();
    speak(currentMessage);
    addToHistory();
  };

  const handleShowListener = () => {
    if (!currentMessage) return;
    vibrateSuccess();
    addToHistory();
    navigate('/listener');
  };

  const handleClear = () => {
    clearMessage();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 pb-8">
      <div className="flex gap-3">
        <button
          onClick={handleClear}
          className="
            w-14 h-14
            bg-gray-100 text-gray-600
            rounded-2xl
            flex items-center justify-center
            text-2xl
            active:scale-95 transition-transform
          "
        >
          ✕
        </button>
        
        <button
          onClick={handleSpeak}
          disabled={!currentMessage}
          className={`
            flex-1 h-14
            rounded-2xl
            flex items-center justify-center gap-2
            font-bold text-lg
            active:scale-95 transition-transform
            ${currentMessage 
              ? 'bg-primary text-white shadow-lg shadow-primary/30' 
              : 'bg-gray-200 text-gray-400'
            }
          `}
        >
          <span className="text-xl">🔊</span>
          말하기
        </button>
        
        <button
          onClick={handleShowListener}
          disabled={!currentMessage}
          className={`
            flex-1 h-14
            rounded-2xl
            flex items-center justify-center gap-2
            font-bold text-lg
            active:scale-95 transition-transform
            ${currentMessage 
              ? 'bg-black text-listener-text shadow-lg' 
              : 'bg-gray-200 text-gray-400'
            }
          `}
        >
          <span className="text-xl">📱</span>
          보여주기
        </button>
      </div>
    </div>
  );
}