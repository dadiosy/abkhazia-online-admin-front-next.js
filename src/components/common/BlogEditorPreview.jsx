import OfferList from "./OfferList"
import OtherLinks from "./OtherLinks"
import PreviewComponents from "./PreviewComponents"
import SubtitleList from "./SubtitleList"
export default function EditorPreview({ data = [], dataDetail = {} }) {
    return (
        <div>
            <div className="relative">
                <img src={dataDetail.bgImg} className="w-full  h-[280px] md:h-[806px]"></img>
                <h1 className="absolute text-white font-[30px] md:font-[62px] bottom-8 md:bottom-16 inset-x-4 md:inset-x-32">{dataDetail.title}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 md:hidden">
                    <SubtitleList />
                </div>
                <div className="p-4 md:py-10 md:pl-32 md:pr-0">
                    <div className="space-y-4">
                        <div dangerouslySetInnerHTML={{ __html: dataDetail.description }} className="md:text-xl text-[#292D32] font-medium"></div>
                    </div>
                    {data.map((item, i) => {
                        return <PreviewComponents data={item} key={i} />
                    })}
                </div>
                <div className="text-center hidden md:block md:text-left md:py-10 md:pr-32 md:pl-16">
                    <OtherLinks />
                    <SubtitleList className="mt-14" />
                </div>
            </div>

        </div>
    )
}