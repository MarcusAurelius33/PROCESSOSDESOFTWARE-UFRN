import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function HeatMap({ ocurrences }) {
    if (!ocurrences || ocurrences.length === 0) return (
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
            Sem dados de localização
        </div>
    );

    const max = Math.max(...ocurrences.map((o) => o.total));

    return (
        <MapContainer
            center={[-5.832052, -35.2080847]}
            zoom={13}
            className="w-full rounded-lg relative z-0"
            style={{ height: "450px" }}
            zoomControl={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ocurrences.map((o, i) => {
                const intensity = o.total / max;
                const radius = 200 + intensity * 600;
                const color = intensity > 0.7 ? "#ef4444" : intensity > 0.4 ? "#f59e0b" : "#22c55e";
                return (
                    <Circle
                        key={i}
                        center={[parseFloat(o.latitude), parseFloat(o.longitude)]}
                        radius={radius}
                        pathOptions={{
                            color,
                            fillColor: color,
                            fillOpacity: 0.4,
                            weight: 1,
                        }}
                    >
                        <Tooltip>{o.address || "Ocorrência"} — {o.total}</Tooltip>
                    </Circle>
                );
            })}
        </MapContainer>
    );
}