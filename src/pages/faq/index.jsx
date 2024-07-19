import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import TeleBookPanel from "../../components/common/TeleBookPanel";
import FaqPanel from "../../components/faq/FaqPanel";
import PagenationCircle from "../../components/common/PagenationCircle";
import { API_BASE_URL, BtnActive14 } from '../../const/CustomConsts';
import LinkIndex from "../../components/common/LinkIndex";
import DropzoneImage from "../../components/faq/dropzoneImage";
import Router from "next/router";
import { userRouter } from "next/router";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";
import {
  create_question,
} from "../../const/Apis";

const FaqIndexPage = () => {
  const [metaData, setMetaData] = useState({});
  const [faqCount, setFaqCount] = useState(0);
  const [faqData, setFaqData] = useState([]);
  const [textData, setTextData] = useState('');
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const stepValue = 6;
  const [pageNum, setPageNum] = useState(0);

  const handleNewImg = (newImgPath) => { setUserAvatar(newImgPath); }

  useEffect(() => {
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.url === useRouter().pathname)[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    getFaqData(pageNum);
  }, [pageNum]);

  const getFaqData = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE_URL + '/faq/question', {
        params: {
          limit: stepValue,
          offset: pageNum * stepValue
        }
      });
      setFaqData(res.data.data);
      setFaqCount(res.data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
    };
  }

  const handleCreateQuestion = () => {
    if (textData == "") { toast.error('Напишите текст ответа!'); return; }
    if (!userName) { toast.error('Вставить называть'); return; }
    if (!userAvatar) { toast.error('Вставить аватар'); return; }

    axios.post(API_BASE_URL + '/faq/question',
      {
        questionText: textData,
        ownerName: userName,
        ownerAvatar: userAvatar
      }
    ).then((res) => {
      if (res.data.statusCode == 200) {
        toast.success('Создать успешный ответ');
        getDataList();
      }
    }).catch((err) => {
      if (err.response?.status == 401) {
        toast.error("пожалуйста, войдите в систему");
        Router.push('/auth/login');
      }
      console.log(err);
    });
    setTextData('');
  }

  return (
    <>
      {/* <NextSeo title="FAQs" /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      <div className="flex flex-col w-full bg-white mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="flex flex-col items-center mx-auto max-w-[1440px]">
          <div className="px-4 max-w-[1200px] py-6 md:py-8 space-y-5 md:space-y-10">
            <div className="space-y-4 md:space-y-8">
              <div className="flex md:py-3 gap-1.5 md:gap-3">
                <LinkIndex indexName={"Вопросы и ответы"} />
              </div>
              <div className="flex justify-between items-center">
                <h1 className="md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                  Вопросы и ответы
                </h1>
                <button className="hidden md:block defaultButton">
                  <Link href='#askPanel'>
                    Задать вопрос
                  </Link>
                </button>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center" >
                <TailSpin color="green" radius={"5px"} />
              </div>
            ) : (
              <div className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-2 gap-5 md:gap-6">
                  {
                    faqData?.map((v, i, a) => (
                      <div key={i} className="col-span-2 md:col-span-1">
                        <FaqPanel
                          id={v.id}
                          questionText={v.questionText}
                          createAt={v.createAt}
                          answers={v.answers}
                          userName={v.ownerName}
                          userAvatar={v.ownerAvatar}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
            {(faqCount > 0) ? (
              < PagenationCircle
                nowPage={setPageNum}  // first 0, CallBack nowPageNumber
                totalCount={faqCount} // Used in Enable, Disable
                stepValue={stepValue} // Used in Enable, Disable
              />
            ) : ''}
            <div className="flex flex-col w-full gap-8 justify-center items-center" id='askPanel'>
              <p className="text-[44px] leading-[52.8px] font-semibold">
                Задать вопрос
              </p>
              <div className="flex flex-col md:flex-row w-full px-[5%] md:px-[15%]">
                <div className="pl-2 pr-8 pb-4">
                  <div className="flex rounded-full bg-[#D7D7D7] justify-center w-[56px]">
                    <Image src={userAvatar ? userAvatar : '/icon/avatar.png'} width={56} height={56} className="rounded-full" />
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-[85%] border border-[#D7D7D7] rounded-xl">

                  <textarea
                    className="outline-none p-4 w-full rounded-xl text-lg font-medium bg-slate-50"
                    placeholder="Ваш комментарий"
                    value={textData}
                    onChange={(e) => { setTextData(e.target.value); }}
                    rows={2} // Number of visible rows
                    cols={40}
                  />

                  <div className="flex p-4 justify-between gap-4">
                    <div className="text-lg flex flex-row gap-4">
                      <div className="mt-2 text-[14px]">Название</div>
                      <input name="userName" value={userName} className="w-full rounded-md border border-1 border-gray-300 px-3 py-1 text-gray-900 shadow-md focus:ring-1 text-center"
                        onChange={(e) => { setUserName(e.target.value) }} />
                    </div>
                    <div className="text-lg flex flex-row gap-4">
                      <DropzoneImage onChildData={handleNewImg} />
                    </div>

                    <button className="defaultButton14"
                      onClick={handleCreateQuestion}>
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Telegram */}

      <TeleBookPanel />
      <Footer />
    </>
  );
}
export default FaqIndexPage;