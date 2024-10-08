import { useEffect, useState } from 'react'
import PostEditorItem from './PostEditorItem'
import { Button } from "@chakra-ui/react";

export default function PostEditor({ data = [], onChange = () => { } }) {
    const handleAddItem = () => {
        onChange(data.concat({ tool: 'paragraph', data: '' }))
    }

    const handleChange = (tool, _data, i) => {
        onChange(data.map((item, idx) => idx === i ? ({ tool, data: _data }) : item))
    }

    const onRemove = (index) => {
        const newData = [...data]
        newData.splice(index, 1)
        onChange(newData)
    }
    const onInsert = (index) => {
        const newDatum = { tool: 'paragraph', data: '' }
        const newData = [...data]
        newData.splice(index, 0, newDatum)
        onChange(newData)
    }

    useEffect(() => {
        onChange(data)
    }, [data])

    return (
        <div>
            <div className='space-y-3'>
                {data.map((item, i) => {
                    return <PostEditorItem
                        key={i} index={i} itemtool={item.tool} itemdata={item.data}
                        onChange={(tool, data) => handleChange(tool, data, i)}
                        handleRemove={onRemove}
                        handleInsert={onInsert}
                    />
                })}
            </div>
            <div className='mt-10'>
                <Button onClick={handleAddItem}>Добавить элемент</Button>
            </div>
        </div>
    )
}