import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '../stores/favoriteStore';
import { useMessageStore } from '../stores/messageStore';
import { useTTS } from '../hooks/useTTS';
import { useVibration } from '../hooks/useVibration';
import { useSettingsStore } from '../stores/settingsStore';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavoriteStore();
  const { setMessage } = useMessageStore();
  const { speak } = useTTS();
  const { vibrate } = useVibration();
  const { darkMode } = useSettingsStore();

  const handleSelect = (text: string, emoji: string) => {
    vibrate();
    setMessage(text, emoji);
    speak(text);
    navigate('/');
  };

  return (
    <div className={`h-full flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`px-4 py-4 flex items-center border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <button
          onClick={() => navigate('/settings')}
          className={`text-2xl mr-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          ←
        </button>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>즐겨찾기 문장</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {favorites.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-full ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <span className="text-5xl mb-4">❤️</span>
            <p>즐겨찾기한 문장이 없어요</p>
            <p className="text-sm mt-2">메시지 화면에서 ❤️를 눌러 추가하세요</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className={`p-4 rounded-2xl flex items-center gap-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <button
                  onClick={() => handleSelect(fav.text, fav.emoji)}
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  <span className="text-3xl">{fav.emoji || '💬'}</span>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{fav.text}</span>
                </button>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="text-gray-400 p-2"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}