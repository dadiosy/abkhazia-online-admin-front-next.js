export default function SubTitleRenderComponent({ data = { title: "", size: "level1" } }) {
    const { title, size } = data
    const textStyle = {
        level1: 'md:text-h3 text-h5 mt-[32px] md:mt-[80px]',
        level2: 'md:text-h4 text-h6 mt-[24px] md:mt-[56px]'
    }
    return (
        <div>
            <h3 className={size === 'level1' ? textStyle.level1 : textStyle.level2}>{title}</h3>
        </div>
    )
}