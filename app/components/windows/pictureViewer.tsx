interface PictureViewerProps {
    pictureNumber: number;
}

const PictureViewer: React.FC<PictureViewerProps> = ({ pictureNumber }) => {

    const pictures = [
        '../../01.jpg',
        '../../01.jpg',
        '../../01.jpg',
        '../../01.jpg',
        '../../01.jpg',
        '../../01.jpg',
        '../../01.jpg',
    ];

    return (
        <div className="p-1 border border-black bg-gray-300 select-text">
            <div className="w-full">
                <img src="../../01.jpg" alt="img" />
            </div>
        </div>
    );
}

export default PictureViewer;