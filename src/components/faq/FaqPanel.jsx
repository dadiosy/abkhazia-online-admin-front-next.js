import Router from "next/router";
import Image from "next/image";
import moment from "moment";
import 'moment/locale/ru';
import { API_BASE_URL, BtnActive14 } from '../../const/CustomConsts';

const FaqPanel = ({ id, questionText, createAt, answers, userName, userAvatar }) => {
    let faqDay = moment(createAt).format("DD MMMM YYYY");
    const today = moment().format("DD MMMM YYYY");
    const beforeDay = moment().add(-1, 'days').format("DD MMMM YYYY");
    if (faqDay == today) { faqDay = 'Сегодня'; }
    if (faqDay == beforeDay) { faqDay = 'Вчера'; }
    let detailAnsLink = "/faq/" + id + '?scrollTo=answerBtn';
    let detailLink = "/faq/" + id;

    return (
        <div className="flex flex-col w-full rounded-xl p-5 space-y-4 bg-white border border-[#D7D7D7] font-Manrop">
            <p className="text-md md:text-lg font-bold custom-ellipsis-one h-16">
                {questionText}
            </p>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-3 md:gap-0">
                <div className="flex gap-3">
                    <div className="flex">
                        <Image src={userAvatar ? userAvatar : '/icon/avatar.png'}
                            width={56} height={56}
                            alt="User" objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="text-base md:text-md font-medium">
                            {userName}
                        </p>
                        <p className="text-xs md:text-base font-medium text-[#919494]">
                            {faqDay}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 justify-center">
                    <button className={`${BtnActive14} w-1/2 md:w-fit`}
                        onClick={() => { Router.push(detailAnsLink) }}>
                        Ответить
                    </button>
                    {answers?.length != 0 && (
                        <button className="defaultButton14 w-1/2 md:w-fit "
                            onClick={() => { Router.push(detailLink) }}>
                            {(answers.length == 1) ? answers.length + ' ответ' : answers.length + ' ответов'}
                        </button>
                    )}
                    {answers?.length == 0 && (
                        <button className={BtnActive14}
                            onClick={() => { Router.push(detailAnsLink) }}>
                            Нет ответов
                        </button>
                    )}
                </div>
            </div>
        </div >
    )
}

export default FaqPanel;