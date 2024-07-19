import React from "react";
import Image from "next/image";
import moment from "moment";
import Router from "next/router";

export default function ImageBottomText({ imgDesc, imgSrc, linkAddress }) {

  return (
    <div className="w-full">
      <div className="cursor-pointer flex flex-col w-full bg-white rounded-xl border border-[#EEEEEE] gap-5"
        onClick={() => { Router.push(`${linkAddress}`) }}
      >
        <div className="w-full relative">
          <Image
            src={imgSrc}
            width={600}
            height={400}
            className="rounded-xl"
          />
          <div className="bg-gradient-to-b from-[#000] absolute bottom-0 h-3/5 md:h-2/5 w-full rotate-180 rounded-[10px]"></div>
          <div className="w-full absolute bottom-0 md:bottom-2 left-2 md:left-4">
            <h4 className="flex-wrap custom-ellipsis-1 text-white">
              {imgDesc}
            </h4>
          </div>
        </div>

      </div>
    </div>
  );
}
