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
import EditorPreview from "../../components/common/DirectionEditorPreview";
import ImageEditor from "../../components/common/ImageEditor";

const DirectionDetailPage = () => {
  const [contents, setContents] = useState([])
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
    'contents': [{
      'question': '',
      'content': ''
    }]
  });

  useEffect(() => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    if (detailId != 'add' && detailId) {
      axios.get(API_BASE_URL + '/direction/' + detailId, {}).then((res) => {
        const temp = JSON.parse(res.data.data.contents[0].content)
        setContents(temp)
        setDataDetail(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [])

  const handleChange = (_data) => {
    setContents(_data)
  }

  const handleTextChange = (e) => {
    setDataDetail({ ...dataDetail, [e.target.name]: e.target.value });
  }

  const handleDescriptionChange = (e) => {
    setDataDetail({ ...dataDetail, description: e.target.value })
  }
  const handleChangeImage = (data) => {
    const { thumbURL } = data
    setDataDetail({ ...dataDetail, bgImg: thumbURL })
  }

  const handleSave = () => {
    if (dataDetail.name == "") { toast.error('входное Название'); return; }
    if (dataDetail.title == "") { toast.error('введите Заголовок'); return; }
    if (dataDetail.description == "") { toast.error('входное Описание'); return; }
    if (dataDetail.bgImg == "") { toast.error('входное Фоновое изображение'); return; }
    if (dataDetail.uniqueLink == "") { toast.error('URL segment need'); return; }
    if (dataDetail.heading == "") { toast.error('ввод Заключение'); return; }

    if (detailId != 'add') {
      axios.put(API_BASE_URL + "/direction/" + dataDetail.id,
        { ...dataDetail, contents: [{ content: JSON.stringify(contents), question: "" }] },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
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
        { ...dataDetail, contents: [{ content: JSON.stringify(contents), question: "" }] },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
        if (res.data.statusCode == 400) toast.error(res.data.message);
        if (res.data.statusCode == 200) {
          toast.success('Создать успех');
          Router.push('/direction');
        }
      }).catch((err) => {
        console.log(err)
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
      })
    }
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
                    <ImageEditor data={{ thumbURL: dataDetail.bgImg }} onChange={handleChangeImage} />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="my-2 mx-5 w-32 font-bold">Уникальный сегмент URL:</div>
                  <input name="uniqueLink" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.uniqueLink} />
                </div>
              </div>
            </div>
            <div className="flex">
              <PostEditor data={contents} onChange={handleChange} />
            </div>
          </div>
          <div className="flex justify-center gap-x-10 my-10">
            <button className={BtnActive} onClick={() => { Router.push('/direction') }}>Назад</button>
            <button className={BtnActive} onClick={handleSave}>
              {detailId ? 'Сохранить' : 'Создавать'}
            </button>
          </div>
          <EditorPreview data={contents} dataDetail={dataDetail} />
        </div >
      ) : null}
      <Footer />
    </>
  )
}

export default DirectionDetailPage;