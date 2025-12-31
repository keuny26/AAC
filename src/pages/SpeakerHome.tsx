import { useNavigate } from 'react-router-dom';
import EmergencyBar from '../components/common/EmergencyBar';
import VerbGrid from '../components/speaker/VerbGrid';
import AdjectiveScroll from '../components/speaker/AdjectiveScroll';
import NounSection from '../components/speaker/NounSection';
import ShortcutSection from '../components/speaker/ShortcutSection';
import MessageDisplay from '../components/common/MessageDisplay';
import ActionButtons from '../components/common/ActionButtons';

export default function SpeakerHome() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-800">올인원 AAC</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/history')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            📝
          </button>
          <button
            onClick={() => navigate('/emergency')}
            className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"
          >
            🚨
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Emergency Quick Bar */}
      <EmergencyBar />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        <ShortcutSection />
        <VerbGrid />
        <AdjectiveScroll />
        <NounSection />
        <MessageDisplay />
      </div>

      {/* Fixed Action Buttons */}
      <ActionButtons />
    </div>
  );
}