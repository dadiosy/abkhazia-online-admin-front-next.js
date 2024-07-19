import React, { useCallback, useState } from 'react';
import DropBox from '../common/DropBox';
import copy from 'clipboard-copy';
import axios from "axios";
import { API_BASE_URL } from '../../../../const/CustomConsts';
import Image from "next/image";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { TailSpin } from "react-loader-spinner";

const DropZoneImage = ({ pathStr }) => {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopyClick = async () => {
        try {
            await copy(imgPath);
            setIsCopied(true);
        } catch (error) {
            console.error('Failed to copy text to clipboard', error);
        }
        setIsOpen(false)
    };
    const [uploading, setUploading] = useState(false);
    const [imgPath, setImgPath] = useState('');
    const [images, setImages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const axiosFunc = async (imgFile) => {
        const formData = new FormData();

        formData.append('image', imgFile);
        setUploading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/img/${pathStr}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImages((prevState) => [
                ...prevState,
                { path: res.data.data, serverPath: `${API_BASE_URL}/img/${pathStr}/${res.data.data}` },
            ]);

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
            <Modal isOpen={isOpen} onClose={() => { setIsOpen(false) }} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='bg-red-100'>Image Path</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="text-xl font-bold">{imgPath}</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleCopyClick} colorScheme='pink'>
                            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                        </Button>
                        <Button colorScheme='blue' mx={2} onClick={() => { setIsOpen(false) }}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className='flex justify-center items-center'>
                {uploading && (<TailSpin color="green" radius={"5px"} />)}
                <DropBox onDrop={onDrop} />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                {images.map((v, i) => (
                    <div key={i} onClick={() => { setImgPath(v.serverPath); setIsOpen(true); }} className='cursor-pointer  justify-center items-center'>
                        <Image src={v.serverPath} width={300} height={180} className='object-cover rounded-md shadow-xl' />
                    </div>
                ))}
            </div>
            {/* <div className='text-center'>{imgPath}</div> */}
        </div>
    );
}

export default DropZoneImage;