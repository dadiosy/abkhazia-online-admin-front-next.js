export default function OrangeListComponent({ data = [] }) {
    return (
        <div className="space-y-3 mt-2 md:mt-4">
            {data.map((item, i) =>
                <div key={i}>
                    <div className="flex items-center">
                        <span className="rounded-[50%] mr-[12px] w-[16px] h-[16px] bg-accent block"></span>
                        <span className="text-p1">{item}</span>
                    </div>
                    {i < data.length - 1 ? <div className="border-l h-[12px] ml-[8px]"></div> : null}
                </div>)}
        </div>
    )
}