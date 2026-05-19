import { UserPin } from "@/assets/markers";
import { useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

export const UserLocationMarker = () => {
	const [position, setPosition] = useState(null);
	const userIcon = L.icon({
		iconUrl: UserPin,
		iconSize: [56, 56],
		iconAnchor: [20, 40],
		popupAnchor: [0, -40],
	});

	const map = useMapEvents({
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, 18);
		},
	});

	useEffect(() => {
		map.locate();
	}, [map]);

	return position === null ? null : (
		<Marker position={position} icon={userIcon} />
	);
};
