"use client";
import { useState, useEffect } from 'react';

export default function Start() {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

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

    return (
        <div className="w-full bg-gray-500 bg-opacity-10 flex justify-between items-center align-middle border-b border-black h-6 text-xs font-bold">
            <div className="w-20 text-center cursor-pointer hover:bg-black hover:text-white">
                <p className="border-black border-r fix-line-height">Start</p>
            </div>
            <div className="flex">
                <p className="border-black border-r border-l px-2 fix-line-height">{formatTime(currentTime)}</p>
                <p className="fix-line-height px-2">{formatDate(currentTime)}</p>
            </div>
        </div>
    );
}