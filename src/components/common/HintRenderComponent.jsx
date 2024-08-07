export default function HintRenderComponent(data) {
    return (
        <div>
            <div className="flex items-center border border-accent rounded-[12px] mt-3 md:mt-4 md:p-[32px] p-[16px] bg-[#FFF8ED]">
                <img src='/img/hint.png' className="w-[72px] h-auto mr-[24px] md:inline hidden" />
                <img src='/icon/lamp-on.svg' className="w-[38px] h-auto mr-[16px] md:hidden inline" />
                <div className="md:text-p1 text-p3" dangerouslySetInnerHTML={{
                    __html: data.data
                }}></div>
            </div>
        </div>
    )
}