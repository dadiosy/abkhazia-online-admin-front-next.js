import Router from "next/router";
import { useState } from "react"
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'moment/locale/ru';
import { TrashFill, HandThumbsDown, HandThumbsUp, Pen, Textarea } from 'react-bootstrap-icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { API_BASE_URL, BtnActive, BtnActive14 } from '../../../../const/CustomConsts';

const FaqPanel = ({ id, questionText, createAt, answers, userName, userAvatar, approve, active, handleChild }) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [newText, setNewText] = useState(questionText);

    let faqDay = moment(createAt).format("DD MMMM YYYY");
    const today = moment().format("DD MMMM YYYY");
    const beforeDay = moment().add(-1, 'days').format("DD MMMM YYYY");
    if (faqDay == today) { faqDay = 'Сегодня'; }
    if (faqDay == beforeDay) { faqDay = 'Вчера'; }
    const [isEllipsis, setIsEllipsis] = useState(true);

    const handleEditQuestion = () => {
        var saveData = JSON.parse(localStorage?.saveData || null) || {};
        const userInfo = saveData.userInfo;
        if (!userInfo) { toast.error('Пожалуйста, войдите'); }
        else {
            if (newText == "") { toast.error('Напишите текст ответа!'); }
            else {
                axios.put(API_BASE_URL + '/faq/admin/question/' + id,
                    { questionText: newText },
                    { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
                ).then((res) => {
                    if (res.data.statusCode == 200) {
                        toast.success('sucess');
                        handleChild(id, 8, newText);
                    }
                }).catch((err) => {
                    if (err.response?.status == 401) {
                        toast.error("пожалуйста, войдите в систему");
                        Router.push('/auth/login');
                    }
                    console.log(err);
                });
                setIsOpenEdit(false);
                // setNewText('');
            }
        }
    }
    return (
        <div className="flex flex-col w-full md:min-w-[500px] rounded-xl p-5 space-y-4 bg-white border border-[#D7D7D7] shadow">
            <p className={`text-lg md:text-xl font-bold ${isEllipsis ? 'custom-ellipsis-one' : 'flex-wrap'}`}
                onClick={() => { setIsEllipsis(!isEllipsis) }}>
                {questionText}
            </p>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
                <div className="flex gap-3">
                    <div className="flex w-[56px] h-[56px]">
                        <Image src={userAvatar ? userAvatar : '/icon/avatar.png'}
                            width={56} height={56}
                            alt="User" objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="text-base md:text-lg font-medium">
                            {userName}
                        </p>
                        <p className="text-xs md:text-base font-medium text-[#919494]">
                            {faqDay}
                        </p>
                    </div>
                </div>
                {answers ? (
                    <div className="flex gap-5 items-center">
                        <div onClick={() => { handleChild(id, -1); }} className="mt-3 cursor-pointer">
                            <TrashFill size={20} color="#FF6432" />
                        </div>
                        <button className={BtnActive14}
                            onClick={() => { setIsOpenEdit(true) }}>
                            Обновить  <Pen className="mt-1" color="black" />
                        </button>
                        {approve == 1 ? (
                            <button className={BtnActive14}
                                onClick={() => { handleChild(id, 2); }}>
                                Неодобрить < HandThumbsDown className="mt-1" color="black" />
                            </button>
                        ) : (
                            <button className={BtnActive14}
                                onClick={() => { handleChild(id, 1); }}>
                                Одобрить  <HandThumbsUp className="mt-1" color="black" />
                            </button>
                        )}
                        {answers?.length != 0 && (
                            <button className="defaultButton14"
                                onClick={() => { Router.push(`/admin/faq/${id}`) }}>
                                {(answers.length == 1) ? answers.length + ' ответ' : answers.length + ' ответов'}
                            </button>
                        )}
                        {answers?.length == 0 && (
                            <button className="defaultButton14"
                                onClick={() => { Router.push(`/admin/faq/${id}`) }}>
                                Нет ответов
                            </button>
                        )}
                        <input type="checkbox"
                            className="size-4 cursor-pointer hover:size-6 rounded-md"
                            checked={active}
                            onChange={() => { }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleChild(id, 9, !active);
                            }} />
                    </div>
                ) : null}

            </div>
            <Modal isOpen={isOpenEdit} onClose={() => { setIsOpenEdit(false) }} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="bg-gray-100">Обновить</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="bg-red-100">
                        <textarea
                            className="outline-none p-4 w-full rounded-xl text-lg font-medium"
                            placeholder="Написать ответ"
                            value={newText}
                            onChange={(e) => { setNewText(e.target.value) }}
                            rows={2} // Number of visible rows
                            cols={40}
                        />
                    </ModalBody>
                    <ModalFooter className="flex flex-row gap-10">
                        <button className={BtnActive}
                            onClick={handleEditQuestion}>
                            Обновить
                        </button>
                        <button className={BtnActive}
                            onClick={() => { setIsOpenEdit(false) }}>
                            Отмена
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div >
    )
}

export default FaqPanel;