import { useState, useRef, useEffect } from 'react';

interface MovableIconProps {
    icon: string;
    label: string;
    onDoubleClick: () => void;
    initialPosition: {x: number, y: number}
}

const MovableIcon: React.FC<MovableIconProps> = ({ icon, label, initialPosition, onDoubleClick }) => {
    const iconRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: initialPosition.x, y: initialPosition.y }); // Initial position
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            setIsDragging(true);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && iconRef.current) {
            const desktop = iconRef.current.parentElement;
            if (!desktop) return;

            const desktopRect = desktop.getBoundingClientRect();
            const iconRect = iconRef.current.getBoundingClientRect();

            let newLeft = e.clientX - offset.x;
            let newTop = e.clientY - offset.y;

            // Boundary checks
            if (newLeft < 0) newLeft = 0;
            if (newTop < desktopRect.top) newTop = desktopRect.top; // Adjust for taskbar at top
            if (newLeft + iconRect.width > desktopRect.width) newLeft = desktopRect.width - iconRect.width;
            if (newTop + iconRect.height > desktopRect.bottom) newTop = desktopRect.bottom - iconRect.height; // Adjust for bottom

            setPosition({ x: newLeft, y: newTop });
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
            ref={iconRef}
            className="absolute flex flex-col items-center cursor-pointer select-none"
            onMouseDown={handleMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
            <img src={icon} alt={label} className="w-10 h-10 pointer-events-none rounded-lg" />
            <span className="text-gray-800 text-xs mt-1">{label}</span>
        </div>
    );
};

export default MovableIcon;