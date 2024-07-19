import Image from "next/image";
import { useState } from "react"
import Router from "next/router";
import { ArrowRight } from 'react-bootstrap-icons';
import Drop from "../../../public/img/SVG/Drop.jsx";
import moment from 'moment';
import 'moment/locale/ru';
import { BtnActive14 } from "../../const/CustomConsts.js";

export default function WeatherPanel({ wData, id }) {
    moment.locale('ru');
    const dayStr = moment(wData[0].date).format('D');
    const monthStr = moment(wData[0].date).format('MMMM');
    const dayOfWeek = moment(wData[0].date).format('dddd');
    const labelStr = ['Утром', 'Днем', 'Вечером', 'Ночью'];
    let waterAverTemp = Math.round((wData.slice(0, 4).reduce((sum, v) => sum + v.waterTemp, 0) / 4) * 1) / 1;
    waterAverTemp = (waterAverTemp > 0) ? '+' + waterAverTemp : waterAverTemp
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className="w-full flex flex-col border border-[#EEEEEE] bg-white rounded-2xl p-4 md:p-6 gap-2 md:gap-4">
                <div className="flex">
                    <p className="text-[44px] md:text-[62px] font-semibold font-GolosText">
                        {dayStr}
                    </p>
                    <div className="flex flex-col justify-evenly ml-4">
                        <p className="text-md md:text-lg font-medium text-[#919494] mt-4">
                            {dayOfWeek}
                        </p>
                        <p className="text-md md:text-lg font-medium text-[#292D32] mb-4">
                            {monthStr}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    {wData.map((v, i) => (
                        <div key={i} className="col-span-2 md:col-span-1">
                            <div className="flex flex-col gap-2">
                                <p className="text-base md:text-md text-[#919494] font-medium">
                                    {labelStr[i]}
                                </p>
                                <p className="text-md md:text-xl leading-7 text-[#292D32] font-bold font-GolosText">
                                    {(v.comfortTemp > 0) ? '+' : '-'}{Math.round(v.comfortTemp)}° ...
                                    {(v.airTemp > 0) ? '+' : '-'}{Math.round(v.airTemp)}°
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Image src={'/icon/weather/' + v.icon + '.svg'} width={64} height={64} layout="fixed" />
                                <p className="text-sm md:text-base font-medium text-[#292D32]">
                                    {v.description}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-0 md:mt-2">
                    <div className="flex items-center space-x-1">
                        <Drop />
                        <span className="text-base md:text-md font-medium text-[#292D32]">
                            Температура воды в море
                        </span>
                        <span className="text-base md:text-md font-bold text-[#292D32]">
                            {waterAverTemp}°C
                        </span>
                    </div>
                    {id && (
                        <button className={`${BtnActive14} justify-center`}
                            onClick={() => { Router.push('/weather/' + id) }}
                            onMouseEnter={() => { setIsHovered(true); }}
                            onMouseLeave={() => { setIsHovered(false); }}
                        >
                            Погода в Цандрыпше на 10 дней
                            <ArrowRight color={isHovered ? 'white' : '#FF6432'} />
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
