import Image from "next/image"
import Router from "next/router"
import { BgColor, BtnActive } from '../../const/CustomConsts';

export default function TeleBookPanel() {
    return (
        <div className="flex flex-col items-center mx-auto" style={{ backgroundColor: BgColor }}>
            {/* Telegram */}
            <div className="flex flex-col lg:flex-row w-full max-w-[1200px] px-4 md:px-4 py-8 md:py-[60px] gap-5 md:gap-10 ">
                <div className="hidden xl:flex w-[23%]">
                    <img src='/img/Tele_Avatar.png' width={600} height={400} alt="logo" />
                </div>
                <div className="flex flex-1 flex-col md:flex-row justify-between gap-10">
                    <div className="flex flex-col gap-y-6">
                        <div className='hidden md:block'>
                            <h2>Бронируйте на сайте</h2>
                            <div className="flex"><h2>или в </h2><h2 className="text-[#2AABEE] ml-6"> Телеграм-бот</h2></div>
                        </div>
                        <div className='block md:hidden'>
                            <h4>Бронируйте на сайте</h4>
                            <div className="flex"><h4>или в </h4><h4 className="text-[#2AABEE] ml-3"> Телеграм-бот</h4></div>
                        </div>
                        {/* <div>
                            <p className="text-[30px] md:text-4xl xl:text-[51px] font-semibold xl:leading-[61.2px]">
                                Бронируйте на сайте
                            </p>
                            <p className="text-[30px] md:text-4xl xl:text-[51px] font-semibold xl:leading-[61.2px]">
                                или в <span className="text-[#2AABEE]">Телеграм-бот</span>
                            </p>
                        </div> */}
                        <div className="flex justify-between md:justify-start">
                            <div className="flex flex-col md:flex-row gap-x-4 xl:gap-x-8 gap-y-3 md:gap-y-0">
                                <div className="flex items-center gap-x-2">
                                    <img src='/img/SVG/Transfer.svg' width={24} height={24} objectFit="cover" />
                                    <h6 className="hidden md:block"> Трансферы</h6>
                                    <div className="block md:hidden class-btn"> Трансферы</div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src='/img/SVG/Routing.svg' width={24} height={24} objectFit="cover" />
                                    <h6 className="hidden md:block"> Экскурсии</h6>
                                    <div className="block md:hidden class-btn"> Экскурсии</div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src='/img/SVG/House.svg' width={24} height={24} objectFit="cover" />
                                    <h6 className="hidden md:block"> Отели</h6>
                                    <div className="block md:hidden class-btn"> Отели</div>
                                </div>
                            </div>
                            <div className="flex md:hidden flex-col w-[30%] gap-2 items-center">
                                <div className="rounded-3xl bg-white p-2">
                                    <img src={'/img/qr.svg'} width={100} height={100} alt="QR" />
                                </div>
                                <button className="text-[14px] font-normal text-[#FF6432] text-center"
                                    onClick={() => { Router.push('/') }}>
                                    Телеграм-бот
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 flex md:block justify-center md:justify-start items-center md:items-start">
                            <button className="defaultButton !text-[14px] md:!text-[18px]"
                                onClick={() => { Router.push('/') }}>
                                Рассчитать лучший отдых в Абхазии
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-between">
                        <div className="rounded-3xl bg-white p-2 xl:p-6">
                            <img src={'/img/qr.svg'} width={150} height={150} layout="fixed" alt="QR" />
                        </div>
                        <div className="px-4 py-1 xl:py-3">
                            <button className={`${BtnActive}`}
                                onClick={() => { Router.push('/') }}>
                                Телеграм-бот
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
