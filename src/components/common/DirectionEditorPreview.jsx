import OfferList from "./OfferList"
import OtherLinks from "./OtherLinks"
import PreviewComponents from "./PreviewComponents"
import SubtitleList from "./SubtitleList"
export default function EditorPreview({ data = [], dataDetail = {} }) {
    const subtitleList = data.filter((item, i) => item.tool == 'subtitle' && item.data.size == "level1")
    return (
        <div>
            <div className="relative">
                <img src={dataDetail.bgImg} className="w-full  h-[280px] md:h-[806px]"></img>
                <h1 className="absolute text-white font-[30px] md:font-[62px] bottom-8 md:bottom-16 inset-x-4 md:inset-x-32">{dataDetail.title}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 md:hidden">
                    <SubtitleList params={subtitleList} />
                    <OfferList className="mt-7" />
                </div>
                <div className="p-4 md:py-10 md:pl-32 md:pr-0">
                    <div className="space-y-4">
                        <div dangerouslySetInnerHTML={{ __html: dataDetail.description }} className="md:text-xl text-[#292D32] font-medium"></div>
                        <img className="hidden md:block" src="/img/weather.png" />
                        <img className="md:hidden" src="/img/weather-mobile.png" />
                    </div>
                    {data.map((item, i) => {
                        return <PreviewComponents data={item} key={i} />
                    })}
                    <div className="mt-8 md:mt-20">
                        <div className="text-center text-[#FF6432] text-[44px] md:text-[62px]">***</div>
                        <p className="text-[#292D32] md:text-xl">{dataDetail.heading}</p>
                    </div>
                </div>
                <div className="relative">
                    <div className="hidden sticky top-20 md:block md:text-left md:py-10 md:pr-32 md:pl-16">
                        <OtherLinks />
                        <SubtitleList className="mt-14" params={subtitleList} />
                        <OfferList className="mt-14" />
                    </div>
                </div>
            </div>

        </div>
    )
}