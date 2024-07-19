import React, { useCallback, useState } from 'react';
import DropBox from '../common/DropBox';
import axios from "axios";
import { API_BASE_URL } from '../../../../const/CustomConsts';
import { TailSpin } from "react-loader-spinner";

const DropZoneImage = ({ onChildData }) => {
    const [uploading, setUploading] = useState(false);

    const axiosFunc = async (imgFile) => {
        const formData = new FormData();
        formData.append('image', imgFile);
        setUploading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/img/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onChildData(`${API_BASE_URL}/img/avatar/${res.data.data}`);
        } catch (error) {
            console.log(error);
            console.error('Error uploading file:', error);
        }
        setUploading(false);
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            axiosFunc(file);
            reader.onload = function (e) {
                // setImages((prevState) => [
                //     ...prevState,
                //     { id: index, path: URL.createObjectURL(file) },
                //     // { id: index, src: e.target.result, path: URL.createObjectURL(file) },
                // ]);
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);

    return (
        <div className="flex flex-col justify-center gap-y-2">
            <div className='flex justify-center items-center'>
                {uploading ? (
                    <TailSpin color="green" radius={"5px"} className="h-10 w-10" />
                ) : (
                    <DropBox onDrop={onDrop} />
                )}
            </div>
        </div>
    );
}

export default DropZoneImage;