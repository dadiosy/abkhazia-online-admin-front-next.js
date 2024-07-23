import React from "react";
import Image from "next/image";
import moment from "moment";
import Router from "next/router";
import { imageLoader } from "../../helper";
import { API_BASE_URL } from "../../const/CustomConsts";

export default function ImageBottomText({ id, imgSrc, imgDesc, imgDate, imgType }) {

  return (
    <div className="w-full">
      <div className="cursor-pointer flex flex-col w-full bg-white rounded-xl border border-[#EEEEEE] gap-2 md:gap-4"
        onClick={() => { Router.push(`/blog/${id}`) }}
      >
        <div className="flex w-full">
          <img
            // loader={imageLoader}
            // src={imgSrc}
            src={imgSrc}
            width={600}
            height={400}
            className="rounded-t-xl"
          />
        </div>
        <div className="flex flex-col w-full px-2 md:px-2 pb-1 md:pb-4 gap-2">
          <div className="hidden md:block">
            <h6 className="custom-ellipsis-1">
              {imgDesc}
            </h6>
            <div className="flex justify-between">
              <div className="class-p3 !text-[#919494]">
                {moment(imgDate).format("MM.DD.YYYY")}
              </div>
              <div className="class-p3 !text-[#FF6432]">#{imgType}</div>
            </div>
          </div>
          <div className="block md:hidden">
            <div className="custom-ellipsis-1 font-bold class-p3">
              {imgDesc}
            </div>
            <div className="flex justify-between">
              <div className="class-p4 !text-[#919494]">
                {moment(imgDate).format("MM.DD.YYYY")}
              </div>
              <div className="class-p4 !text-[#FF6432]">#{imgType}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
