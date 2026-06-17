import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapComponent } from "@/components/Map/MapComponent";
import { MenuComponent } from "@/components/Menu/MenuComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/Dashboard";
import { PrivateRoute } from "@/components/Dashboard/PrivateRoute";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={
                        <>
                            <MenuComponent />
                            <Routes>
                                <Route path="/" element={<MapComponent />} />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <PrivateRoute>
                                            <DashboardPage />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </>
                    } />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
