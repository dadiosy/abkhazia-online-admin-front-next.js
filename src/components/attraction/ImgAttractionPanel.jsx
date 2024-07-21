import Image from "next/image";
import { useState } from "react";
import AttractionLink from "../attraction/AttractionLink";

export default function ImgAttractionPanel({ data, link }) {
    const [curSi, setCurSi] = useState(0);
    const handleArrowClick = (step) => {
        let _curSi = curSi
        _curSi += step;
        _curSi = (_curSi < 0) ? 0 : _curSi;
        _curSi = (_curSi > data.length - 3) ? data.length - 3 : _curSi;
        setCurSi(_curSi);
    }
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
                                    <AttractionLink data={v} link={link} />
                                </div>
                            ))
                        }
                    </div>
                    <Image className="cursor-pointer" src={'/icon/ArrowRight.png'} width={56} height={48} layout="fixed"
                        onClick={() => handleArrowClick(1)} />
                </div>
            </div>
            <div className="overflow-x-auto md:hidden">
                <div className="flex w-[900%] whitespace-nowrap gap-3">
                    {
                        data.map((v, i, a) => (
                            <div key={i} className="">
                                <AttractionLink data={v} link={link} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
