import Router from "next/router";
import TG from "../../../public/img/SVG/TG";
import VK from "../../../public/img/SVG/VK";
import LinkIcon from "../../../public/img/SVG/LinkIcon";

const SocialLink = ({ }) => {
    return (
        <div className="flex gap-4">
            <div className="p-[17px] rounded-[50px] bg-[#EEEEEE] cursor-pointer"
                onClick={() => { Router.push("/") }}>
                <TG />
            </div>
            <div className="p-[17px] rounded-[50px] bg-[#EEEEEE] cursor-pointer"
                onClick={() => { Router.push("/") }}>
                <VK />
            </div>
            <div className="p-[17px] rounded-[50px] bg-[#EEEEEE] cursor-pointer"
                onClick={() => { Router.push("/") }}>
                <LinkIcon />
            </div>
        </div >
    )
}
export default SocialLink;