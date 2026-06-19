import { Marker } from "react-leaflet";
import L from "leaflet";
import {
	Animal,
	Garbage,
	Lightning,
	Pothole,
	Property,
	Sanitation,
	Vegetation,
	Warning,
} from "@/assets/markers";
import { OcurrrenceDetail } from "./OcurrenceDetail";

const iconDictionary = {
	animal: Animal,
	garbage: Garbage,
	lightning: Lightning,
	pothole: Pothole,
	property: Property,
	sanitation: Sanitation,
	vegetation: Vegetation,
};

// Nova função construtora do ícone dinâmico
function createDynamicIcon(categoryIcon, totalConfirmation = 0) {
	const iconUrl = iconDictionary[categoryIcon] ?? Warning;
	
	// Regras de negócio para o nível de alerta
	const isHot = totalConfirmation >= 5 && totalConfirmation < 10;
	const isCritical = totalConfirmation >= 10;

	// Template HTML do nosso pino customizado
	const htmlContent = `
		<div class="relative w-10 h-10 flex items-center justify-center">
			${/* Efeito de pulso (Aura vermelha) para níveis críticos */ ''}
			${isCritical ? `<span class="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>` : ''}

			${/* Ícone SVG Original da Categoria */ ''}
			<div class="relative z-10 w-full h-full flex items-center justify-center">
				<img src="${iconUrl}" alt="Marcador de ocorrência" class="w-full h-full object-contain" />
			</div>

			${/* Badge de Notificação flutuante para itens "Em Alta" ou "Críticos" */ ''}
			${(isHot || isCritical) ? `
				<div class="absolute -top-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
					${totalConfirmation > 99 ? '99+' : totalConfirmation}
				</div>
			` : ''}
		</div>
	`;

	return L.divIcon({
		html: htmlContent,
		className: "bg-transparent border-none", // Remove o quadrado branco padrão do Leaflet
		iconSize: [40, 40],
		iconAnchor: [20, 40], // Ancorado na base central (ajustado para o novo tamanho 40x40)
		popupAnchor: [0, -40],
	});
}

export function OcurrencePin({ ocurrence }) {
	return (
		<>
			<Marker
				position={[ocurrence.latitude, ocurrence.longitude]}
				// Passamos o nome do ícone e o total de confirmações para a função geradora
				icon={createDynamicIcon(ocurrence.category.icon, ocurrence.totalConfirmation)}
				eventHandlers={{
					click: () =>
						document
							.getElementById(`ocurrence-modal-${ocurrence.id}`)
							.showModal(),
				}}
			/>
			<OcurrrenceDetail ocurrence={ocurrence} />
		</>
	);
}