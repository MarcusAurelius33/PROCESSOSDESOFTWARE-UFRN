import { XIcon, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useOcurrences } from "@/hooks/useOcurrences";

export const OcurrrenceDetail = ({ ocurrence }) => {
	const mockEmail = "teste2@suricato.local";
	
	const { myConfirmations = [], ocurrenceConfirmer } = useOcurrences(mockEmail);
	const { confirmOcurrence, isConfirming } = ocurrenceConfirmer;
	
	const [feedback, setFeedback] = useState({ type: null, message: "" });

	const hasConfirmed = myConfirmations.includes(ocurrence.id);

	const triggerFeedbackModal = (type, message) => {
		document.getElementById(`ocurrence-modal-${ocurrence.id}`).close();
		
		setFeedback({ type, message });
		
		const feedbackModal = document.getElementById(`feedback-modal-${ocurrence.id}`);
		feedbackModal.showModal();

		setTimeout(() => {
			if (feedbackModal.open) {
				feedbackModal.close();
			}
		}, 3500);
	};

	const handleConfirm = () => {
		confirmOcurrence(
			{ id: ocurrence.id, userEmail: mockEmail },
			{
				onSuccess: () => {
					triggerFeedbackModal(
						"success", 
						"Apoio registrado! Aumentamos a visibilidade deste problema para a gestão municipal."
					);
				},
				onError: () => {
					triggerFeedbackModal(
						"error", 
						"Nosso sistema identifica que você já registrou apoio a esta ocorrência."
					);
				},
			}
		);
	};

	return (
		<>
			<dialog id={`ocurrence-modal-${ocurrence.id}`} className="modal modal-middle">
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
								alt={`Foto da ocorrência: ${ocurrence.title}`}
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
								{ocurrence.totalConfirmation} cidadãos validaram.
							</p>
						</div>

						<div className="w-full flex justify-end mt-12">
							<button
								onClick={handleConfirm}
								disabled={hasConfirmed || isConfirming}
								className={`btn w-full sm:w-2/4 lg:w-1/3 ${
									hasConfirmed
										? "btn-disabled bg-gray-300 text-gray-500 border-none"
										: "bg-cyan-800 text-gray-50 hover:bg-cyan-900 border-none"
								}`}
							>
								{isConfirming
									? "Processando..."
									: hasConfirmed
									? "Apoio já registrado"
									: "Eu também vi!"}
							</button>
						</div>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>

			<dialog id={`feedback-modal-${ocurrence.id}`} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box text-center flex flex-col items-center justify-center py-10">
					{feedback.type === "success" ? (
						<CheckCircle size={64} className="text-success mb-4" />
					) : (
						<AlertTriangle size={64} className="text-error mb-4" />
					)}
					<h3 className="font-bold text-xl mb-2">
						{feedback.type === "success" ? "Sucesso!" : "Atenção"}
					</h3>
					<p className="text-gray-600">{feedback.message}</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
};