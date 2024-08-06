import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function LinkButtonEditor({ onChange = () => { } }) {
    const [caption, setCaption] = useState('')
    const [link, setLink] = useState('')

    const handleChange = e => {
        setCaption(e.target.value)
    }
    const handleLinkChange = e => {
        setLink(e.target.value)
    }

    useEffect(() => {
        onChange({ caption, link })
    }, [caption, link])

    return (
        <div>
            <label>caption</label>
            <Input value={caption} onChange={handleChange} size="sm" />
            <label>link</label>
            <Input value={link} onChange={handleLinkChange} size="sm" />
        </div>
    )
}