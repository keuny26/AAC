import { useState, useRef } from 'react';

interface BigButtonProps {
  label: string;
  emoji?: string;
  onClick: () => void;
  onLongPress?: () => void;
  variant?: 'default' | 'emergency' | 'action' | 'adjective';
  size?: 'md' | 'lg' | 'xl';
  disabled?: boolean;
}

export default function BigButton({ 
  label, 
  emoji, 
  onClick, 
  onLongPress,
  variant = 'default',
  size = 'lg',
  disabled = false
}: BigButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleTouchStart = () => {
    isLongPress.current = false;
    setIsPressed(true);
    
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress();
        if (navigator.vibrate) navigator.vibrate(100);
      }, 500);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    
    if (!isLongPress.current) {
      onClick();
    }
  };

  const handleTouchCancel = () => {
    setIsPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };
  
  const sizeStyles = {
    md: 'w-24 h-24 text-base',
    lg: 'w-28 h-28 text-lg',
    xl: 'w-36 h-36 text-xl',
  };
  
  const variantStyles = {
    default: 'bg-primary text-white shadow-lg shadow-primary/30',
    emergency: 'bg-white text-gray-800 border-2 border-emergency shadow-lg',
    action: 'bg-black text-listener-text shadow-lg',
    adjective: 'bg-amber-50 text-amber-900 border-2 border-warning',
  };

  const pressedStyles = isPressed ? 'scale-95 brightness-90' : '';

  return (
    <button
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchCancel}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center
        rounded-2xl font-bold
        transition-all duration-100
        select-none touch-manipulation
        ${sizeStyles[size]} 
        ${variantStyles[variant]}
        ${pressedStyles}
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      {emoji && <span className="text-4xl mb-1">{emoji}</span>}
      <span className="px-2 text-center leading-tight">{label}</span>
    </button>
  );
}