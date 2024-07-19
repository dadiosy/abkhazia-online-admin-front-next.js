import { NextSeo } from "next-seo";
import { useState, useEffect } from "react"
import Router, { useRouter } from 'next/router';
import axios from "axios";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import Image from "next/image";
import { API_BASE_URL, BtnActive } from '../../../const/CustomConsts';
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import { Select } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import FaqPanel from "../components/faq/FaqPanel";
import DropzoneImage from "../components/faq/dropzoneImage";

const FaqIndex = () => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [users, setUsers] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchState, setSearchState] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selId, setSelId] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [userInfo, setUserInfo] = useState();
  const [textData, setTextData] = useState('');
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const handleNewImg = (newImgPath) => { setUserAvatar(newImgPath); }
  const limit = 6;

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
    setLoading(true);
    axios.get(API_BASE_URL + "/faq/admin/question",
      {
        params: {
          'limit': limit,
          'offset': pageNum * limit,
          "approve": searchState,
          "text": searchText,
          "userID": searchUser
        }
      }).then((res) => {
        setDataList(res.data.data);
        setPageCount(Math.ceil(res.data.total / limit));
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      })
  }

  const deleteQuestion = () => {
    setLoading(true);
    axios.delete(API_BASE_URL + "/faq/admin/question/" + selId,
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

  const handlePage = (e) => {
    setPageNum(e.target.id)
  }

  useEffect(() => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    getDataList();
    getUsers();
  }, []);

  useEffect(() => {
    getDataList();
  }, [pageNum]);

  const handleDelClick = () => {
    setIsOpen(false);
    deleteQuestion();
  }
  const onHandleChild = (id, approve, newText) => {
    if (approve == 9) {
      axios.put(API_BASE_URL + "/faq/admin/question/" + id,
        { active: newText }
      ).then((res) => {
        getDataList();
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
        console.log(err);
      })
    }
    if (approve == 8) { //edit
      const updatedList = dataList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            questionText: newText,
          };
        }
        return item;
      });
      setDataList(updatedList);
    }
    if (approve == -1) {  //delete
      setSelId(id);
      setIsOpen(true);
    }
    if (approve == 1 || approve == 2) {//approve then dis
      axios.put(API_BASE_URL + "/faq/admin/question/" + id,
        { approve: approve },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
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
  const handleCreateQuestion = () => {
    if (textData == "") { toast.error('Напишите текст ответа!'); return; }
    if (!userName) { toast.error('Вставить называть'); return; }
    if (!userAvatar) { toast.error('Вставить аватар'); return; }

    axios.post(API_BASE_URL + '/faq/question',
      {
        questionText: textData,
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
      <div className="flex flex-col container mx-auto max-w-[1440px]  mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="px-4 md:px-[8.333333333%] items-center flex flex-col justify-center">
          {/* <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10 my-5 px-4 py-2 shadow-md rounded-md">
            <div>
              <Select placeholder='Пользователь' size='md' value={searchUser} className="cursor-pointer"
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
              <Select placeholder='Состояние' size='md' value={searchState} className="cursor-pointer"
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
          </div> */}
          <div className="flex flex-col  justify-center gap-10 my-5">
            <div className="flex flex-col gap-5">
              {dataList?.map((v, i) => (
                <FaqPanel
                  key={i}
                  id={v.id}
                  questionText={v.questionText}
                  createAt={v.createAt}
                  answers={v.answers}
                  approve={v.approve}
                  userName={v.ownerName}
                  userAvatar={v.ownerAvatar}
                  active={v.active}
                  handleChild={onHandleChild}
                />
              ))}
            </div>
          </div>

          {pageCount > 0 ? (
            <div className="flex flex-row justify-center gap-5 my-5">
              {Array(pageCount).fill('').map((v, i) => (
                <div key={i} id={i} className="text-white w-7 cursor-pointer text-xl hover:font-extrabold bg-[#FF6432] rounded-xl text-center"
                  onClick={handlePage}>{i + 1}</div>
              ))}
            </div>
          ) : null}
          <div className="flex flex-col md:flex-row w-full px-[5%] pb-4">
            <div className="pl-2 pr-8 pb-4">
              <div className="flex rounded-full bg-[#D7D7D7] justify-center w-[56px]">
                <Image src={userAvatar ? userAvatar : '/icon/avatar.png'} width={56} height={56} className="rounded-full" />
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
                  onClick={handleCreateQuestion}
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

export default FaqIndex;