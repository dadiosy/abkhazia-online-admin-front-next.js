import Link from "next/link";
const LinkDetail = ({ indexName, indexLink, detailName }) => {
    return (
        <div className="flex w-fit py-1 md:py-3 rounded-lg
        lg:bg-white lg:bg-opacity-40 lg:px-6        
         text-sm md:text-md md:gap-3 font-Manrop text-white">
            <Link href='/'>
                Главная
            </Link>
            <div className="text-white">/</div>
            <Link href={indexLink}>
                {indexName}
            </Link>
            <div className="text-white">/</div>
            <div className=" text-white flex-wrap custom-ellipsis-1">
                {detailName}
            </div>
        </div >
    )
}
export default LinkDetail;