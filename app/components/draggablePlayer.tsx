"use client";
import { useRef, useState, useEffect } from 'react';
import MusicPlayer from './windows/musicPlayer';

interface DraggablePlayerProps {
  onClose: () => void;
  onHide: () => void;
}

const DraggableWindow: React.FC<DraggablePlayerProps> = ({ onClose, onHide }) => {
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
      className="fixed top-40 left-60 w-96 bg-white shadow-lg select-none"
      style={{ zIndex: 1000 }}
    >
      <div className='border border-blue-700'>
        <div
          className="text-black flex justify-between items-center cursor-move h-6 background-fix"
          onMouseDown={handleMouseDown}
        >
          <div>
            <button onClick={onClose} className="text-black text-md hover:bg-orange-100 w-4 bg-blue-900 bg-opacity-70">
              <p className='rotate-45'>+</p>
            </button>
            <button onClick={onHide} className="text-black text-md hover:bg-orange-100 w-4 bg-blue-700 bg-opacity-70">
              <p>-</p>
            </button>
          </div>
        </div>
        <MusicPlayer></MusicPlayer>
      </div>
    </div>
  );
};

export default DraggableWindow;