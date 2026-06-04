import { useCategories } from "@/hooks/useCategories";
import { useUserPosition } from "@/hooks/useUserPosition";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { XIcon, EditIcon } from "lucide-react";
import { useEffect, useState } from "react";

async function reverseLocation(position) {
	const response = await axios.get(
		`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&layer=address&format=json`
	);
	return response.data;
}

export const OcurrenceRegistration = ({
	isEditing = false,
	initialData = {},
	onSubmit,
}) => {
	const [formData, setFormData] = useState({
		id: initialData.id || 0,
		title: initialData.title || "",
		description: initialData.description || "",
		categoryId: initialData.categoryId || "",
		address: initialData.address || "",
		latitude: initialData.latitude || 0.0,
		longitude: initialData.longitude || 0.0,
		city: initialData?.city?.name || "",
		state: initialData?.city?.state || "",
		country: initialData?.city?.country || "",
		photo: null,
	});
	const position = useUserPosition();
	const { data: categories = [], isLoading: loadingCategories } =
		useCategories();

	const { data: reverseLocationData } = useQuery({
		queryKey: ["reverseLocation"],
		queryFn: () => reverseLocation(position),
	});

	useEffect(() => {
		if (reverseLocationData) {
			handleFormChange("address", reverseLocationData.display_name);
			handleFormChange("latitude", position.lat);
			handleFormChange("longitude", position.lng);
			handleFormChange("city", reverseLocationData.address.city || "");
			handleFormChange("state", reverseLocationData.address.state || "");
			handleFormChange("country", reverseLocationData.address.country || "");
		}
	}, [reverseLocationData, position]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = new FormData();

		Object.entries(formData).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				payload.append(key, value);
			}
		});

		onSubmit(payload);

		setFormData({
			title: "",
			description: "",
			categoryId: "",
			address: "",
			latitude: 0.0,
			longitude: 0.0,
			city: "",
			state: "",
			country: "",
			photo: null,
		});

		document.getElementById(`ocurrence-modal-registration`).closeModal();
	};

	function handleFormChange(field, value) {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	return (
		<dialog id={`ocurrence-modal-registration`} className="modal modal-middle">
			<div className="modal-box container max-w-5xl text-base">
				<div className="w-full flex items-center justify-between mb-6">
					<h1 className="font-bold text-xl">
						{isEditing ? "Editar ocorrência" : "Cadastrar nova ocorrência"}
					</h1>
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost">
							<XIcon />
						</button>
					</form>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<div className="w-full join">
						<input
							type="text"
							className="w-full input join-item"
							placeholder="Endereço da ocorrência"
							value={formData.address || "Obtendo localização..."}
							readOnly
							required
						/>
						<button className="btn join-item" type="button">
							<EditIcon />
						</button>
					</div>

					<div className="flex w-full items-center gap-6 flex-col md:flex-row">
						<div className="w-full">
							<label
								className="fieldset-legend max-w-max"
								htmlFor="ocurrente-title"
							>
								Título do problema <span className="text-red-500">*</span>
							</label>
							<input
								onChange={(e) => handleFormChange("title", e.target.value)}
								value={formData.title}
								type="text"
								placeholder="Título da ocorrência"
								className="w-full input input-md"
								id="ocurrente-title"
								required
							/>
						</div>

						<div className="w-full flex flex-col">
							<label className="fieldset-legend" htmlFor="ocurrence-category">
								Tipo do problema
							</label>
							<select
								onChange={(e) => handleFormChange("categoryId", e.target.value)}
								value={formData.categoryId}
								className="w-full select"
								id="ocurrence-category"
								required
							>
								<option value="">Selecione uma categoria</option>
								{!loadingCategories &&
									categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
							</select>
						</div>
					</div>

					<div className="w-full flex flex-col">
						<label className="fieldset-legend" htmlFor="ocurrence-description">
							Descrição do problema
						</label>
						<textarea
							onChange={(e) => handleFormChange("description", e.target.value)}
							value={formData.description}
							placeholder="Descrição da ocorrência"
							className="w-full textarea textarea-md resize-none"
							rows={5}
							id="ocurrence-description"
						></textarea>
					</div>

					<div className="w-full flex flex-col">
						<label className="fieldset-legend">Adicionar imagens</label>
						<input
							type="file"
							className="file-input w-full"
							accept="image/*"
							onChange={(e) => handleFormChange("photo", e.target.files[0])}
							required
						/>
						<span className="label text-sm mt-2">Max size 10MB</span>
					</div>

					<button
						className="btn bg-cyan-800 text-gray-50	rounded-md py-6 hover:bg-cyan-900 border-none duration-300"
						type="submit"
					>
						Cadastrar ocorrência
					</button>
				</form>
			</div>
		</dialog>
	);
};
