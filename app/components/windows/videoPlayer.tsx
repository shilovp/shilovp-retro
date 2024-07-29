import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress((newTime / videoRef.current.duration) * 100);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-700 text-white p-2 rounded-lg shadow-lg">
      <div className="relative max-w-lg h-44 bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="max-w-lg h-full "
          onTimeUpdate={handleTimeUpdate}
        />
        <div className="absolute inset-0 flex items-center justify-center ">
          {!isPlaying && (
            <button onClick={togglePlayPause} className="bg-gray-800 p-8 rounded-full">
              <FaPlay size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <button onClick={togglePlayPause} className="bg-gray-700 p-2 rounded-full">
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
        </button>
        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className="bg-gray-00 p-2 rounded-full">
            {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-34"
          />
        </div>
      </div>
      <div className="relative mt-2 h-2 bg-blue-700 rounded-full" onClick={handleProgressClick}>
        <div className="absolute top-0 left-0 h-2 bg-gray-100 rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default VideoPlayer;