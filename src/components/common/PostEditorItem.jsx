import { useState } from "react"
import { Select } from "@chakra-ui/react";
import SimpleEditor from "./SimpleEditor";
import OrangeList from "./OrangeList";
import OrangeResultExample from './OrangeResultExample';
import HintRenderComponent from "./HintRenderComponent";

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
    }
}

const ResultExampleComponent = ({ tool = 'paragraph' }) => {
    if (tool === 'paragraph') {
        return <SimpleEditorResultExample />
    } else if (tool === 'orange_list') {
        return <OrangeResultExample />
    } else if (tool === 'hint') {
        return <HintRenderComponent data='<div>example data</div>' />
    }
}

const SimpleEditorResultExample = () => <div><p>first paragraph.</p><p>next paragraph.</p></div>

export default function PostEditorItem({ onChange = () => { } }) {
    const toolOptions = ['paragraph', 'orange_list', 'icon_header', 'hint', 'booking_card', 'hotel_card', 'link_button', 'image/video']
    const [tool, setTool] = useState('paragraph')
    const handleToolChange = e => setTool(e.target.value)
    const handleChange = (tool, data) => {
        onChange(tool, data)
    }
    return (
        <div className="flex md:flex-row flex-col">
            <div className="w-[200px]">
                <Select placeholder='выберите инструмент' onChange={handleToolChange}>
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