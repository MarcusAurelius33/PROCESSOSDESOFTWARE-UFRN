import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapComponent } from "@/components/Map/MapComponent";
import { MenuComponent } from "@/components/Menu/MenuComponent";

export default function App() {
	return (
		<BrowserRouter>
			<MenuComponent />
			<Routes>
				<Route path="/" element={<MapComponent />} />
				{/* <Route path="/ocurrence/new" /> */}
			</Routes>
		</BrowserRouter>
	);
}
