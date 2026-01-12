import { useCallback } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

export function useVibration() {
  const { vibrationEnabled } = useSettingsStore();

  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if (!vibrationEnabled) return;
    if (!navigator.vibrate) return;
    
    navigator.vibrate(pattern);
  }, [vibrationEnabled]);

  const vibrateSuccess = useCallback(() => {
    vibrate([50, 30, 50]);
  }, [vibrate]);

  const vibrateError = useCallback(() => {
    vibrate([100, 50, 100, 50, 100]);
  }, [vibrate]);

  return { vibrate, vibrateSuccess, vibrateError };
}