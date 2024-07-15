import { useRef, useState } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from 'react-icons/fa';

const About: React.FC<{}> = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const volumeBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [duration, setDuration] = useState(0);
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
    };

    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 10;
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 10;
        }
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && audioRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * duration;
            audioRef.current.currentTime = newTime;
        }
    };

    const handleVolumeBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (volumeBarRef.current && audioRef.current) {
            const rect = volumeBarRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newVolume = clickX / rect.width; // volume ranges from 0.0 (left) to 1.0 (right)
            audioRef.current.volume = newVolume;
            setVolume(newVolume);
        }
    };



    return (
        <div className="flex flex-col p-3 background-fix ">
            <div className=" border-violet-500 border bg-blue-900 p-1 text-blue-400">
                <p>State of Decay 2 Trailer Song METALIZED!! - Jesper Kyd</p>
                {
                    isPlaying ? (
                        <p className="text-xs mt-4">Playing ... </p>
                    ) : (
                        <p className="text-xs mt-4"> / / / / Player paused</p>
                    )
                }
            </div>
            <div className="flex justify-between items-center my-4 w-full px-20">
                <button onClick={handleBackward} className="focus:outline-none">
                    <FaBackward />
                </button>
                <button onClick={togglePlayPause} className="focus:outline-none">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={handleForward} className="focus:outline-none">
                    <FaForward />
                </button>
            </div>
            <div
                ref={progressBarRef}
                className="w-full bg-blue-900 rounded-full h-2 mb-4 relative cursor-pointer"
                onClick={handleProgressBarClick}
            >
                <div
                    className="bg-blue-500 h-2 rounded-full absolute"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
            </div>
            <audio
                ref={audioRef}
                src="../../sample.mp3"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            ></audio>
            <div className="flex justify-between text-xs">
                <span>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
                <span>{new Date((duration - currentTime) * 1000).toISOString().substr(14, 5)}</span>
            </div>
            <div className="flex items-end mt-2 ml-auto">
                <FaVolumeUp className='pt-4 h-6' />
                <div
                    ref={volumeBarRef}
                    className="w-20 h-1 bg-blue-900 rounded-full ml-1 relative cursor-pointer pb-2"
                    onClick={handleVolumeBarClick}
                >
                    <div
                        className="bg-blue-500 h-1 rounded-full absolute pb-2"
                        style={{ width: `${volume * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}


export default About;