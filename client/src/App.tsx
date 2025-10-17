import { useEffect, useState } from 'react';
import './styles/styles.scss'
import Upload from './components/Upload.tsx';

const App: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.relatedTarget === null) setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleUpload = () => {
    setIsDragging(false);
  };

  return (
    <div className='main-container d-flex flex-center p-x-16'>
      <div className={`drag-overlay ${isDragging ? 'visible' : ''}`} />

      <div className='res-width-800 d-flex flex-col gap-32'>
        <div className='w-100'>
          <h1 className='title'>SeeShells</h1>
          <div className='d-flex gap-8 justify-space-between'>
            <div className='text-regular'>Identify seashells using AI image recognition</div>
            <div className='text-regular'>🌊 🐚 👀 ✨</div>
          </div>
        </div>

        <Upload 
          isDragging={isDragging} 
          onUpload={handleUpload} />
      </div>
    </div>
  )
}

export default App