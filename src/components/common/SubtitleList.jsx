import Link from "next/link";
import Scrollspy from "react-scrollspy";

export default function SubtitleList({ params = [] }) {
	const items = params.map((c, i) => `subtitle-${c.data.title}`)
	return (
		<>
			{params &&
				<div className="flex flex-col gap-3 md:gap-6">
					<h4 className="text-[20px] md:text-[30px]">
						Оглавление
					</h4>
					<Scrollspy items={items} currentClassName="is-current">
						{params.map((c, i) => (
							<li key={i} className="flex items-center gap-3 py-2 !text-base md:!text-md">
								<div className="flex-none w-3 h-3 md:w-4 md:h-4 bg-red-300 rounded-full"></div>
								<Link href={`#subtitle-${c.data.title}`}>{c.data.title}
								</Link>
							</li>
						))}
					</Scrollspy>
				</div>
			}
		</>

	)
}