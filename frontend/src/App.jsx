import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapComponent } from "@/components/Map/MapComponent";
import { MenuComponent } from "@/components/Menu/MenuComponent";
import { OcurrenceRegistrationComponent } from "@/pages/Ocurrence/OcurrenceRegistrationComponent";

export default function App() {
	return (
		<BrowserRouter>
			<MenuComponent />
			<Routes>
				<Route path="/" element={<MapComponent />} />
				<Route
					path="/ocurrence/new"
					element={<OcurrenceRegistrationComponent />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
