interface MusicFolderProps {
    onDoubleClick: (trackNumber: number) => void;
}
const MusicFolder: React.FC<MusicFolderProps> = ({ onDoubleClick }) => {
    // TODO: add player opening by double click on file
    return (
        <div className="p-6 border border-black bg-white min-w-90 min-h-40 select-none">
            <div className="flex flex-wrap gap-8">
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(0) }}>
                    <img src="../../audio.png" width={35} alt="" />
                    <p className="text-xs">1.mp3</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(1) }}>
                    <img src="../../audio.png" width={35} alt="" />
                    <p className="text-xs">2.mp3</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(2) }}>
                    <img src="../../audio.png" width={35} alt="" />
                    <p className="text-xs">3.mp3</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(3) }}>
                    <img src="../../audio.png" width={35} alt="" />
                    <p className="text-xs">4.mp3</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(4) }}>
                    <img src="../../audio.png" width={35} alt="" />
                    <p className="text-xs">5.mp3</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(5) }}>
                    <img src="../../audio.png" width={35} alt="" />
                    <p className="text-xs">6.mp3</p>
                </div>
                <div className="flex flex-col cursor-pointer"
                    onDoubleClick={() => { onDoubleClick(6) }}>
                    <img src="../../audio.png" width={35} alt="" />
                    <p className="text-xs">7.mp3</p>
                </div>
            </div>
        </div>
    );
}

export default MusicFolder;