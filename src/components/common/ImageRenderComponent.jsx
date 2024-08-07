
export default function ImageRenderComponent({ data }) {
	return (
		<>
			{data &&
				<img src={data.thumbURL} className="w-full mt-4 md:mt-6" />
			}
		</>
	)
}