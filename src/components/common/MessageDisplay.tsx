import { useState } from 'react';
import { useMessageStore } from '../../stores/messageStore';
import { useFavoriteStore } from '../../stores/favoriteStore';
import { useVibration } from '../../hooks/useVibration';

export default function MessageDisplay() {
  const { currentMessage, currentEmoji, setMessage, appendWord } = useMessageStore();
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavoriteStore();
  const { vibrate } = useVibration();
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');

  const words = currentMessage ? currentMessage.split(' ') : [];
  const isCurrentFavorite = currentMessage ? isFavorite(currentMessage) : false;

  const handleRemoveWord = (indexToRemove: number) => {
    vibrate();
    const newWords = words.filter((_, index) => index !== indexToRemove);
    const newMessage = newWords.join(' ');
    setMessage(newMessage, newWords.length > 0 ? currentEmoji : '');
  };

  const handleClearAll = () => {
    vibrate();
    setMessage('', '');
  };

  const handleToggleFavorite = () => {
    vibrate();
    if (isCurrentFavorite) {
      const fav = favorites.find(f => f.text === currentMessage);
      if (fav) removeFavorite(fav.id);
    } else {
      addFavorite(currentMessage, currentEmoji);
    }
  };

  const handleAddCustomWord = () => {
    if (!inputText.trim()) return;
    vibrate();
    appendWord(inputText.trim(), '');
    setInputText('');
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomWord();
    }
  };

  return (
    <div className="mx-4 my-3">
      <div className={`
        min-h-[80px] 
        bg-white 
        border-2 rounded-2xl
        px-4 py-3
        ${currentMessage ? 'border-primary' : 'border-gray-200'}
      `}>
        {currentMessage || isTyping ? (
          <div>
            <div className="flex justify-between mb-2">
              <button
                onClick={() => setIsTyping(!isTyping)}
                className={`text-sm px-3 py-1 rounded-full ${isTyping ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                ✏️ 직접 입력
              </button>
              {currentMessage && (
                <button
                  onClick={handleToggleFavorite}
                  className="text-2xl active:scale-110 transition-transform"
                >
                  {isCurrentFavorite ? '❤️' : '🤍'}
                </button>
              )}
            </div>

            {isTyping && (
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="단어를 입력하세요"
                  autoFocus
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-lg"
                />
                <button
                  onClick={handleAddCustomWord}
                  className="px-4 py-2 bg-primary text-white rounded-xl font-medium"
                >
                  추가
                </button>
              </div>
            )}
            
            {words.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {currentEmoji && <span className="text-2xl">{currentEmoji}</span>}
                {words.map((word, index) => (
                  <span
                    key={index}
                    onClick={() => handleRemoveWord(index)}
                    className="
                      inline-flex items-center gap-1
                      bg-blue-100 text-primary
                      px-3 py-1 rounded-full
                      text-lg font-medium
                      cursor-pointer
                      active:bg-red-100 active:text-red-500
                      transition-colors
                    "
                  >
                    {word}
                    <span className="text-sm text-blue-400">✕</span>
                  </span>
                ))}
              </div>
            )}
            
            {words.length > 1 && (
              <button
                onClick={handleClearAll}
                className="mt-2 text-sm text-gray-400 underline"
              >
                전체 삭제
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[56px] gap-2">
            <span className="text-gray-400 text-lg">
              버튼을 눌러 메시지를 만드세요
            </span>
            <button
              onClick={() => setIsTyping(true)}
              className="text-sm text-primary underline"
            >
              또는 직접 입력하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}