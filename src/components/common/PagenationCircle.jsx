import Image from "next/image";
import React, { useEffect, useState } from "react";

const PagenationCircle = ({ nowPage, totalCount, stepValue }) => {
    const [curPos, setCurPos] = useState(1);
    const [curSel, setCurSel] = useState(1);
    const [isZero, setIsZero] = useState(false);
    const [isFull, setIsFull] = useState(true);
    const [isClicked1, setIsClicked1] = useState(true);
    const [isClicked2, setIsClicked2] = useState(false);
    const [isClicked3, setIsClicked3] = useState(false);
    const pColor = "#FF6432";
    const pageNum = 0;
    useEffect(() => {
        if (curPos >= (totalCount / stepValue - 2)) setIsFull(false); else setIsFull(true);
    }, [totalCount])
    const handleDivClick = () => (cp) => {
        const tId = cp.target.id;
        pageNum = Number(curPos) - 1 + Number(tId) - 1;
        setCurSel(tId);
        nowPage(pageNum);
        setIsClicked1(false); setIsClicked2(false); setIsClicked3(false);
        if (tId == 1) setIsClicked1(true);
        if (tId == 2) setIsClicked2(true);
        if (tId == 3) setIsClicked3(true);
    }
    const handleArrowClick = (step) => {
        curPos += step;
        if (curPos <= 1) { curPos = 1; setIsZero(false); } else setIsZero(true);
        if (curPos >= (totalCount / stepValue - 2)) setIsFull(false); else setIsFull(true);
        pageNum = (curPos - 1 + Number(curSel) - 1);
        setCurPos(curPos);
        nowPage(pageNum);
    }
    const divStyle1 = {
        color: isClicked1 ? 'black' : pColor,
        // padding: '10px',
        // cursor: 'pointer'
    };
    const divStyle2 = { color: isClicked2 ? 'black' : pColor }
    const divStyle3 = { color: isClicked3 ? 'black' : pColor }
    return (
        <div className="flex justify-center items-center text-center gap-6 text-[30px] font-semibold">
            {isZero && <Image src={'/icon/ArrowLeft.png'} width={48} height={48} className=" cursor-pointer"
                onClick={() => handleArrowClick(-1)} />
            }
            <div className="cursor-pointer" style={divStyle1} id={1} onClick={handleDivClick(curPos)}>{curPos}</div>
            <div className="cursor-pointer" style={divStyle2} id={2} onClick={handleDivClick(curPos + 1)}>{curPos + 1}</div>
            <div className="cursor-pointer" style={divStyle3} id={3} onClick={handleDivClick(curPos + 2)}>{curPos + 2}</div>
            {isFull && <Image src={'/icon/ArrowRight.png'} width={48} height={48} className=" cursor-pointer"
                onClick={() => handleArrowClick(+1)} />
            }
        </div>
    );
}
export default PagenationCircle;