"use client";

interface ReaderProps {
  onClose: () => void;
  onHide: () => void;
}

const Reader: React.FC<ReaderProps> = ({ onClose, onHide }) => {

  return (
    <div
      className="fixed inset-0 top-9 bg-white shadow-lg select-none"
      style={{ zIndex: 700 }}
    >
      <div className="background-fix text-black flex justify-between items-center border border-black px-1">
        <div
          className="text-black flex justify-between items-center background-fix w-screen"
        >
          <div>
            <button onClick={onClose} className="text-black text-xs border border-black w-4 h-4 mr-1 hover:bg-black hover:text-white hover:border-white">
              <p className='rotate-45'>+</p>
            </button>
            <button onClick={onHide} className="text-black text-xs border border-black w-4 h-4 hover:bg-black hover:text-white hover:border-white">
              <p>_</p>
            </button>
          </div>
          <div className='ml-auto flex place-items-center'>
            <p className='text-xs px-2'>Reader</p>
            <img src="../cv.png" width={20} alt="Reader" />
          </div>
        </div>
      </div>
      <div className='h-full'>
        <iframe
          src="../CV_Pavel_Shilov.pdf"
          className="w-full h-full"
          title="PDF Viewer"
        ></iframe>
      </div>
    </div>
  );
};

export default Reader;