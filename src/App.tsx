import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpeakerHome from './pages/SpeakerHome';
import ListenerScreen from './pages/ListenerScreen';
import EmergencyMode from './pages/EmergencyMode';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import Shortcuts from './pages/Shortcuts';
import History from './pages/History';

function AppRoutes() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding-complete');
    setShowOnboarding(!completed);
  }, []);

  if (showOnboarding === null) {
    return null; // Loading
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={showOnboarding ? <Navigate to="/onboarding" /> : <SpeakerHome />} 
      />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/listener" element={<ListenerScreen />} />
      <Route path="/emergency" element={<EmergencyMode />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/shortcuts" element={<Shortcuts />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen max-w-md mx-auto bg-gray-50 relative overflow-hidden">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}