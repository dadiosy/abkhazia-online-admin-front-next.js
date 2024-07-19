'use client'
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import axios from "axios";
import Router, { useRouter, } from 'next/router';
import Image from "next/image";
import { Image as ImageChak } from '@chakra-ui/react'
import { ArrowRight } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import Scrollspy from 'react-scrollspy'
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import YMapProvider from "../../components/common/YMapProvider";
import TeleBookPanel from "../../components/common/TeleBookPanel";
import ImgDirectPanel from "../../components/common/ImgDirectPanel";
import WeatherPanel from "../../components/weather/WeatherPanel"
import { API_BASE_URL, BtnActive } from '../../const/CustomConsts';
import LinkDetail from "../../components/common/LinkDetail";
import SocialLink from "../../components/common/SocailLink";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

const scrollToSection = (e, id) => {
  e.preventDefault();
  const targetElement = document.getElementById(id);
  if (targetElement) {
    const offset = 94;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
const DirectionDetailPage = () => {
  const [metaData, setMetaData] = useState({});
  const router = useRouter();
  const [directionData, setDirectionData] = useState({});
  const [directionRecent, setDirectionRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayWeather, setTodayWeather] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const detailId = router.query.id;
  const getDirectionRecent = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/direction', { params: {} }
    ).then((res) => {
      setDirectionRecent(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getDirectionData = (id) => {
    setLoading(true);
    axios.get(API_BASE_URL + '/direction/' + id,
      {
        id
      }).then((res) => {
        setDirectionData(res.data.data);
        setTodayWeather(res.data.data.weathers);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDirectionData(detailId);
    getDirectionRecent();
  }, [detailId]);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1); // Remove the '#' character
      scrollToSection({ preventDefault: () => { } }, id);
    }
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.url === window.location.pathname)[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);
  return (
    <>
      {/* <NextSeo title={`Направления-${directionData.title}`} /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      {directionData && (
        <div className="bg-white mt-[60px] md:mt-[94px]">
          {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}

          <div className="relative w-full">
            {directionData.bgImg && (
              <ImageChak src={directionData.bgImg} className="w-full h-[280px] md:h-[800px] z-50" objectFit="cover" />
            )}
            <div className="bg-gradient-to-b from-[#000] absolute bottom-0 h-3/5 md:h-2/5 w-full rotate-180"></div>

            <div className="absolute bottom-0 lg:bottom-15 lg:px-[8.33333333%] lg:py-[60px] lg:space-y-8 px-4 py-8 space-y-2">
              <LinkDetail indexName={'Направления'} indexLink={"/direction"} detailName={directionData.name} />
              <h1 className="!text-white md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                {directionData.title}
              </h1>
            </div>

          </div>
          <div className="flex flex-col justify-center items-center mx-auto max-w-[1440px]">
            <div className="pl-2 md:px-4 max-w-[1200px]">
              <div className="flex flex-col lg:flex-row-reverse w-full">
                <div className="w-full lg:w-[694px] relative">
                  <div className="md:pl-12 py-3 md:py-10 space-y-6 md:space-y-14 sticky top-20">
                    <div className="hidden md:flex">
                      <SocialLink />
                    </div>
                    <div className="flex flex-col gap-3 md:gap-6">
                      <h4 className="text-[20px] md:text-[30px] ">
                        Оглавление
                      </h4>

                      <Scrollspy items={['section-0', 'section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8', 'section-9', 'section-10', 'section-11', 'section-12', 'section-13', 'section-14', 'section-15', 'section-16', 'section-17', 'section-18', 'section-19', 'section-20']}
                        currentClassName="is-current">
                        {directionData?.contents?.map((v, i) => (
                          <li key={i} className="flex items-center gap-3 py-2 !text-base md:!text-md">
                            <div className="w-3 h-3 md:!w-4 md:!h-4 bg-red-300 rounded-full">
                              <span className="w-4 text-transparent">no</span>
                            </div>
                            <Link href={`#section-${i}`}>
                              <span onClick={(e) => scrollToSection(e, `section-${i}`)} className="cursor-pointer hover:font-semibold">
                                {v.question}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </Scrollspy>

                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl md:text-2xl font-semibold leading-7 font-GolosText">
                        Предлагаем в Цандрыпше:
                      </p>
                      <div className="grid grid-cols-3 divide-x items-center justify-center text-center mt-3 md:mt-5">
                        <div onClick={() => { Router.push('/') }}>
                          <div className="hidden md:flex justify-center">
                            <Image src='/img/SVG/House.svg' width={48} height={48} objectFit="cover" />
                          </div>
                          <div className="flex md:hidden justify-center">
                            <Image src='/img/SVG/House.svg' width={36} height={36} objectFit="cover" />
                          </div>
                        </div>
                        <div onClick={() => { Router.push('/') }}>
                          <div className="hidden md:flex justify-center">
                            <Image src='/img/SVG/Routing.svg' width={48} height={48} objectFit="cover" />
                          </div>
                          <div className="flex md:hidden justify-center">
                            <Image src='/img/SVG/Routing.svg' width={36} height={36} objectFit="cover" />
                          </div>
                        </div>
                        <div onClick={() => { Router.push('/') }}>
                          <div className="hidden md:flex justify-center">
                            <Image src='/img/SVG/Transfer.svg' width={48} height={48} />
                          </div>
                          <div className="cursor-pointer flex md:hidden justify-center">
                            <Image src='/img/SVG/Transfer.svg' width={36} height={36} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 bg-[#FFF8ED] md:bg-white md:p-0">
                        <div className="flex flex-col justify-center items-center space-y-1">
                          <p className="text-base md:text-lg text-center font-extrabold">
                            Отели
                          </p>
                          <p className="text-sm md:text-base text-center font-medium text-[#FF6432]">
                            Выбрать
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-1">
                          <p className="text-center text-base md:text-lg font-extrabold">
                            Экскурсии
                          </p>
                          <p className="text-center text-base font-medium text-[#FF6432]">
                            Забронировать
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-1">
                          <p className="text-center text-base md:text-lg font-extrabold">
                            Трансфер
                          </p>
                          <p className="text-center text-sm md:text-base font-medium text-[#FF6432]">
                            Заказать
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="py-3 md:py-10 space-y-4">
                    <div className="text-base md:text-lg xl:text-lg font-medium text-[#292D32] font-Manrop detail-custom-css">
                      <p>{directionData.description} </p>
                    </div>
                    {(todayWeather.length > 0) && (
                      <WeatherPanel wData={todayWeather} id={detailId} />
                    )}
                  </div>
                  {directionData.contents && (
                    <YMapProvider className="w-full" mapX={directionData.latitude} mapY={directionData.longitude} />
                  )}
                  {directionData?.contents?.map((v, i, arr) => (
                    <div key={i} className="py-2 md:py-4 space-y-2 md:space-y-10" id={v.id}>
                      <div className="text-2xl md:text-3xl xl:text-[44px] xl:leading-[52.8px] font-bold">
                        <section id={`section-${i}`}>
                          <h3 className="xl:leading-[48.2px] !text-[24px] md:!text-[44px]" dangerouslySetInnerHTML={{ __html: v.question }} />
                        </section>
                      </div>
                      <div className="space-y-3 md:space-y-8">
                        <div className="text-base md:text-lg font-medium detail-custom-css font-Manrop">
                          <div dangerouslySetInnerHTML={{ __html: v.content }} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div >
                    <button className={`${BtnActive}`}
                      onClick={() => { Router.push('https://AllHotel.com') }}
                      onMouseEnter={() => { setIsHovered(true); }}
                      onMouseLeave={() => { setIsHovered(false); }}
                    >
                      Все отели в цандрыпшэ
                      <ArrowRight color={isHovered ? 'white' : '#FF6432'} />
                    </button>
                  </div>
                  <div className="py-4 md:py-10 space-y-4 font-Manrop">
                    <div className="flex justify-center">
                      <p className="text-[44px] md:text-5xl xl:text-6xl font-normal text-[#FF6432]">
                        ***
                      </p>
                    </div>
                    <p className="text-base md:text-lg font-medium pr-3">
                      {directionData?.heading ? directionData.heading : null}
                    </p>
                    <div className="flex md:hidden justify-center  gap-4">
                      <SocialLink />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )}

      {/* Telegram */}
      < TeleBookPanel />

      {/* Other Destinations */}
      {directionRecent ? (
        <div className="bg-white" >
          <div className="flex flex-col container mx-auto max-w-[1440px] ">
            <div className="px-4 py-4 md:py-[60px] space-y-4 md:space-y-10">
              <p className="text-2xl md:text-3xl xl:text-[51px] font-bold">
                Другие Направления в Абхазии
              </p>
              <ImgDirectPanel data={directionRecent} link={"/direction/"} />
            </div>
          </div>
        </div >
      ) : null}

      <Footer />
    </>
  );
}
// export default dynamic(() => Promise.resolve(DirectionDetailPage), {
//   ssr: false,
// });

export default DirectionDetailPage;