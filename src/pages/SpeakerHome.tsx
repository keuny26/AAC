import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import EmergencyBar from '../components/common/EmergencyBar';
import VerbGrid from '../components/speaker/VerbGrid';
import AdjectiveScroll from '../components/speaker/AdjectiveScroll';
import NounSection from '../components/speaker/NounSection';
import ShortcutSection from '../components/speaker/ShortcutSection';
import FrequentSection from '../components/speaker/FrequentSection';
import SuggestionBar from '../components/speaker/SuggestionBar';
import MessageDisplay from '../components/common/MessageDisplay';
import ActionButtons from '../components/common/ActionButtons';
import FeedbackToast from '../components/common/FeedbackToast';

export default function SpeakerHome() {
  const navigate = useNavigate();
  const { darkMode } = useSettingsStore();

  return (
    <div className={`h-full flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Feedback Toast */}
      <FeedbackToast />
      
      {/* Header */}
      <header className={`px-4 py-3 flex items-center justify-between border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>올인원 AAC</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/history')}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
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
            className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Emergency Quick Bar */}
      <EmergencyBar />

      {/* Suggestion Bar */}
      <SuggestionBar />

      {/* Scrollable Content */}
      <div 
        className="flex-1 pb-32"
        style={{ 
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <FrequentSection />
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