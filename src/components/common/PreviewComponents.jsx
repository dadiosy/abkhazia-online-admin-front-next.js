import HintRenderComponent from "./HintRenderComponent"
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
        default:
            return null
    }
}