import { useEffect, useState } from "react"
import Editor from 'react-simple-wysiwyg';

export default function SimpleEditor({ onChange = () => { } }) {
    const [html, setHtml] = useState('');

    const handleChange = (e) => {
        setHtml(e.target.value)
    }

    useEffect(() => {
        onChange(html)
    }, [html])

    return (
        <div>
            <Editor value={html} onChange={handleChange} />
        </div>
    )
}