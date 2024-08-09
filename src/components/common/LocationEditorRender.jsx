import YMapProvider from "../../pages/components/common/YMapProvider"

export default function LocationEditorRender({ data = { latitude: 0, longitude: 0 } }) {
    return (
        <div className="mt-3 md:mt-8 ">
            <YMapProvider className="rounded-xl" mapX={data?.latitude} mapY={data?.longitude} />
        </div>
    )
}