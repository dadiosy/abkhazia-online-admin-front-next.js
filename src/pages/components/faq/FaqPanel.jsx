import Router from "next/router";
import { useState, useCallback } from "react"
import axios from "axios";
import { toast } from 'react-toastify';
import 'moment/locale/ru';
import { TrashFill, HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons';
import { BtnActive14 } from '../../../const/CustomConsts';
import { useDropzone } from "react-dropzone";

const FaqPanel = ({ id, questionText, creationDate, answers, userName, userAvatar, approve, active, handleChild }) => {
    const axiosFunc = async (imgFile) => {
        const formData = new FormData();
        formData.append('image', imgFile);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            handleEditQuestion('ownerAvatar', `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/avatar/${res.data.data}`)
        } catch (error) {
            toast.error('Error uploading file:', error);
        }
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            axiosFunc(file);
            reader.readAsDataURL(file);
            return file;
        });
    }, []);

    const { getRootProps, getInputProps, acceptedFiles, open, }
        = useDropzone({ accept: '*', onDrop, noClick: true, noKeyboard: true, });


    const [qText, setQText] = useState("nothing");
    const [authorName, setAuthorName] = useState("nothing");
    const [cDate, setCreationDate] = useState(creationDate.split("T")[0])

    const handleEditQuestion = (field, newValue) => {
        var saveData = JSON.parse(localStorage?.saveData || null) || {};
        const userInfo = saveData.userInfo;
        if (!userInfo) { toast.error('Пожалуйста, войдите'); }
        else {
            let updateData = {};
            if (field == 'ownerName') updateData.ownerName = authorName
            if (field == 'active') updateData.active = !active
            if (field == 'questionText') updateData.questionText = qText
            if (field == 'creationDate') updateData.creationDate = newValue
            if (field == 'ownerAvatar') updateData.ownerAvatar = newValue

            axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + '/faq/admin/question/' + id,
                updateData,
                { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
            ).then((res) => {
                if (res.data.statusCode == 200) {
                    toast.success('sucess');
                    handleChild(id, 8);
                }
            }).catch((err) => {
                if (err.response?.status == 401) {
                    toast.error("пожалуйста, войдите в систему");
                    Router.push('/auth/login');
                }
                console.log(err);
            });
        }
    }

    return (
        <div className={"flex flex-col w-full md:min-w-[500px] rounded-xl p-5 space-y-4 border border-[#D7D7D7] shadow" + (approve == 1 ? " bg-green-50" : "")}>
            {
                qText == "nothing" ?
                    <p className={`text-lg md:text-xl font-bold custom-ellipsis-one`}
                        onClick={e => setQText(questionText)}>
                        {questionText}
                    </p>
                    :
                    <textarea
                        autoFocus
                        value={qText}
                        onChange={e => setQText(e.target.value)}
                        className={"text-base md:text-lg xl:text-xl font-extrabold w-auto" + (approve == 1 ? " bg-green-50" : "")}
                        onKeyUp={(e) => {
                            if (e.key == 'Escape') setQText("nothing");
                            if (e.key == 'Enter') { handleEditQuestion('questionText'); setQText("nothing"); }
                        }}
                        onBlur={e => setQText("nothing")}
                    />
            }
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
                <div className="flex gap-3">
                    <div className="dropbox" {...getRootProps({})}>
                        <input {...getInputProps()} />
                        <img src={userAvatar ? userAvatar : '/icon/avatar.png'}
                            onClick={open}
                            className="object-cover rounded-full w-14 h-14"
                        />
                    </div>
                    <div className="space-y-1">
                        {
                            authorName == 'nothing' ?
                                <p className="text-base md:text-lg xl:text-xl font-extrabold" onClick={e => setAuthorName(userName)}>
                                    {userName}
                                </p>
                                :
                                <input
                                    autoFocus
                                    value={authorName}
                                    onChange={e => setAuthorName(e.target.value)}
                                    className={"text-base md:text-lg xl:text-xl font-extrabold block" + (approve == 1 ? " bg-green-50" : "")}
                                    onKeyUp={(e) => {
                                        if (e.key == 'Escape') setAuthorName("nothing");
                                        if (e.key == 'Enter') { handleEditQuestion('ownerName'); setAuthorName("nothing"); }
                                    }}
                                    onBlur={e => setAuthorName("nothing")}
                                />
                        }
                        <input
                            type="date"
                            className={"text-xs md:text-sm xl:text-base font-medium text-[#919494]" + (approve == 1 ? " bg-green-50" : "")}
                            value={cDate}
                            onChange={e => { setCreationDate(e.target.value); handleEditQuestion('creationDate', e.target.value); }}
                        />
                    </div>
                </div>
                {answers ? (
                    <div className="flex gap-5 items-center">
                        <div onClick={() => { handleChild(id, -1); }} className="mt-3 cursor-pointer">
                            <TrashFill size={20} color="#FF6432" />
                        </div>
                        {approve == 1 ? (
                            <button className={BtnActive14}
                                onClick={() => { handleChild(id, 2); }}>
                                Отменить публикацию < HandThumbsDown className="mt-1" color="black" />
                            </button>
                        ) : (
                            <button className={BtnActive14}
                                onClick={() => { handleChild(id, 1); }}>
                                Публиковать  <HandThumbsUp className="mt-1" color="black" />
                            </button>
                        )}
                        {answers?.length != 0 && (
                            <button className="defaultButton14"
                                onClick={() => { Router.push(`/faq/${id}`) }}>
                                {(answers.length == 1) ? answers.length + ' ответ' : answers.length + ' ответов'}
                            </button>
                        )}
                        {answers?.length == 0 && (
                            <button className="defaultButton14"
                                onClick={() => { Router.push(`/faq/${id}`) }}>
                                Нет ответов
                            </button>
                        )}
                        <input type="checkbox"
                            className="size-4 cursor-pointer hover:size-6 rounded-md"
                            checked={active}
                            onChange={() => { }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditQuestion('active');
                            }} />
                    </div>
                ) : null}

            </div>

        </div >
    )
}

export default FaqPanel;