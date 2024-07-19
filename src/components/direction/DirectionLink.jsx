import Image from "next/image";
import React, { useState } from "react";
import { imageLoader } from "../../helper";
import Router from "next/router";
import { API_BASE_URL } from "../../const/CustomConsts";
const DirectionLink = ({ data, link }) => {
    const routerPath = link + data.id;
    return (
        <div>
            <div onClick={() => { Router.push(routerPath) }} className='cursor-pointer flex w-full h-full justify-center rounded-[20px] relative'>
                {/* <Image loader={imageLoader} src={`${API_BASE_URL}/direction/${data.bgImg}`} width={600} height={400} className="rounded-[10px]" /> */}
                <div className="block md:hidden">
                    <Image src={data.bgImg} width={600} height={600} className="rounded-[10px]" objectFit="cover" />
                </div>
                <div className="md:block hidden">
                    <Image src={data.bgImg} width={600} height={400} className="rounded-[10px]" />
                    <div className="bg-gradient-to-b from-[#000] absolute bottom-0 h-3/5 md:h-2/5 w-full rotate-180 rounded-[10px]"></div>
                </div>

                <div className="hidden md:block absolute bottom-[10px] left-[10px] md:bottom-[20px] md:left-[20px]">
                    <h4 className="text-white">{data.name}</h4>
                </div>

            </div>
            <div className="block md:hidden text-[#292D32]">
                <h6>{data.name}</h6>
            </div>
        </div >
    );
}
export default DirectionLink;