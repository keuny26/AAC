import { emergencyPhrases } from '../../data/vocabulary';
import { useMessageStore } from '../../stores/messageStore';
import { useTTS } from '../../hooks/useTTS';
import { useVibration } from '../../hooks/useVibration';

export default function EmergencyBar() {
  const { setMessage } = useMessageStore();
  const { speak } = useTTS();
  const { vibrate } = useVibration();

  const quickEmergency = emergencyPhrases.slice(0, 3);

  const handleEmergency = (item: typeof emergencyPhrases[0]) => {
    vibrate([100, 50, 100]);
    setMessage(item.label, item.emoji, item.englishLabel);
    speak(item.label);
  };

  return (
    <div className="bg-red-50 px-4 py-3">
      <div className="flex gap-2 justify-center">
        {quickEmergency.map((item) => (
          <button
            key={item.id}
            onClick={() => handleEmergency(item)}
            className="
              flex-1 max-w-[120px]
              bg-emergency text-white
              py-2 px-3 rounded-xl
              font-bold text-sm
              active:scale-95 transition-transform
              shadow-md shadow-emergency/30
            "
          >
            <span className="mr-1">{item.emoji}</span>
            {item.label.replace('!', '')}
          </button>
        ))}
      </div>
    </div>
  );
}