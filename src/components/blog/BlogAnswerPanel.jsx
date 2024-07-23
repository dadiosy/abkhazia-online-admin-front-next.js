import Image from "next/image";
import moment from "moment";
import 'moment/locale/ru';
import Heart from "../../../public/img/SVG/Heart";

const BlogAnswerPanel = ({ id, userName, avatar, answer, aDate }) => {
    moment.locale('ru'); // Set locale to Russian
    const dayStr = moment(aDate).format('DD MMMM YYYY');
    const handleYesButton = () => {
        console.log('id', id);
    }
    const handleNoButton = () => {
        console.log('id', id);
    }
    return (
        <div className="flex font-Manrop">
            <div className="w-[15%] md:w-[10%] mr-2">
                <div className="flex w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#D7D7D7]">
                    <img src={avatar ? avatar : '/icon/avatar.png'}
                        width={100} height={100}
                        className="object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="w-[85%] md:w-[90%]">
                <div className="space-y-1 md:space-y-1.5">
                    <div className="space-y-1">
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
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="cursor-pointer text-xs md:text-sm xl:text-base font-medium text-[#B5B5B5]"
                            onClick={handleYesButton}>
                            Ответить
                        </div>
                        <div className="cursor-pointer text-xs md:text-sm xl:text-base font-medium text-[#B5B5B5]"
                            onClick={handleYesButton}>
                            Пожаловаться
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlogAnswerPanel;
