import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/authService";
import { PieChart } from "@/components/Dashboard/charts/PieChart";
import { BarChart } from "@/components/Dashboard/charts/BarChart";
import { HeatMap } from "@/components/Dashboard/charts/HeatMap";

const COLORS = ["#0e7490", "#06b6d4", "#67e8f9", "#a5f3fc", "#0369a1"];

export function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [ocurrences, setOcurrences] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        Promise.all([
            fetch("http://localhost:8080/api/dashboard/stats", { headers }).then((r) => r.json()),
            fetch("http://localhost:8080/ocurrences", { headers }).then((r) => r.json()),
        ])
            .then(([statsData, ocurrencesData]) => {
                setStats(statsData);
                const grouped = {};
                (ocurrencesData.content || ocurrencesData).forEach((o) => {
                    if (!o.latitude || !o.longitude) return;
                    const key = `${parseFloat(o.latitude).toFixed(3)},${parseFloat(o.longitude).toFixed(3)}`;
                    if (!grouped[key]) grouped[key] = { latitude: o.latitude, longitude: o.longitude, address: o.address, total: 0 };
                    grouped[key].total += 1;
                });
                setOcurrences(Object.values(grouped));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    function handleLogout() {
        logout();
        navigate("/");
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500">Carregando...</p>
        </div>
    );

    const statusData = [
        { name: "Abertas", value: stats.open },
        { name: "Em andamento", value: stats.inProgress },
        { name: "Resolvidas", value: stats.resolved },
        { name: "Fechadas", value: stats.closed },
    ];

    const categoryData = stats.byCategory.map((c) => ({ name: c.category, total: c.total }));

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-end mb-4">
                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                        Sair do sistema
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Mapa de calor por região</h2>
                        <div className="flex gap-3 text-xs">
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>Baixa</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>Média</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>Alta</span>
                        </div>
                    </div>
                    <HeatMap ocurrences={ocurrences} />
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-cyan-800">Dashboard</h1>
                    <p className="text-base text-gray-500 mt-1">Visão geral das ocorrências urbanas</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Geral", value: stats.totalOcurrences, color: "text-cyan-800" },
                        { label: "Abertas", value: stats.open, color: "text-cyan-600" },
                        { label: "Em andamento", value: stats.inProgress, color: "text-amber-500" },
                        { label: "Resolvidas", value: stats.resolved, color: "text-green-500" },
                    ].map((card) => (
                        <div key={card.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 mb-2">{card.label}</p>
                            <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
                        <h2 className="text-base font-semibold text-gray-700 mb-6">Ocorrências por Status</h2>
                        <div className="flex-1 flex items-center justify-center">
                            <PieChart data={statusData} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
                        <h2 className="text-base font-semibold text-gray-700 mb-6">Ocorrências nos últimos 30 dias (Categoria)</h2>
                        <div className="flex-1 flex items-center justify-center">
                            <BarChart data={categoryData} dataKey="total" nameKey="name" color={COLORS} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}