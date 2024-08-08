import Link from "next/link";

export default function OfferList(params) {
	return (
		<div className={params.className + ""}>
			<p className="text-[24px] font-semibold">Предлагаем в Цандрыпше:</p>
			<div className="mt-3 md:mt-5 flex justify-around">
				<div className="text-center">
					<img src="/img/SVG/House.svg" className="w-14 h-14 mx-auto" />
					<div className="text-[#292D32] font-extrabold text-xl mt-1.5">Отели</div>
					<Link href={""}>
						<div className="text-[#FF6432] font-medium mt-1 cursor-pointer">Выбрать</div>
					</Link>
				</div>
				<div className="text-center">
					<img src="/img/SVG/Routing.svg" className="w-14 h-14 mx-auto" />
					<div className="text-[#292D32] font-extrabold text-xl mt-1.5">Экскурсии</div>
					<Link href={""}>
						<div className="text-[#FF6432] font-medium mt-1">Забронировать</div>
					</Link>
				</div>
				<div className="text-center">
					<img src="/img/SVG/Transfer.svg" className="w-14 h-14 mx-auto" />
					<div className="text-[#292D32] font-extrabold text-xl mt-1.5">Трансфер</div>
					<Link href={""}>
						<div className="text-[#FF6432] font-medium mt-1">Заказать</div>
					</Link>
				</div>
			</div>
		</div>
	)
}