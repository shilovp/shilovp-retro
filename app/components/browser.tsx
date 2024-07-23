"use client";

interface BrowserProps {
  onClose: () => void;
  onHide: () => void;
}

const Browser: React.FC<BrowserProps> = ({ onClose, onHide }) => {

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
            <p className='text-xs'>Browser</p>
            <img src="../globus.png" width={25} alt="browser" />
          </div>
        </div>
      </div>
      <div className='h-8 border-b border-black bg-gray-50 flex gap-0.5'>
        <div className='border-r border-black w-20 h-8 flex place-items-center place-content-center bg-gray-700'><p className='text-xs text-white'>Resume</p></div>
      </div>
      <div className='h-6 bg-white border-b border-black flex place-items-center'>
        <p className='px-2 text-xs text-blue-600 cursor-text w-full py-2 select-text'>https://shilovp.web.app</p>
      </div>
      <div className='h-full'>
        <iframe
          src="https://shilovp.web.app"
          className="w-full h-full"
          title="PDF Viewer"
        ></iframe>
      </div>
    </div>
  );
};

export default Browser;