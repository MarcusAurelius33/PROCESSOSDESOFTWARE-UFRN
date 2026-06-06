import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapComponent } from "@/components/Map/MapComponent";
import { MenuComponent } from "@/components/Menu/MenuComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<MenuComponent />
				<Routes>
					<Route path="/" element={<MapComponent />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
