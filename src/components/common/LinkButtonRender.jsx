import Link from "next/link"
import { useRouter } from "next/router"

export default function LinkButtonRender({ data = { caption: '', link: '' } }) {
    const { caption, link } = data
    const router = useRouter()
    const handleClick = () => {
        router.push(link)
    }

    return (
        <button className="border-accent border-[1.5px] rounded-[8px] md:w-fit w-full text-accent px-[20px] py-[10px]" onClick={handleClick}>{caption}</button>
    )
}