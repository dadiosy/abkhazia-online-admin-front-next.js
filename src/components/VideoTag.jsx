import Router from "next/router";
// import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Image } from '@chakra-ui/react'
import { StreamAction } from "../store/actions/streamSlice";
import { API_BASE_URL, APSNY_CAMERA_LIST_URL, APSNY_GET_TOKEN_URL, APSNY_LIVE_STREAM_URL, cityList } from "../const/CustomConsts";

const VideoTag = () => {
  const dispatch = useDispatch();
  const streamDatas = useSelector((state) => state.streamStore.streamData);
  const [loading, setLoading] = useState(false);
  const [cityActiveList, setCityActiveList] = useState([]);
  const [overflowWidth, setOverflowWidth] = useState(300);

  const getCameraList = async (cityID) => {
    let formData = new FormData();
    formData.append('lid', String(cityID));
    const cameras = await axios.post(APSNY_CAMERA_LIST_URL, formData);
    return cameras.data.response.cams[0];
  };

  const getApsnyToken = async (channel) => {
    let formData = new FormData();
    formData.append('channel', channel);
    const tokenReq = await axios.post(APSNY_GET_TOKEN_URL, formData);
    return tokenReq.data.response;
  };

  const initStreams = async () => {
    setLoading(true);
    let result = [];
    for (const city of cityActiveList) {
      const camera = await getCameraList(city.lid);
      const tokenReq = await getApsnyToken(camera.channel);
      let tmp = {
        ...city,
        channel: camera.channel,
        token: tokenReq.token,
        preview: tokenReq.preview,
        url: APSNY_LIVE_STREAM_URL + `?stream=${tokenReq.channel}&token=${tokenReq.token}`
      }
      result.push(tmp);
    }
    dispatch(StreamAction({
      type: 'streamData',
      data: result
    }));
    setLoading(false);
  };

  const getActiveCity = () => {
    setLoading(true);
    axios.get(API_BASE_URL + '/camera/active',
      {}
    ).then((res) => {
      setCityActiveList(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getActiveCity();
  }, [])

  useEffect(() => {
    initStreams();
    setOverflowWidth(cityActiveList.length * 90);
    setOverflowWidth(420);
  }, [cityActiveList])
  return (
    <>
      {loading ? (
        <div className="flex justify-center" >
          <TailSpin color="green" radius={"5px"} />
        </div>
      ) : (
        <div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 whitespace-nowrap gap-3 md:gap-6">

              {streamDatas?.map((v, i) => (
                <div key={i} className="col-span-1 relative">
                  <img src={v.preview} className="rounded-md md:rounded-xl w-full h-full" objectFit='cover' />
                  <div className="absolute top-2 left-2 md:top-5 md:left-5">
                    <button className="flex gap-2 bg-white border-[1.5px] border-[#ffffff] rounded-md md:rounded-lg
                       px-2 py-1 md:px-4 md:py-2 items-center text-[#000000]">
                      <h6>{v.name}</h6>
                      <img color={"#FF6432"} src={'/icon/radar.svg'} width={8} height={8} />
                    </button>
                  </div>
                  <div className="absolute top-5 right-5 cursor-pointer videoButton"
                    // onClick={() => { Router.push(`${v.url}`) }}
                    onClick={() => { window.open(`${v.url}`, '_blank') }}
                  >
                    <img color={"#FF6432"} src={'/img/play.png'} />
                  </div>
                </div>
              ))}
            </div>

          </div >
          <div className="block md:hidden overflow-x-auto">
            <div className={`flex w-[450%] md:hidden whitespace-nowrap gap-3`}>
              {/* <div className={`flex w-[${overflowWidth}%] md:hidden whitespace-nowrap gap-3`}> */}
              {streamDatas?.map((v, i) => (
                <div key={i} className="relative">
                  <img src={v.preview} className="rounded-md md:rounded-xl w-full h-full" objectFit='cover' />
                  <div className="absolute z-10 top-2 left-2 md:top-5 md:left-5">
                    <button className="flex gap-2 bg-white border-[1.5px] border-[#ffffff] rounded-md md:rounded-lg
                       px-2 py-1 md:px-4 md:py-2 items-center text-[#000000]">
                      <h6 className="text-[16px] font-GolosText">{v.name}</h6>
                      <img color={"#FF6432"} src={'/icon/radar.svg'} width={6} height={6} />
                    </button>
                  </div>
                  <div className="absolute top-5 right-5 cursor-pointer videoButton"
                    // onClick={() => { Router.push(`${v.url}`) }}
                    onClick={() => { window.open(`${v.url}`, '_blank') }}
                  >
                    <img color={"#FF6432"} src={'/img/play.png'} width={10} height={10} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default VideoTag;