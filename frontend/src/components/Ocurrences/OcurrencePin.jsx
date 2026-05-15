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
		iconAnchor: [20, 40],
		popupAnchor: [0, -40],
	});
}

export function OcurrencePin({ ocurrence }) {
	return (
		<Marker
			position={[ocurrence.latitude, ocurrence.longitude]}
			icon={createIcon(ocurrence.category.name)}
		>
			<Popup>
				<h1>
					<strong>{ocurrence.title}</strong>
				</h1>
				<p>{ocurrence.description}</p>
			</Popup>
		</Marker>
	);
}
