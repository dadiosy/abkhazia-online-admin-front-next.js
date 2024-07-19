import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import DirectionLink from "../direction/DirectionLink";

export default function ImgDirectPanel({ data, link }) {
    const [curSi, setCurSi] = useState(0);
    // const [overflowWidth, setOverflowWidth] = useState(270);
    const overflowWidth = data.length * 45;
    const handleArrowClick = (step) => {
        curSi += step;
        curSi = (curSi < 0) ? 0 : curSi;
        curSi = (curSi > data.length - 3) ? data.length - 3 : curSi;
        setCurSi(curSi);
    }

    // useEffect(() => {
    //     setOverflowWidth(data.length * 90);
    // }, [data])
    return (
        <div>
            <div className="hidden md:block ">
                <div className="flex items-center gap-2 md:gap-4">
                    <Image className="cursor-pointer" src={'/icon/ArrowLeft.png'} width={56} height={48} layout="fixed"
                        onClick={() => handleArrowClick(-1)} />
                    <div className="grid grid-cols-3 w-full gap-4">
                        {
                            data.slice(curSi, curSi + 3).map((v, i, a) => (
                                <div key={i} className="col-span-1">
                                    <DirectionLink data={v} link={link} />
                                </div>
                            ))
                        }
                    </div>
                    <Image className="cursor-pointer" src={'/icon/ArrowRight.png'} width={56} height={48} layout="fixed"
                        onClick={() => handleArrowClick(1)} />
                </div>
            </div>
            {overflowWidth > 0 && (
                <div className={`overflow-x-auto md:hidden flex w-[${overflowWidth}%] whitespace-nowrap gap-3`} >
                    {
                        data.map((v, i, a) => (
                            <div key={i} className="">
                                <DirectionLink data={v} link={link} />
                            </div>
                        ))
                    }
                </div>
            )}
        </div >
    )
}
