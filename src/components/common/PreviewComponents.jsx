import HintRenderComponent from "./HintRenderComponent"
import IconTitleRenderComponent from "./IconTitleRenderComponent"
import LinkButtonRender from "./LinkButtonRender"
import OrangeListComponent from "./OrangeListComponent"
import SubTitleRenderComponent from "./SubTitleRenderComponent"

export default function PreviewComponents({ data }) {
    switch (data.tool) {
        case 'paragraph':
            return <div dangerouslySetInnerHTML={{
                __html: data.data
            }} ></div>
        case 'orange_list':
            return <OrangeListComponent data={data.data} />
        case 'hint':
            return <HintRenderComponent data={data.data} />
        case 'icon_title':
            return <IconTitleRenderComponent data={data.data} />
        case 'subtitle':
            return <SubTitleRenderComponent data={data.data} />
        case 'link_button':
            return <LinkButtonRender data={data.data} />
        default:
            return null
    }
}