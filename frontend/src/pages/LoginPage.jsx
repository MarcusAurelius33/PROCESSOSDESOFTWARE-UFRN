import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "@/services/authService";

export function LoginPage() {
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const destino = location.state?.from?.pathname || "/dashboard";

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setLoading(true);
        try {
            await login(senha);
            navigate(destino, { replace: true });
        } catch {
            setErro("Senha incorreta.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center gap-6 w-full max-w-sm">

                <div className="flex items-center gap-4">
                    <img src="/logo.svg" alt="Suricato logo" className="w-36 h-36" />
                    <div>
                        <h1 className="font-bold text-cyan-800 text-3xl">Suricato</h1>
                        <p className="text-base text-gray-500">
                            Sistema de Gestão de Ocorrências Urbanas
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8 w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        Acesso ao Dashboard
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Digite a senha para continuar.
                    </p>

                    {erro && (
                        <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg mb-4">
                            {erro}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-700"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-cyan-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-cyan-900 disabled:opacity-60"
                        >
                            {loading ? "Verificando..." : "Entrar"}
                        </button>
                    </form>
                </div>
                <button type="button" 
                onClick={() => navigate("/")} 
                className="w-full text-sm text-gray-500 hover:text-cyan-800 text-center mt-2">
                    ← Voltar ao mapa
                </button>
            </div>
        </div>
    );
}