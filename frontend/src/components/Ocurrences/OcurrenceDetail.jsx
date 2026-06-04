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

				{ocurrence.photoUrl && (
					<div className="w-full my-4">
						<img
							src={ocurrence.photoUrl}
							className="w-full max-h-96 object-center"
						/>
					</div>
				)}

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
							{ocurrence.author}
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
							{ocurrence.totalConfirmation} usuários também viram isso!
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
