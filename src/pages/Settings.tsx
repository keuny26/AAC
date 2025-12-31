import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';

export default function Settings() {
  const navigate = useNavigate();
  const {
    voiceRate, setVoiceRate,
    voicePitch, setVoicePitch,
    voiceVolume, setVoiceVolume,
    highContrast, setHighContrast,
    textSize, setTextSize,
    vibrationEnabled, setVibrationEnabled,
    showEnglish, setShowEnglish,
  } = useSettingsStore();

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="text-2xl text-gray-600 mr-4"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-gray-800">설정</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Voice Settings */}
        <section className="mt-4">
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">음성 설정</h2>
          <div className="mx-4 bg-white rounded-2xl overflow-hidden">
            {/* Voice Speed */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="font-medium">🔊 음성 속도</span>
                <span className="text-gray-500">{voiceRate.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceRate}
                onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>느림</span>
                <span>빠름</span>
              </div>
            </div>

            {/* Voice Pitch */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="font-medium">🎵 음성 높낮이</span>
                <span className="text-gray-500">{voicePitch.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voicePitch}
                onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>낮음</span>
                <span>높음</span>
              </div>
            </div>

            {/* Volume */}
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">📢 볼륨</span>
                <span className="text-gray-500">{Math.round(voiceVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceVolume}
                onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>작게</span>
                <span>크게</span>
              </div>
            </div>
          </div>
        </section>

        {/* Display Settings */}
        <section className="mt-6">
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">화면 설정</h2>
          <div className="mx-4 bg-white rounded-2xl overflow-hidden">
            {/* High Contrast */}
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <span className="font-medium">🌓 고대비 모드</span>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`
                  w-14 h-8 rounded-full p-1 transition-colors
                  ${highContrast ? 'bg-primary' : 'bg-gray-200'}
                `}
              >
                <div className={`
                  w-6 h-6 bg-white rounded-full shadow transition-transform
                  ${highContrast ? 'translate-x-6' : ''}
                `} />
              </button>
            </div>

            {/* Text Size */}
            <div className="p-4 border-b border-gray-100">
              <span className="font-medium block mb-3">🔤 글자 크기</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`
                      flex-1 py-2 rounded-md text-sm font-medium transition-colors
                      ${textSize === size 
                        ? 'bg-primary text-white' 
                        : 'text-gray-600'
                      }
                    `}
                  >
                    {size === 'small' ? '작게' : size === 'medium' ? '보통' : '크게'}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibration */}
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <span className="font-medium">📳 진동 피드백</span>
              <button
                onClick={() => setVibrationEnabled(!vibrationEnabled)}
                className={`
                  w-14 h-8 rounded-full p-1 transition-colors
                  ${vibrationEnabled ? 'bg-primary' : 'bg-gray-200'}
                `}
              >
                <div className={`
                  w-6 h-6 bg-white rounded-full shadow transition-transform
                  ${vibrationEnabled ? 'translate-x-6' : ''}
                `} />
              </button>
            </div>

            {/* Show English */}
            <div className="p-4 flex justify-between items-center">
              <span className="font-medium">🌐 영어 표시</span>
              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className={`
                  w-14 h-8 rounded-full p-1 transition-colors
                  ${showEnglish ? 'bg-primary' : 'bg-gray-200'}
                `}
              >
                <div className={`
                  w-6 h-6 bg-white rounded-full shadow transition-transform
                  ${showEnglish ? 'translate-x-6' : ''}
                `} />
              </button>
            </div>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="mt-6">
          <h2 className="px-4 text-sm font-medium text-gray-500 mb-2">단축어</h2>
          <div className="mx-4 bg-white rounded-2xl overflow-hidden">
            <button
              onClick={() => navigate('/shortcuts')}
              className="w-full p-4 flex justify-between items-center"
            >
              <span className="font-medium">⭐ 나만의 단축어 관리</span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </section>

        {/* App Info */}
        <section className="mt-6 px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>올인원 AAC v1.0.0</p>
            <p className="mt-1">© 2025 BioHealth Academy</p>
          </div>
        </section>
      </div>
    </div>
  );
}
