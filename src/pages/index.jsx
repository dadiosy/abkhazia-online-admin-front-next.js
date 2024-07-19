import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link"
import { Image as ImageChak } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from "axios";
import Router from "next/router";
import { TailSpin } from "react-loader-spinner";
import { API_BASE_URL, BgColor, BtnActive, BtnActive14 } from '../const/CustomConsts';
import NavBar from "../components/Layout/NavBar";
import { ArrowRight } from 'react-bootstrap-icons';
import ImageBottomText from "../components/blog/ImageBottomText";
import ImageSecondRightText from "../components/index/ImageSecondRightText";
import Footer from "../components/Layout/Footer";
import FindTravel from "../components/common/FindTravel";
import DirectionPanel from "../components/index/DirectionPanel";
import IndexFaqPanel from "../components/faq/IndexFaqPanel";
import TeleBookPanel from "../components/common/TeleBookPanel";
import AttractionLink from "../components/attraction/AttractionLink";
import VideoTag from "../components/VideoTag";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../const/Apis";

export default function Home() {
  const [metaData, setMetaData] = useState({});
  const [blockData, setBlockData] = useState({ id: 0, title: '', text: '', img: '' });
  const convertBrText = (text) => { return text.replace(/\n/g, "<br />"); };
  const [isEllipsis, setIsEllipsis] = useState(true);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

  const [faqData, setFaqData] = useState([]);
  const [directionRecent, setDirectionRecent] = useState([]);
  const [attractionRecent, setAttractionRecent] = useState([]);
  const [blogRecent, setBlogRecent] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFaqData = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/faq/active', {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }
    ).then((res) => {
      setFaqData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }
  const getAttractionRecent = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/attraction/active', {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }
    ).then((res) => {
      setLoading(false);
      setAttractionRecent(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getDirectionRecent = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/direction/active', {
      params: {
        limit: 6,
        offset: 0
      }
    }
    ).then((res) => {
      setLoading(false);
      setDirectionRecent(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getBlogRecent = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/blog/active', {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }
    ).then((res) => {
      setLoading(false);
      setBlogRecent(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  const getBlockData = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/meta', {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }).then((res) => {
      setBlockData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getDirectionRecent();
    getAttractionRecent();
    getFaqData();
    getBlogRecent();
    getBlockData();

    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.page === 'home')[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      <div className="flex flex-col items-center mx-auto mt-[60px] md:mt-[94px]" style={{ backgroundColor: BgColor }}>
        <div className=" mx-auto max-w-[1200px] w-full py-8 md:py-[60px] gap-4 md:gap-8 px-4">
          {/* Search Part */}
          <div className=" flex flex-col w-full justify-center items-center gap-6 lg:gap-11 pt-2 md:pt-10 lg:pt-20 pb-8 lg:pb-[60px]">

            <div className="text-center">
              <div className="flex flex-row">
                {/* <h1 className="px-2 text-[30px] lg:text-[62px]" style={{ lineHeight: 1.2 }}>
                  Абхазия online — ваш <span className="span-finally"> гид </span> по Абхазии
                </h1> */}
                <h1 className="px-2 text-[30px] lg:text-[62px]" style={{ lineHeight: 1.2 }}>
                  Абхазия online - ваш
                  <span className="relative px-1 lg:px-2 text-nowrap"> гид <div className="absolute -top-1 lg:-top-2 -left-0">
                    <a href="http://daisa.ru" target="_blank">
                      <Image src='/img/highlight.svg' width={160} height={100} objectFit="cover" />
                    </a>
                  </div>
                  </span>
                  по Абхазии
                </h1>
              </div>
            </div>

            <div className="w-full">
              <FindTravel />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center" >
              <TailSpin color="green" radius={"5px"} />
            </div>
          ) : (
            <DirectionPanel data={directionRecent} />
          )}
        </div>
      </div>


      <div className="flex flex-col items-center container mx-auto max-w-[1440px] bg-white ">
        <div className=" mx-auto max-w-[1200px] w-full py-8 md:py-[60px] gap-4 md:gap-8 px-4">
          {/* Live Video Part */}
          <div className="flex flex-col gap-0 md:gap-4">
            <h2 className='hidden md:flex'> Прямой эфир </h2>
            <h5 className='flex md:hidden'> Прямой эфир </h5>
            {/* <div className='class-p3 !text-[16px] md:!text-[20px]'>SEO текст</div> */}
          </div>
          <div className="mt-4 md:mt-8">
            <VideoTag />
          </div>
        </div>
      </div>

      {/* Telegram */}

      <TeleBookPanel />

      {/* Blog */}
      <div className="flex flex-col items-center w-full bg-white container mx-auto max-w-[1440px]">
        <div className="flex flex-col w-full py-8 md:py-[60px] gap-4 md:gap-8 px-4 max-w-[1200px]">
          <div className="flex w-full justify-between items-center">
            <h2 className='hidden md:flex'>Блог</h2>
            <h5 className='flex md:hidden'>Блог</h5>
            <button className={`hidden md:flex ${BtnActive}`}
              onClick={() => { Router.push("/blog") }}
              onMouseEnter={() => { setIsHovered2(true); }}
              onMouseLeave={() => { setIsHovered2(false); }}
            >
              Все статьи
              <ArrowRight color={isHovered2 ? 'white' : '#FF6432'} />
            </button>
          </div>
          {blogRecent && (
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {blogRecent.slice(0, 3).map((v, i) => (
                <div key={i} className="col-span-3 md:col-span-1">
                  <ImageBottomText
                    id={v.id}
                    imgSrc={v.bgImg}
                    imgDesc={v.title}
                    imgDate={v.createAt}
                    imgType={v.seos[0]?.keyword}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="w-full flex justify-center items-center md:hidden">
            <button className={BtnActive14}
              onClick={() => { Router.push("/blog") }}
              onMouseEnter={() => { setIsHovered2(true); }}
              onMouseLeave={() => { setIsHovered2(false); }}
            >
              Все статьи
              <ArrowRight color={isHovered2 ? 'white' : '#FF6432'} />
            </button>
          </div>
        </div>
      </div>

      {/* Excursion */}
      <div className="flex flex-col items-center mx-auto" id="Excursions" style={{ background: BgColor }}>
        <div className="flex flex-col w-full max-w-[1200px] px-4 py-4 md:py-[60px] gap-4 md:gap-8 ">
          <div className="flex w-full justify-between items-center">
            <h2 className='hidden md:flex'>Экскурсии</h2>
            <h5 className='flex md:hidden'>Экскурсии</h5>
            <button className={`hidden md:flex ${BtnActive}`}
              onClick={() => { Router.push("/excursions") }}
              onMouseEnter={() => { setIsHovered3(true); }}
              onMouseLeave={() => { setIsHovered3(false); }}
            >
              Все экскурсии
              <ArrowRight color={isHovered3 ? 'white' : '#FF6432'} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-2 md:gap-4">
              <div className="w-full lg:w-1/2">
                <ImageSecondRightText imgSrc='/img/popular1.png' />
              </div>
              <div className="w-full lg:w-1/2">
                <ImageSecondRightText imgSrc='/img/popular2.png' />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 md:gap-4">
              <div className="w-full lg:w-1/2">
                <ImageSecondRightText imgSrc='/img/popular3.png' />
              </div>
              <div className="w-full lg:w-1/2">
                <ImageSecondRightText imgSrc='/img/popular4.png' />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 md:gap-4">
              <div className="w-full lg:w-1/2">
                <ImageSecondRightText imgSrc='/img/popular5.png' />
              </div>
              <div className="w-full lg:w-1/2">
                <ImageSecondRightText imgSrc='/img/popular6.png' />
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <button className="flex md:hidden gap-2 bg-white border-[1.5px] border-[#FF6432] rounded-lg px-4 py-2 items-center text-[14px] text-[#FF6432] font-medium hover:bg-[#FF6432] hover:text-white"
                onClick={() => { Router.push("/excursions") }}
                onMouseEnter={() => { setIsHovered3(true); }}
                onMouseLeave={() => { setIsHovered3(false); }}
              >
                Все экскурсии
                <ArrowRight color={isHovered3 ? 'white' : '#FF6432'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {attractionRecent ? (
        <div className="flex flex-col items-center container mx-auto max-w-[1440px]">
          <div className="flex flex-col w-full container mx-auto max-w-[1200px]">
            {/* Attractions */}
            <div className=" py-8 md:py-[60px] gap-4 md:gap-8 px-4 ">
              <div className="flex w-full justify-between items-center pb-8">
                <h2 className='hidden md:flex'>Достопримечательности</h2>
                <h5 className='flex md:hidden'>Достопримечательности</h5>
                <button className={`hidden md:flex ${BtnActive}`}
                  onClick={() => { Router.push("/attraction") }}
                  onMouseEnter={() => { setIsHovered1(true); }}
                  onMouseLeave={() => { setIsHovered1(false); }}
                >
                  Все достопримечательности
                  <ArrowRight color={isHovered1 ? 'white' : '#FF6432'} />
                </button>
              </div>

              <div>
                <div className="grid grid-cols-3 w-full gap-5 md:gap-5">
                  {
                    attractionRecent.slice(0, 3).map((v, i, arr) => (
                      <div key={i} className="col-span-3 md:col-span-1">
                        <AttractionLink data={v} link={"/attraction/"} />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="flex md:hidden mt-6 gap-2 bg-white border-[1.5px] border-[#FF6432] rounded-lg px-4 py-2 items-center text-[14px] text-[#FF6432] font-medium hover:bg-[#FF6432] hover:text-white"
                  onClick={() => { Router.push("/attraction") }}
                  onMouseEnter={() => { setIsHovered1(true); }}
                  onMouseLeave={() => { setIsHovered1(false); }}
                >
                  Все достопримечательности
                  <ArrowRight color={isHovered1 ? 'white' : '#FF6432'} />
                </button>
              </div>
            </div>

            {/* question and answer */}
            <div className=" px-4  py-8 md:py-[60px] gap-4 md:gap-8">
              <div className="flex w-full justify-between items-center pb-6">
                <h2 className='hidden md:flex'>Вопросы и ответы</h2>
                <h5 className='flex md:hidden'>Вопросы и ответы</h5>
                <div className="hidden md:flex gap-4">
                  <button className="defaultButton"
                    onClick={() => { Router.push("/faq#askPanel") }}>
                    Задать вопрос
                  </button>
                  <button className={`hidden md:flex ${BtnActive}`}
                    onClick={() => { Router.push("/faq") }}
                    onMouseEnter={() => { setIsHovered4(true); }}
                    onMouseLeave={() => { setIsHovered4(false); }}
                  >
                    Все вопросы
                    <ArrowRight color={isHovered4 ? 'white' : '#FF6432'} />
                  </button>

                </div>
              </div>
              <div className="grid grid-cols-2 w-full gap-5 md:gap-5">
                {
                  faqData?.map((v, i, arr) => (
                    <div key={i} className="col-span-2 md:col-span-1">
                      <IndexFaqPanel key={i}
                        id={v.id}
                        que={v.questionText}
                        ans={v.answers}
                      />
                    </div>
                  ))
                }
              </div>

              <div className="flex md:hidden gap-2 justify-center mt-6">
                <button className="defaultButton14">
                  Задать вопрос
                </button>
                <button className="flex gap-2 bg-white border-[1.5px] border-[#FF6432] rounded-lg px-4 py-2 items-center text-[14px] text-[#FF6432] font-medium hover:bg-[#FF6432] hover:text-white"
                  onClick={() => { Router.push("/faq") }}
                  onMouseEnter={() => { setIsHovered4(true); }}
                  onMouseLeave={() => { setIsHovered4(false); }}
                >
                  Все вопросы
                  <ArrowRight color={isHovered4 ? 'white' : '#FF6432'} />
                </button>
              </div>
            </div>
          </div>
        </div >
      ) : null}
      <div className="flex flex-col items-center mx-auto bg-[#FFF8ED]">
        <div className="flex flex-col w-full px-4 max-w-[1200px]">
          <div className="flex w-full gap-10">
            <div className="flex flex-col w-full md:w-[76%] gap-4 md:gap-8 py-8 md:py-[60px]">
              <h2 className="hidden md:flex">Скидка 20% на первое бронирование по промокоду</h2>
              <h5 className="flex md:hidden">Скидка 20% на первое бронирование по промокоду</h5>
              <div className="flex flex-col gap-4">
                <button className="rounded-lg md:rounded-2xl w-[172px] h-[61px] md:w-[343px] md:h-[90px] bg-[#FF6432] bg-opacity-50 outline-none \
                  text-[#FF6432] hover:text-white hover:bg-[#FF6432]
                  text-[24px] md:text-[44px] font-GolosText">
                  FIRST20
                </button>
                <div className="class-p3 !text-[14px] md:!text-[16px] !text-[#919494]">
                  Действует до 30 апреля 2024 года
                </div>
              </div>
            </div>
            <div className="absolute md:relative right-0 w-[24%] justify-center">
              <div className="flex justify-center"><img src="/img/bar.png" /></div>
              <div className="flex justify-center"><ImageChak src="/img/percent.png" /></div>
            </div>
          </div>
        </div>
      </div>
      {/* SEO */}
      <div className="flex flex-col items-center container mx-auto max-w-[1440px]">
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex flex-col w-full px-4 py-[60px] gap-4 md:gap-8">
            <div className="flex items-center">
              <h2 className="hidden md:block">{blockData.title}</h2>
              <h5 className="md:hidden block">{blockData.title}</h5>
            </div>
            <div className="flex w-full">
              <div className={`leading-normal md:leading-8 class-p3 !text-[16px] md:!text-[20px] ${isEllipsis ? 'custom-ellipsis-13' : 'flex-wrap'}`}>
                <img src={blockData.img} width={600} height={400} alt="seo" className="rounded-[20px] float-right" />
                <div dangerouslySetInnerHTML={{ __html: convertBrText(blockData.text) }} />
              </div>
            </div>

            <div className="w-full flex font-Manrop">
              <div className="text-[#FF6432] cursor-pointer class-p3 !text-[16px] md:!text-[20px] mr-4"
                onClick={() => { setIsEllipsis(!isEllipsis) }}>{!isEllipsis ? ('Сокращать') : ('Развернуть')}</div>
              <div className="mt-1">
                <Image src={'/img/arrow-down.png'} className={!isEllipsis ? 'rotate-180' : ''} width={24} height={24} objectFit="cover" />
              </div>
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
}

// export async function getStaticProps() {
//   return {
//     revalidate: 1000000,
//     props: {},
//   };
// }
