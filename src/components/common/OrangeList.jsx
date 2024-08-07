import { useEffect, useState } from "react"
import { Input, Button, Textarea } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export default function OrangeList({ data = [], onChange = () => { } }) {
    const handleInputChange = (v, i) => {
        const temp = data.map((item, idx) => {
            if (idx === i) {
                return v
            } else {
                return item
            }
        })
        onChange(temp)
    }

    const handleDelete = (i) => {
        onChange(data.filter((item, idx) => idx !== i))
    }

    const handleAdd = () => {
        onChange([...data, ''])
    }

    return (
        <div>
            {data.map((item, i) =>
                <div className="flex mb-[4px] items-center" key={i}>
                    <Input placeholder='input list item' className="mr-[4px]" size="sm" value={item} onChange={e => handleInputChange(e.target.value, i)} rows={2} />
                    <Button size="xs"><DeleteIcon size="xs" onClick={() => handleDelete(i)} /></Button>
                </div>)}
            <div>
                <Button colorScheme='blue' size="xs" onClick={handleAdd}>Add List Item</Button>
            </div>
        </div>
    )
}