import { useDropzone } from 'react-dropzone';
import { BtnActive14 } from '../../const/CustomConsts';
//https://github.com/Claradev32/Drag-and-drop-with-react-dropzone/blob/master/src/DropBox.js
const DropBox = ({ onDrop }) => {
    const { getRootProps, getInputProps, acceptedFiles, open, }
        // = useDropzone({ accept: 'image/*', onDrop, noClick: true, noKeyboard: true, });
        = useDropzone({ accept: '*', onDrop, noClick: true, noKeyboard: true, });
    return (
        <>
            <div className="dropbox" {...getRootProps({})} >
                <input {...getInputProps()} />
                <button className={BtnActive14} onClick={open}>
                    Загрузить файл
                </button>
            </div>
        </>
    );
}

export default DropBox;