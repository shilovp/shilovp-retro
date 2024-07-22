"use client";
import { useRef, useState, useEffect } from 'react';
import MusicPlayer from './windows/musicPlayer';

interface BrowserProps {
  title: string;
  onClose: () => void;
  onHide: () => void;
}

const DraggableWindow: React.FC<BrowserProps> = ({ onClose, onHide, title }) => {

  return (
    <div
      className="fixed inset-0 top-9 bg-white shadow-lg select-none"
      style={{ zIndex: 700 }}
    >
      <div className="background-fix text-black flex justify-between items-center border border-black px-1">
        <div
          className="text-black flex justify-between items-center background-fix w-screen"
        >
          <div>
            <button onClick={onClose} className="text-black text-xs border border-black w-4 h-4 mr-1 hover:bg-black hover:text-white hover:border-white">
              <p className='rotate-45'>+</p>
            </button>
            <button onClick={onHide} className="text-black text-xs border border-black w-4 h-4 hover:bg-black hover:text-white hover:border-white">
              <p>_</p>
            </button>
          </div>
          <div className='ml-auto flex place-items-center'>
            <p className='text-xs'>Browser</p>
            <img src="../globus.png" width={25} alt="browser" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableWindow;