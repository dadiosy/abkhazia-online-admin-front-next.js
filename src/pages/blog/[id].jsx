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
<<<<<<< HEAD
  const handleInsertText = () => {
    const { selectionStart, selectionEnd } = textareaRefs[selectTextAreaIndex]?.current;
    const contentText = textareaRefs[selectTextAreaIndex].current.value;
    // const selText = contentText.substring(selectionStart, selectionEnd);
    const leftText = contentText.substring(0, selectionStart);
    const rightText = contentText.substring(selectionEnd, contentText.length);

    if (tagName == 'a') {
      if (addText == "") { toast.error('вставьте адрес ссылки'); return; }
      if (selText == "") { toast.error('вставить текст'); return; }
      const addContent = `<${tagName} href='https://${addText}' target='_blank'>${selText}</${tagName}>`;
      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + rightText };
          }
          return v;
        })
      });
    } else if (tagName == 'hotel') {
      for (let fori = 0; fori < 8; fori++) if (bookingText[fori] == "") { toast.error('вставить текст'); return; }
      // https://daisa.ru/api/direction/1716791093337.png
      // https://daisa.ru/api/direction/1716791111323.png

      const addContent = `\n<!-- -----------Hotel Start-------------- -->\n
<div style="display: flex; gap:20px; margin-bottom: 10px; overflow: auto; max-width: 100vw;">
    <div style="min-width:339px">
        <img src="${bookingText[0]}" style="width: 100%; height: auto; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; margin-bottom: 0px;">
        <div style="min-width: 327px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; padding: 10px;border-color: #c0c0c0; border-width: thin; border-style: solid;">
            <div style="display: flex; position: relative;">
                <div style="font-size: 20px; width: 75%; font-weight: 600; line-height: 28px;">
                    ${bookingText[1]}
                </div>
                <div style="font-size:18px; width: 25%; text-align: right; padding-top: 4px; padding-right: 12px; color: white; z-index: 10">
                    9.6
                </div>
                <img src="/img/vector.png" style="position: absolute; right:2px; top: -6px;">
            </div>
            <div style="display: flex; gap: 10px; justify-content: space-between; margin-top:10px">
                <div style="width: 100%;">
                    <div style="font-size: 24px; font-weight: bold;">
                        ${bookingText[2]}
                    </div>
                    <div class='flex' style="font-size: 14px; align-items: center; color: #919494;">
                        ${bookingText[3]}
                    </div>
                </div>
                <button onclick="window.open('#','_blank')" style="width: 70%;" class='detailButtonColor'>Выбрать</button>
            </div>
        </div>
    </div>
    <div style="min-width:339px">
        <img src="${bookingText[4]}" style="width: 100%; height: auto; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; margin-bottom: 0px;">
        <div style="min-width: 327px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; padding: 10px;border-color: #c0c0c0; border-width: thin; border-style: solid;">
            <div style="display: flex; position: relative;">
                <div style="font-size: 20px; width: 75%; font-weight: 600; line-height: 28px;">
                    ${bookingText[5]}
                </div>
                <div style="font-size:18px; width: 25%; text-align: right; padding-top: 4px; padding-right: 12px; color: white; z-index: 10">
                    9.6
                </div>
                <img src="/img/vector.png" style="position: absolute; right:2px; top: -6px;">
            </div>
            <div style="display: flex; gap: 10px; justify-content: space-between; margin-top:10px">
                <div style="width: 100%;">
                    <div style="font-size: 24px; font-weight: bold;">
                        ${bookingText[6]}
                    </div>
                    <div class='flex' style="font-size: 14px; align-items: center; color: #919494;">
                        ${bookingText[7]}
                    </div>
                </div>
                <div>
                    <button onclick="window.open('#','_blank')" style="width: 70%;" class='detailButtonColor'>Выбрать</button>
                </div>
            </div>
        </div>
    </div>
</div>
      \n<!-- -----------Hotel End-------------- -->\n\n`;
      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + rightText };
          }
          return v;
        })
      });

    } else if (tagName == 'booking') {
      for (let fori = 0; fori < 6; fori++) if (bookingText[fori] == "") { toast.error('вставить текст'); return; }
      const addContent = `\n<!-- -----------Booking Start-------------- -->\n
      <div style="display: flex; gap:10px; margin-bottom: 10px; overflow: auto; max-width: 100vw;">
    <div style="min-width: 327px; border-radius: 10px; padding: 18px;border-color: #c0c0c0; border-width: thin; border-style: solid;">
        <div style="display: flex; position: relative;">
          <div style="font-size: 18px; width: 75%; font-weight: 600; line-height: 28px;">
            ${bookingText[0]}
          </div>
          <div style="font-size:18px; width: 25%; text-align: right; padding-top: 4px; padding-right: 12px; color: white; z-index: 10">
            9.6
          </div>
          <img src="/img/vector.png" style="position: absolute; right:2px; top: -6px;">
        </div>
        <div style="font-size: 16px; padding-top: 16px; ">
          ⏳ ${bookingText[1]}
        </div>
        <div class='flex' style="font-size: 16px; align-items: center;">
           <img src='/img/man.png' style="width: 20px;height: 26px;margin-left: -3px;"> ${bookingText[2]}
        </div>
        <div style="display: flex;justify-content: space-between; gap: 10px;">
          <button onclick="window.open('#','_blank')" style="width: 50%;" class='detailButton'>Отзывы</button>
          <button onclick="window.open('/booking','_blank')" style="width: 50%;" class='detailButtonColor'>Забронировать</button>
        </div>
    </div>


    <div style="min-width: 327px; border-radius: 10px; padding: 18px;border-color: #c0c0c0; border-width: thin; border-style: solid;">
        <div style="display: flex; position: relative;">
          <div style="font-size: 18px; width: 75%; font-weight: 600; line-height: 28px;">
            ${bookingText[3]}
          </div>
          <div style="font-size:18px; width: 25%; text-align: right; padding-top: 4px; padding-right: 12px; color: white; z-index: 10">
            9.6
          </div>
          <img src="/img/vector.png" style="position: absolute; right:2px; top: -6px;">
        </div>
        <div style="font-size: 16px; padding-top: 16px; ">
          ⏳ ${bookingText[4]}
        </div>
        <div class='flex' style="font-size: 16px; align-items: center;">
           <img src='/img/man.png' style="width: 20px;height: 26px;margin-left: -3px;"> ${bookingText[5]}
        </div>
        <div style="display: flex;justify-content: space-evenly; gap: 10px;">
          <button onclick="window.open('#','_blank')" style="width: 50%;" class='detailButton'>Отзывы</button>
          <button onclick="window.open('/booking','_blank')" style="width: 50%;" class='detailButtonColor'>Забронировать</button>
        </div>
    </div>
</div>
      \n<!-- -----------Booking End-------------- -->\n\n`;

      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + rightText };
          }
          return v;
        })
      });

    } else if (tagName == 'button') {
      if (addText == "") { toast.error('вставьте адрес ссылки'); return; }
      if (selText == "") { toast.error('вставить текст'); return; }
      const addContent = `\n<!-- -----------Button Start-------------- -->\n<button onclick="window.open('https://${addText}','_blank')"  class='detailButton'>${selText}</button>\n<!-- -----------Button End-------------- -->\n\n`;
      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + rightText };
          }
          return v;
        })
      });
    } else if (tagName == 'img') {
      if (addText == "") { toast.error('вставьте адрес ссылки'); return; }
      const addContent = `\n<!-- -----------Image Start-------------- -->\n<${tagName} src='${addText}' style='height: auto;width: 100%'>\n<!-- -----------Image End-------------- -->\n\n`;
      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + selText + addContent + rightText };
          }
          return v;
        })
      });
    }
    else if (tagName == 'hint') {
      if (addText == "") { toast.error('Вставить текст'); return; }
      const addContent = `\n<!-- -----------Hint Start-------------- -->\n
      <div class="flex flex-row gap-6 detailHint text-base md:text-lg"><img src='/img/hint.png'>${addText}</div>\n
      <!-- -----------Hint End-------------- -->\n\n`;
      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + selText + rightText };
          }
          return v;
        })
      });
    } else if (tagName == 'li') {
      if (addText == "") { toast.error('insert li Text'); return; }
      const addContent = `\n<!-- -----------li Start-------------- -->\n
      <div style="padding: 8px 0 8px 0;">
      <div style="display: flex; align-items: center;">
        <div style="background-color: #FF6432; width: 16px; height: 16px; border-radius: 16px; margin-right:10px;"></div>
        <div>${addText}</div>
      </div>
    </div>
      <!-- -----------li End-------------- -->\n\n`;
      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + selText + rightText };
          }
          return v;
        })
      });
    } else if (tagName == 'h4' || tagName == 'h5') {
      if (selText == "") { toast.error('вставить текст'); return; }
      let addContent = "";
      if (addText == "") addContent = `<${tagName}>${selText}</${tagName}>`;
      else addContent = `<${tagName}><img src="${addText}"/>${selText}</${tagName}>`;

      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + rightText };
          }
          return v;
        })
      });
    } else { //bold, p, 
      if (selText == "") { toast.error('вставить текст'); return; }
      const addContent = '<' + tagName + '>' + selText + '</' + tagName + '>';
      setDataDetail({
        ...dataDetail,
        contents: dataDetail.contents.map((v, i) => {
          if (i === selectTextAreaIndex) {
            return { ...v, 'content': leftText + addContent + rightText };
          }
          return v;
        })
      });
    }
    setAddText('');
    setSelText('');
    setBookingText(Array(8).fill(''))
    setIsOpenAddText(false);
    setIsOpenAddBooking(false);
  };
