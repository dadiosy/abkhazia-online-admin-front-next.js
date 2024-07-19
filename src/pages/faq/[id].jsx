import { NextSeo } from "next-seo";
import { useEffect, useState, useRef } from "react"
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import Router, { useRouter } from 'next/router'
import moment from "moment";
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import TeleBookPanel from "../../components/common/TeleBookPanel";
import AnswerPanel from "../../components/faq/AnswerPanel";
import AnswerPanelRepeat from "../../components/faq/AnswerPanelRepeat";
import { API_BASE_URL, BtnActive } from '../../const/CustomConsts';
import DropzoneImage from "../../components/faq/dropzoneImage";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

const FaqDetailPage = () => {
  const [metaData, setMetaData] = useState({});
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [adminAnswer, setAdminAnswer] = useState(null);
  const [normalAnswer, setNormalAnswer] = useState(null);
  const [textData, setTextData] = useState('');
  const [newAnswer, setNewAnswer] = useState(1);
  const [detailId, setDetailId] = useState(0);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const router = useRouter();
  const answerBtnRef = useRef(null);
  const handleNewImg = (newImgPath) => { setUserAvatar(newImgPath); }

  const handleTextChange = (event) => {
    setTextData(event.target.value);
  }
  useEffect(() => {
    getFaqDetailData();
  }, [detailId]);

  useEffect(() => {
    if (router.query.id > 0) {
      setDetailId(router.query.id);
    }
  }, [router.query.id])

  useEffect(() => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.url === useRouter().pathname)[0]);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const getFaqDetailData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE_URL + '/faq/question/' + detailId, {
        id: detailId,
      });
      setFaqData(res.data.data);
      setAdminAnswer(res.data.data?.answers?.filter(function (obj) { return (obj.isRight == true) && obj.approve == 1 })[0]);
      setNormalAnswer(res.data.data?.answers?.filter(function (obj) { return (obj.isRight == false) && obj.approve == 1 }));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleRate = (id, rateValue) => {
    let saveData = JSON.parse(localStorage.saveData || null) || {};
    let rateArr = saveData.rateArr ? saveData.rateArr : [];
    if (rateArr.includes(id)) {
      rateArr = rateArr.filter(item => item !== id);
      rateValue--;
    } else {
      rateArr.push(id);
      rateValue++
    }
    saveData.rateArr = rateArr;
    localStorage.saveData = JSON.stringify(saveData);

    axios.put(API_BASE_URL + '/faq/admin/answer/' + id,
      { 'rating': rateValue }
    ).then((res) => {
      if (res.data.statusCode == 200) {
        toast.success('sucess');
        getFaqDetailData();
      }
    }).catch((err) => {
      if (err.response?.status == 401) {
        toast.error("пожалуйста, войдите в систему");
        Router.push('/auth/login');
      }
      console.log(err);
    });

  }
  const handleCreateAnswer = () => {
    if (textData == "") { toast.error('Напишите текст ответа!'); return; }
    if (!userName) { toast.error('Вставить называть'); return; }
    if (!userAvatar) { toast.error('Вставить аватар'); return; }

    axios.post(API_BASE_URL + '/faq/answer',
      {
        questionID: detailId,
        answerText: textData,
        ownerName: userName,
        ownerAvatar: userAvatar
      }, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
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
  if (router.query.scrollTo === 'answerBtn' && answerBtnRef.current) {
    answerBtnRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  const convertBrText = (text) => { return text.replace(/\n/g, "<br />"); };
  return (
    <>
      {/* <NextSeo title="FaqDetail" /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      <div className="flex flex-col w-full bg-white  mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="flex flex-col items-center mx-auto max-w-[1440px]">
          {faqData ? (
            <div className="px-4 max-w-[1200px] py-6 md:py-8 space-y-5 md:space-y-11">
              <div className="space-y-4 md:space-y-6">
                <div className="flex md:py-3 gap-1.5 md:gap-3">
                  <div onClick={() => { Router.push('/') }}>
                    <p className="text-xs md:text-md font-medium text-[#B5B5B5] cursor-pointer">
                      Главная
                    </p>
                  </div>
                  <p className="text-xs md:text-md font-medium">/</p>
                  <div className="flex" onClick={() => { Router.push(`/faq`) }}>
                    <p className="text-nowrap text-xs md:text-md font-medium text-[#B5B5B5] cursor-pointer">
                      Вопросы и ответы
                    </p>
                  </div>
                  <p className="text-xs md:text-md font-medium">/</p>
                  <p className="text-xs md:text-md font-medium w-40 md:w-80 truncate">
                    {faqData.questionText}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Image src={faqData.ownerAatar ? faqData.ownerAatar : '/icon/avatar.png'}
                    width={56} height={56}
                    objectFit="cover" className="rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base md:text-md font-medium">
                      {faqData.ownerName}
                    </p>
                    <p className="text-xs md:text-base font-medium text-[#919494]">
                      {moment(faqData.createAt).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
                <h2 className="xl:leading-[61.2px] !text-[24px] md:!text-[51px]">
                  {faqData.questionText}
                </h2>
                {adminAnswer ? (
                  <>
                    <div className="bg-[#FFF8ED] p-4 md:p-8 rounded-xl font-Manrop">
                      <div className="space-y-4 md:space-y-8 text-lg font-semibold">
                        <div dangerouslySetInnerHTML={{ __html: convertBrText(adminAnswer?.answerText) }} />
                      </div>
                    </div>
                    <button className={`${BtnActive} !text-[14px] md:!text-[18px]`}
                      onClick={() => { adminAnswer?.id ? handleRate(adminAnswer.id, adminAnswer.rating) : null }}
                    >
                      Было полезно • {adminAnswer.rating}
                    </button>
                  </>
                ) : null}

              </div>
              <div>
                <div className="w-full lg:w-[65%] space-y-8">
                  <h3 className="xl:leading-[52.8px] !text-[24px] md:!text-[44px]" ref={answerBtnRef}>
                    Ответы туристов
                  </h3>
                  {normalAnswer?.map((v, i) => (
                    <div key={i}>
                      <AnswerPanel
                        userName={v.ownerName}
                        avatar={v.ownerAvatar}
                        answer={v.answerText}
                        aDate={moment(v.createAt)}
                        feedCount={v.rating}
                        handleFeed={() => {
                          handleRate(v.id, v.rating);
                        }}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col md:flex-row gap-y-4">
                    <div className="pr-2 md:pr-4">
                      <div className="flex w-[56px] h-[56px] rounded-full bg-[#D7D7D7] justify-center items-center">
                        <Image src={userAvatar ? userAvatar : '/icon/avatar.png'} width={56} height={56} className="rounded-full" />
                      </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[90%] border border-[#D7D7D7] rounded-xl min-w-[700px]">
                      <textarea
                        className="outline-none p-4 w-full rounded-xl text-lg font-medium bg-slate-50"
                        placeholder="Написать ответ"
                        value={textData}
                        onChange={handleTextChange}
                        rows={2} // Number of visible rows
                        cols={40}
                      />
                      <div className="flex p-4 justify-between gap-4">
                        <div className="text-lg flex flex-row gap-4">
                          <div className="mt-2 text-[14px]">Название</div>
                          <input name="userName" value={userName} className="w-32 rounded-md border border-1 border-gray-300 px-3 py-1 text-gray-900 shadow-md focus:ring-1 text-center"
                            onChange={(e) => { setUserName(e.target.value) }} />
                        </div>
                        <div className="text-lg flex flex-row gap-4">
                          <DropzoneImage onChildData={handleNewImg} />
                        </div>
                        <button className="defaultButton14"
                          onClick={handleCreateAnswer}
                        >
                          Отправить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Telegram */}
      <TeleBookPanel />
      <Footer />
    </>
  );
}
export default FaqDetailPage;