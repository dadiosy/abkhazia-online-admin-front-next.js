import { Select } from "@chakra-ui/react";
import SimpleEditor from "./SimpleEditor";
import OrangeList from "./OrangeList";
import IconTitleEditor from "./IconTitleEditor";
import SubTitleEditor from "./SubTitleEditor";
import LinkButtonEditor from "./LinkButtonEditor";
import ImageEditor from "./ImageEditor";
import LocationEditor from "./LocationEditor";

const ToolComponent = ({ tool = 'paragraph', data = undefined, onChange = () => { } }) => {
    const handleChange = (tool, data) => {
        onChange(tool, data)
    }
    switch (tool) {
        case 'paragraph': return <SimpleEditor data={data} onChange={data => handleChange('paragraph', data)} />;
        case 'orange_list': return <OrangeList data={data} onChange={data => handleChange('orange_list', data)} />
        case 'hint': return <SimpleEditor data={data} onChange={data => handleChange('hint', data)} />
        case 'icon_title': return <IconTitleEditor data={data} onChange={data => handleChange('icon_title', data)} />
        case 'subtitle': return <SubTitleEditor data={data} onChange={data => handleChange('subtitle', data)} />
        case 'link_button': return <LinkButtonEditor data={data} onChange={data => handleChange('link_button', data)} />
        case 'image': return <ImageEditor data={data} onChange={data => handleChange('image', data)} />
        case 'location': return <LocationEditor data={data} onChange={data => handleChange('location', data)} />
        default:
            break;
    }
}

export default function PostEditorItem({ index = 0, itemtool = "", itemdata = undefined, onChange = () => { }, handleRemove = () => { }, handleInsert = () => { } }) {
    const toolOptions = [
        { label: "параграф", value: 'paragraph' },
        { label: "оранжевый_список", value: 'orange_list' },
        { label: "значок_название", value: 'icon_title' },
        { label: "намекать", value: 'hint' },
        { label: "кнопка_ссылки", value: 'link_button' },
        { label: "изображение", value: 'image' },
        { label: "субтитры", value: 'subtitle' },
        { label: "location", value: 'location' },
    ]
    const handleToolChange = (e) => {
        onChange(e.target.value)
    }
    const handleChange = (tool, data) => {
        onChange(tool, data)
    }
    const handleClickInsert = () => {
        handleInsert(index)
    }
    const hanldeClickDelete = () => {
        handleRemove(index)
    }
    return (
        <div className="flex md:flex-row flex-col gap-x-2">
            <div className="w-[150px]">
                <Select placeholder='выберите инструмент' value={itemtool} onChange={handleToolChange} size="sm">
                    {
                        toolOptions.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)
                    }
                </Select>
            </div>
            <div className="w-[400px]">
                <ToolComponent tool={itemtool} data={itemdata} onChange={handleChange} />
            </div>
            <div className="flex gap-3">
                <div className="cursor-pointer px-3 py-1 h-fit border border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white" onClick={handleClickInsert}>вставлять</div>
                <div className="cursor-pointer px-3 py-1 h-fit border border-red-600 rounded-md text-red-600 hover:bg-red-600 hover:text-white" onClick={hanldeClickDelete}>удалить</div>
            </div>

        </div>
    )
}