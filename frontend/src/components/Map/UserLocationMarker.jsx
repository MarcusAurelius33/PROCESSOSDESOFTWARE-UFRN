import { UserPin } from "@/assets/markers";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { useUserPosition } from "@/hooks/useUserPosition";

export const UserLocationMarker = () => {
	const userIcon = L.icon({
		iconUrl: UserPin,
		iconSize: [56, 56],
		iconAnchor: [20, 40],
		popupAnchor: [0, -40],
	});

	const position = useUserPosition();

	return position === null ? null : (
		<Marker position={position} icon={userIcon} />
	);
};
