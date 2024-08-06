import { useEffect, useState } from 'react'
import PostEditor from '../../../components/common/PostEditor';
import EditorPreview from '../../../components/common/EditorPreview';

export default function DirectionCreatePage() {
    const [data, setData] = useState([])

    const handleChange = (_data) => {
        setData(_data)
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div>
            <PostEditor onChange={handleChange} />
            <EditorPreview data={data} />
        </div>
    )
}