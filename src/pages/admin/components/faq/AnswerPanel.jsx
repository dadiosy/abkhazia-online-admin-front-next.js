import { useState } from "react"
import Image from "next/image";
import Heart from "../../../../../public/img/SVG/Heart";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'moment/locale/ru';
import { TrashFill, HandThumbsDown, HandThumbsUp, Pen } from 'react-bootstrap-icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { API_BASE_URL, BtnActive, BtnActive14 } from '../../../../const/CustomConsts';

const AnswerPanel = ({ id, userName, avatar, answer, aDate, feedCount, approve, active, handleChild }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [newText, setNewText] = useState(answer);
  const [rateTextFlag, setRateTextFlag] = useState(false);
  const [rateTextValue, setRateTextValue] = useState(feedCount);
  moment.locale('ru'); // Set locale to Russian
  const dayStr = moment(aDate).format('DD MMMM YYYY');
  const [isEllipsis, setIsEllipsis] = useState(true);

  const handleEditAnswer = (field) => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    const userInfo = saveData.userInfo;
    if (!userInfo) { toast.error('Пожалуйста, войдите'); }
    else {
      let updateData = {};
      if (field == 'active') { updateData = { 'isRight': !active }; }
      if (field == 'rating') { updateData = { 'rating': rateTextValue }; }
      if (field == 'answerText') {
        if (newText == "") { toast.error('Напишите текст ответа!'); return; }
        updateData = { 'answerText': newText };
      }
      axios.put(API_BASE_URL + '/faq/admin/answer/' + id,
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
      setIsOpenEdit(false);
      // setNewText('');
    }
  }
  return (
    <div className="flex gap-3 border border-l border-gray-100 shadow-lg rounded-lg p-5 min-w-[600px]">
      <div className="mr-4">
        <div className="flex w-[56px] h-[56px] rounded-full bg-[#D7D7D7]">
          <Image src={avatar ? avatar : '/icon/avatar.png'}
            width={56} height={56}
            objectFit="cover" className="rounded-full"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="space-y-1 md:space-y-1.5">
          <div className="space-y-1">
            <div className="flex justify-between">
              <p className="text-base md:text-lg xl:text-xl font-extrabold">
                {userName}
              </p>
              <p className="text-xs md:text-sm xl:text-base font-medium text-[#919494]">
                {dayStr}
              </p>
            </div>
            <p onClick={() => { setIsEllipsis(!isEllipsis) }}
              className={`text-sm md:text-base font-medium leading-5 ${isEllipsis ? 'custom-ellipsis-one' : 'flex-wrap'}`}>
              {answer}
            </p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <p className="text-xs md:text-sm xl:text-base font-medium text-[#B5B5B5] mt-3">
              Комментировать
            </p>
            <div className="flex items-center gap-1 cursor-pointer"
              onClick={() => { setRateTextFlag(true) }}>
              <Heart color={feedCount > 0 ? "#FF2D2D" : ''} />
              {rateTextFlag ? (
                <input type='number' autoFocus name="rateText" value={rateTextValue}
                  onChange={(e) => { setRateTextValue(e.target.value); }}
                  onKeyUp={(e) => {
                    if (e.key == 'Escape') setRateTextFlag(false);
                    if (e.key == 'Enter') { setRateTextFlag(false); handleEditAnswer('rating'); }
                  }}
                  className="w-8 h-6 text-center text-sm rounded-sm border-0 px-1 text-[#FF2D2D] ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 font-Manrop font-bold" />
              ) : (
                <p className={`text-xs md:text-sm xl:text-base font-medium 
              ${feedCount > 0 ? 'text-[#FF2D2D]' : 'text-[#B5B5B5]'}`}>
                  {feedCount}
                </p>
              )}
            </div>

            <div className="flex gap-5 items-center">
              <div onClick={() => { handleChild(id, -1); }} className="mt-1 cursor-pointer">
                <TrashFill size={20} color="#FF6432" />
              </div>
              <button className={`${BtnActive14} !py-0`}
                onClick={() => { setIsOpenEdit(true) }}>
                Обновить  <Pen className="mt-1" color="black" />
              </button>

              {approve == 1 ? (
                <button className={`${BtnActive14} !py-0`}
                  onClick={() => { handleChild(id, 2); }}>
                  Неодобрить < HandThumbsDown className="mt-1" color="black" />
                </button>
              ) : (
                <button className={`${BtnActive14} !py-0`}
                  onClick={() => { handleChild(id, 1); }}>
                  Одобрить <HandThumbsUp className="mt-1" color="black" />
                </button>
              )}
              <input type="checkbox"
                className="size-4 cursor-pointer hover:size-6 rounded-md"
                checked={active}
                onChange={() => { }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditAnswer('active');
                }} />
            </div>
          </div>
        </div>
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
              rows={6} // Number of visible rows
              cols={40}
            />
          </ModalBody>
          <ModalFooter className="flex flex-row gap-10">
            <button className={BtnActive}
              onClick={() => { handleEditAnswer('answerText') }}>
              Обновить
            </button>
            <button className={BtnActive}
              onClick={() => { setIsOpenEdit(false) }}>
              Отмена
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
export default AnswerPanel;
