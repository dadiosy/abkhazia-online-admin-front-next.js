import { Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import IconList from "./IconList"

export default function IconTitleEditor({ data = { size: "sm", title: "", icon: "" }, onChange = () => { } }) {
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
    }
    return (
        <>
            {
                data &&
                <div>
                    <div className="relative">
                        <div className="flex">
                            <div className="w-[32px] h-[32px] mr-[16px] rounded-lg border cursor-pointer p-[4px]" onClick={handleToggle}>
                                {data.icon ? <img src={data.icon} className="w-[24px] h-[24px]" /> : null}
                            </div>
                            <Input size="sm" onChange={e => onChange({ ...data, title: e.target.value })} value={data.title} />

                        </div>
                        <RadioGroup onChange={e => onChange({ ...data, size: e })} value={data.size}>
                            <Stack direction='row'>
                                <Radio value='sm'>sm</Radio>
                                <Radio value='md'>md</Radio>
                            </Stack>
                        </RadioGroup>
                    </div>
                    {toggle ?
                        <IconList className="absolute" onChange={e => onChange({ ...data, icon: e})} /> : null}
                </div>
            }
        </>
    )
}