import React from "react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";

export default function Footer() {
  return (
    <div className="flex w-full bg-[#292D32]">
      <div className="container mx-auto max-w-[1440px]">
        <div className="px-4 md:px-[8.333333333%] py-8 md:py-[60px]">
          <div className="flex flex-col md:flex-row w-full gap-6 ">
            <div className="flex w-full md:w-[30%] md:gap-[55px] justify-center md:justify-start items-center md:items-start">
              <Image
                src='/img/Logo_black.svg'
                width={200}
                height={100}
                alt="logo"
                objectFit="fill"
                className="self-center"
              />
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-[995px] justify-center md:justify-between gap-6 md:gap-0">
              <div className="flex flex-col gap-3 items-center md:items-start class-p2 !text-white">
                <Link href="/direction">Направления</Link>
                <Link href="/ProjectB1">Экскурсии</Link>
                <Link href="/ProjectB2">Трансфер</Link>
              </div>
              <div className="flex flex-col gap-3 items-center md:items-start class-p2 !text-white">
                <Link href="/weather">Погода</Link>
                <Link href="/attraction">Достопримечательности</Link>
                <Link href="/blog">Камеры</Link>
              </div>
              <div className="flex flex-col gap-3 items-center md:items-start  class-p2 !text-white">
                <Link href="#">
                  email@email.ru
                </Link>
                <Link href="#">
                  +7 900 900 90-90
                </Link>
                <Link href="#">
                  Телеграм-бот
                </Link>
              </div>
              {/* <div className="flex justify-center md:justify-start items-center md:items-start">
                <div className="w-[108px] h-[108px] flex p-2">
                  <Image
                    src='/img/qr.svg'
                    width={200}
                    height={200}
                    alt="qr_code"
                    objectFit="cover"
                    className="self-center"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
