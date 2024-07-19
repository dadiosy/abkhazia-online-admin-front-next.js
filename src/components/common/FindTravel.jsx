import React, { Children, useState, useEffect, useRef } from "react";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import moment from "moment"
import 'moment/locale/ru';

const placeArray = ['Гагры', 'Гадуата', 'Новый Афон', 'Пицунда', 'Сухум', 'Цандрипш'];
const dayOfStr = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export default function FindTravel() {
  const divRef = useRef(null);
  const handleClickOutside = (event) => {
    if (divRef.current.contains(event.target) == false) {
      setCalendarFlag(false);
      setModalFlag(false);
      setIsListVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [calendarFlag, setCalendarFlag] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const [textValue, settextValue] = useState();
  const [modalFlag, setModalFlag] = useState(false);
  const [expandFlag, setExpandFlag] = useState(false);
  const [childrenType, setChildrenType] = useState('');
  const [childrenNum, setChildrenNum] = useState(2);
  const childrenString = ['до 1 года', '1 год', '2 года', '3 года', '4 года', '5 лет', '6 лет', '7 лет', '8 лет', '9 лет', '10 лет', '11 лет', '12 лет', '13 лет', '14 лет', '15 лет', '16 лет', '17 лет'];
  const [nowYear, setNowYear] = useState(moment().year());
  const [nowMonth, setNowMonth] = useState(moment().month() + 1);
  const handleOptionClick = (listtext) => {
    console.log('--', listtext['item'], '--');
    settextValue(listtext['item']);
    setIsListVisible(!isListVisible);
  }
  let startDayArray = [], endDayArray = [];
  let td = nowYear + '-' + nowMonth.toString().padStart(2, '0') + '-01';
  let _Day = moment(td).startOf('month').format('YYYY-MM-DD');
  let _y = moment(_Day).year(); let _m = moment(_Day).month() + 1;
  let _dayOfWeek = moment(_Day).day();
  let _act = '';
  for (let i = 1; i <= _dayOfWeek; i++) startDayArray.push(null);
  for (let i = 1; i <= moment().daysInMonth(); i++) {
    let newDay = moment(_y + '-' + _m.toString().padStart(2, '0') + '-' + i.toString().padStart(2, '0')).format("YYYY-MM-DD");
    if (newDay == moment().format("YYYY-MM-DD")) _act = 'today'; else _act = '';
    if (selectedStartDate != '' && moment(newDay).format('YYYY-MM-DD') == moment(selectedStartDate).format('YYYY-MM-DD')) _act = 'selStart';
    if (selectedStartDate != '' && moment(newDay).format('YYYY-MM-DD') == moment(selectedEndDate).format('YYYY-MM-DD')) _act = 'selEnd';
    if (selectedStartDate != '' && moment(newDay) > moment(selectedStartDate) && moment(newDay) < moment(selectedEndDate)) _act = 'sel';
    startDayArray.push({ 'day': i, '_act': _act, 'dayStr': newDay });
  }
  for (let i = 1; i <= 7; i++) startDayArray.push(null);


  _Day = moment(td).add(1, 'month').startOf('month').format('YYYY-MM-DD');
  _y = moment(_Day).year(); _m = moment(_Day).month() + 1;
  _dayOfWeek = moment(_Day).day();
  for (let i = 1; i <= _dayOfWeek; i++) endDayArray.push(null);
  for (let i = 1; i <= moment().add(1, 'month').daysInMonth(); i++) {
    let newDay = moment(_y + '-' + _m.toString().padStart(2, '0') + '-' + i.toString().padStart(2, '0')).format("YYYY-MM-DD");
    if (newDay == moment().format("YYYY-MM-DD")) _act = 'today'; else _act = '';
    if (selectedStartDate != '' && moment(newDay).format('YYYY-MM-DD') == moment(selectedStartDate).format('YYYY-MM-DD')) _act = 'selStart';
    if (selectedStartDate != '' && moment(newDay).format('YYYY-MM-DD') == moment(selectedEndDate).format('YYYY-MM-DD')) _act = 'selEnd';
    if (selectedStartDate != '' && moment(newDay) > moment(selectedStartDate) && moment(newDay) < moment(selectedEndDate)) _act = 'sel';
    endDayArray.push({ 'day': i, '_act': _act, 'dayStr': newDay });
  }
  for (let i = 1; i <= 7; i++) endDayArray.push(null);

  const handleCalendarClick = (dayStr) => {
    if (selectedStartDate != '' && selectedEndDate != '') {
      setSelectedStartDate(dayStr);
      setSelectedEndDate('');
    }
    else {
      if (selectedStartDate == '') setSelectedStartDate(dayStr);
      else {
        if (moment(selectedStartDate) < moment(dayStr)) {
          setSelectedEndDate(dayStr);
          // setCalendarFlag(false); 
        }
        else setSelectedStartDate(dayStr);
      }
    }
  }

  const handleNextImage = (step) => {
    let _month = nowMonth + step;
    if (_month < 1) { _month = 12; setNowYear(nowYear + step); }
    if (_month > 12) { _month = 1; setNowYear(nowYear + step); }
    setNowMonth(_month);
  }

  return (
    <div className="flex flex-col xl:flex-row w-full bg-[#FF6432] rounded-2xl" ref={divRef}>

      <div className="flex w-full xl:w-[85%] flex-col md:flex-row justify-between md:gap-y-4
         bg-white border-2 border-[#FF6432] rounded-[14px] px-4">
        <div className="relative justify-center items-center p-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <MapPinIcon className="text-[#83ebeb] w-6 h-6" />
          </div>
          <input
            type="text"
            name="travel"
            id="travel"
            value={textValue}
            className="block outline-none py-1.5 md:py-3 pl-8 pr-4 text-gray-900 text-[16px] md:text-[20px] font-Manrop leading-10 w-[300px] md:w-[300px]"
            placeholder="Куда вы хотите поехать?"
            onClick={() => { setIsListVisible(!isListVisible); }}
          />
          <div className="absolute left-5 top-15">
            {isListVisible && (
              <div className="bg-white w-[100%] leading-10 !shadow-lg !rounded-lg py-5 relative z-50">
                <ul>
                  <li className="-link d-block col-12 text-left text-[16px] md:text-[20px] font-Manrop rounded-4 px-5 py-15 py-2 opacity-50 pointer-events-none">
                    Популярные направления
                  </li>
                  {
                    placeArray.map((item, index) => {
                      return <li
                        className="-link d-block col-12 text-left text-[16px] md:text-[20px] font-Manrop rounded-4 px-5 py-15 py-2 hover:bg-gray-200"
                        key={item}
                        role="button"
                        onClick={() => handleOptionClick({ item })}
                      >{item}</li>
                    })
                  }
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between gap:4 border-y-2 md:border-y-0 py-2 md:py-0 ">
          <div className="flex gap-2 items-center relative md:pr-4">
            <div className="flex h-10 items-center md:border-l-2 md:pl-8">
              <CalendarDaysIcon className="w-6 h-6 text-[#919494]" />
            </div>
            <input
              type="text"
              className="outline-none  text-[16px] md:text-[20px] font-Manrop"
              size={10}
              placeholder="Дата заезда"
              value={selectedStartDate}
              onClick={() => { setCalendarFlag(!calendarFlag); }}
              readOnly
            />

            {calendarFlag && (
              <div className="absolute top-10 md:top-20 -left-2 md:-left-1 flex flex-col md:flex-row 
              gap-8 p-6 w-[372px] h-[766px] md:w-[744px] md:h-[383px] z-20 shadow-md bg-white rounded-lg">
                <div className="w-full flex flex-col items-center gap-1 relative">
                  <div className="absolute top-0 left-1">
                    <Image src="/img/calendar-arrow.png" width={40} height={40} objectFit="cover" className="cursor-pointer rotate-180"
                      onClick={() => handleNextImage(-1)} />
                  </div>
                  <h5>
                    {moment(nowYear + '-' + nowMonth.toString().padStart(2, '0') + '-01').format("MMMM YYYY")}
                  </h5>
                  <div className="w-full flex flex-row justify-between">
                    {dayOfStr.map((v, i) => (
                      <div key={i} className="w-[44px] h-[44px] flex flex-col items-center justify-center">
                        <div className="class-p3 !text-[#919494] text-center">{v}</div>
                      </div>
                    ))}
                  </div>
                  {Array(5).fill(0).map((va, ia) => (
                    <div key={ia} className="w-full flex flex-row justify-between">
                      {startDayArray.slice(ia * 7, (ia + 1) * 7).map((v, i) => (
                        <div key={i} className="w-full flex flex-row justify-between">
                          {(v != null) ?
                            (
                              (v._act == 'sel' || v._act == 'selStart' || v._act == 'selEnd') ? (
                                ((v._act === 'sel') && (
                                  <div className="w-full h-[44px] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold bg-[#FF6432] text-white"
                                    onClick={() => { handleCalendarClick(v.dayStr) }}>
                                    {v ? v.day : ''}
                                  </div>
                                )) ||
                                ((v._act === 'selStart') && (
                                  <div className="w-full h-[44px] flex flex-col rounded-l-xl items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold bg-[#FF5119] text-white"
                                    onClick={() => { handleCalendarClick(v.dayStr) }}>
                                    {v ? v.day : ''}
                                  </div>
                                )) ||
                                ((v._act === 'selEnd') && (
                                  <div className="w-full h-[44px] flex flex-col rounded-r-xl items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold bg-[#FF5119] text-white"
                                    onClick={() => { handleCalendarClick(v.dayStr) }}>
                                    {v ? v.day : ''}
                                  </div>
                                ))
                              ) : (
                                (v._act == 'today') ? (
                                  (i > 4) ? (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold text-[#FF6432] hover:bg-[#FF6432] hover:text-white border-2 border-[#FF6432]"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  ) : (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold hover:bg-[#FF6432] hover:text-white border-2 border-[#FF6432]"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  )
                                ) : (
                                  (i > 4) ? (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold text-[#E13914] hover:bg-[#FF6432] hover:text-white"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  ) : (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold hover:bg-[#FF6432] hover:text-white"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  )
                                )
                              )) : (
                              <div className="w-[44px] h-[44px] rounded-md  flex flex-col items-center justify-center">
                              </div>
                            )
                          }
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-col items-center gap-1 relative">
                  <div className="absolute top-0 right-1">
                    <Image src="/img/calendar-arrow.png" width={40} height={40} objectFit="cover" className="cursor-pointer"
                      onClick={() => handleNextImage(1)} />
                  </div>
                  <h5>{moment(nowYear + '-' + nowMonth.toString().padStart(2, '0') + '-01').add(1, 'month').format("MMMM YYYY")}</h5>
                  <div className="w-full flex flex-row justify-between">
                    {dayOfStr.map((v, i) => (
                      <div className="w-[44px] h-[44px] flex flex-col items-center justify-center" key={i}>
                        <div className="class-p3 !text-[#919494] text-center">{v}</div>
                      </div>
                    ))}
                  </div>
                  {Array(5).fill(0).map((va, ia) => (
                    <div key={ia} className="w-full flex flex-row justify-between">
                      {endDayArray.slice(ia * 7, (ia + 1) * 7).map((v, i) => (
                        <div key={i} className="w-full flex flex-row justify-between">
                          {(v != null) ?
                            (
                              (v._act == 'sel' || v._act == 'selStart' || v._act == 'selEnd') ? (
                                ((v._act === 'sel') && (
                                  <div className="w-full h-[44px] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold bg-[#FF6432] text-white"
                                    onClick={() => { handleCalendarClick(v.dayStr) }}>
                                    {v ? v.day : ''}
                                  </div>
                                )) ||
                                ((v._act === 'selStart') && (
                                  <div className="w-full h-[44px] flex flex-col rounded-l-xl items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold bg-[#FF5119] text-white"
                                    onClick={() => { handleCalendarClick(v.dayStr) }}>
                                    {v ? v.day : ''}
                                  </div>
                                )) ||
                                ((v._act === 'selEnd') && (
                                  <div className="w-full h-[44px] flex flex-col rounded-r-xl items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold bg-[#FF5119] text-white"
                                    onClick={() => { handleCalendarClick(v.dayStr) }}>
                                    {v ? v.day : ''}
                                  </div>
                                ))
                              ) : (
                                (v._act == 'today') ? (
                                  (i > 4) ? (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold text-[#FF6432] hover:bg-[#FF6432] hover:text-white border-2 border-[#FF6432]"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  ) : (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold hover:bg-[#FF6432] hover:text-white border-2 border-[#FF6432]"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  )
                                ) : (
                                  (i > 4) ? (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold text-[#E13914] hover:bg-[#FF6432] hover:text-white"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  ) : (
                                    <div className="w-[44px] h-[44px] rounded-md bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer font-Manrop text-[16px] font-bold hover:bg-[#FF6432] hover:text-white"
                                      onClick={() => { handleCalendarClick(v.dayStr) }}>
                                      {v ? v.day : ''}
                                    </div>
                                  )
                                )
                              )) : (
                              <div className="w-[44px] h-[44px] rounded-md  flex flex-col items-center justify-center">
                              </div>
                            )
                          }
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
          <div className="flex gap-2 items-center w-1/2 md:w-auto">
            <div className="flex h-10 items-center border-l-2 pl-6 md:pl-8">
              <CalendarDaysIcon className="w-6 h-6 text-[#141414]" />
            </div>
            <input
              type="text"
              className="outline-none  text-[16px] md:text-[20px] font-Manrop"
              size={10}
              placeholder="Дата выезда"
              value={selectedEndDate}
              onClick={() => { setCalendarFlag(!calendarFlag); }}
              readOnly
            />
          </div>
        </div>
        <div className="relative pb-4 md:pb-0">
          <div className="flex items-center mt-2 md:mt-4 cursor-pointer md:border-l-2 md:pl-6"
            onClick={() => { setModalFlag(!modalFlag) }}>
            <div className="pr-2 class-p1 !text-[16px] md:!text-[20px]">{childrenNum} взрослых</div>
            <div className="mt-2 pr-10">
              <Image src={'/img/down.png'} width={24} height={24} objectFit="cover" />
            </div>
          </div>
          {modalFlag && (
            <div className="absolute top-12 md:top-20 -left-6 md:-left-10 flex flex-col gap-4 p-6 w-[352px] min-h-[225px] z-10 shadow-md bg-white rounded-lg">
              <h5>Сколько вас будет</h5>
              <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-col">
                  <div className="class-p2">Взрослые</div>
                  <div className="class-p4 !text-[#919494]">от 18 лет</div>
                </div>
                <div className="flex gap-6">
                  <Image src="/img/minus.png" width={50} height={50} className="hover:shadow-md cursor-pointer"
                    onClick={() => { let temp = --childrenNum; if (temp > 0) setChildrenNum(temp); }} />
                  <div className="pt-2 class-p1">{childrenNum}</div>
                  <Image src="/img/plus.png" width={50} height={50} className="hover:shadow-md cursor-pointer"
                    onClick={() => { let temp = ++childrenNum; if (temp < 19) setChildrenNum(temp); }} />
                </div>
              </div>
              {(childrenType != '') && (
                <div className="h-[50px] w-full flex flex-row justify-between bg-[#ffd8cb] rounded-lg py-3 px-8
              hover:shadow-md cursor-pointer" onClick={() => { setChildrenType('') }}>
                  <div className="class-p2">Ребенок : {childrenType}</div>
                  <div className="mt-1">
                    <Image src={'/img/close.png'} width={24} height={24} objectFit="cover" />
                  </div>
                </div>
              )}
              <div className="h-[50px] w-full flex flex-row justify-between bg-[#ffd8cb] rounded-lg py-3 px-8
              hover:shadow-md cursor-pointer" onClick={() => { setExpandFlag(!expandFlag) }}>
                <div className="class-p2 !text-[#FF6432]">Добавить ребенка</div>
                <div className="mt-1">
                  {expandFlag ? (<Image src={'/img/arrow-down.png'} width={24} height={24} objectFit="cover" />
                  ) : (<Image src={'/img/arrow-down.png'} className="rotate-180" width={24} height={24} objectFit="cover" />)}
                </div>
              </div>
              {expandFlag && (
                <div className="flex flex-row gap-4 mx-2 justify-between">
                  <div className="flex flex-col gap-2 w-1/3">
                    {childrenString.slice(0, 6).map((v, i) => (
                      <div key={i} className="cursor-pointer class-p3" onClick={() => { setChildrenType(v) }}>{v}</div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 w-1/3">
                    {childrenString.slice(6, 12).map((v, i) => (
                      <div key={i} className="cursor-pointer class-p3" onClick={() => { setChildrenType(v) }}>{v}</div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 w-1/3">
                    {childrenString.slice(12, 18).map((v, i) => (
                      <div key={i} className="cursor-pointer class-p3" onClick={() => { setChildrenType(v) }}>{v}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
      <div className="flex w-full xl:w-[15%] justify-center items-center p-2 md:p-5">
        <h5 className="hidden md:block text-white">Найти</h5>
        <h6 className="block md:hidden text-white">Найти</h6>
      </div>
    </div>
  );
}
