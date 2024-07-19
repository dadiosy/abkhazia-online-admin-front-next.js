import Link from "next/link";
const LinkIndex = ({ indexName }) => {
    return (
        <div className="flex gap-2 md:gap-3 md:py-3 text-sm md:text-md font-medium font-Manrop">
            <div className="text-[#B5B5B5]">
                <Link href="/">Главная</Link>
            </div>
            <div>
                / {indexName}
            </div>
        </div>
    )
}
export default LinkIndex;