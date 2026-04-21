import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapComponent } from "@/components/Map/MapComponent";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MapComponent />} />
			</Routes>
		</BrowserRouter>
	);
}
