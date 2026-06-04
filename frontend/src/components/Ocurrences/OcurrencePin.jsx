import { Marker, Popup } from "react-leaflet";
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

function createIcon(category) {
	const iconUrl = iconDictionary[category] ?? Warning;

	return L.icon({
		iconUrl,
		iconSize: [40, 40],
		iconAnchor: [24, 48],
		popupAnchor: [0, -40],
	});
}

export function OcurrencePin({ ocurrence }) {
	return (
		<>
			<Marker
				position={[ocurrence.latitude, ocurrence.longitude]}
				icon={createIcon(ocurrence.category.name)}
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
