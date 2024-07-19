import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import { API_BASE_URL, BgColor, BtnActive, BtnActive14 } from '../../const/CustomConsts';
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import FindTravel from "../../components/common/FindTravel";
import DirectionLink from "../../components/direction/DirectionLink"
import LinkIndex from "../../components/common/LinkIndex"
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

const DirectionIndexPage = () => {
  const router = useRouter()
  const [metaData, setMetaData] = useState({});
  const [directionData, setDirectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moreFlag, setMoreFlag] = useState(false);

  const getDirectionData = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/direction',
      {
        limit: 0,
        offset: 0
      }
    ).then((res) => {
      setDirectionData(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    console.log('iiiiiii', router.pathname)
    getDirectionData();
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.url === router.pathname)[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const handleShowMoreButtonClick = () => {
    setMoreFlag(!moreFlag);
  }
  return (
    <div>
      {/* <NextSeo title="Все направления" /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      {directionData && (
        <div className={`flex flex-col justify-center items-center mx-auto mt-[60px] md:mt-[94px] bg-[${BgColor}]`}>
          {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
          <div className="flex flex-col px-4 max-w-[1200px] gap-5 md:gap-10 pt-6 md:pt-8 pb-6 md:pb-[60px]">
            <div className="flex flex-col w-full gap-3 md:gap-8">
              <LinkIndex indexName={"Все направления"} />
              <h1 className="md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                Все направления
              </h1>
              <div className="w-full">
                <FindTravel />
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center" >
                <TailSpin color="green" radius={"5px"} />
              </div>
            ) : (
              <div className="grid grid-cols-6 w-full gap-5 md:gap-10">
                {moreFlag ? (
                  directionData.map((v, i) => (
                    <div key={i} className="col-span-3 md:col-span-2">
                      <DirectionLink data={v} link={"/direction/"} />
                    </div>
                  ))
                ) : (
                  directionData.slice(0, 6).map((v, i) => (
                    <div key={i} className="col-span-3 md:col-span-2">
                      <DirectionLink data={v} link={"/direction/"} />
                    </div>
                  ))
                )}
              </div>
            )}
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
        </div>
      )}

      <Footer />
    </div>
  );
}
export default DirectionIndexPage;