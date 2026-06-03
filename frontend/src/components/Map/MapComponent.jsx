import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OcurrencePin } from "@/components/Ocurrences/OcurrencePin";
import { UserLocationMarker } from "./UserLocationMarker";
import { OcurrenceRegistration } from "../Ocurrences/OcurrenceRegistration";

const mockOcurrences = [
	{
		id: 1,
		title: "Buraco na Av. Prudente de Morais",
		description:
			"Cratera de aproximadamente 1 metro de diâmetro no meio da pista, próximo ao semáforo. Risco de acidente para motos.",
		address: "Av. Prudente de Morais, 2100 - Lagoa Nova, Natal - RN",
		latitude: -5.82931,
		longitude: -35.20614,
		status: "OPEN",
		totalConfirmation: 14,
		createdAt: "2026-05-10T08:23:00",
		updatedAt: "2026-05-10T08:23:00",
		user: { id: 1, name: "Tiago Rodrigues" },
		category: { id: 1, name: "pothole" },
		city: { id: 1, name: "Natal" },
	},
	{
		id: 2,
		title: "Poste apagado na Rua das Algas",
		description:
			"Trecho de aproximadamente 50 metros sem iluminação. A rua fica completamente escura após as 18h.",
		address: "Rua das Algas, 340 - Ponta Negra, Natal - RN",
		latitude: -5.87612,
		longitude: -35.17935,
		status: "OPEN",
		totalConfirmation: 8,
		createdAt: "2026-05-11T19:45:00",
		updatedAt: "2026-05-11T19:45:00",
		user: { id: 2, name: "Kézia Lima" },
		category: { id: 2, name: "lightining" },
		city: { id: 1, name: "Natal" },
	},
	{
		id: 3,
		title: "Bueiro entupido causando alagamento",
		description:
			"Bueiro completamente obstruído. A cada chuva a rua alaga e invade as casas vizinhas.",
		address: "Rua João XXIII, 90 - Dix-Sept Rosado, Natal - RN",
		latitude: -5.81987,
		longitude: -35.23542,
		status: "OPEN",
		totalConfirmation: 21,
		createdAt: "2026-05-09T07:10:00",
		updatedAt: "2026-05-09T07:10:00",
		user: { id: 1, name: "Tiago Rodrigues" },
		category: { id: 4, name: "sanitation" },
		city: { id: 1, name: "Natal" },
	},
	{
		id: 4,
		title: "Descarte irregular de entulho",
		description:
			"Montão de entulho de construção despejado na calçada, impedindo a passagem de pedestres e cadeirantes.",
		address: "Rua Apodi, 580 - Petrópolis, Natal - RN",
		latitude: -5.80153,
		longitude: -35.21138,
		status: "RESOLVED",
		totalConfirmation: 5,
		createdAt: "2026-05-01T10:00:00",
		updatedAt: "2026-05-08T14:30:00",
		user: { id: 3, name: "Marcus Aurelius" },
		category: { id: 3, name: "garbage" },
		city: { id: 1, name: "Natal" },
	},
	{
		id: 5,
		title: "Árvore bloqueando calçada",
		description:
			"Galhos de árvore caídos após a última chuva cobrem toda a calçada. Pedestres forçados a caminhar na pista.",
		address: "Av. Roberto Freire, 3200 - Capim Macio, Natal - RN",
		latitude: -5.85419,
		longitude: -35.19853,
		status: "OPEN",
		totalConfirmation: 7,
		createdAt: "2026-05-13T06:55:00",
		updatedAt: "2026-05-13T06:55:00",
		user: { id: 2, name: "Kézia Lima" },
		category: { id: 6, name: "vegetation" },
		city: { id: 1, name: "Natal" },
	},
];

export const MapComponent = () => {
	return (
		<div className="h-screen w-full">
			<MapContainer
				center={{ lat: -5.832052, lng: -35.2080847 }}
				zoom={13}
				className="h-full w-full"
				zoomControl={false}
			>
				<UserLocationMarker />

				{mockOcurrences.map((ocurrence) => (
					<OcurrencePin key={ocurrence.id} ocurrence={ocurrence} />
				))}

				<OcurrenceRegistration />

				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ZoomControl position="bottomright" />
			</MapContainer>
		</div>
	);
};
