import HintRenderComponent from "./HintRenderComponent"
import IconTitleRenderComponent from "./IconTitleRenderComponent"
import OrangeListComponent from "./OrangeListComponent"

export default function PreviewComponents({ data }) {
    console.log('uuu', data)
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
        default:
            return null
    }
}