import PreviewComponents from "./PreviewComponents"

export default function EditorPreview({ data = [] }) {
    console.log('hei', data)
    return (
        <div>
            {data.map((item, i) => {
                return <PreviewComponents data={item} key={i} />
            })}
        </div>
    )
}