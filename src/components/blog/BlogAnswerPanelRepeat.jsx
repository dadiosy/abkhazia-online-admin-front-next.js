import Image from "next/image";
import moment from "moment";
import 'moment/locale/ru';
import Repeat from "../../../public/img/SVG/Repeat";

const BlogAnswerPanelRepeat = ({ userName, avatar, answer, aDate }) => {
    moment.locale('ru'); // Set locale to Russian
    const dayStr = moment(aDate).format('DD MMMM YYYY');
    return (
        <div className="flex">
            <div className="flex flex-col w-[15%] md:w-[10%] h-14 justify-center items-center">
                <Repeat />
                <p className="text-xs md:text-sm xl:text-base text-center font-medium text-[#919494]">
                    ответ
                </p>
            </div>
            <div className="w-[15%] md:w-[10%] mr-2">
                <div className="flex w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#D7D7D7]">
                    <img src={avatar}
                        width={100} height={100}
                        className="object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="flex flex-col w-[70%] md:w-[80%] gap-1">
                <div className="flex justify-between">
                    <p className="text-md md:text-lg font-extrabold">
                        {userName}
                    </p>
                    <p className="text-sm md:text-base font-medium text-[#919494]">
                        {dayStr}
                    </p>
                </div>
                <p className="text-sm md:text-md font-medium">
                    {answer}
                </p>
            </div>
        </div>
    )
}
export default BlogAnswerPanelRepeat;
