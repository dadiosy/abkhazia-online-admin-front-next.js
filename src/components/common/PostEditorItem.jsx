import { useState } from "react"
import { Select } from "@chakra-ui/react";
import SimpleEditor from "./SimpleEditor";
import OrangeList from "./OrangeList";
import OrangeResultExample from './OrangeResultExample';
import HintRenderComponent from "./HintRenderComponent";
import IconTitleEditor from "./IconTitleEditor";
import IconTitleRenderComponent from "./IconTitleRenderComponent";
import SubTitleEditor from "./SubTitleEditor";
import SubTitleRenderComponent from "./SubTitleRenderComponent";
import LinkButtonRender from "./LinkButtonRender";
import LinkButtonEditor from "./LinkButtonEditor";

const ToolComponent = ({ tool = 'paragraph', onChange = () => { } }) => {
    const handleChange = (tool, data) => {
        onChange(tool, data)
    }
    if (tool === 'paragraph') {
        return <SimpleEditor onChange={data => handleChange('paragraph', data)} />
    } else if (tool === 'orange_list') {
        return <OrangeList onChange={data => handleChange('orange_list', data)} />
    } else if (tool === 'hint') {
        return <SimpleEditor onChange={data => handleChange('hint', data)} />
    } else if (tool === 'icon_title') {
        return <IconTitleEditor onChange={data => handleChange('icon_title', data)} />
    } else if (tool === 'subtitle') {
        return <SubTitleEditor onChange={data => handleChange('subtitle', data)} />
    } else if (tool === 'link_button') {
        return <LinkButtonEditor onChange={data => handleChange('link_button', data)} />
    }
}

const ResultExampleComponent = ({ tool = 'paragraph' }) => {
    if (tool === 'paragraph') {
        return <SimpleEditorResultExample />
    } else if (tool === 'orange_list') {
        return <OrangeResultExample />
    } else if (tool === 'hint') {
        return <HintRenderComponent data='<div>example data</div>' />
    } else if (tool === 'icon_title') {
        return <IconTitleRenderComponent data={{ icon: '/icon/train.svg', title: 'title', sm: 'md' }} />
    } else if (tool === 'subtitle') {
        return <SubTitleRenderComponent data={{ title: 'sub title', size: 'level1' }} />
    } else if (tool === 'link_button') {
        return <LinkButtonRender data={{ caption: 'button', link: '' }} />
    }
}

const SimpleEditorResultExample = () => <div><p>first paragraph.</p><p>next paragraph.</p></div>

export default function PostEditorItem({ onChange = () => { } }) {
    const toolOptions = ['paragraph', 'orange_list', 'icon_title', 'hint', 'booking_card', 'hotel_card', 'link_button', 'image/video', 'subtitle']
    const [tool, setTool] = useState('paragraph')
    const handleToolChange = e => setTool(e.target.value)
    const handleChange = (tool, data) => {
        onChange(tool, data)
    }
    return (
        <div className="flex md:flex-row flex-col">
            <div className="w-[200px]">
                <Select placeholder='выберите инструмент' onChange={handleToolChange} size="sm">
                    {
                        toolOptions.map((option, i) => <option key={i} value={option}>{option}</option>)
                    }
                </Select>
            </div>
            <div className="w-[400px]">
                <ToolComponent tool={tool} onChange={handleChange} />
            </div>
            <div>
                <ResultExampleComponent tool={tool} />
            </div>
        </div>
    )
}