=======
>>>>>>> 697053c8ab8163a5d04047d1c43ef449e116ff11

  return (
    <>
      <NextSeo title="Главная" />
      <NavBar />
      <div className="flex flex-col container mx-auto max-w-[1440px] mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
<<<<<<< HEAD
        <div className="flex flex-row justify-center gap-5 px-4 md:px-[8.333333333%] ">
          <div className="flex w-1/3">
            <div className="flex justify-center">
              <div className="flex flex-col justify-center items-center gap-2">
                <IconList />
                <div className='justify-center items-center'>
                  {dataDetail.bgImg ? (
                    <img src={dataDetail.bgImg} width={300} height={180} className='object-cover rounded-md shadow-xl' />
                  ) : null}
                </div>
                <DropzoneImage pathStr="blog" />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/3">
=======
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-5">
          <div className="flex flex-col">
>>>>>>> 697053c8ab8163a5d04047d1c43ef449e116ff11
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
<<<<<<< HEAD
        <Modal isOpen={isOpenAddBooking} onClose={() => { setIsOpenAddBooking(false) }} size="3xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="bg-[#FFF8ED]">{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="bg-[#FFF8ED]">
              {tagName == 'hotel' && (
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col w-1/2 gap-4 border border-gray-600 p-4 rounded-md">
                    <input autoFocus className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                      placeholder="Адрес ссылки на картинку"
                      value={bookingText[0]}
                      onChange={(e) => { handleBookingText(e, 0) }}
                    />
                    <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                      placeholder="Гостевой дом В Тихой Гавани"
                      value={bookingText[1]}
                      onChange={(e) => { handleBookingText(e, 1) }}
                    />
                    <div className="flex gap-4">
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="1500₽"
                        value={bookingText[2]}
                        onChange={(e) => { handleBookingText(e, 2) }}
                      />
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="за ночь для 2 гостей"
                        value={bookingText[3]}
                        onChange={(e) => { handleBookingText(e, 3) }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-1/2 gap-4 border border-gray-600 p-4 rounded-md">
                    <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                      placeholder="Адрес ссылки на картинку"
                      value={bookingText[4]}
                      onChange={(e) => { handleBookingText(e, 4) }}
                    />
                    <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                      placeholder="Гостевой дом В Тихой Гавани"
                      value={bookingText[5]}
                      onChange={(e) => { handleBookingText(e, 5) }}
                    />
                    <div className="flex gap-4">
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="1500₽"
                        value={bookingText[6]}
                        onChange={(e) => { handleBookingText(e, 6) }}
                      />
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="за ночь для 2 гостей"
                        value={bookingText[7]}
                        onChange={(e) => { handleBookingText(e, 7) }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {tagName == 'booking' && (
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col w-1/2 gap-4 border border-gray-600 p-4 rounded-md">
                    <input autoFocus className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                      placeholder="Экскурсия в Цандрипшский храм"
                      value={bookingText[0]}
                      onChange={(e) => { handleBookingText(e, 0) }}
                    />
                    <div className="flex gap-4">
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="2 часа"
                        value={bookingText[1]}
                        onChange={(e) => { handleBookingText(e, 1) }}
                      />
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="Пешком"
                        value={bookingText[2]}
                        onChange={(e) => { handleBookingText(e, 2) }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-1/2 gap-4 border border-gray-600 p-4 rounded-md">
                    <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                      placeholder="Экскурсия в Цандрипшский храм"
                      value={bookingText[3]}
                      onChange={(e) => { handleBookingText(e, 3) }}
                    />
                    <div className="flex gap-4">
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="2 часа"
                        value={bookingText[4]}
                        onChange={(e) => { handleBookingText(e, 4) }}
                      />
                      <input className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto"
                        placeholder="Пешком"
                        value={bookingText[5]}
                        onChange={(e) => { handleBookingText(e, 5) }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter className="flex flex-row gap-10 bg-[#FFF8ED]">
              <button className={BtnActive}
                onClick={() => { handleInsertText(); }}>
                OK
              </button>
              <button className={BtnActive}
                onClick={() => { setIsOpenAddBooking(false) }}>
                Отмена
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        <Modal isOpen={isOpenAddText} onClose={() => { setIsOpenAddText(false) }} size="3xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="bg-[#FFF8ED]">{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="bg-[#FFF8ED]">
              <div className="flex flex-col gap-2">
                {(tagName == 'a' || tagName == 'h4' || tagName == 'h5' || tagName == 'img' || tagName == 'button') && (
                  <input autoFocus name="addText" className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto" placeholder="вставьте адрес ссылки" wrap="off" rows={2} cols={40}
                    value={addText}
                    onChange={(e) => { setAddText(e.target.value) }}
                  />
                )}
                {(tagName == 'hint' || tagName == 'li') && (
                  <input autoFocus name="addText" className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto" placeholder="Вставить текст" wrap="off" rows={2} cols={40}
                    value={addText}
                    onChange={(e) => { setAddText(e.target.value) }}
                  />
                )}
                {(!(tagName == 'img' || tagName == 'hint' || tagName == 'li')) && (
                  <textarea autoFocus name="selText" className="border border-gray-700 shadow-sm p-2 w-full text-md rounded-md overflow-x-auto" placeholder="вставить текст" wrap="off" rows={2} cols={40}
                    value={selText}
                    onChange={(e) => { setSelText(e.target.value) }}
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-row gap-10 bg-[#FFF8ED]">
              <button className={BtnActive}
                onClick={() => { handleInsertText(); }}>
                OK
              </button>
              <button className={BtnActive}
                onClick={() => { setIsOpenAddText(false) }}>
                Отмена
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen} onClose={() => { setIsOpen(false) }} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{dataDetail.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-row w-full gap-10 relative">
                <div className="w-full lg:w-[58%] bg-slate-100  rounded-xl">
                  <div className="flex flex-col gap-5 m-5">
                    <div className="relative">
                      <img src={dataDetail.bgImg} width={600} height={400} className="rounded-[10px]" />
                      <div className="absolute bottom-10 left-5 text-2xl md:text-3xl font-bold text-white text-shadow-lg">{dataDetail.title}</div>
                    </div>
                    <div className="text-xl font-bold">{dataDetail.description}</div>
                    {dataDetail?.contents?.map((v, i, arr) => (
                      v.content != "" ? (
                        <div key={i} className="py-4 md:py-10 space-y-3 md:space-y-14" id={v.id}>
                          <div className="text-2xl md:text-3xl xl:leading-[52.8px] font-bold">
                            <div dangerouslySetInnerHTML={{ __html: v.question }} />
                          </div>
                          <div className="space-y-3 md:space-y-8">
                            <div className="text-base md:text-lg xl:text-xl font-medium detail-custom-css">
                              <div dangerouslySetInnerHTML={{ __html: v.content }} />
                            </div>
                          </div>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-[42%]  sticky top-1 bg-slate-100 rounded-xl">
                  <div className="flex flex-col gap-3 md:gap-6  m-5">
                    <p className="text-xl md:text-2xl xl:text-3xl font-semibold">
                      Оглавление
                    </p>
                    <ul className="flex flex-col space-y-4 detail-custom-css">
                      {dataDetail?.contents?.map((v, i, arr) => (
                        <li key={i} className="flex items-center gap-3 ">
                          <div className="w-3 md:w-4 h-3 md:h-4">
                            {(pageLocation == v.id) ? <ActivePin /> : <InActivePin />}
                          </div>
                          <Link href={`#${v.id}`}>
                            <p className="cursor-pointer text-base md:text-lg font-medium"
                              onClick={() => SetpageLocation(v.id)}>
                              {v.question}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex flex-row gap-10">
              <button className={BtnActive}
                onClick={handleCreate}>
                {detailId ? 'Сохранить' : 'Создавать'}
              </button>
              <button className={BtnActive}
                onClick={() => { setIsOpen(false) }}>
                Редактировать</button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        <Modal isOpen={isOpenNew} onClose={() => { setIsOpenNew(false) }} size="3xl">
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
                onClick={handleDelete}>
                OK
              </button>
              <button className={BtnActive}
                onClick={() => { setIsOpenNew(false) }}>
                Отмена
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenDelete} onClose={() => { setIsOpenDelete(false) }} size="3xl">
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
                onClick={() => { setIsOpenDelete(false) }}>
                Отмена
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>

=======
        <EditorPreview data={contents} dataDetail={dataDetail} />
>>>>>>> 697053c8ab8163a5d04047d1c43ef449e116ff11
      </div >
      <Footer />
    </>
  )
}

export default index;