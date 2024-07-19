import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router';
import Image from "next/image";
import axios from "axios";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { API_BASE_URL, BtnActive } from '../../../const/CustomConsts';
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import { Select } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import AnswerPanel from "../components/faq/AnswerPanel";
import DropzoneImage from "../components/faq/dropzoneImage";

const FaqDetail = () => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState(null);
  const [users, setUsers] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchState, setSearchState] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selId, setSelId] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [textData, setTextData] = useState('');
  const [isEllipsis, setIsEllipsis] = useState(true);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const handleNewImg = (newImgPath) => { setUserAvatar(newImgPath); }
  const router = useRouter();
  const detailId = router.query.id;

  const getUsers = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/user', {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }).then((res) => {
      setUsers(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getDataList = () => {
    if (detailId > 0) {
      setLoading(true);
      axios.get(API_BASE_URL + "/faq/admin/question/" + detailId, {
        id: detailId,
      }).then((res) => {
        setDataList(res.data.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  const deleteAnswer = () => {
    setLoading(true);
    axios.delete(API_BASE_URL + "/faq/admin/answer/" + selId,
      // { id: selId },
      { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
    ).then((res) => {
      getDataList();
      setLoading(false);
    }).catch((err) => {
      if (err.response?.status == 401) {
        toast.error("пожалуйста, войдите в систему");
        Router.push('/auth/login');
      }
      console.log(err);
    })
  }

  useEffect(() => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    getDataList();
    getUsers();
  }, []);

  useEffect(() => {
    getDataList();
  }, [detailId]);

  const handleDelClick = () => {
    setIsOpen(false);
    deleteAnswer();
  }

  const onHandleChild = (id, approve) => {
    if (approve == 8) { //edit      
      getDataList();
    }
    if (approve == -1) {  //delete
      setSelId(id);
      setIsOpen(true);
    }
    if (approve == 1 || approve == 2) {//approve then dis
      axios.put(API_BASE_URL + "/faq/admin/answer/" + id,
        { approve: approve },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
        toast.success('sucess');
        getDataList();
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
        console.log(err);
      })
    }
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
  return (
    <>
      <NextSeo title="Главная" />
      <NavBar />
      <div className="flex flex-col container mx-auto max-w-[1440px] min-h-[500px] gap-5 mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="px-4 md:px-[8.333333333%] items-center flex flex-col justify-center gap-5 my-5">
          <div className="hidden flex-col md:flex-row justify-center items-center gap-2 md:gap-10 my-5 px-4 py-2 shadow-md rounded-md">
            <div>
              <Select placeholder='Пользователь' size='md' value={searchUser}
                onChange={(e) => { setSearchUser(e.target.value) }}
              // bg='tomato' borderColor='tomato' color='white'
              >
                {users?.map((v, i) => (
                  <option key={i} value={v.id}>{v.firstName} {v.lastName}</option>
                ))}
              </Select>
            </div>
            <div>
              <input id="searchText" placeholder="" value={searchText}
                className="w-full border font-semibold rounded-md py-1 placeholder:text-gray-400 px-3 text-lg"
                onChange={(e) => { setSearchText(e.target.value) }}
              />
            </div>
            <div>
              <Select placeholder='Состояние' size='md' value={searchState}
                onChange={(e) => { setSearchState(e.target.value) }}
              // bg='tomato' borderColor='tomato' color='white'
              >
                <option value='0'>В ожидании</option>
                <option value='1'>Утвердить</option>
                <option value='2'>Отклонить</option>
              </Select>
            </div>
            <div><button className={BtnActive}
              onClick={getDataList}>Поиск</button></div>
          </div>
          {dataList ? (
            <div className="flex flex-col justify-center gap-3">
              <div className="flex gap-8">
                <div className="flex flex-col items-center justify-center w-12 md:w-20 ">
                  <div className="flex w-[56] h-[56] rounded-full bg-[#D7D7D7]">
                    <Image src={dataList.ownerAvatar ? dataList.ownerAvatar : '/icon/avatar.png'}
                      width={56} height={56}
                      objectFit="cover" className="rounded-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <p onClick={() => { setIsEllipsis(!isEllipsis) }}
                    className={`text-lg md:text-xl font-bold ${isEllipsis ? 'custom-ellipsis-one' : 'flex-wrap'}`}>
                    {dataList.questionText}
                  </p>
                  <p className="text-base md:text-md font-extrabold flex-wrap">
                    {dataList.ownerName}
                  </p>
                </div>
              </div>
              <div className="w-full flex-col justify-center text-3xl gap-10 space-y-5">
                {dataList?.answers.map((v, i) => (
                  <AnswerPanel
                    key={i}
                    id={v.id}
                    userName={v.ownerName}
                    avatar={v.ownerAvatar}
                    answer={v.answerText}
                    aDate={v.createAt}
                    feedCount={v.rating}
                    approve={v.approve}
                    active={v.isRight}
                    handleChild={onHandleChild}
                  />
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex flex-col md:flex-row w-full px-[5%]">
            <div className="pl-2 pr-8 pb-4">
              <div className="flex rounded-full bg-[#D7D7D7] justify-center w-[56px]">
                <Image src={userAvatar ? userAvatar : '/icon/avatar.png'} width={56} height={56} className="rounded-full"
                  onClick={() => {

                  }} />
              </div>
            </div>
            <div className="flex flex-col w-full md:w-[90%] border border-[#D7D7D7] rounded-xl shadow">
              <textarea
                className="outline-none p-4 w-full rounded-xl text-lg font-medium bg-slate-50"
                placeholder="Написать ответ"
                value={textData}
                onChange={(e) => { setTextData(e.target.value) }}
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
                  onClick={handleCreateAnswer}
                >
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => { setIsOpen(false) }} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-gray-100">Подтверждать</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-red-100">
            <p className="text-xl md:text-2xl xl:text-3xl font-semibold">
              Вы уверены, что удалите этот контент?
            </p>
          </ModalBody>
          <ModalFooter className="flex flex-row gap-10">
            <button className={BtnActive}
              onClick={handleDelClick}>
              OK
            </button>
            <button className={BtnActive}
              onClick={() => { setIsOpen(false) }}>
              Отмена
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Footer />
    </>
  )
}

export default FaqDetail;