import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapComponent = () => {
	return (
		<div className="h-screen w-full">
			<MapContainer
				center={{ lat: -5.832052, lng: -35.2080847 }}
				zoom={13}
				className="h-full w-full"
				zoomControl={false}
			>
				<Marker position={{ lat: -5.832052, lng: -35.2080847 }} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ZoomControl position="bottomright" />
			</MapContainer>
		</div>
	);
};
