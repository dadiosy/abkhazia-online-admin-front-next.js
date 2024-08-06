import { Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import IconList from "./IconList"

export default function IconTitleEditor({ onChange = () => { } }) {
    const [icon, setIcon] = useState('')
    const [title, setTitle] = useState('')
    const [toggle, setToggle] = useState(false)
    const [size, setSize] = useState('sm')

    const handleToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        onChange({ icon, title, size })
    }, [icon, title, size])

    return (
        <div>
            <div className="flex relative">
                <div className="w-[32px] h-[32px] mr-[16px] rounded-lg border cursor-pointer p-[4px]" onClick={handleToggle}>
                    {icon ? <img src={icon} className="w-[24px] h-[24px]" /> : null}
                </div>
                <Input size="sm" onChange={e => setTitle(e.target.value)} value={title} />
                <RadioGroup onChange={setSize} value={size}>
                    <Stack direction='row'>
                        <Radio value='sm'>sm</Radio>
                        <Radio value='md'>md</Radio>
                    </Stack>
                </RadioGroup>
            </div>
            {toggle ?
                <IconList className="absolute" onChange={setIcon} /> : null}
        </div>
    )
}