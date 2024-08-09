'use client'
import { NextSeo } from "next-seo";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react"
import axios from "axios";
import { toast } from 'react-toastify';
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { API_BASE_URL, BtnActive, normalInputCss } from '../../const/CustomConsts';
import { TailSpin } from "react-loader-spinner";
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, } from '@chakra-ui/react'
import Editor from 'react-simple-wysiwyg';
import ImageEditor from "../../components/common/ImageEditor";
import PostEditor from "../../components/common/PostEditor";
import EditorPreview from "../../components/common/BlogEditorPreview";


const index = () => {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [seoData, setSeoData] = useState([]);
  const [contents, setContents] = useState([])
  const [seoChecked, setSeoChecked] = useState([]);
  const router = useRouter();
  const detailId = router.query.id;

  const [dataDetail, setDataDetail] = useState({
    'title': '',
    'description': '',
    'bgImg': '',
    'contents': [{
      'question': '',
      'content': '\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n'
    }],
    'images': [],
    'seos': []
  });


  useEffect(() => {
    if (detailId && detailId != 'add') {
      axios.get(API_BASE_URL + '/blog/detail/' + detailId, {}).then((res) => {
        const temp = JSON.parse(res.data.data.contents[0].content)
        setContents(temp)
        setDataDetail(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [])

  useEffect(() => {
    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    getSeoData();
  }, [])

  const getSeoData = () => {
    setLoading(true);
    axios.get(API_BASE_URL + "/blog/seo", {
      'limit': 0,
      'offset': 0
    }).then((res) => {
      setSeoData(res.data.data);
      const initialSeoChecked = new Array(res.data.data.length).fill(false);
      setSeoChecked(initialSeoChecked);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleTextChange = (e) => {
    setDataDetail({ ...dataDetail, [e.target.name]: e.target.value });
  }

  const handleSave = () => {
    if (dataDetail.title == "") { toast.error('введите Заголовок'); return; }
    if (dataDetail.description == "") { toast.error('входное Описание'); return; }
    if (dataDetail.bgImg == "") { toast.error('входное Фоновое изображение'); return; }
    if (dataDetail.seos.length == 0) { toast.error('выбирать SEO'); return; }
    if (detailId != 'add') {
      axios.put(API_BASE_URL + "/blog/" + detailId,
        { ...dataDetail, contents: [{ content: JSON.stringify(contents), question: "" }] },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
        if (res.data.statusCode == 200) {
          Router.push('/blog');
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
      axios.post(API_BASE_URL + "/blog/create",
        { ...dataDetail, contents: [{ content: JSON.stringify(contents), question: "" }] },
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      ).then((res) => {
        if (res.data.statusCode == 400) toast.error(res.data.message);
        if (res.data.statusCode == 200) {
          toast.success('Создать успех');
          setDataDetail({
            'title': '',
            'description': '',
            'bgImg': '',
            'contents': [{
              'question': '',
              'content': ''
            }],
            'images': [
            ],
            'seos': [
              // { "id": 4, "keyword": "лето11", },
            ]
          });
          Router.push('/blog');
        }
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
        console.log(err);
      })
    }
  }
  const handleDescriptionChange = (e) => {
    setDataDetail({ ...dataDetail, description: e.target.value })
  }

  const handleChangeImage = (data) => {
    const { thumbURL } = data
    setDataDetail({ ...dataDetail, bgImg: thumbURL })
  }

  const handleMemu = (ind, id, keyword) => {
    const updatedSeoChecked = [...seoChecked]; // Create a copy of seoChecked array
    updatedSeoChecked.forEach((value, index) => {
      if (ind === index) {
        updatedSeoChecked[index] = !value;
      }
    });
    setSeoChecked(updatedSeoChecked);
    const setClickSeo = [];
    updatedSeoChecked.forEach((v, i) => {
      if (v) setClickSeo.push({ 'id': seoData[i].id })
    })

    setDataDetail({
      ...dataDetail,
      seos: [...setClickSeo]
    });
  }
  const handleChange = (_data) => {
    setContents(_data)
  }

  return (
    <>
      <NextSeo title="Главная" />
      <NavBar />
      <div className="flex flex-col container mx-auto max-w-[1440px] mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-5">
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <div className="my-2 mx-5 w-32 font-bold">Название:</div>
                <input name="title" autoFocus required onChange={handleTextChange} className={normalInputCss} value={dataDetail.title} />
              </div>
              <div className="flex flex-grow">
                <div className="my-2 mx-5 w-32 font-bold">Описание:</div>
                <div className="w-full">
                  <Editor value={dataDetail.description} onChange={handleDescriptionChange} style={{ height: 200 }} />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="my-2 mx-5 w-32 font-bold">Фоновое изображение:</div>
                <div className="w-full">
                  <ImageEditor data={{ thumbURL: dataDetail.bgImg }} onChange={handleChangeImage} />
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <Menu closeOnSelect={false}>
                  <MenuButton>
                    <div className={BtnActive}>Выбрать SEO</div>
                  </MenuButton>
                  <MenuList minWidth='180px'>
                    <MenuOptionGroup title='Select Seos' type='checkbox'>
                      {seoData.map((v, i) => (
                        <MenuItemOption key={i} value={v.keyword} onClick={() => { handleMemu(i, v.id, v.keyword) }}>{v.keyword}</MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </div>
            </div>
          </div>

          <div className="flex">
            <PostEditor data={contents} onChange={handleChange} />
          </div>
        </div>
        <div className="flex justify-center gap-x-10 my-10">
          <button className={BtnActive} onClick={() => { Router.push('/blog') }}>Назад</button>
          <button className={BtnActive} onClick={handleSave}>
            {detailId ? 'Сохранить' : 'Создавать'}
          </button>
        </div>
        <EditorPreview data={contents} dataDetail={dataDetail} />
      </div >
      <Footer />
    </>
  )
}

export default index;