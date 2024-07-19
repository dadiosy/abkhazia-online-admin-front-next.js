import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { API_BASE_URL, normalInputCss, BgColor, BtnActive, sitePages } from '../../../const/CustomConsts';
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import Router from "next/router";
import { Floppy, Trash } from 'react-bootstrap-icons';
import { getMetaData, putMetaData, postMetaData, deleteMetaData } from "../../../const/Apis";

const MetaPage = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [metaData, setMetaData] = useState([]);
  const [tempData, setTempData] = useState({ title: '', description: '', keyword: '', url: '', page: '' })

  const getSeoMetaData = () => {
    setLoading(true);
    axios.get(API_BASE_URL + "/seometa",
      {}
    ).then((res) => {
      setMetaData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleChange = (ind, name, value) => {
    let tempData = [...metaData];
    tempData[ind][name] = value;
    setMetaData([...tempData]);
  }

  const handleAddChange = (name, value) => {
    const newTemp = { ...tempData }
    newTemp[name] = value
    setTempData(newTemp)
  }

  const handleButton = (ind, id, type) => {
    if (type == 'delete') {
      setLoading(true);
      axios.delete(API_BASE_URL + "/seometa/" + metaData[ind].id,
      ).then((res) => {
        setMetaData(metaData.filter((item, index) => index !== ind));
        setLoading(false);
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
        console.log(err);
      })
    }
    if (type == 'edit') {
      setLoading(true);
      let tempData = {
        title: metaData[ind].title,
        keyword: metaData[ind].keyword,
        description: metaData[ind].description,
        url: metaData[ind].url,
        page: metaData[ind].page
      }

      axios.put(API_BASE_URL + "/seometa/" + id,
        metaData[ind]
      ).then((res) => {
        setLoading(false);
        toast.success('OK');
      }).catch((err) => {
        if (err.response?.status == 401) {
          toast.error("пожалуйста, войдите в систему");
          Router.push('/auth/login');
        }
        console.log(err);
      })
    }
  }

  const handleAddNew = () => {
    axios.post(API_BASE_URL + "/seometa",
      tempData
    ).then((res) => {
      setMetaData(metaData.concat(res.data.data));
      setLoading(false);
      setTempData({ title: '', description: '', keyword: '', url: '', page: '' })
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
    getSeoMetaData();
    // let tempData = [];
    // sitePages.forEach(ele => {
    //   tempData.push({ 'title': '', 'keyword': '', 'description': '', 'page': ele.page });
    // });
    // setMetaData(tempData);
  }, []);
  const tdClass = ["border border-gray-400 px-4 py-2 cursor-pointer bg-gray-100 hover:text-red hover:text-[#FF6432]",
    "border border-gray-400 px-4 py-2 cursor-pointer hover:text-[#FF6432]",
    "border border-gray-400 px-4 py-2 cursor-pointer font-bold bg-[#fcb59d]"];

  return (
    <>
      <NextSeo title="Главная" />
      <NavBar />
      <div className="flex flex-col mx-auto mt-[60px] md:mt-[94px] mb-8">
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="px-4 md:px-[8.333333333%] items-center flex flex-col justify-center">
          <div className="w-full max-w-[1440px] items-center flex flex-col justify-center gap-10">

            <div className="flex flex-col gap-2 w-full text-md text-center mt-8">
              <div className="flex w-full border py-2 border-gray-200 font-extrabold rounded-md shadow-md" style={{ background: BgColor }}>
                <div className="w-[5%] px-4 border-r-2">№</div>
                <div className="w-[10%] px-4 border-r-2">Title</div>
                <div className="w-[20%] px-4 border-r-2">Description</div>
                <div className="w-[20%] px-4 border-r-2">Keyword</div>
                <div className="w-[20%] px-4 border-r-2">Url</div>
                <div className="w-[20%] px-4 border-r-2">Page</div>
                <div className="w-[5%] px-4">-</div>
              </div>

              {metaData?.map((v, i) => (
                <div key={i}>
                  <div className="flex w-full border py-2 border-gray-200 font-semibold rounded-md shadow-md">
                    <div className="w-[5%] px-4 border-r-2">{i + 1}</div>
                    <div className="w-[10%] px-4 border-r-2">
                      <input
                        id={i}
                        name="title"
                        value={v.title}
                        onChange={(e) => { handleChange(i, e.target.name, e.target.value) }}
                        className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                    </div>
                    <div className="w-[20%] px-4 border-r-2">
                      <input
                        id={i}
                        name="description"
                        value={v.description}
                        onChange={(e) => { handleChange(i, e.target.name, e.target.value) }}
                        className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                    </div>
                    <div className="w-[20%] px-4 border-r-2">
                      <input
                        id={i}
                        name="keyword"
                        value={v.keyword}
                        onChange={(e) => { handleChange(i, e.target.name, e.target.value) }}
                        className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                    </div>
                    <div className="w-[20%] px-4 border-r-2">
                      <input
                        id={i}
                        name="url"
                        value={v.url}
                        onChange={(e) => { handleChange(i, e.target.name, e.target.value) }}
                        className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                    </div>
                    <div className="w-[20%] px-4 border-r-2">
                      <input
                        id={i}
                        name="page"
                        value={v.page}
                        onChange={(e) => { handleChange(i, e.target.name, e.target.value) }}
                        className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                    </div>
                    <div className="w-[5%] px-4 flex justify-center items-center">
                      <div className="text-[#FF6432] font-semibold cursor-pointer mr-2 "
                        onClick={() => handleButton(i, v.id, 'edit')}>
                        <Floppy className="hover:size-6 size-5" color="#FF6432" />
                      </div>
                      <div className="text-[#FF6432] font-semibold cursor-pointer "
                        onClick={() => handleButton(i, v.id, 'delete')}>
                        <Trash className="hover:size-6 size-5" color="#FF6432" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <h6 className="mt-[40px]">Create New Meta Data</h6>
              <div>
                <div className="flex w-full border py-2 border-gray-200 font-semibold rounded-md shadow-md">
                  <div className="w-[5%] px-4 border-r-2">{metaData.length + 1}</div>
                  <div className="w-[10%] px-4 border-r-2">
                    <input
                      name="title"
                      value={tempData.title}
                      onChange={(e) => { handleAddChange(e.target.name, e.target.value) }}
                      className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                  </div>
                  <div className="w-[20%] px-4 border-r-2">
                    <input
                      name="description"
                      value={tempData.description}
                      onChange={(e) => { handleAddChange(e.target.name, e.target.value) }}
                      className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                  </div>
                  <div className="w-[20%] px-4 border-r-2">
                    <input
                      name="keyword"
                      value={tempData.keyword}
                      onChange={(e) => { handleAddChange(e.target.name, e.target.value) }}
                      className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                  </div>
                  <div className="w-[20%] px-4 border-r-2">
                    <input
                      name="url"
                      value={tempData.url}
                      onChange={(e) => { handleAddChange(e.target.name, e.target.value) }}
                      className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                  </div>
                  <div className="w-[20%] px-4 border-r-2">
                    <input
                      name="page"
                      value={tempData.page}
                      onChange={(e) => { handleAddChange(e.target.name, e.target.value) }}
                      className="w-full rounded-md border-1 px-1 text-gray-900 shadow-md focus:ring-1 text-center" />
                  </div>
                  <div className="w-[5%] px-4 flex justify-center items-center">
                    <div className="text-[#FF6432] font-semibold cursor-pointer "
                      onClick={() => handleAddNew()}>
                      <Floppy className="hover:size-6 size-5" color="#FF6432" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}

export default MetaPage;