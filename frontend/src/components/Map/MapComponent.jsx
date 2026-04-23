import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapComponent = () => {
	return (
		<div className="h-screen w-full">
			<MapContainer
				center={{ lat: -5.832052, lng: -35.2080847 }}
				zoom={16}
				scrollWheelZoom={false}
				className="h-full w-full"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
};
