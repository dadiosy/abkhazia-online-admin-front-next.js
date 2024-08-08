import Editor from 'react-simple-wysiwyg';

export default function SimpleEditor({ data = "", onChange = () => { } }) {
    const handleChange = (e) => {
        onChange(e.target.value)
    }
    return (
        <div>
            <Editor value={data} onChange={handleChange} />
        </div>
    )
}