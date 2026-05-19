import { XIcon } from "lucide-react";

export const OcurrrenceDetail = ({ ocurrence }) => {
	return (
		<dialog
			id={`ocurrence-modal-${ocurrence.id}`}
			className="modal modal-middle"
		>
			<div className="modal-box max-w-10/12 lg:max-w-6/12 xl:max-w-5/12">
				<div className="w-full flex items-center justify-between mb-6">
					<div className="flex items-center gap-4">
						<div className="badge badge-secondary">
							{ocurrence.category.name}
						</div>
						<h2 className="font-bold text-lg">{ocurrence.title}</h2>
					</div>
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost">
							<XIcon />
						</button>
					</form>
				</div>

				<div className="carousel w-full">
					<div id="slide1" className="carousel-item relative w-full">
						<img
							src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
							className="w-full"
						/>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide4" className="btn btn-circle">
								❮
							</a>
							<a href="#slide2" className="btn btn-circle">
								❯
							</a>
						</div>
					</div>
					<div id="slide2" className="carousel-item relative w-full">
						<img
							src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
							className="w-full"
						/>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide1" className="btn btn-circle">
								❮
							</a>
							<a href="#slide3" className="btn btn-circle">
								❯
							</a>
						</div>
					</div>
					<div id="slide3" className="carousel-item relative w-full">
						<img
							src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
							className="w-full"
						/>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide2" className="btn btn-circle">
								❮
							</a>
							<a href="#slide4" className="btn btn-circle">
								❯
							</a>
						</div>
					</div>
					<div id="slide4" className="carousel-item relative w-full">
						<img
							src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
							className="w-full"
						/>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide3" className="btn btn-circle">
								❮
							</a>
							<a href="#slide1" className="btn btn-circle">
								❯
							</a>
						</div>
					</div>
				</div>

				<div className="mt-6">
					<p className="text-base">
						<span className="text-[#C7C7C7]">
							Descrição:
							<br />
						</span>
						{ocurrence.description}
					</p>

					<div className="mt-4 flex items-center justify-between">
						<p className="text-base">
							<span className="text-[#C7C7C7]">
								Reportado por:
								<br />
							</span>
							{ocurrence.user.name}
						</p>

						<p className="text-base">
							<span className="text-[#C7C7C7]">
								Data:
								<br />
							</span>
							{new Date(ocurrence.createdAt).toLocaleDateString("pt-BR")}
						</p>

						<p className="text-base">
							<span className="text-[#C7C7C7]">
								Apoios:
								<br />
							</span>
							{ocurrence.totalConfirmation} usuáriostambém viram isso!
						</p>
					</div>

					<div className="w-full flex justify-end mt-12">
						<button className="btn w-1/4 bg-cyan-800 text-gray-50 hover:bg-cyan-900">
							Eu também vi!
						</button>
					</div>
				</div>
			</div>
		</dialog>
	);
};
