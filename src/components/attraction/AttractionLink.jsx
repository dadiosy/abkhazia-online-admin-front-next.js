import Image from "next/image";
import React, { useState } from "react";
import Router from "next/router";
import { imageLoader } from "../../helper";
import { API_BASE_URL } from "../../const/CustomConsts";
const AttractionLink = ({ data, link }) => {
    const routerPath = link + data.id;
    return (
        <div>
            <div onClick={() => { Router.push(routerPath) }} className='cursor-pointer flex w-full h-full justify-center rounded-[20px] relative'>
                {/* <img loader={imageLoader} src={`${API_BASE_URL}/direction/${data.bgImg}`} width={600} height={400} className="rounded-[10px]" /> */}
                <img src={data.bgImg} width={600} height={400} className="rounded-[10px]" />
                <div className="bg-gradient-to-b from-[#000] absolute bottom-0 h-3/5 md:h-2/5 w-full rotate-180 rounded-[10px]"></div>
                <div className="hidden md:block">
                    <h5 className="absolute w-[90%] bottom-4 left-4 text-white">
                        {data.name}
                    </h5>
                </div>
                <div className="block md:hidden">
                    <div className="absolute w-[90%] bottom-4 left-4 text-white class-btn">
                        {data.name}
                    </div>
                </div>
            </div>
        </div >
    );
}
export default AttractionLink;