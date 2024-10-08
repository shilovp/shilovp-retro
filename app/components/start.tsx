"use client";
import classNames from 'classnames';
import React from 'react';
import { useState, useEffect, useRef } from 'react';

interface StartProps {
    onMenuClick: (menu: string) => void;
    showAboutIcon: boolean;
    isAboutHidden: boolean;
    showSettingsIcon: boolean;
    isSettingHidden: boolean;
    isMusicPlayerHidden: boolean;
    showMusicPlayerIcon: boolean;
    showCreditsIcon: boolean;
    isCreditsHidden: boolean;
    showMusicFolderIcon: boolean;
    isMusicFolderHidden: boolean;
    showGameIcon: boolean;
    isGameHidden: boolean;
    showBrowserIcon: boolean;
    isBrowserHidden: boolean;
    showReaderIcon: boolean;
    isReaderHidden: boolean;
    showVideoPlayerIcon: boolean;
    isVideoPlayerHidden: boolean;
    showPicturesFolderIcon: boolean;
    isPicturesFolderHidden: boolean;
    showPictureViewerIcon: boolean;
    isPictureViewerHidden: boolean;
}

const Start: React.FC<StartProps> = ({ onMenuClick, showAboutIcon, isAboutHidden, isSettingHidden, showSettingsIcon,
    showMusicPlayerIcon, isMusicPlayerHidden, showCreditsIcon, isCreditsHidden, showMusicFolderIcon, isMusicFolderHidden,
    showGameIcon, isGameHidden, isBrowserHidden, showBrowserIcon, showReaderIcon, isReaderHidden,
    showVideoPlayerIcon, isVideoPlayerHidden, showPicturesFolderIcon, isPicturesFolderHidden, isPictureViewerHidden, showPictureViewerIcon
}) => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('en-US', { hour12: false });
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };


    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="w-full bg-inherit flex items-center align-middle border-b border-black h-9 text-xs font-bold select-none" style={{ zIndex: 999 }}>
            <div className="text-center cursor-pointer z-50">
                <button className="border-black border-r w-20 flex items-center px-3 hover:bg-black hover:text-white"
                    onClick={toggleDropdown}>
                    <p className='fix-line-height'>Start</p>
                    <svg
                        className="ml-2 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 011.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute left-0 w-40">
                        <ul className="background-fix border-r border-b border-black" style={{ zIndex: 999 }}>
                            <li>
                                <a href="#" className="hover:bg-black hover:text-white block py-1 px-4 text-black text-left border-b border-black"
                                    onClick={() => onMenuClick('about')}>
                                    About
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="hover:bg-black hover:text-white block py-1 px-4 text-black text-left border-b border-black"
                                    onClick={() => onMenuClick('settings')}>
                                    Settings
                                </a>
                            </li> */}
                            <li>
                                <a href="#" className="hover:bg-black hover:text-white block py-1 px-4 text-black text-left"
                                    onClick={() => onMenuClick('game')}>
                                    Game
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='flex gap-5 px-10'>
                {
                    showMusicPlayerIcon ? (
                        <div
                            className={`${isMusicPlayerHidden ? "cursor-pointer" : "cursor-auto"} ${isMusicPlayerHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isMusicPlayerHidden) { return } else { onMenuClick('musicPlayer') }
                            }}>
                            <img src="../player.png" width={20} height={20} alt="player" />
                            {
                                isMusicPlayerHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showPicturesFolderIcon ? (
                        <div
                            className={`${isPicturesFolderHidden ? "cursor-pointer" : "cursor-auto"} ${isPicturesFolderHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isPicturesFolderHidden) { return } else { onMenuClick('picturesFolder') }
                            }}>
                            <img src="../folder.png" width={20} height={20} alt="picturesFolder" />
                            {
                                isPicturesFolderHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showPictureViewerIcon ? (
                        <div
                            className={`${isPictureViewerHidden ? "cursor-pointer" : "cursor-auto"} ${isPictureViewerHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isPictureViewerHidden) { return } else { onMenuClick('pictureViewer') }
                            }}>
                            <img src="../picture.png" width={20} height={20} alt="picture viewer" />
                            {
                                isPictureViewerHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showGameIcon ? (
                        <div
                            className={`${isGameHidden ? "cursor-pointer" : "cursor-auto"} ${isGameHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isGameHidden) { return } else { onMenuClick('game') }
                            }}>
                            <img src="../game.png" width={20} height={20} alt="game" />
                            {
                                isGameHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showReaderIcon ? (
                        <div
                            className={`${isReaderHidden ? "cursor-pointer" : "cursor-auto"} ${isReaderHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isReaderHidden) { return } else { onMenuClick('reader') }
                            }}>
                            <img src="../cv.png" width={20} height={20} alt="reader" />
                            {
                                isReaderHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showVideoPlayerIcon ? (
                        <div
                            className={`${isVideoPlayerHidden ? "cursor-pointer" : "cursor-auto"} ${isVideoPlayerHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isVideoPlayerHidden) { return } else { onMenuClick('videoPlayer') }
                            }}>
                            <img src="../videoPlayer.png" width={20} height={20} alt="video" />
                            {
                                isVideoPlayerHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showCreditsIcon ? (
                        <div
                            className={`${isCreditsHidden ? "cursor-pointer" : "cursor-auto"} ${isCreditsHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isCreditsHidden) { return } else { onMenuClick('credits') }
                            }}>
                            <img src="../credits.png" width={20} height={20} alt="credits" />
                            {
                                isCreditsHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showBrowserIcon ? (
                        <div
                            className={`${isBrowserHidden ? "cursor-pointer" : "cursor-auto"} ${isBrowserHidden ? "opacity-60" : "opacity-100"} relative h-5 w-5 bg-opacity-0 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isBrowserHidden) { return } else { onMenuClick('browser') }
                            }}>
                            <img src="../globus.png" width={20} height={20} alt="browser" />
                            {
                                isBrowserHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showAboutIcon ? (
                        <div
                            className={`${isAboutHidden ? "cursor-pointer" : "cursor-auto"} ${isAboutHidden ? "opacity-50" : "opacity-100"} relative h-5 w-5`}
                            onClick={() => {
                                if (!isAboutHidden) { return } else { onMenuClick('about') }
                            }}>
                            <img src="../about.png" alt="about" />
                            {
                                isAboutHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showSettingsIcon ? (
                        <div
                            className={`${isSettingHidden ? "cursor-pointer" : "cursor-auto"} ${isSettingHidden ? "opacity-50" : "opacity-100"} relative h-5 w-5`}
                            onClick={() => {
                                if (!isSettingHidden) { return } else { onMenuClick('settings') }
                            }}>
                            <img src="../settings.png" alt="settings" />
                            {
                                isSettingHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    showMusicFolderIcon ? (
                        <div
                            className={`${isMusicFolderHidden ? "cursor-pointer" : "cursor-auto"} ${isMusicFolderHidden ? "opacity-50" : "opacity-100"} relative h-5 w-5`}
                            onClick={() => {
                                if (!isMusicFolderHidden) { return } else { onMenuClick('musicFolder') }
                            }}>
                            <img src="../folder.png" alt="folder" />
                            {
                                isMusicFolderHidden ? (
                                    <span className='absolute dot-fix text-orange-700'>.</span>
                                ) : ('')
                            }
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>
            <div className="flex cursor-default justify-end w-full">
                <p className="border-black border-r border-l px-2 fix-line-height">{formatTime(currentTime)}</p>
                <p className="fix-line-height px-2">{formatDate(currentTime)}</p>
            </div>
        </div>
    );
}

export default Start;