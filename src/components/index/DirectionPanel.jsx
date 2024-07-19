import React, { useState } from 'react';
import Router from "next/router";
import DirectionLink from "../direction/DirectionLink";
import { ArrowRight } from 'react-bootstrap-icons';
import { BtnActive } from '../../const/CustomConsts';

export default function DirectionPanel({ data }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex flex-col w-full py-0 md:py-[60px] gap-y-5 md:gap-y-10" id='Directions'>
            <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-y-2">
                <h2 className='hidden md:flex'>Популярные направления</h2>
                <h5 className='flex md:hidden'>Популярные направления</h5>
                <button className={`hidden md:flex ${BtnActive}`}
                    onClick={() => { Router.push("/direction") }}
                    onMouseEnter={() => { setIsHovered(true); }}
                    onMouseLeave={() => { setIsHovered(false); }}
                >
                    Все направления
                    <ArrowRight color={isHovered ? 'white' : '#FF6432'} />
                </button>
            </div>
            <div className="grid grid-cols-6 w-full gap-3 md:gap-6">
                {
                    data.map((v, i, arr) => (
                        <div key={i} className="col-span-3 md:col-span-2">
                            <div>
                                <DirectionLink data={v} link={"/direction/"} />
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex md:hidden justify-center">
                <button className="flex md:hidden gap-2 bg-white border-[1.5px] border-[#FF6432] rounded-lg px-4 py-2 items-center text-[14px] text-[#FF6432] font-medium hover:bg-[#FF6432] hover:text-white"
                    onClick={() => { Router.push("/direction") }}
                    onMouseEnter={() => { setIsHovered(true); }}
                    onMouseLeave={() => { setIsHovered(false); }}
                >
                    Все направления
                    <ArrowRight color={isHovered ? 'white' : '#FF6432'} />
                </button>
            </div>
        </div>
    );
}