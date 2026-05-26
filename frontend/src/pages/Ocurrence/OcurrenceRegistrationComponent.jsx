import { EditIcon } from "lucide-react";

export const OcurrenceRegistrationComponent = () => {
	return (
		<div className="h-full w-full grid place-items-center bg-gray-100 p-6">
			<form className="bg-white container p-6 rounded-md shadow-md flex flex-col gap-6">
				<h1 className="font-bold text-xl">Cadastrar nova ocorrência</h1>

				<div className="w-full join">
					<input
						type="text"
						className="w-full input input-ghost join-item"
						placeholder="Endereço da ocorrência"
						value="Av. Alm. Alexandrino de Alencar, 801-737 - Barro Vermelho"
					/>
					<button className="btn join-item">
						<EditIcon />
					</button>
				</div>

				<div className="flex w-full items-center">
					<label className="floating-label">
						<span>Título</span>
						<input
							type="text"
							placeholder="Título da ocorrência"
							className="w-full input input-md"
						/>
					</label>

					<fieldset className="fieldset">
						<legend className="fieldset-legend">Browsers</legend>
						<select defaultValue="Pick a browser" className="select">
							<option disabled={true}>Pick a browser</option>
							<option>Chrome</option>
							<option>FireFox</option>
							<option>Safari</option>
						</select>
						<span className="label">Optional</span>
					</fieldset>
				</div>
			</form>
		</div>
	);
};
