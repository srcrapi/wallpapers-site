interface ShowImagesProps {
	url: string;
}

export default function ShowImages({ url }: ShowImagesProps) {
	const name: string = url.split("/").pop()?.split(".")[0] ?? "Unknown";

	return (
		<div className="mb-5 w-full">
			<img
				title={name}
				src={url}
				alt={name}
				onClick={() => window.open(url, "_blank")}
				className="w-full h-full cursor-pointer transition-all grayscale-0 duration-300 ease-in-out rounded-xl hover:grayscale-0 lg:grayscale"
			/>
		</div>
	);
}
