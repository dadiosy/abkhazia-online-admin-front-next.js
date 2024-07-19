import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import { API_BASE_URL } from '../../const/CustomConsts';
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import ImageRightText from "../../components/blog/ImageRightText";
import ImageBottomText from "../../components/blog/ImageBottomText";
import PagenationCircle from "../../components/common/PagenationCircle";
import LinkIndex from "../../components/common/LinkIndex";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

const BlogIndex = () => {
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [seoData, setSeoData] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const stepValue = 1;

  useEffect(() => {
    getSeoData();
    getBlogData(null);
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.url === useRouter().pathname)[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const handleClickSeo = (e) => {
    getBlogData(e.target.id);
  }
  const getSeoData = () => {
    axios.get(API_BASE_URL + "/blog/seo", {
      params: {
        // limit: 5,
        // offset: pageNum
      }
    }).then((res) => {
      setSeoData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getBlogData = (selSeo) => {
    setLoading(true);
    axios.post(API_BASE_URL + "/blog", {
      limit: 0,
      offset: 0,
      seo: { id: selSeo }
      // seos: [{ id: 1 }, { id: 3 }]
    }).then((res) => {
      setBlogData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      {/* <NextSeo title="Все статьи" /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      {(blogData && seoData) ? (
        <div className="flex w-full bg-white pb-10 mt-[60px] md:mt-[94px]">
          {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
          <div className="flex flex-col container mx-auto max-w-[1440px] items-center">
            <div className="flex flex-col w-full gap-5 md:gap-10 px-4 max-w-[1200px] pt-6 md:pt-8 pb-6 md:pb-[60px]">
              <div className="flex flex-col w-full gap-4 md:gap-8">
                <LinkIndex indexName={"Все статьи"} />
                <h1 className="md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                  Все статьи
                </h1>
              </div>
              <div className="flex flex-col w-full gap-4 md:gap-8">
                <div className="flex gap-2 md:gap-4">
                  {seoData?.map((v, i) => (
                    <div key={i} id={v.id} className="cursor-pointer rounded-[40px] text-center px-2 py-1 bg-[#FFF8ED] text-md md:text-lg xl:text-lg font-medium text-[#FF6432] font-Manrop"
                      onClick={handleClickSeo}>
                      #{v.keyword}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-full gap-2 md:gap-4">
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    {blogData.slice(pageNum, pageNum + 2).map((v, i) => (
                      <div key={i} className="col-span-2 md:col-span-1">
                        <ImageRightText
                          id={v.id}
                          imgSrc={v.bgImg}
                          imgTitle={''}
                          imgDesc={v.title}
                          imgDate={v.createAt}
                          imgType={v.seos[0]?.keyword}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {blogData.slice(pageNum, pageNum + 3).map((v, i) => (
                      <div key={i} className="col-span-3 md:col-span-1">
                        <ImageBottomText
                          id={v.id}
                          imgSrc={v.bgImg}
                          imgDesc={v.title}
                          imgDate={v.createAt}
                          imgType={v.seos[0]?.keyword}
                        />
                      </div>
                    ))}
                  </div>

                </div>
                < PagenationCircle
                  nowPage={setPageNum}  // first 0, CallBack nowPageNumber
                  totalCount={blogData.length} // Used in Enable, Disable
                  stepValue={stepValue} // Used in Enable, Disable
                />
              </div>
            </div>
          </div>
        </div >
      ) : null}
      <Footer />
    </>
  );
}

export default BlogIndex;