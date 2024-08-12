import React from "react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";

export default function Footer() {
  return (
    <div className="flex justify-center mx-auto bg-[#292D32]">
      <div className="w-full max-w-[1200px] py-8 md:py-[60px]">
        <div className="flex flex-col md:flex-row w-full gap-6 ">
          <div className="flex justify-center md:mr-10">
            <img
              src='/img/Logo_black.svg'
              width={200}
              height={100}
              alt="logo"
              className="object-fill self-center"
            />
          </div>
          <div className="hidden md:block w-full">
            <div className="flex flex-col md:flex-row w-full md:justify-between gap-6">
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
              <div className="flex flex-col gap-3 items-center md:items-start class-p2 !text-white">
                <Link href="/">email@email.ru</Link>
                <Link href="/">+7 900 900 90-90</Link>
                <Link href="/">Телеграм-бот</Link>
              </div>
              {/* <div className="flex justify-center md:justify-start items-center md:items-start">
                <div className="w-[108px] h-[108px] flex p-2">
                  <img
                    src='/img/qr.svg'
                    width={200}
                    height={200}
                    alt="qr_code"
                    
                    className="self-center"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="block md:hidden">
            <div className="flex flex-col md:flex-row w-full md:justify-between gap-6 md:gap-0">
              <div className="flex flex-col gap-3 items-center md:items-start">
                <div className="class-p3 !text-white">
                  <Link href="/direction">Направления</Link>
                </div>
                <div className="class-p3 !text-white">
                  <Link href="/ProjectB1">Экскурсии</Link>
                </div>
                <div className="class-p3 !text-white">
                  <Link href="/ProjectB2">Трансфер</Link>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center md:items-start">
                <div className="class-p3 !text-white">
                  <Link href="/weather">Погода</Link>
                </div>
                <div className="class-p3 !text-white">
                  <Link href="/attraction">Достопримечательности</Link>
                </div>
                <div className="class-p3 !text-white">
                  <Link href="/blog">Камеры</Link>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center md:items-start">
                <div className="class-p3 !text-white">
                  email@email.ru
                </div>
                <div className="class-p3 !text-white">
                  +7 900 900 90-90
                </div>
                <div className="class-p3 !text-white">
                  Телеграм-бот
                </div>
              </div>
              {/* <div className="flex justify-center md:justify-start items-center md:items-start">
                <div className="w-[108px] h-[108px] flex p-2">
                  <img
                    src='/img/qr.svg'
                    width={200}
                    height={200}
                    alt="qr_code"
                    
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
