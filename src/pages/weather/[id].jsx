import { NextSeo } from "next-seo";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from 'next/router';
import axios from "axios";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link"

import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import Star from "../../../public/img/SVG/Star";
import ArrowTop from "../../../public/img/SVG/ArrowTop";

import WeatherPanel from "../../components/weather/WeatherPanel"
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import direction from "../../store/actions/direction/direction";
import { API_BASE_URL, BgColor } from '../../const/CustomConsts';
import { Helmet } from 'react-helmet';
import { getMetaData } from "../../const/Apis";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const directSel = {
  color: 'white',
  backgroundColor: '#292D32'
}
const directDeSel = {
  color: '#292D32',
  backgroundColor: 'white'
}

const WeatherDetailPage = () => {
  const [metaData, setMetaData] = useState({});
  const dispatch = useDispatch();
  // const { directions } = useSelector((state) => state.direction)
  const [totalDirection, settotalDirection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayWeather, setTodayWeather] = useState([]);
  const router = useRouter()
  const queryId = router.query.id;
  const [detailId, setDetailId] = useState(queryId);

  const [selected, setSelected] = useState([]);
  const [directionList, setDirectionList] = useState([]);
  const getDirectionList = () => {
    setLoading(true);
    axios.post(API_BASE_URL + '/direction',
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

  useEffect(() => {
    if (selected.name == 'Пицунда') setSelected({ ...selected, 'name': 'Пицунде' })
  }, [selected])

  useEffect(() => {
    if (queryId > 0) {
      setDetailId(queryId);
    }
  }, [queryId]);

  useEffect(() => {
    getDirectionList();
    getMetaData({}).then(res => {
      setMetaData(res.data.data.filter((ele) => ele.page === 'weather-detail')[0]);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    getTodayWeather(detailId);
  }, [detailId, directionList])

  const handleListClick = (index) => {
    setDetailId(index);
    getTodayWeather(index);
  }

  const onClickDirectionBar = (index) => {
    setDetailId(index);
    getTodayWeather(index);
  }

  const getTodayWeather = (directionID) => {
    let tmpDirections = [];
    directionList?.map((a, index) => {
      (detailId == a.id) ? setSelected(a) : null;
      let tmpDirection = {
        ...a,
        checked: detailId == a.id ? true : false
      }
      tmpDirections.push(tmpDirection);
    });

    settotalDirection([...tmpDirections]);

    setLoading(true);
    axios.post(API_BASE_URL + '/weather/forecast',
      {
        directionID,
        date: moment(new Date).format("YYYY-MM-DD")
      }).then((res) => {
        let dataTen = res.data.data;
        const dataOne = [];
        const sliceSize = 4;
        for (let i = 0; i < dataTen.length; i += sliceSize) {
          dataOne.push(dataTen.slice(i, i + sliceSize));
        }
        setTodayWeather(dataOne);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {/* <NextSeo title={`Погода-${selected.name}`} /> */}
      <NextSeo title={metaData?.title} description={metaData?.description} />
      <Helmet>
        {/* <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} /> */}
        <meta name="keywords" content={metaData?.keyword} />
      </Helmet>
      <NavBar />
      <div id="navtop1" className="mx-auto mt-[60px] md:mt-[94px]" style={{ backgroundColor: BgColor }}>
        {loading ? (<div className="flex justify-center" ><TailSpin color="green" radius={"5px"} /></div>) : null}  <div className="px-4 md:px-[8.3333333%] pt-6 md:pt-8 pb-6 md:pb-[60px]">
          <div className="space-y-5 md:space-y-10">
            <div className="space-y-5 md:space-y-6">
              <div className="flex md:py-3 gap-1 md:gap-3 text-[12px] md:text-[18px] font-Manrop font-semibold">
                <div className="cursor-pointer text-[#B5B5B5]"
                  onClick={() => { Router.push('/') }}>
                  Главная
                </div>
                <p className="">/</p>
                <div className="cursor-pointer  text-[#B5B5B5]"
                  onClick={() => { Router.push('/weather') }}>
                  Погода
                </div>
                <p className="">/</p>
                <p className="">
                  Погода в {selected.name} на 10 дней
                </p>
              </div>
              <div className="hidden md:flex flex-wrap justify-between gap-4">
                {
                  totalDirection.map((v, i) => (
                    <span key={i} id={v.id} className="flex cursor-pointer rounded-full px-4 py-2 text-md font-medium text-[#292D32] bg-white"
                      onClick={() => onClickDirectionBar(v.id)}
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
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 px-5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="block truncate">
                              {selected?.name}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {directionList.map((item) => (
                              <Listbox.Option
                                key={item.id}
                                onClick={() => handleListClick(item.id)}
                                className={
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                }
                                value={item}
                              >
                                {({ selected }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span id={item.id}
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {item.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={
                                          "absolute inset-y-0 right-0 flex items-center pr-5"
                                        }
                                      >
                                        {/* <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex flex-col gap-y-6 justify-center items-center ">
              <h1 className="md:leading-[65px] leading-[34px] !text-[30px] md:!text-[62px]">
                Погода в {selected.name} на 10 дней
              </h1>
              <div className="md:w-[80%] self-center flex flex-col  gap-y-6">
                {loading ? (
                  <div className="flex justify-center" >
                    <TailSpin color="green" radius={"5px"} />
                  </div>
                ) : (
                  todayWeather.map((v, i, arr) => (
                    < WeatherPanel key={i} wData={v} id={null} />
                  ))
                )}
              </div>
            </div>
            {(todayWeather.length > 0) ? ((todayWeather[0].length > 0) ? (
              <div className="flex justify-center">
                <Link href='#navtop1'>
                  <button className="flex items-center gap-2 rounded-lg px-6 py-3 border-[1.5px] border-[#FF6432] bg-white text-sm md:text-base xl:text-lg font-medium text-[#FF6432]">
                    Наверх
                    <div className="hidden md:block">
                      <ArrowTop />
                    </div>
                    <div className="block md:hidden">
                      <ArrowTop size={true} />
                    </div>
                  </button>
                </Link>
              </div>
            ) : '') : ''}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default WeatherDetailPage;