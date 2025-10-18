import '../styles/styles.scss'
import uploadIcon from '../assets/upload.svg'
import { useRef } from 'react';
import Loading from './Loading';

interface UploadProps {
    isDragging: boolean;
    isLoading: boolean;
    onUpload: (file: File) => void;
}

const Upload: React.FC<UploadProps> = ({ isDragging, isLoading, onUpload }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (file) onUpload(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleInputClick = () => {
        inputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onUpload(file);
    };

    return (
        <div className={`w-100 background-gradient border-radius-25 p-32 res-height-500 ${isLoading ? 'upload-box' : ''}`}>
            <div
                className='h-100 d-flex flex-center flex-col gap-24 border-radius-25 dashed-border cursor-pointer'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleInputClick}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <img
                            src={uploadIcon}
                            alt='Upload'
                            className={`w-80px upload-icon pointer-events-none ${isDragging ? 'bounce' : ''}`} />

                        <p
                            className='text-regular text-center'
                            dangerouslySetInnerHTML={{
                                __html: isDragging
                                    ? 'Drop your image here'
                                    : 'Drag and drop your seashell image here <br />or click to <u>browse your computer</u>',
                            }} />

                        <input
                            type='file'
                            accept='image/png, image/jpeg, image/jpg'
                            ref={inputRef}
                            className='display-none'
                            onChange={handleInputChange}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default Upload