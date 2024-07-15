"use client";
import { useRef, useState, useEffect } from 'react';

interface DraggableWindowProps {
  title: string;
  onClose: () => void;
  onHide: () => void;
  children: React.ReactNode;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({ title, onClose, onHide, children }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (windowRef.current) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - windowRef.current.offsetLeft,
        y: e.clientY - windowRef.current.offsetTop,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && windowRef.current && windowRef.current.parentElement) {
      const parent = windowRef.current.parentElement;
      const parentRect = parent.getBoundingClientRect();
      const windowRect = windowRef.current.getBoundingClientRect();

      let newLeft = e.clientX - offset.x;
      let newTop = e.clientY - offset.y;

      // Boundary checks
      if (newLeft < parentRect.left) {
        newLeft = parentRect.left;
      } else if (newLeft + windowRect.width > parentRect.right) {
        newLeft = parentRect.right - windowRect.width;
      }

      if (newTop < parentRect.top) {
        newTop = parentRect.top;
      } else if (newTop + windowRect.height > parentRect.bottom) {
        newTop = parentRect.bottom - windowRect.height;
      }

      windowRef.current.style.left = `${newLeft}px`;
      windowRef.current.style.top = `${newTop}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={windowRef}
      className="fixed top-20 left-20 w-96 background-fix shadow-lg select-none"
      style={{ zIndex: 1000 }}
    >
      <div
        className="background-fix text-black flex justify-between items-center cursor-move border border-black px-1 h-6"
        onMouseDown={handleMouseDown}
      >
        <div>
          <button onClick={onClose} className="text-black text-xs border border-black w-4 h-4 mr-1 hover:bg-black hover:text-white hover:border-white">
            <p className='rotate-45'>+</p>
          </button>
          <button onClick={onHide} className="text-black text-xs border border-black w-4 h-4 hover:bg-black hover:text-white hover:border-white">
            <p>_</p>
          </button>
        </div>
        <div className='text-gray-400 text-opacity-50'>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
        <span className='text-xs'>{title}</span>
      </div>
      <div className="p-1 background-fix border-b border-l border-r border-black">{children}</div>
    </div>
  );
};

export default DraggableWindow;