const data = [
	"Где находится Цандрыпш",
	"Как добраться до поселка Цандрыпш",
	"Как добраться по маршруту аэропорт Адлер — Цандрипш",
	"Как добраться до Цандрыпша от крупных городов Абхазии",
	"История Цандрыпша",
	"Достопримечательности поселка Цандрыпш, что посмотреть",
	"Пляжи Цандрыпша",
]

export default function SubtitleList(params) {
	return (
		<div className={params.className}>
			<div className="text-[24px] font-semibold">Оглавление</div>
			<div className="space-y-3 mt-3 md:mt-4">
				{
					data.map((item, i) =>
						<div key={i}>
							<div className="flex items-center">
								{i == 0 ?
									<img src="/img/detail-svg/dot-red.svg" className="mr-5" /> :
									<img src="/img/detail-svg/dot-yon.svg" className="mr-5" />
								}
								<span className="text-p1 truncate">{item}</span>
							</div>
						</div>)
				}
			</div>
		</div>
	)
}