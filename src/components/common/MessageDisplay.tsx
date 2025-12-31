import { useMessageStore } from '../../stores/messageStore';

export default function MessageDisplay() {
  const { currentMessage, currentEmoji } = useMessageStore();

  return (
    <div className="mx-4 my-3">
      <div className={`
        min-h-[80px] 
        bg-white 
        border-2 rounded-2xl
        flex items-center justify-center
        px-4 py-3
        ${currentMessage ? 'border-primary' : 'border-gray-200'}
      `}>
        {currentMessage ? (
          <div className="flex items-center gap-3">
            {currentEmoji && <span className="text-3xl">{currentEmoji}</span>}
            <span className="text-2xl font-bold text-gray-800">{currentMessage}</span>
          </div>
        ) : (
          <span className="text-gray-400 text-lg">
            버튼을 눌러 메시지를 만드세요
          </span>
        )}
      </div>
    </div>
  );
}