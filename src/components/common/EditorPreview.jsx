import PreviewComponents from "./PreviewComponents"

export default function EditorPreview({ data = [] }) {
    return (
        <div>
            {data.map((item, i) => {
                return <PreviewComponents data={item} key={i} />
            })}
        </div>
    )
}