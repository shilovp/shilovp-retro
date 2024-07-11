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
}

const Start: React.FC<StartProps> = ({ onMenuClick, showAboutIcon, isAboutHidden, isSettingHidden, showSettingsIcon }) => {
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
        <div className="w-full bg-inherit flex items-center align-middle border-b border-black h-8 text-xs font-bold select-none">
            <div className="text-center cursor-pointer">
                <button className={classNames(
                    'border-black border-r w-20 flex items-center px-3 hover:bg-black hover:text-white',
                )}
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
                        <ul className="background-fix border-r border-b border-black">
                            <li>
                                <a href="#" className="hover:bg-black hover:text-white block py-1 px-4 text-black text-left border-b border-black"
                                    onClick={() => onMenuClick('about')}>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:bg-black hover:text-white block py-1 px-4 text-black text-left border-b border-black"
                                    onClick={() => onMenuClick('settings')}>
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:bg-black hover:text-white block py-1 px-4 text-black text-left">
                                    Game
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='flex gap-5 px-10'>
                {
                    showAboutIcon ? (
                        <div
                            className={`${isAboutHidden ? "cursor-pointer" : "cursor-auto"} ${isAboutHidden ? "bg-opacity-50" : "bg-opacity-100"} relative h-5 w-5 bg-green-900 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isAboutHidden) { return } else { onMenuClick('about') }
                            }}>
                            <p>A</p>
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
                            className={`${isSettingHidden ? "cursor-pointer" : "cursor-auto"} ${isSettingHidden ? "bg-opacity-50" : "bg-opacity-100"} relative h-5 w-5 bg-cyan-700 rounded-full flex place-content-center place-items-center text-white transition-transform`}
                            onClick={() => {
                                if (!isSettingHidden) { return } else { onMenuClick('settings') }
                            }}>
                            <p>S</p>
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
            </div>
            <div className="flex cursor-default justify-end w-full">
                <p className="border-black border-r border-l px-2 fix-line-height">{formatTime(currentTime)}</p>
                <p className="fix-line-height px-2">{formatDate(currentTime)}</p>
            </div>
        </div>
    );
}

export default Start;