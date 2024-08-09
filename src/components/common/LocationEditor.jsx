import { normalInputCss } from '../../const/CustomConsts';
import YMapProvider from "../../pages/components/common/YMapProvider";

export default function LocationEditor({ data = { latitude: 0, longitude: 0 }, onChange = () => { } }) {
    const getXY = (XY) => {
        onChange({ ...data, latitude: XY[0], longitude: XY[1] })
    }
    const handleTextChange = (e) => {
        onChange({ ...data, latitude: e.target.value })
    }
    return (
        <div className="flex flex-col gap-3" >
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <div className="my-2 mx-5 w-32 font-bold">Широта:</div>
                    <input name="latitude" required onChange={handleTextChange} className={normalInputCss} value={data.latitude} />
                </div>
                <div className="flex flex-row  w-1/2">
                    <div className="my-2 mx-5 w-32 font-bold">Долгота:</div>
                    <input name="longitude" required onChange={handleTextChange} className={normalInputCss} value={data.longitude} />
                </div>
            </div>
            <div>
                <YMapProvider className="rounded-xl" mapX={data?.latitude} mapY={data?.longitude} onChildData={getXY} />
            </div>
        </div>
    )
}