'use client'
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react"
import Router, { useRouter } from "next/router";
import axios from "axios";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { API_BASE_URL, BtnActive, normalInputCss } from '../../const/CustomConsts';
import { toast } from 'react-toastify';
import YMapProvider from "../components/common/YMapProvider";
import Editor from 'react-simple-wysiwyg';

import PostEditor from "../../components/common/PostEditor";
import EditorPreview from "../../components/common/EditorPreview";
import ImageEditor from "../../components/common/ImageEditor";
const DirectionDetailPage = () => {
  const [data, setData] = useState([])
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();
  const detailId = router.query.id;
  const [dataDetail, setDataDetail] = useState({
    'name': '',
    'title': '',
    'description': '',
    'heading': '',
    'bgImg': '',
    'uniqueLink': '',
    'latitude': '',
    'longitude': '',
    'contents': [{
      'question': '',
      'content': '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
    }],
    'images': [
      // { "id": 3, "url": "test" },
    ]
  });
  const [removeArray, setRemoveArray] = useState([]);
  const getDataDetail = () => {
    axios.get(API_BASE_URL + '/direction/' + detailId,
      {
        // 'id': detailId
      }).then((res) => {
        setDataDetail(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    getDataDetail();
  }, [detailId])
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (detailId > 0 && dataDetail.name == "") {
        getDataDetail();
        // window.location.reload();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dataDetail])

  const handleChange = (_data) => {
    console.log(_data)
    setData(_data)
  }

  const handleTextChange = (e) => {
    console.log(e.target.name, e.target.value)
    setDataDetail({ ...dataDetail, [e.target.name]: e.target.value });
  }


  const handleCreate = () => {
    if (dataDetail.name == "") { toast.error('входное Название'); return; }
    if (dataDetail.title == "") { toast.error('введите Заголовок'); return; }
    if (dataDetail.description == "") { toast.error('входное Описание'); return; }
    if (dataDetail.bgImg == "") { toast.error('входное Фоновое изображение'); return; }
    if (dataDetail.uniqueLink == "") { toast.error('URL segment need'); return; }

    if (dataDetail.latitude == "") { toast.error('ввод Широта'); return; }
    if (dataDetail.heading == "") { toast.error('ввод Заключение'); return; }
    if (detailId != 'add') {
      let direction1 = {
        "name": dataDetail.name,
        "title": dataDetail.title,
        "description": dataDetail.description,
        "heading": dataDetail.heading,
        "bgImg": dataDetail.bgImg,
        "uniqueLink": dataDetail.uniqueLink,
        "longitude": dataDetail.longitude,
        "latitude": dataDetail.latitude
      };
      let update1 = dataDetail.contents.filter((v) => v.id != null);
      let new1 = dataDetail.contents.filter((v) => v.id == null);
      let updateData = {
        'direction': direction1,
        'contents': {
        }
      }
      if (new1.length > 0) updateData.contents.new = new1;
      if (update1.length > 0) updateData.contents.update = update1;
      if (removeArray.length > 0) updateData.contents.remove = removeArray;

      axios.put(API_BASE_URL + "/direction/" + dataDetail.id,
        { ...updateData }
      ).then((res) => {
        if (res.data.statusCode == 200) {
          Router.push('/direction');
          toast.success('Обновить успех');
        }
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
      })
    } else {
      axios.post(API_BASE_URL + "/direction",
        { ...dataDetail },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
        if (res.data.statusCode == 400) toast.error(res.data.message);
        if (res.data.statusCode == 200) {
          toast.success('Создать успех');
          Router.push('/direction');
        }
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
      })
    }
  }
  const getXY = (XY) => {
    setDataDetail({ ...dataDetail, ['latitude']: XY[0], ['longitude']: XY[1] });
  }

  const handleDescriptionChange = (e) => {
    setDataDetail({ ...dataDetail, description: e.target.value })
  }
  const handleChangeImage = (data) => {
    const { thumbURL } = data
    setDataDetail({ ...dataDetail, bgImg: thumbURL })
  }

  return (
    <>
      <NextSeo title="Главная" />
      <NavBar />

      {dataDetail ? (
        <div className="flex flex-col container mx-auto max-w-[1440px] mt-[60px] md:mt-[94px]">
          {/* <div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-5 px-4 md:px-[8.333333333%] ">
            <div className="flex flex-col">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row">
                  <div className="my-2 mx-5 w-32 font-bold">Название:</div>
                  <input autoFocus name="name" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.name} />
                </div>
                <div className="flex flex-row">
                  <div className="my-2 mx-5 w-32 font-bold">Заголовок:</div>
                  <input name="title" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.title} />
                </div>
                <div className="flex flex-row">
                  <div className="my-2 mx-5 w-32 font-bold">Описание:</div>
                  <Editor value={dataDetail.description} onChange={handleDescriptionChange} style={{ height: 200 }} />
                </div>
                <div className="flex flex-row">
                  <div className="my-2 mx-5 w-32 font-bold">Заключение:</div>
                  <input name="heading" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.heading} />
                </div>
                <div className="flex flex-row">
                  <div className="my-2 mx-5 w-32 font-bold leading-3">Фоновое изображение:</div>
                  <div className="w-full">
                    <ImageEditor onChange={handleChangeImage} />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="my-2 mx-5 w-32 font-bold">Unique URL Segment:</div>
                  <input name="uniqueLink" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.uniqueLink} />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    <div className="my-2 mx-5 w-32 font-bold">Широта:</div>
                    <input name="latitude" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.latitude} />
                  </div>
                  <div className="flex flex-row  w-1/2">
                    <div className="my-2 mx-5 w-32 font-bold">Долгота:</div>
                    <input name="longitude" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.longitude} />
                  </div>
                </div>
                <div>
                  <YMapProvider className="rounded-xl" mapX={dataDetail?.latitude} mapY={dataDetail?.longitude} onChildData={getXY} />
                </div>
              </div>
            </div>
            <div className="flex">
              <PostEditor onChange={handleChange} />
            </div>
          </div>
          <div className="flex justify-center gap-x-10 my-10">
            <button className={BtnActive} onClick={() => { Router.push('/direction') }}>Назад</button>
            <button className={BtnActive} onClick={handleCreate}>
              {detailId ? 'Сохранить' : 'Создавать'}
            </button>
          </div>
          <EditorPreview data={data} dataDetail={dataDetail} />
        </div >
      ) : null}
      <Footer />
    </>
  )
}

export default DirectionDetailPage;