import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  voiceRate: number;
  voicePitch: number;
  voiceVolume: number;
  highContrast: boolean;
  textSize: 'small' | 'medium' | 'large';
  vibrationEnabled: boolean;
  showEnglish: boolean;
  darkMode: boolean;
  
  setVoiceRate: (rate: number) => void;
  setVoicePitch: (pitch: number) => void;
  setVoiceVolume: (volume: number) => void;
  setHighContrast: (enabled: boolean) => void;
  setTextSize: (size: 'small' | 'medium' | 'large') => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setShowEnglish: (show: boolean) => void;
  setDarkMode: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      voiceRate: 1,
      voicePitch: 1,
      voiceVolume: 1,
      highContrast: false,
      textSize: 'medium',
      vibrationEnabled: true,
      showEnglish: true,
      darkMode: false,
      
      setVoiceRate: (rate) => set({ voiceRate: rate }),
      setVoicePitch: (pitch) => set({ voicePitch: pitch }),
      setVoiceVolume: (volume) => set({ voiceVolume: volume }),
      setHighContrast: (enabled) => set({ highContrast: enabled }),
      setTextSize: (size) => set({ textSize: size }),
      setVibrationEnabled: (enabled) => set({ vibrationEnabled: enabled }),
      setShowEnglish: (show) => set({ showEnglish: show }),
      setDarkMode: (enabled) => set({ darkMode: enabled }),
    }),
    {
      name: 'aac-settings',
    }
  )
);