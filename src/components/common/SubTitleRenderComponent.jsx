export default function SubTitleRenderComponent({ data }) {
    const { title, size } = data
    const textStyle = {
        level1: 'md:text-h3 text-h5 md:mb-[32px] mb-[12px]',
        level2: 'md:text-h4 text-h6 md:mb-[24px] mb-[8px]'
    }
    return (
        <div>
            <h3 className={size === 'level1' ? textStyle.level1 : textStyle.level2}>{title}</h3>
        </div>
    )
}