import OrangeListComponent from "./OrangeListComponent";

export default function OrangeResultExample() {
    const exampleData = [
        'example result1',
        'example result2',
        'example result3',
    ]
    return (
        <div>
            <OrangeListComponent data={exampleData} />
        </div>
    )
}