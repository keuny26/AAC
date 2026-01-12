import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpeakerHome from './pages/SpeakerHome';
import ListenerScreen from './pages/ListenerScreen';
import EmergencyMode from './pages/EmergencyMode';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import Shortcuts from './pages/Shortcuts';
import History from './pages/History';
import Favorites from './pages/Favorites';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding-complete');
    setNeedsOnboarding(!completed);
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="h-screen max-w-md mx-auto bg-gray-50 relative overflow-hidden">
        <Routes>
          <Route path="/" element={needsOnboarding ? <Onboarding /> : <SpeakerHome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/listener" element={<ListenerScreen />} />
          <Route path="/emergency" element={<EmergencyMode />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shortcuts" element={<Shortcuts />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}