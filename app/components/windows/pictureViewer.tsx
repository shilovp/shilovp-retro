import { useEffect, useRef, useState } from "react";

interface PictureViewerProps {
    pictureNumber: number;
}

const PictureViewer: React.FC<PictureViewerProps> = ({ pictureNumber }) => {

    const [currentPictureNumber, setCurrentPictureNumber] = useState(pictureNumber);
    const imgTagRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        loadPicture(currentPictureNumber);
    }, [currentPictureNumber]);

    useEffect(() => {
        loadPicture(pictureNumber);
    }, [pictureNumber]);

    const pictures = [
        '../../01.jpg',
        '../../02.jpg',
        '../../03.jpg',
        '../../04.jpg',
        '../../05.jpg',
        '../../06.jpg',
        '../../07.jpg',
    ];

    const loadPicture = async (index: number) => {
        if (imgTagRef.current) {
            imgTagRef.current.src = pictures[index];
        }

    };

    return (
        <div className="p-1 border border-black bg-gray-300 select-none">
            <div className="flex justify-center">
                <img ref={imgTagRef} alt="img" className="max-h-96 pointer-events-none" />
            </div>
        </div>
    );
}

export default PictureViewer;