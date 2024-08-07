import { Input } from "@chakra-ui/react";

export default function LinkButtonEditor({ data = { caption: "", link: "" }, onChange = () => { } }) {
    return (
        <div className="space-y-1">
            <Input placeholder="caption" value={data.caption} onChange={e => onChange({ ...data, caption: e.target.value })} size="sm" />
            <Input placeholder="link" value={data.link} onChange={e => onChange({ ...data, link: e.target.value })} size="sm" />
        </div>
    )
}