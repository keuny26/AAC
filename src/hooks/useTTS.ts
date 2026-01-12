import { useCallback, useEffect, useRef } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

export function useTTS() {
  const { voiceRate, voicePitch, voiceVolume } = useSettingsStore();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!text) return;
    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = voiceRate;
    utterance.pitch = voicePitch;
    utterance.volume = voiceVolume;

    const koreanVoice = voicesRef.current.find(v => v.lang.startsWith('ko'));
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceRate, voicePitch, voiceVolume]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}