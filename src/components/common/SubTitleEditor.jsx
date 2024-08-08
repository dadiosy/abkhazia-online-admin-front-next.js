import { Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"

export default function SubTitleEditor({ data = { title: "", size: "level1" }, onChange = () => { } }) {
    return (
        <div>
            <Input onChange={e => onChange({ ...data, title: e.target.value })} value={data.title} size="sm" />
            <RadioGroup onChange={e => onChange({ ...data, size: e })} value={data.size}>
                <Stack direction='row'>
                    <Radio value='level1'>уровень1</Radio>
                    <Radio value='level2'>уровень2</Radio>
                </Stack>
            </RadioGroup>
        </div>
    )
}