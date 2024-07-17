import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from 'react-icons/fa';
import * as mm from 'music-metadata-browser';

// TODO: implement next/previous tracks functionality

interface MusicPlayerProps {
    trackNumber: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ trackNumber }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const volumeBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [duration, setDuration] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [metadata, setMetadata] = useState<{ title: string; artist: string; album: string } | null>(null);

    const audioFiles = [
        '../../sample.mp3',
        '../../sample2.mp3',
        '../../sample1.mp3' // TODO: tracks will be replaced, these are simply samples
    ]

    useEffect(() => {
        loadTrack(currentTrackIndex);
    }, [currentTrackIndex]);

    useEffect(() => {
        loadTrack(trackNumber);
        const trackUrl = audioFiles[trackNumber];
        if (audioRef && audioRef.current) {
            audioRef.current.src = trackUrl;
            mm.fetchFromUrl(trackUrl).then((resp) => {

                setMetadata({
                    title: resp.common.title || 'Unknown Title',
                    artist: resp.common.artist || 'Unknown Artist',
                    album: resp.common.album || 'Unknown Album',
                });
            });
        }
    }, [trackNumber]);

    const loadTrack = async (index: number) => {
        if (audioRef.current) {
            const trackUrl = audioFiles[index];
            audioRef.current.src = trackUrl;
            const metadata = await mm.fetchFromUrl(trackUrl);
            setMetadata({
                title: metadata.common.title || 'Unknown Title',
                artist: metadata.common.artist || 'Unknown Artist',
                album: metadata.common.album || 'Unknown Album',
            });
        }
    };

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
            const newVolume = clickX / rect.width;
            audioRef.current.volume = newVolume;
            setVolume(newVolume);
        }
    };



    return (
        <div className="flex flex-col p-1 background-fix ">
            <div className=" border-violet-500 border bg-blue-900 p-1 text-blue-400 mb-4">
                <p className='text-sm'>{metadata?.title}</p>
                <p className='text-xs mt-1'>{metadata?.artist}</p>
                {
                    isPlaying ? (
                        <p className="text-xs mt-4">Playing ... </p>

                    ) : (
                        <p className="text-xs mt-4"> / / / / Player paused</p>
                        // TODO: equalizer will be added later
                    )
                }
            </div>
            <div className="flex justify-between text-xs mb-1 px-1">
                <span>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
                <span>{new Date((duration - currentTime) * 1000).toISOString().substr(14, 5)}</span>
            </div>
            <div
                ref={progressBarRef}
                className="w-full bg-blue-900 rounded-full h-2 relative cursor-pointer"
                onClick={handleProgressBarClick}
            >
                <div
                    className="bg-blue-500 h-2 rounded-full absolute"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
            </div>
            <audio
                ref={audioRef}
                src={audioFiles[trackNumber]}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            ></audio>

            <div className="flex justify-between items-center w-full h-10">
                <div className='flex gap-2'>
                    <button onClick={handleBackward} className="focus:outline-none">
                        <FaBackward size={15} />
                    </button>
                    <button onClick={togglePlayPause} className="focus:outline-none">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={handleForward} className="focus:outline-none">
                        <FaForward size={15} />
                    </button>
                </div>
                <div>
                    <div className="flex place-items-center place-content-center">
                        <FaVolumeUp className='' />
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
            </div>
        </div>
    )
}


export default MusicPlayer;