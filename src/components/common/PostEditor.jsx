import { useEffect, useState } from 'react'
import PostEditorItem from './PostEditorItem'
import { Button } from "@chakra-ui/react";

export default function PostEditor({ onChange = () => { } }) {
    const [data, setData] = useState([])
    const handleAddItem = () => {
        setData(data.concat({ tool: 'paragraph', data: '' }))
    }

    const handleChange = (tool, _data, i) => {
        setData(data.map((item, idx) => idx === i ? ({ tool, data: _data }) : item))
    }

    useEffect(() => {
        onChange(data)
    }, [data])

    return (
        <div>
            <div>
                {data.map((item, i) => {
                    return <PostEditorItem key={i} tool={item.tool} data={item.data} onChange={(tool, data) => handleChange(tool, data, i)} />
                })}
            </div>
            <div>
                <Button onClick={handleAddItem}>Add Item</Button>
            </div>
        </div>
    )
}