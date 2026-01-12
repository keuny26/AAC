import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useTTS } from '../hooks/useTTS';

export default function Settings() {
  const navigate = useNavigate();
  const { speak } = useTTS();
  const {
    voiceRate, setVoiceRate,
    voicePitch, setVoicePitch,
    voiceVolume, setVoiceVolume,
    highContrast, setHighContrast,
    textSize, setTextSize,
    vibrationEnabled, setVibrationEnabled,
    showEnglish, setShowEnglish,
    darkMode, setDarkMode,
  } = useSettingsStore();

  const testVoice = () => {
    speak('안녕하세요. 음성 테스트입니다.');
  };

  return (
    <div className={`h-full flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`px-4 py-4 flex items-center border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <button
          onClick={() => navigate('/')}
          className={`text-2xl mr-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          ←
        </button>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>설정</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Voice Settings */}
        <section className="mt-4">
          <h2 className={`px-4 text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>음성 설정</h2>
          <div className={`mx-4 rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Voice Speed */}
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>🔊 음성 속도</span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{voiceRate.toFixed(1)}x</span>
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
              <div className={`flex justify-between text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>느림</span>
                <span>빠름</span>
              </div>
            </div>

            {/* Voice Pitch */}
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>🎵 음성 높낮이</span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{voicePitch.toFixed(1)}</span>
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
              <div className={`flex justify-between text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>낮음</span>
                <span>높음</span>
              </div>
            </div>

            {/* Volume */}
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>📢 볼륨</span>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{Math.round(voiceVolume * 100)}%</span>
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
              <div className={`flex justify-between text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>작게</span>
                <span>크게</span>
              </div>
            </div>

            {/* Test Voice Button */}
            <div className="p-4">
              <button
                onClick={testVoice}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium active:scale-95 transition-transform"
              >
                🔊 음성 테스트
              </button>
            </div>
          </div>
        </section>

        {/* Display Settings */}
        <section className="mt-6">
          <h2 className={`px-4 text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>화면 설정</h2>
          <div className={`mx-4 rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Dark Mode */}
            <div className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>🌙 다크 모드</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`
                  w-14 h-8 rounded-full p-1 transition-colors
                  ${darkMode ? 'bg-primary' : 'bg-gray-200'}
                `}
              >
                <div className={`
                  w-6 h-6 bg-white rounded-full shadow transition-transform
                  ${darkMode ? 'translate-x-6' : ''}
                `} />
              </button>
            </div>

            {/* High Contrast */}
            <div className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>🌓 고대비 모드</span>
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
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <span className={`font-medium block mb-3 ${darkMode ? 'text-white' : ''}`}>🔤 글자 크기</span>
              <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`
                      flex-1 py-2 rounded-md text-sm font-medium transition-colors
                      ${textSize === size 
                        ? 'bg-primary text-white' 
                        : darkMode ? 'text-gray-300' : 'text-gray-600'
                      }
                    `}
                  >
                    {size === 'small' ? '작게' : size === 'medium' ? '보통' : '크게'}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibration */}
            <div className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>📳 진동 피드백</span>
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
            <div className={`p-4 flex justify-between items-center ${darkMode ? '' : ''}`}>
              <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>🌐 영어 표시</span>
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
          <h2 className={`px-4 text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>단축어</h2>
          <div className={`mx-4 rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => navigate('/shortcuts')}
              className={`w-full p-4 flex justify-between items-center ${darkMode ? 'text-white' : ''}`}
            >
              <span className="font-medium">⭐ 나만의 단축어 관리</span>
              <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>→</span>
            </button>
          </div>
        </section>

        {/* Favorites */}
        <section className="mt-6">
          <h2 className={`px-4 text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>즐겨찾기</h2>
          <div className={`mx-4 rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => navigate('/favorites')}
              className={`w-full p-4 flex justify-between items-center ${darkMode ? 'text-white' : ''}`}
            >
              <span className="font-medium">❤️ 즐겨찾기 문장 관리</span>
              <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>→</span>
            </button>
          </div>
        </section>

        {/* App Info */}
        <section className="mt-6 px-4">
          <div className={`text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <p>올인원 AAC v1.0.0</p>
            <p className="mt-1">© 2025 BioHealth Academy</p>
          </div>
        </section>
      </div>
    </div>
  );
}