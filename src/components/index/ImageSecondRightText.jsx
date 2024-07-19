import React from "react";
import Image from "next/image";
import Router from "next/router";

export default function ImageSecondRightText({ imgSrc }) {
  return (
    <div className="flex flex-col w-full bg-white rounded-xl border border-[#EEEEEE] p-2 md:p-4 gap-3 font-Manrop">
      <div className="flex gap-3 md:gap-4">
        <div className="flex w-[16%] md:w-[24%] cursor-pointer"
          onClick={() => { Router.push('/') }}>
          <Image
            src={imgSrc}
            alt="blog"
            width={136}
            height={136}
            className="rounded"
          />
        </div>
        <div className="flex flex-col w-[84%] md:w-[76%] gap-4">
          <div className="flex items-center gap-4">
            <div className="text-base md:text-lg leading-[20px] md:leading-[26px] py-[2px] md:py-0 font-semibold md:font-extrabold custom-ellipsis-one cursor-pointer"
              onClick={() => { Router.push('/') }}>
              Джиппинг в горную Абхазию — озера, водопады и Шерлок
            </div>
            <div className="hidden md:flex flex-col relative">
              <div className="absolute right-1 top-0 -z-4">
                <Image src='/img/vector.svg' width={50} height={28} />
              </div>
              <span className="flex self-end z-10 pr-3 text-white text-[18px] text-center tracking-[3%] font-semibold">
                9.6
              </span>
              <p className="flex text-sm xl:text-base text-right text-[#FF6432]">
                120&nbsp;отзывов
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <p className="text-sm xl:text-base text-[#292D32] font-medium">
              ⏳ 2 часа
            </p>
            <div className="flex gap-3">
              <span className="text-sm xl:text-base text-[#292D32] font-medium">
                🛻 Джиппинг
              </span>
              <span className="text-sm xl:text-base text-[#292D32] font-medium">
                🚲 Велосипед
              </span>
              <span className="text-sm xl:text-base text-[#292D32] font-medium">
                🚶‍♂️ Пешком
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden justify-between">
        <div className="flex flex-col justify-between">
          <p className="text-xs text-[#292D32] font-medium">⏳ 2 часа</p>
          <div className="flex gap-2">
            <span className="text-xs text-[#292D32] font-medium">
              🛻 Джиппинг
            </span>
            <span className="text-xs text-[#292D32] font-medium">
              🚲 Велосипед
            </span>
            <span className="text-xs text-[#292D32] font-medium">
              🚶‍♂️ Пешком
            </span>
          </div>
        </div>
        <div className="flex flex-col relative">
          <div className="absolute right-0 -z-4">
            <Image src='/img/vector.svg' width={44} height={24.5} />
          </div>
          <span className="flex self-end z-10 pt-0 pr-1.5 text-white text-sm md:text-lg text-center tracking-[3%] font-semibold">
            9.6
          </span>
          <p className="flex text-xs text-right text-[#FF6432]">
            120&nbsp;отзывов
          </p>
        </div>
      </div>
    </div>
  );
}
