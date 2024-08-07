import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API_BASE_URL } from '../../const/CustomConsts';

export default function ImageEditor({ data = { thumbURL: "" }, onChange = () => { } }) {
    const inputId = uuidv4()
    const [userInfo, setUserInfo] = useState();

    const handleFileInputClick = () => {
        document.getElementById(inputId)?.click()
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        axios.post(API_BASE_URL + "/img/direction", formData,
            {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                onChange({ thumbURL: `${API_BASE_URL}/img/direction/${res.data.data}` })
            })
            .catch(error => { console.log(error) })

    };

    useEffect(() => {
        var saveData = JSON.parse(localStorage?.saveData || null) || {};
        setUserInfo(saveData.userInfo);
    }, []);

    const handleDelete = () => {
        axios.post(API_BASE_URL + "/img/remove", { url: data.thumbURL },
            { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
        )
            .then(res => {
                onChange({ thumbURL: null })
            })
            .catch(error => { console.log(error) })
    }

    const handleRefresh = () => {

    }

    return (
        <div className={`relative`} >
            {data.thumbURL ?
                <div className="border border-dashed bg-[#FFFFFF] rounded-lg w-full h-[136px]" onClick={handleFileInputClick}>
                    <img src={data.thumbURL} alt="thumb" className="object-cover w-full h-full rounded-lg" />
                    <span className="flex items-center p-[12px] rounded-[48px] bg-[#FFFFFFCC] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img src="/icon/Refresh.svg" className="w-[20px] h-auto sm:mr-[16px] cursor-pointer" alt="refresh" onClick={handleRefresh} />
                        <img src="/icon/trash.svg" className="w-[20px] h-auto cursor-pointer" alt="trash" onClick={handleDelete} />
                    </span>
                </div>
                :
                <div>
                    <div className="border border-dashed bg-[#FFFFFF] rounded-lg w-full h-[136px]" onClick={handleFileInputClick}></div>
                    <img src="/icon/gallery-add.svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <input type="file" id={inputId} className="absolute top-0 right-0 bottom-0 left-0 hidden" onChange={handleFileChange} />
                </div>
            }
        </div>
    )
}