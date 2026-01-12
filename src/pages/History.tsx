import { useNavigate } from 'react-router-dom';
import { useMessageStore } from '../stores/messageStore';
import { useTTS } from '../hooks/useTTS';

export default function History() {
  const navigate = useNavigate();
  const { messageHistory, setMessage } = useMessageStore();
  const { speak } = useTTS();

  const handleSelect = (text: string, emoji: string) => {
    setMessage(text, emoji);
    speak(text);
    navigate('/');
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="text-2xl text-gray-600 mr-4"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-gray-800">메시지 기록</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {messageHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <span className="text-5xl mb-4">📝</span>
            <p>아직 메시지 기록이 없어요</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {messageHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item.text, item.emoji)}
                className="
                  w-full p-4
                  bg-white rounded-2xl
                  flex items-center gap-3
                  active:scale-98 transition-transform
                  text-left
                "
              >
                <span className="text-3xl">{item.emoji || '💬'}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.text}</p>
                  <p className="text-sm text-gray-400">{formatTime(item.timestamp)}</p>
                </div>
                <span className="text-gray-300">🔊</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}