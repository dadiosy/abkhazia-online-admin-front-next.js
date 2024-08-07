export default function OtherLinks(params) {
	return (
		<div className={"flex gap-x-4 " + params.className}>
			<div className="rounded-full bg-[#EEEEEE] w-fit p-4">
				<img src="/img/TG.svg" className="w-[38px] h-[38px]" />
			</div>
			<div className="rounded-full bg-[#EEEEEE] w-fit p-4">
				<img src="/img/VK.svg" className="w-[38px] h-[38px]" />
			</div>
			<div className="rounded-full bg-[#EEEEEE] w-fit p-4">
				<img src="/img/link.svg" className="w-[38px] h-[38px]" />
			</div>
		</div>
	)
}