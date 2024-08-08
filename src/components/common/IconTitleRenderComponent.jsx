export default function IconTitleRenderComponent({ data }) {
    const titleStyle = {
        md: 'md:text-h4 text-h6',
        sm: 'md:text-[24px] text-[16px] md:leading-[28.8px] leading-[24px] md:font-[600] font-[800]'
    }

    const imgStyle = {
        sm: 'md:w-[28px] w-[24px] h-auto md:mr-[8px] mr-[4px]',
        md: 'md:w-[36px] w-[24px] h-auto md:mr-[12px] mr-[8px]'
    }

    return (<>
        {
            data &&
            <div>
                <div className="flex items-center mt-4 md:mt-8">
                    {data.icon ? <img src={data.icon} alt="icon" className={data.size == 'md' ? imgStyle.md : imgStyle.sm} /> : null}
                    <h4 className={data.size == 'md' ? titleStyle.md : titleStyle.sm}>{data.title}</h4>
                </div>
            </div>
        }
    </>
    )
}