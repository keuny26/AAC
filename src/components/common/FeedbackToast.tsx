import { useEffect, useState } from 'react';
import { useFeedbackStore } from '../../stores/feedbackStore';

export default function FeedbackToast() {
  const { lastFeedback, feedbackTime, clearFeedback } = useFeedbackStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastFeedback && feedbackTime) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        clearFeedback();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastFeedback, feedbackTime, clearFeedback]);

  if (!visible || !lastFeedback) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 animate-pulse">
      <div className={`
        p-4 rounded-2xl shadow-lg flex items-center gap-3
        ${lastFeedback === 'understood' 
          ? 'bg-green-500 text-white' 
          : 'bg-blue-500 text-white'
        }
      `}>
        <span className="text-2xl">
          {lastFeedback === 'understood' ? '✅' : '🔄'}
        </span>
        <span className="font-bold">
          {lastFeedback === 'understood' 
            ? '상대방이 메시지를 이해했어요!' 
            : '상대방이 다시 말해달라고 해요'
          }
        </span>
      </div>
    </div>
  );
}