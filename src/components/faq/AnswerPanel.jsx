import Image from "next/image";
import Heart from "../../../public/img/SVG/Heart";
import moment from "moment";
import 'moment/locale/ru';
import { API_BASE_URL } from '../../const/CustomConsts';

const AnswerPanel = ({ userName, avatar, answer, aDate, feedCount, handleFeed }) => {
    moment.locale('ru'); // Set locale to Russian
    const dayStr = moment(aDate).format('DD MMMM YYYY');
    return (
        <div className="flex gap-3 font-Manrop">
            <div className="pr-2">
                <div className="flex w-[56px] h-[56px] rounded-full bg-[#D7D7D7]">
                    <img src={avatar ? `${API_BASE_URL}/avatar/${avatar}` : '/icon/avatar.png'}
                        width={56} height={56} className="object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="w-[85%] md:w-[90%]">
                <div className="space-y-0.5 md:space-y-1">
                    <div className="space-y-0">
                        <div className="flex justify-between">
                            <p className="text-base md:text-lg font-extrabold">
                                {userName}
                            </p>
                            <p className="text-sm md:text-base font-medium text-[#919494]">
                                {dayStr}
                            </p>
                        </div>
                        <p className="text-base md:text-md font-medium">
                            {answer}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <p className="text-sm md:text-base font-medium text-[#B5B5B5]">
                            Комментировать
                        </p>
                        <div className="flex items-center gap-1 cursor-pointer" onClick={handleFeed}>
                            <div className="hidden md:block">
                                <Heart color={feedCount > 0 ? "#FF2D2D" : ''} />
                            </div>
                            <div className="block md:hidden">
                                <Heart color={feedCount > 0 ? "#FF2D2D" : ''} size={true} />
                            </div>
                            <p className="text-sm md:text-base font-medium 
                            {feedCount > 0 ? 'text-[#FF2D2D]' : 'text-[#B5B5B5]'}"
                            >
                                {feedCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AnswerPanel;
