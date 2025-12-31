import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    emoji: '💬',
    title: '버튼 하나로 대화해요',
    description: '복잡한 문장 대신\n핵심 단어와 이모지로\n빠르게 의사를 전달하세요',
  },
  {
    emoji: '🚨',
    title: '긴급할 땐 원터치',
    description: '위급한 상황에서\n한 번의 터치로\n즉시 도움을 요청하세요',
  },
  {
    emoji: '📱',
    title: '상대방에게 보여주세요',
    description: '큰 글씨와 선명한 색상으로\n상대방이 쉽게\n메시지를 확인할 수 있어요',
  },
  {
    emoji: '✨',
    title: '시작해볼까요?',
    description: '이제 올인원 AAC와 함께\n더 쉬운 소통을 시작하세요',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem('onboarding-complete', 'true');
      navigate('/');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-complete', 'true');
    navigate('/');
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Page Indicator */}
      <div className="pt-16 flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Illustration Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-64 h-64 bg-gray-100 rounded-[32px] flex items-center justify-center mb-10">
          <span className="text-8xl">{slide.emoji}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {slide.title}
        </h1>

        <p className="text-lg text-gray-500 text-center whitespace-pre-line leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="px-6 pb-12">
        <button
          onClick={handleNext}
          className="
            w-full h-14
            bg-primary text-white
            rounded-2xl
            font-bold text-lg
            active:scale-95 transition-transform
          "
        >
          {isLastSlide ? '시작하기' : '다음'}
        </button>

        {!isLastSlide && (
          <button
            onClick={handleSkip}
            className="
              w-full h-11 mt-2
              text-gray-500
              font-medium
            "
          >
            건너뛰기
          </button>
        )}
      </div>
    </div>
  );
}