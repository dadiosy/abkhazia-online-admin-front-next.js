import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from 'moment';
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import Star from "../../../public/img/SVG/Star";
import WeatherPanel from "../../components/weather/WeatherPanel"
import LinkIndex from "../../components/common/LinkIndex";
import { Select } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import { API_BASE_URL, BgColor } from '../../const/CustomConsts';
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

const directSel = { color: 'white', backgroundColor: '#292D32' }
const directDeSel = { color: '#292D32', backgroundColor: 'white' }

const WeatherIndexPage = () => {
  const [metaData, setMetaData] = useState({});
  const dispatch = useDispatch();
  // const { directions } = useSelector((state) => state.direction)
  const [totalDirection, settotalDirection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayWeather, setTodayWeather] = useState([]);
  const [selId, setSelId] = useState(0);
  const [selCityName, setSelCityName] = useState('');
  const [directionList, setDirectionList] = useState([]);

  const getDirectionList = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/direction',
      {
        limit: 0,
        offset: 0
      }).then((res) => {
        setDirectionList([...directionList, ...res.data.data]);
        setSelId(res.data?.data[0].id);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      })
  }

  const onClickDirectionBar = (index) => {
    let tmp = totalDirection;
    tmp.map((a) => {
      a.checked = false;
    });
    tmp[index].checked = true;
    settotalDirection([...tmp]);
    setSelId(directionList[index].id);
  }

  const getTodayWeather = () => {
    setLoading(true);
    axios.post(API_BASE_URL + '/weather/today',
      {
        directionID: selId,
        date: moment(new Date).format("YYYY-MM-DD")
      }).then((res) => {
        setTodayWeather(res.data.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTodayWeather();
    let tempCityName = directionList?.filter(function (obj) { return obj.id == selId })[0]?.name;
    if (tempCityName == 'Пицунда') tempCityName = 'Пицунде';
    setSelCityName(tempCityName)
  }, [selId])
  useEffect(() => {
    getDirectionList();
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.page === 'weather')[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    let tmpDirections = [];
    directionList?.map((a, index) => {
      let tmpDirection = {
        ...a,
        checked: index == 0 ? true : false
      }
      tmpDirections.push(tmpDirection);
    });
    settotalDirection([...tmpDirections]);

    directionList.length > 0 ? setSelId(directionList[0].id) : "null";
  }, [directionList]);

  return (
    <>
      {/* <NextSeo title="Погода" /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      <div className="flex flex-col items-center mx-auto mt-[60px] md:mt-[94px]" style={{ backgroundColor: BgColor }}>
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}
        <div className="px-4 max-w-[1200px] min-w-[1100px] pt-6 md:pt-8 pb-6 md:pb-[60px]">
          <div className="space-y-5 md:space-y-10 md:min-w-[768px]">
            <div className="space-y-5 md:space-y-6">
              <LinkIndex indexName={"Погода"} />
              <h1 className="md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                Погода в Абхазии
              </h1>
            </div>
            <div className="hidden md:flex flex-wrap justify-between gap-4 w-full">
              {
                totalDirection.map((v, i) => (
                  <span key={i} className="flex cursor-pointer rounded-full px-4 py-2 text-md font-medium text-[#292D32] bg-white"
                    onClick={() => onClickDirectionBar(i)}
                    style={v.checked ? directSel : directDeSel}
                  >
                    {v.name}
                    {v.checked ? (<Star color={"white"} />) : null}
                  </span>
                )
                )
              }
            </div>

            <div className="block md:hidden">
              <Select placeholder='' size='md' className="cursor-pointer"
                onChange={(e) => { setSelId(e.target.value) }}
              // bg='tomato' borderColor='tomato' color='white'
              >
                {directionList?.map((v, i) => (<option key={i} value={v.id}>{v.name}</option>))}
              </Select>
            </div>
            <div className="flex flex-col gap-y-6 justify-center items-center w-full">
              <div className="md:w-[80%]">
                <h2 className="text-[24px] md:text-[51px] text-center mb-8">
                  Погода в {selCityName}
                </h2>
                {todayWeather.length > 0 ? (
                  <WeatherPanel wData={todayWeather} id={selId} />
                ) : null}
                <div className="flex flex-col justify-center items-center gap-6 mt-8">
                  <h2 className="text-[24px] md:text-[51px]">
                    Заголовок
                  </h2>
                  <div className="w-full md:w-[70%]">
                    <p className="text-base md:text-lg font-medium text-center">
                      {directionList?.filter(function (obj) { return obj.id == selId })[0]?.heading}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
}
export default WeatherIndexPage;