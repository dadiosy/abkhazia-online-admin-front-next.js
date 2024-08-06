import { useEffect, useState } from "react"
import { Input, Button, Textarea } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export default function OrangeList({ onChange = () => voide }) {
    const [data, setData] = useState([])
    const handleInputChange = (v, i) => {
        setData(data.map((item, idx) => {
            if (idx === i) {
                return v
            } else {
                return item
            }
        }))
    }

    const handleDelete = (i) => {
        setData(data.filter((item, idx) => idx !== i))
    }

    const handleAdd = () => {
        setData(data.concat(''))
    }

    useEffect(() => {
        onChange(data)
    }, [data])

    return (
        <div>
            {data.map((item, i) =>
                <div className="flex mb-[4px] items-center" key={i}>
                    <Textarea placeholder='input list item' className="mr-[4px]" size="sm" value={item} onChange={e => handleInputChange(e.target.value, i)} rows={2} />
                    <Button size="xs"><DeleteIcon size="xs" onClick={() => handleDelete(i)} /></Button>
                </div>)}
            <div>
                <Button colorScheme='blue' size="xs" onClick={handleAdd}>Add List Item</Button>
            </div>
        </div>
    )
}