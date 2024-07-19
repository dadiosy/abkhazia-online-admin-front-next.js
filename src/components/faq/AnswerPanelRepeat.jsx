import Image from "next/image";
import Repeat from "../../../public/img/SVG/Repeat";
import moment from "moment";
import 'moment/locale/ru';
import { API_BASE_URL} from '../../const/CustomConsts';

const AnswerPanelRepeat = ({ userName, avatar, answer, aDate }) => {
    moment.locale('ru'); // Set locale to Russian
    const dayStr = moment(aDate).format('DD MMMM YYYY');
    return (
        <div className="flex">
            <div className="flex flex-col w-[15%] md:w-[10%] h-14 justify-center items-center">
                <Repeat />
            </div>
            <div className="w-[15%] md:w-[10%]">
                <div className="flex w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#D7D7D7]">
                    <Image src={`${API_BASE_URL}/avatar/${avatar}`}
                        width={100} height={100}
                        objectFit="cover" className="rounded-full"
                    />
                </div>
            </div>
            <div className="flex flex-col w-[70%] md:w-[80%] gap-1">
                <div className="flex justify-between">
                    <p className="text-base md:text-lg xl:text-xl font-extrabold">
                        {userName}
                    </p>
                    <p className="text-xs md:text-sm xl:text-base font-medium text-[#919494]">
                        {dayStr}
                    </p>
                </div>
                <p className="text-sm md:text-base xl:text-lg font-medium">
                    {answer}
                </p>
            </div>
        </div>
    )
}
export default AnswerPanelRepeat;
