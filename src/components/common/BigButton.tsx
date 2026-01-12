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
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const clearTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isLongPress.current = false;
    hasMoved.current = false;
    setIsPressed(true);
    
    startPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (!hasMoved.current) {
          isLongPress.current = true;
          onLongPress();
          if (navigator.vibrate) navigator.vibrate(100);
        }
      }, 800);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const moveX = Math.abs(e.touches[0].clientX - startPos.current.x);
    const moveY = Math.abs(e.touches[0].clientY - startPos.current.y);
    
    if (moveX > 10 || moveY > 10) {
      hasMoved.current = true;
      clearTimer();
      setIsPressed(false);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    clearTimer();
    
    if (!isLongPress.current && !hasMoved.current) {
      onClick();
    }
  };

  const handleTouchCancel = () => {
    setIsPressed(false);
    clearTimer();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isLongPress.current = false;
    hasMoved.current = false;
    setIsPressed(true);
    
    startPos.current = { x: e.clientX, y: e.clientY };
    
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (!hasMoved.current) {
          isLongPress.current = true;
          onLongPress();
        }
      }, 800);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPressed) return;
    
    const moveX = Math.abs(e.clientX - startPos.current.x);
    const moveY = Math.abs(e.clientY - startPos.current.y);
    
    if (moveX > 10 || moveY > 10) {
      hasMoved.current = true;
      clearTimer();
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    clearTimer();
    
    if (!isLongPress.current && !hasMoved.current) {
      onClick();
    }
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
    clearTimer();
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
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
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