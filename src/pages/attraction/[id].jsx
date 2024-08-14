'use client'
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react"
import axios from "axios";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { BtnActive, normalInputCss } from '../../const/CustomConsts';
import { TailSpin } from "react-loader-spinner";
import Router, { useRouter } from "next/router";
import { toast } from 'react-toastify';
import PostEditor from "../../components/common/PostEditor";
import EditorPreview from "../../components/common/BlogEditorPreview";
import ImageEditor from "../../components/common/ImageEditor";

const AttractionIndexPage = () => {
  const router = useRouter();
  const detailId = router.query.id;

  const [contents, setContents] = useState([])
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [directionList, setDirectionList] = useState([]);
  const [dataDetail, setDataDetail] = useState({
    'name': '',
    'description': '',
    'heading': '',
    'bgImg': '',
    'uniqueLink': "",
    'directionID': 0,
    'contents': [{
      'question': '',
      'content': '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
    }],
    'images': [
      // { "id": 3, "url": "test" },
    ]
  });

  const spanOnClick = (spanId) => {
    setDataDetail({ ...dataDetail, ['directionID']: directionList[spanId].id });
  };

  const getDirectionList = () => {
    setLoading(true);
    axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/direction',
      {
        limit: 0,
        offset: 0
      }).then((res) => {
        setDirectionList([...res.data.data]);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    getDirectionList();
  }, []);

  useEffect(() => {
    if (detailId >= 0) {
      axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/attraction/' + detailId).then((res) => {
        const temp = JSON.parse(res.data.data.contents[0].content)
        setContents(temp)
        setDataDetail({ ...res.data.data, directionID: res.data.data.direction.id });
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [detailId])

  const handleTextChange = (e) => {
    setDataDetail({ ...dataDetail, [e.target.name]: e.target.value });
  }
  const handleChange = (_data) => {
    setContents(_data)
  }
  const handleChangeImage = (data) => {
    const { thumbURL } = data
    setDataDetail({ ...dataDetail, bgImg: thumbURL })
  }

  const handleSave = () => {
    if (!dataDetail.directionID) { toast.error('выбрать направление'); return; }
    if (dataDetail.name == "") { toast.error('входное Название'); return; }
    if (dataDetail.description == "") { toast.error('входное описание'); return; }
    if (dataDetail.bgImg == "") { toast.error('входное Фоновое изображение'); return; }
    if (dataDetail.heading == "") { toast.error('ввод Заключение'); return; }
    if (dataDetail.uniqueLink == "") { toast.error('Введите уникальную ссылку'); return; }

    if (detailId != 'add') {
      axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + "/attraction/" + detailId,
        { ...dataDetail, contents: [{ content: JSON.stringify(contents), question: "" }] },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
        if (res.data.statusCode == 200) {
          Router.push('/attraction');
          toast.success('Обновить успех');
        }
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
        console.log(err);
      })
    } else {
      axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/attraction",
        { ...dataDetail, contents: [{ content: JSON.stringify(contents), question: "" }] },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
        if (res.data.statusCode == 400) toast.error(res.data.message);
        if (res.data.statusCode == 200) {
          toast.success('Создать успех');
          Router.push('/attraction');
        }
      }).catch((err) => {
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
      <div className="flex flex-col container mx-auto max-w-[1440px] mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <div className="my-2 mx-5 w-32 font-bold">Название:</div>
                <input name="name" autoFocus required onChange={handleTextChange} className={normalInputCss} value={dataDetail.name} />
              </div>
              <div className="flex flex-row">
                <div className="my-2 mx-5 w-32 font-bold">Описание:</div>
                {/* <input name="description" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.description} /> */}
                <textarea className="border border-gray-200 shadow-md p-2 w-full text-md rounded-lg" placeholder="" rows={2} cols={40}
                  name="description"
                  value={dataDetail.description}
                  onChange={handleTextChange}
                />
              </div>
              <div className="flex flex-row">
                <div className="my-2 mx-5 w-32 font-bold">Заключение:</div>
                <input name="heading" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.heading} />
              </div>
              <div className="flex flex-row">
                <div className="my-2 mx-5 w-32 font-bold">URL:</div>
                <input name="uniqueLink" required onChange={handleTextChange} className={normalInputCss} value={dataDetail.uniqueLink} />
              </div>
              <div className="flex flex-row">
                <div className="my-2 mx-5 w-32 font-bold leading-3">Фоновое изображение:</div>
                <div className="w-full">
                  <ImageEditor data={{ thumbURL: dataDetail.bgImg }} onChange={handleChangeImage} />
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-wrap justify-between gap-4">
                  {directionList?.map((v, i, arr) => (
                    <span key={i} id={v.id} className="cursor-pointer rounded-[60px] px-2 py-2 text-md font-medium text-[#292D32] bg-white shadow-md"
                      onClick={() => spanOnClick(i)}
                      style={{
                        color: (v.id == dataDetail.directionID) ? 'white' : '#292D32',
                        backgroundColor: (v.id == dataDetail.directionID) ? '#292D32' : 'white'
                      }}
                    >
                      {v.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <PostEditor data={contents} onChange={handleChange} />
          </div>

        </div>
        <div className="flex justify-center gap-x-10 my-10">
          <button className={BtnActive} onClick={() => { Router.push('/attraction') }}>
            Назад</button>

          <button className={BtnActive}
            onClick={handleSave}>
            {detailId ? 'Сохранить' : 'Создавать'}
          </button>
        </div>
        <EditorPreview data={contents} dataDetail={dataDetail} />
      </div >
      <Footer />
    </>
  )
}

export default AttractionIndexPage;