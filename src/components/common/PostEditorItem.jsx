import { useState } from "react"
import { Select } from "@chakra-ui/react";
import SimpleEditor from "./SimpleEditor";
import OrangeList from "./OrangeList";
import IconTitleEditor from "./IconTitleEditor";
import SubTitleEditor from "./SubTitleEditor";
import LinkButtonEditor from "./LinkButtonEditor";
import ImageEditor from "./ImageEditor";

const ToolComponent = ({ tool = 'paragraph', data = undefined, onChange = () => { } }) => {
    const handleChange = (tool, data) => {
        onChange(tool, data)
    }
    if (tool === 'paragraph') {
        return <SimpleEditor data={data} onChange={data => handleChange('paragraph', data)} />
    } else if (tool === 'orange_list') {
        return <OrangeList data={data} onChange={data => handleChange('orange_list', data)} />
    } else if (tool === 'hint') {
        return <SimpleEditor data={data} onChange={data => handleChange('hint', data)} />
    } else if (tool === 'icon_title') {
        return <IconTitleEditor data={data} onChange={data => handleChange('icon_title', data)} />
    } else if (tool === 'subtitle') {
        return <SubTitleEditor data={data} onChange={data => handleChange('subtitle', data)} />
    } else if (tool === 'link_button') {
        return <LinkButtonEditor data={data} onChange={data => handleChange('link_button', data)} />
    } else if (tool === 'image') {
        return <ImageEditor data={data} onChange={data => handleChange('image', data)} />
    }
}

export default function PostEditorItem({ index = 0, itemtool = "", itemdata = undefined, onChange = () => { }, handleRemove = () => { }, handleInsert = () => { } }) {
    const toolOptions = ['paragraph', 'orange_list', 'icon_title', 'hint', 'booking_card', 'hotel_card', 'link_button', 'image', 'subtitle']
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
            <div className="w-[200px]">
                <Select placeholder='выберите инструмент' value={itemtool} onChange={handleToolChange} size="sm">
                    {
                        toolOptions.map((option, i) => <option key={i} value={option}>{option}</option>)
                    }
                </Select>
            </div>
            <div className="w-[400px]">
                <ToolComponent tool={itemtool} data={itemdata} onChange={handleChange} />
            </div>
            <div className="flex gap-3">
                <div className="cursor-pointer" onClick={handleClickInsert}>insert</div>
                <div className="cursor-pointer" onClick={hanldeClickDelete}>delete</div>
            </div>

        </div>
    )
}