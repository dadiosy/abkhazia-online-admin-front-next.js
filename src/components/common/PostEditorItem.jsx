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
        { label: "Абзац", value: 'paragraph' },
        { label: "Маркированный список", value: 'orange_list' },
        { label: "Стикеры", value: 'icon_title' },
        { label: "Подсказка", value: 'hint' },
        { label: "Кнопка", value: 'link_button' },
        { label: "изображение", value: 'image' },
        { label: "Изображение", value: 'subtitle' },
        { label: "Подзаголовок", value: 'location' },
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
        <div className="flex md:flex-row flex-col gap-x-4">
            <div className="w-[150px]">
                <Select value={itemtool} onChange={handleToolChange} size="sm">
                    {
                        toolOptions.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)
                    }
                </Select>
            </div>
            <div className="w-[400px]">
                <ToolComponent tool={itemtool} data={itemdata} onChange={handleChange} />
            </div>
            <div className="flex gap-2">
                <img className="cursor-pointer w-7 h-7" src="/icon/insert.png" onClick={handleClickInsert}/>
                <img src="/icon/trash.svg" className="cursor-pointer w-7 h-7" onClick={hanldeClickDelete}/>
            </div>

        </div>
    )
}