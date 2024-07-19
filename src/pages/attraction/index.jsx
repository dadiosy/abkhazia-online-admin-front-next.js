import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import { API_BASE_URL, BgColor, BtnActive, BtnActive14 } from '../../const/CustomConsts';
import { Select } from '@chakra-ui/react'
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import FindTravel from "../../components/common/FindTravel";
import AttractionLink from "../../components/attraction/AttractionLink"
import LinkIndex from "../../components/common/LinkIndex";
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

const AttractionIndex = () => {
  const [metaData, setMetaData] = useState({});
  // const { attractions } = useSelector((state) => state.attraction)
  const [spanSel, setSpanSel] = useState(0);
  const [moreFlag, setMoreFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attractionData, setAttractionData] = useState([]);
  const [directionList, setDirectionList] = useState([{ id: 0, name: "Все направления" }]);

  const handleListClick = (item) => {
    setSpanSel(item.target.value ? item.target.value : 0);
  }
  const getDirectionList = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/direction',
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
  const getAttraction = (spanSel) => {
    setLoading(true);
    axios.get(API_BASE_URL + '/attraction',
      {
        directionID: directionList[spanSel].id,
        limit: 0,
        offset: 0
      }).then((res) => {
        setAttractionData(res.data.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getDirectionList();
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.page === 'attraction')[0]);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    getAttraction(spanSel);
  }, [spanSel, directionList])

  const spanOnClick = (spanId) => {
    setSpanSel(spanId);
  };
  const handleShowMoreButtonClick = () => {
    setMoreFlag(!moreFlag);
  }

  return (
    <>
      {/* <NextSeo title="Все достопримечательности" /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      {attractionData && (
        <div className="flex flex-col justify-center items-center mx-auto mt-[60px] md:mt-[94px]" style={{ backgroundColor: BgColor }}>
          {loading && (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>)}
          <div className="px-4 max-w-[1200px] space-y-5 md:space-y-10 pt-6 md:pt-8 p-6 md:pb-16">
            <div className="flex flex-col w-full gap-5 md:gap-11 ">
              <LinkIndex indexName={"Все достопримечательности"} />
              <h1 className="md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                Все достопримечательности
              </h1>
              <div className="w-full">
                <FindTravel />
              </div>
            </div>
            <div className="flex flex-col w-full gap-8">
              <div className="hidden md:flex flex-wrap justify-between gap-4">
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

              <div className="block md:hidden">
                <Select placeholder={directionList[0].name} onClick={handleListClick} size='md' className="text-xl my-5">
                  {directionList?.map((v, i) => (
                    i != 0 &&
                    <option key={i} value={i} className="my-5">
                      {v.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="grid grid-cols-3 w-full gap-3 md:gap-5">
                {moreFlag ? (
                  attractionData.map((v, i) => (
                    <div key={i} className="col-span-3 md:col-span-1">
                      <AttractionLink data={v} link={"/attraction/"} />
                    </div>
                  ))
                ) : (
                  attractionData.slice(0, 6).map((v, i) => (
                    <div key={i} className="col-span-3 md:col-span-1">
                      <AttractionLink data={v} link={"/attraction/"} />
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex md:hidden w-full justify-center">
              <button onClick={handleShowMoreButtonClick} className={BtnActive14}>
                {moreFlag ? (
                  'Показать мень'
                ) : (
                  'Показать еще'
                )}
              </button>
            </div>
            <div className="hidden md:flex w-full justify-center">
              <button onClick={handleShowMoreButtonClick} className={BtnActive}>
                {moreFlag ? (
                  'Показать мень'
                ) : (
                  'Показать еще'
                )}
              </button>
            </div>
          </div>
        </div >
      )}
      <Footer />
    </>
  );
}

export default AttractionIndex;