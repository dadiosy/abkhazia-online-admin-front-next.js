import { useState } from "react"
import Image from "next/image";
import Heart from "../../../../public/img/SVG/Heart";
import axios from "axios";
import { toast } from 'react-toastify';
import 'moment/locale/ru';
import { TrashFill, HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons';
import { BtnActive14 } from '../../../const/CustomConsts';

const AnswerPanel = ({ id, userName, avatar, answer, aDate, feedCount, approve, active, handleChild }) => {
  const [rateTextValue, setRateTextValue] = useState("nothing");
  const [authorName, setAuthorName] = useState("nothing")
  const [answerText, setAnswerText] = useState("nothing");
  const [creationDate, setCreationDate] = useState(aDate.split("T")[0])

  // moment.locale('ru'); // Set locale to Russian
  // const dayStr = moment(creationDate).format('DD MMMM YYYY');

  const handleEditAnswer = (field, newValue) => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    const userInfo = saveData.userInfo;
    if (!userInfo) { toast.error('Пожалуйста, войдите'); }
    else {
      let updateData = {};
      if (field == 'active') updateData.isRight = !active
      if (field == 'rating') updateData.rating = rateTextValue
      if (field == 'answerText') updateData.answerText = answerText
      if (field == 'ownerName') updateData.ownerName = authorName
      if (field == 'creationDate') updateData.creationDate = newValue
      axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + '/faq/admin/answer/' + id,
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
    <div className={"flex gap-3 border border-l border-gray-100 shadow-lg rounded-lg p-5 min-w-[600px]" + (approve == 1 ? " bg-green-50" : "")}>
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
              {
                authorName == "nothing" ?
                  <p className="text-base md:text-lg xl:text-xl font-extrabold" onClick={e => setAuthorName(userName)}>
                    {userName}
                  </p>
                  :
                  <input
                    autoFocus
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className={"text-base md:text-lg xl:text-xl font-extrabold w-fit" + (approve == 1 ? " bg-green-50" : "")}
                    onKeyUp={(e) => {
                      if (e.key == 'Escape') setAuthorName("nothing");
                      if (e.key == 'Enter') { handleEditAnswer('ownerName'); setAuthorName("nothing"); }
                    }}
                    onBlur={e => setAuthorName("nothing")}
                  />
              }
              {/* <p className="text-xs md:text-sm xl:text-base font-medium text-[#919494]">
                {dayStr}
              </p> */}
              <input
                type="date"
                className="text-xs md:text-sm xl:text-base font-medium text-[#919494]"
                value={creationDate}
                onChange={e => { setCreationDate(e.target.value); handleEditAnswer('creationDate', e.target.value); }}
              />
            </div>
            {
              answerText == "nothing" ?
                <p onClick={() => { setAnswerText(answer) }}
                  className={`text-sm md:text-base font-medium leading-5 custom-ellipsis-one`}>
                  {answer}
                </p>
                :
                <textarea
                  autoFocus
                  value={answerText}
                  className={"text-base w-full min-h-[300px]" + (approve == 1 ? " bg-green-50" : "")}
                  onChange={e => setAnswerText(e.target.value)}
                  onBlur={() => setAnswerText("nothing")}
                  onKeyUp={(e) => {
                    if (e.key == 'Escape') setAnswerText("nothing");
                    if (e.key == 'Enter') { handleEditAnswer('answerText'); setAnswerText("nothing"); }
                  }}
                />

            }
          </div>
          <div className="flex flex-row justify-between gap-4">
            <p className="text-xs md:text-sm xl:text-base font-medium text-[#B5B5B5] mt-3">
              Комментировать
            </p>
            <div className="flex items-center gap-1 cursor-pointer"
              onClick={() => { setRateTextValue(feedCount) }}>
              <Heart color={feedCount > 0 ? "#FF2D2D" : ''} />
              {rateTextValue == "nothing" ?
                <p className={`text-xs md:text-sm xl:text-base font-medium ${feedCount > 0 ? 'text-[#FF2D2D]' : 'text-[#B5B5B5]'}`}>
                  {feedCount}
                </p>
                :
                <input
                  type='number'
                  autoFocus
                  value={rateTextValue}
                  onChange={(e) => { console.log(typeof e.target.value); setRateTextValue(e.target.value); }}
                  onKeyUp={(e) => {
                    if (e.key == 'Escape') setRateTextValue("nothing");
                    if (e.key == 'Enter') { handleEditAnswer('rating'); setRateTextValue("nothing"); }
                  }}
                  onBlur={e => setRateTextValue("nothing")}
                  className="w-8 h-6 text-center text-sm rounded-sm border-0 px-1 text-[#FF2D2D] ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 font-Manrop font-bold"
                />
              }
            </div>

            <div className="flex gap-5 items-center">
              <div onClick={() => { handleChild(id, -1); }} className="mt-1 cursor-pointer">
                <TrashFill size={20} color="#FF6432" />
              </div>
              {approve == 1 ? (
                <button className={`${BtnActive14} !py-0`}
                  onClick={() => { handleChild(id, 2); }}>
                  Отменить публикацию < HandThumbsDown className="mt-1" color="black" />
                </button>
              ) : (
                <button className={`${BtnActive14} !py-0`}
                  onClick={() => { handleChild(id, 1); }}>
                  Публиковать <HandThumbsUp className="mt-1" color="black" />
                </button>
              )}
              <label className="text-xl">
                Админ &nbsp;
                <input type="checkbox"
                  name=""
                  className="size-4 cursor-pointer hover:size-6 rounded-md"
                  checked={active}
                  onChange={() => { }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditAnswer('active');
                  }} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnswerPanel;
