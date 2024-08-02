interface MusicFolderProps {
    onDoubleClick: (trackNumber: number) => void;
}
const PicturesFolder: React.FC<MusicFolderProps> = ({ onDoubleClick }) => {
    // TODO: add player opening by double click on file
    return (
        <div className="p-6 border border-black bg-white min-w-90 min-h-40 select-none">
            <div className="flex flex-wrap gap-8">
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(0) }}>
                    <img src="../../picture.png" width={35} alt="img" className="pointer-events-none" />
                    <p className="text-xs">01.jpg</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(1) }}>
                    <img src="../../picture.png" width={35} alt="img" className="pointer-events-none" />
                    <p className="text-xs">02.jpg</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(2) }}>
                    <img src="../../picture.png" width={35} alt="img" className="pointer-events-none" />
                    <p className="text-xs">03.jpg</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(3) }}>
                    <img src="../../picture.png" width={35} alt="img" className="pointer-events-none" />
                    <p className="text-xs">04.jpg</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(4) }}>
                    <img src="../../picture.png" width={35} alt="img" className="pointer-events-none"/>
                    <p className="text-xs">05.jpg</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(5) }}>
                    <img src="../../picture.png" width={35} alt="img" className="pointer-events-none"/>
                    <p className="text-xs">06.jpg</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(6) }}>
                    <img src="../../picture.png" width={35} alt="img" className="pointer-events-none"/>
                    <p className="text-xs">07.jpg</p>
                </div>
            </div>
        </div>
    );
}

export default PicturesFolder;