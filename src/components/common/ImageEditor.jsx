import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API_BASE_URL } from '../../const/CustomConsts';

export default function ImageEditor({ uploadUrl = '', onChange = () => { }, thumbs = [] }) {
    const inputId = uuidv4()
    const divId = uuidv4()
    const [file, setFile] = useState(null)
    const [thumbURL, setThumbURL] = useState(undefined)
    const [toggle, setToggle] = useState(false)
    const [userInfo, setUserInfo] = useState();

    const handleFileInputClick = () => {
        document.getElementById(inputId)?.click()
    }

    const handleFileChange = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0])
        } else {
            setFile(null)
        }
    };

    const isCoverImage = thumbURL && thumbs.indexOf(thumbURL) === 0

    useEffect(() => {
        if (file) {
            const formData = new FormData()
            formData.append('thumb', file)
            axios.post(API_BASE_URL + "/direction/image-upload", formData,
                { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
            )
                .then(res => res.json())
                .then(data => {
                    setThumbURL(data.thumbURL)
                    onChange({ thumbURL: data.thumbURL, created: true, deleted: false })
                })
                .catch(error => { console.log(error) })
        }
    }, [file])

    useEffect(() => {
        document.getElementById(divId)?.addEventListener('mouseover', () => { setToggle(true) })
        document.getElementById(divId)?.addEventListener('mouseout', () => { setToggle(false) })
    }, [])

    useEffect(() => {
        var saveData = JSON.parse(localStorage?.saveData || null) || {};
        setUserInfo(saveData.userInfo);
    }, []);

    const handleDelete = () => {
        const fileName = thumbURL?.split('/').pop()
        axios.delete(API_BASE_URL + "/direction/image-upload",
            { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
        )
            .then(res => res.json())
            .then(res => {
                setFile(null)
                onChange({ thumbURL: thumbURL, created: false, deleted: true })
                setThumbURL(undefined)
            })
            .catch(error => { console.log(error) })
    }

    const handleRefresh = () => {

    }

    return (
        <div className={`relative`} id={divId}>
            {thumbURL ? <div className="border border-dashed bg-[#FFFFFF] rounded-lg md:max-w-[277px] h-[136px]" onClick={handleFileInputClick}>
                <img src={thumbURL} alt="thumb" className="object-cover w-full h-full rounded-lg" />
                {isCoverImage ? <span className="absolute top-[8px] left-[8px] px-[8px] py-[4px] bg-[#FFFFFF] rounded-[24px] text-p4">Обложка</span> : null}
                {toggle ? <span className="flex items-center p-[12px] rounded-[48px] bg-[#FFFFFFCC] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src="icon/Refresh.svg" className="w-[20px] h-auto sm:mr-[16px] cursor-pointer" alt="refresh" onClick={handleRefresh} />
                    <img src="icon/trash.svg" className="w-[20px] h-auto cursor-pointer" alt="trash" onClick={handleDelete} />
                </span> : null}
            </div> :
                <div>
                    <div className="border border-dashed bg-[#FFFFFF] rounded-lg md:max-w-[277px] h-[136px]" onClick={handleFileInputClick}></div>
                    <img src="/icon/gallery-add.svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <input type="file" id={inputId} className="absolute top-0 right-0 bottom-0 left-0 hidden" onChange={handleFileChange} />
                </div>
            }
        </div>
    )
}