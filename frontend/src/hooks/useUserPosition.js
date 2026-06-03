import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";

export function useUserPosition() {
	const [position, setPosition] = useState(null);

	const map = useMapEvents({
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, 18);
		},
	});

	useEffect(() => {
		map.locate();
	}, [map]);

	return position;
}
