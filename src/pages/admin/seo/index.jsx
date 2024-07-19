import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { API_BASE_URL, normalInputCss, BgColor } from '../../../const/CustomConsts';
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import DropzoneImage from '../components/seo/dropzoneImage';
import Image from "next/image";
import Router from "next/router";

const SeoIndex = () => {
  const [loading, setLoading] = useState(false);
  const [seoData, setSeoData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [userInfo, setUserInfo] = useState();
  const [blockData, setBlockData] = useState();
  const [cityList, setCityList] = useState([]);
  const [cityActiveList, setCityActiveList] = useState([]);
  const [spanSel, setSpanSel] = useState(0);
  const limit = 5;

  const updateCityActive = (cityId) => {
    setLoading(true);

    axios.put(API_BASE_URL + '/camera/' + cityId,
      { "active": !cityActiveList.some(item => item.id === cityId) }
    ).then((res) => {
      toast.success('Обновить успех');
      setLoading(false);
      getActiveCity();
    }).catch((err) => {
      console.log(err);
    })
  }

  const spanOnClick = (spanId) => {
    updateCityActive(cityList[spanId].id);
    setSpanSel(spanId);
  };
  const getActiveCity = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/camera/active', {}
    ).then((res) => {
      setCityActiveList(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getInit = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/camera/init', {}
    ).then((res) => {
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getAllCity = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/camera', {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }).then((res) => {
      setCityList(res.data.data);
      if (res.data.data.length == 0) {
        getInit();
      }
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleBlockData = (field, value) => {
    setBlockData({ ...blockData, [field]: value });
  }

  const handleNewImg = (newImgPath) => { handleBlockData('img', newImgPath); }

  const getBlockData = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/meta', {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }).then((res) => {
      setBlockData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleEditBlockData = () => {
    if (blockData.text == "" || blockData.title == "" || blockData.img == "") { toast.error('Напишите текст ответа!'); }
    else {
      axios.post(API_BASE_URL + '/meta',
        { ...blockData },
        {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`
          }
        }
      ).then((res) => {
        if (res.data.statusCode == 200) {
          toast.success('Текстовый блок успешно сохранен.');
        }
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
        console.log(err);
      });
    }
  }

  const handleTextChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleKeyUp = (e) => {
    if (e.keyCode == '13') {
      handleSubmit();
      e.target.value = "";
    }
  }
  const handleSubmit = () => {
    if (inputValue == "") return;
    createSeo();
  }

  const getSeoData = () => {
    setLoading(true);
    axios.get(API_BASE_URL + "/blog/seo", {
      'limit': limit,
      'offset': pageNum * limit
    }).then((res) => {
      setSeoData(res.data.data);
      setPageCount(Math.ceil(res.data.total / limit));
      setInputValue('');
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const createSeo = () => {
    setLoading(true);
    axios.post(API_BASE_URL + "/blog/admin/seo",
      { 'keyword': inputValue },
      { headers: { 'Authorization': `Bearer ${userInfo.token}` } },
    ).then((res) => {
      getSeoData();
      setLoading(false);
    }).catch((err) => {
      if (err.response?.status == 401) {
        toast.error("пожалуйста, войдите в систему");
        Router.push('/auth/login');
      }
      console.log(err);
    })
  }

  const handleEdit = (id, idText) => {
    setLoading(true);
    axios.put(API_BASE_URL + "/blog/admin/seo/" + id,
      {
        'keyword': idText
      }
      // { headers: { 'Authorization': `Bearer ${userInfo.token}` } },
    ).then((res) => {
      getSeoData();
      setLoading(false);
    }).catch((err) => {
      if (err.response?.status == 401) {
        toast.error("пожалуйста, войдите в систему");
        Router.push('/auth/login');
      }
      console.log(err);
    })
  }

  const handleDel = (id) => {
    setLoading(true);
    axios.delete(API_BASE_URL + "/blog/admin/seo/" + id,
      {},
      { headers: { 'Authorization': `Bearer ${userInfo.token}` } },
    ).then((res) => {
      getSeoData();
      setLoading(false);
    }).catch((err) => {
      if (err.response?.status == 401) {
        toast.error("пожалуйста, войдите в систему");
        Router.push('/auth/login');
      }
      console.log(err);
    })
  }

  const handleOnChange = (e) => {
    const leng = seoData.length;
    let ind = seoData.findIndex(ele => ele.id == e.target.id);
    setSeoData(
      [...seoData.slice(0, ind),
      { 'id': e.target.id, 'keyword': e.target.value },
      ...seoData.slice(ind + 1, leng)
      ]
    );
  }

  const handlePage = (e) => {
    setPageNum(e.target.id)
  }

  useEffect(() => {

    var saveData = JSON.parse(localStorage?.saveData || null) || {};
    setUserInfo(saveData.userInfo);
    getSeoData();
    getBlockData();
    getAllCity();
    getActiveCity();
  }, []);

  useEffect(() => {
    getSeoData();
  }, [pageNum]);

  const tdClass = ["border border-gray-400 px-10 py-2 cursor-pointer bg-gray-100 hover:text-red  hover:text-[#FF6432]",
    "border border-gray-400 px-10 py-2 cursor-pointer  hover:text-[#FF6432]",
    "border border-gray-400 px-10 py-2 cursor-pointer font-bold bg-[#fcb59d]"];

  return (
    <>
      <NextSeo title="Главная" />
      <NavBar />
      <div className="flex flex-col mx-auto mt-[60px] md:mt-[94px]">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="px-4 md:px-[8.333333333%] items-center flex flex-col justify-center">

          <div className="w-full max-w-[1440px]  items-center flex flex-row justify-center gap-10">
            <div className='flex flex-row justify-between mt-10 gap-5'>
              <div className="block text-xl leading-6 text-gray-900 mt-2">Название</div>
              <input id="name" name="name" required onChange={handleTextChange} onKeyUp={handleKeyUp} value={inputValue}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                focus:ring-indigo-600 sm:leading-6 px-3 text-xl" />
            </div>
            <div className="flex">
              <button className="flex mr-24 mt-10 text-lg justify-center rounded-md px-4 py-1 font-semibold  shadow-lg  bg-[#FF6432] border-[1.5px]  text-white  hover:bg-[#dF5422]"
                onClick={handleSubmit}>ДОБАВИТЬ</button>
            </div>
          </div>

          <div className="flex flex-row  justify-center gap-10 my-5">

            <div className="w-full flex justify-center">
              <table className="border border-gray-400 text-lg text-center w-full">
                <thead>
                  <tr className="border border-gray-400 hover:bg-red-100">
                    <td className={tdClass[2]}>№</td>
                    <td className={tdClass[2]}>Название</td>
                    <td className={tdClass[2]}>-</td>
                    <td className={tdClass[2]}>-</td>
                  </tr>
                </thead>
                <tbody className="">
                  {seoData?.map((v, i) => (
                    <tr key={i} className="border border-gray-400  hover:bg-red-100">
                      <td className={tdClass[i % 2]}>{i + 1}</td>
                      <td className={tdClass[i % 2]}>
                        <input id={v.id} value={v.keyword} onChange={handleOnChange}
                          className="w-full rounded-md border-1 px-3 py-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                      </td>
                      <td className={tdClass[i % 2]} onClick={() => handleEdit(v.id, v.keyword)}><div className="text-[#FF6432] font-semibold">Обновить</div></td>
                      <td className={tdClass[i % 2]} onClick={() => handleDel(v.id)}><div className="text-[#FF6432] font-semibold">Удалить</div></td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
          {pageCount > 0 ? (
            <div className="flex flex-row justify-center gap-5 my-5">
              {Array(pageCount).fill('').map((v, i) => (
                <div key={i} id={i} className="text-white w-7 cursor-pointer text-xl bg-[#FF6432] rounded-xl text-center"
                  onClick={handlePage}>{i + 1}</div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="w-full flex flex-col justify-center items-center" style={{ backgroundColor: BgColor }}>
          <h3 className="text-center my-4">Текстовый блок</h3>
          <div className="flex flex-row gap-4 pb-4">

            {blockData && (
              <div className="flex flex-col gap-4">
                <div className="text-lg flex flex-row gap-4">
                  <div className="mt-2">Заголовок</div>
                  <input name="title" value={blockData?.title} className="w-full rounded-md border border-1 border-gray-300 px-3 py-1 text-gray-900 shadow-md focus:ring-1 text-center"
                    onChange={(e) => { handleBlockData(e.target.name, e.target.value) }} />
                </div>
                <div className="text-lg flex flex-row gap-4">
                  <div className="self-center">Изображение</div>
                  <DropzoneImage onChildData={handleNewImg} />
                  {blockData?.img && (
                    <Image src={blockData.img} width={300} height={180} className='object-cover rounded-md shadow-xl' />
                  )}
                  <input hidden name="img" value={blockData?.img} className="w-full rounded-md border border-1 border-gray-300 px-3 py-1 text-gray-900 shadow-md focus:ring-1 text-center"
                    onChange={(e) => { handleBlockData(e.target.name, e.target.value) }} />
                </div>
                <div className="flex flex-col w-full border border-[#D7D7D7] rounded-xl shadow">
                  <textarea
                    className="outline-none p-4 w-full rounded-xl text-lg font-medium bg-slate-50"
                    placeholder="Текстовый"
                    name="text"
                    value={blockData?.text}
                    onChange={(e) => { handleBlockData(e.target.name, e.target.value) }}
                    rows={8} // Number of visible rows
                    cols={40}
                  />
                  <div className="flex p-4 justify-end">
                    <button className="rounded-lg px-5 py-2 bg-[#FF6432] text-sm font-medium text-white"
                      onClick={handleEditBlockData}
                    >
                      Редактировать
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <div className="max-w-[1440px] flex flex-col py-8 text-center gap-8 border">
            <h3>Выберите город для прямого эфира</h3>
            <div className="flex flex-wrap justify-between gap-4 mx-4">
              {cityList?.map((v, i, arr) => (
                <span key={i} id={v.id} className="cursor-pointer rounded-[60px] px-2 py-2 text-md font-medium text-[#292D32] bg-white shadow-md"
                  onClick={() => spanOnClick(i)}
                  style={{
                    color: (cityActiveList.some(item => item.id === v.id)) ? 'white' : '#292D32',
                    backgroundColor: (cityActiveList.some(item => item.id === v.id)) ? '#292D32' : 'white'
                  }}
                >
                  {v.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}

export default SeoIndex;