import React from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { imageLoader } from "../../helper";
import Router from "next/router";

export default function ImageRightText({ id, imgTitle, imgSrc, imgDesc, imgDate, imgType }) {

  return (
    <div>
      <div className="cursor-pointer flex w-full bg-white rounded-xl border border-[#EEEEEE] gap-3 md:gap-5"
        onClick={() => { Router.push(`/blog/${id}`) }}
      >
        <div className="flex w-[34%]">
          <img
            // loader={imageLoader}
            // src={imgSrc}
            src={imgSrc}
            className="rounded-l-xl"
            width={600}
            height={400}
          />
        </div>
        <div className="flex flex-col w-[66%] pr-3 md:pr-4 py-3 md:py-4 gap-1.5 md:gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base text-[#292D32] font-medium font-Manrop">
              {imgTitle}Интересно 🔥
            </p>
            <p className="flex-wrap text-md md:text-lg leading-[20px] md:leading-[26px] text-[#292D32] font-semibold md:font-bold custom-ellipsis-one font-Manrop">
              {imgDesc}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-sm md:text-base text-[#919494] font-medium font-Manrop">
              {moment(imgDate).format("MM.DD.YYYY")}
            </span>
            <span className="text-sm md:text-base text-[#FF6432] font-medium font-Manrop">
              #{imgType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
