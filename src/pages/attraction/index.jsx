import { NextSeo } from "next-seo";
import { useState, useEffect } from "react"
import axios from "axios";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { BtnActive } from '../../const/CustomConsts';
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import { CloseButton } from '@chakra-ui/react'
import Image from "next/image";
import Router from "next/router";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selId, setSelId] = useState(null);
  const [directionList, setDirectionList] = useState([{ id: 0, name: "Все направления" }]);
  const [spanSel, setSpanSel] = useState(0);
  const [userInfo, setUserInfo] = useState();

  const spanOnClick = (spanId) => {
    setSpanSel(spanId);
  };

  const getDirectionList = () => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/direction',
      {
        limit: 0,
        offset: 0
      }).then((res) => {
        setDirectionList([...directionList, ...res.data.data]);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      })
  }

  const getDataList = (spanSel) => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/attraction", {
      'limit': 0,
      'offset': 0,
      'directionID': directionList[spanSel].id,
    }).then((res) => {
      setDataList(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleImgClick = (ind) => {
    setLoading(true);
    setSelId(ind);
    Router.push(`/attraction/${ind}`)
  }

  useEffect(() => {
    getDirectionList();
    getDataList(spanSel);
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
  }, []);

  useEffect(() => {
    getDataList(spanSel);
  }, [spanSel]);

  const attractionDel = (id) => {
    axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + "/attraction/" + id,
      { 'attractionID': id },
      { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
    ).then((res) => {
      if (res.data.statusCode == 200) {
        toast.success('Удалить успех');
        getDataList(spanSel);
      }
    }).catch((err) => {
      if (err.response?.status == 401) {
        toast.error("пожалуйста, войдите в систему");
        Router.push('/auth/login');
      }
      console.log(err);
    })
  }
  const handleDelImageClick = (e, id) => {
    setSelId(id);
    e.stopPropagation();
    setIsOpen(true);
  }
  const handleDelClick = () => {
    setIsOpen(false);
    attractionDel(selId);
  }
  const handleCheck = (id, newActive) => {
    axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + '/attraction/' + id,
      {
        "attraction": {
          'active': newActive
        }
      }).then((res) => {
        getDataList(spanSel);
      }).catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <NextSeo title="Главная" />
      <NavBar />
      <div className="flex flex-col container mx-auto max-w-[1440px] py-5 mt-[60px] md:mt-[94px] min-h-[500px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="px-4 md:px-[8.333333333%]">
          <div className="flex flex-wrap justify-between gap-4">
            {directionList?.map((v, i, arr) => (
              <span key={i} id={v.id} className="cursor-pointer rounded-[60px] px-4 py-2 text-md font-medium text-[#292D32] bg-white shadow-md"
                onClick={() => spanOnClick(i)}
                style={{
                  color: (i == spanSel) ? 'white' : '#292D32',
                  backgroundColor: (i == spanSel) ? '#292D32' : 'white'
                }}
              >
                {v.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end px-4 md:px-[8.333333333%] pt-4">
          <button className={BtnActive}
            onClick={() => { Router.push('/attraction/add') }}>Добавить новые Достопримечательности</button>
        </div>
        <div className="px-4 md:px-[8.333333333%] items-center flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-5 my-5">
            {dataList?.map((v, i) => (
              <div key={i} onClick={() => handleImgClick(v.id)} className='cursor-pointer flex w-full h-full justify-center rounded-[20px] relative col-span-3 md:col-span-1'>
                <div className="rounded-[10px]">
                  <Image src={v.bgImg} width={600} height={400} className="rounded-[10px]" />
                  <div className="absolute bottom-5 left-5 text-white text-2xl font-semibold text-shadow-lg flex-wrap w-[90%]">
                    {v.name}
                  </div>
                </div>
                <div id={v.id} className="absolute top-1 right-1 cursor-pointer" onClick={(e) => handleDelImageClick(e, v.id)} >
                  <CloseButton />
                </div>
                <div className="absolute bottom-2 right-2">
                  <input type="checkbox"
                    className="size-4 cursor-pointer hover:size-6 rounded-md"
                    checked={v.active}
                    onChange={() => { }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheck(v.id, !v.active);
                    }} />
                </div>
              </div>
            ))}
          </div>
        </div >
      </div >
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

export default index;