import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OcurrencePin } from "@/components/Ocurrences/OcurrencePin";
import { UserLocationMarker } from "./UserLocationMarker";
import { OcurrenceRegistration } from "../Ocurrences/OcurrenceRegistration";
import { useOcurrences } from "@/hooks/useOcurrences";

export const MapComponent = () => {
	const { ocurrences, ocurrenceLoading, ocurrenceCreator } = useOcurrences();

	const handleSubmitOcurrence = (formData) => {
		ocurrenceCreator.createOcurrence(formData);

		if (ocurrenceCreator.isSuccess) {
			alert("Ocorrência criada com sucesso!");
		}
	};

	return (
		<div className="h-screen w-full">
			<MapContainer
				center={{ lat: -5.832052, lng: -35.2080847 }}
				zoom={13}
				className="h-full w-full"
				zoomControl={false}
			>
				<UserLocationMarker />

				{!ocurrenceLoading &&
					ocurrences?.map((ocurrence) => (
						<OcurrencePin key={ocurrence.id} ocurrence={ocurrence} />
					))}

				<OcurrenceRegistration onSubmit={handleSubmitOcurrence} />

				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ZoomControl position="bottomright" />
			</MapContainer>
		</div>
	);
};
