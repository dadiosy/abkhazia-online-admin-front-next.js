import { Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function SubTitleEditor({ onChange = () => { } }) {
    const [title, setTitle] = useState('')
    const [size, setSize] = useState('level1')
    const handleChange = e => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        onChange({ title, size })
    }, [title, size])

    return (
        <div>
            <div className="flex">
                <Input onChange={handleChange} value={title} size="sm" />
                <RadioGroup onChange={setSize} value={size}>
                    <Stack direction='row'>
                        <Radio value='level1'>Level1</Radio>
                        <Radio value='level2'>Level2</Radio>
                    </Stack>
                </RadioGroup>
            </div>
        </div>
    )
}