import {
	ChartPieIcon,
	LogOutIcon,
	MapIcon,
	MenuIcon,
	MessageSquareWarningIcon,
	PlusCircleIcon,
} from "lucide-react";
import { Link } from "react-router";

export const MenuComponent = () => {
	return (
		<div className="drawer z-999 fixed top-16 left-16 text-gray-800">
			<input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<label
					htmlFor="my-drawer-1"
					className="btn drawer-button text-[0px] bg-cyan-800 border-none"
				>
					<MenuIcon size={18} color="#fff" />
				</label>
			</div>
			<aside className="drawer-side p-0">
				<label
					htmlFor="my-drawer-1"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="menu min-h-full bg-gray-50 w-80 p-0">
					<div className="bg-cyan-800 p-6 flex items-center gap-6">
						<img src="/logo.svg" alt="Suricato logo" className="w-16 h-16" />
						<div className="text-gray-50">
							<h1 className="font-bold text-xl">Suricato</h1>
							<p className="text-sm">
								Sistema de Gestão de Ocorrências Urbanas
							</p>
						</div>
					</div>
					<ul className="p-4 flex flex-col gap-2 h-full">
						<li>
							<Link
								to="/"
								className="delay-200 hover:bg-gray-200 rounded-sm p-4 focus-visible:bg-gray-200 focus-visible:text-gray-800"
							>
								<MapIcon className="text-gray-800" size={18} />
								Mapa
							</Link>
						</li>
						<li>
							<button
								className="delay-200 hover:bg-gray-200 rounded-sm p-4 focus-visible:bg-gray-200 focus-visible:text-gray-800"
								onClick={() =>
									document
										.getElementById(`ocurrence-modal-registration`)
										.showModal()
								}
							>
								<PlusCircleIcon className="text-gray-800" size={18} />
								Nova ocorrência
							</button>
						</li>
						<li>
							<Link
								to="/"
								className="delay-200 hover:bg-gray-200 rounded-sm p-4 focus-visible:bg-gray-200 focus-visible:text-gray-800"
							>
								<MessageSquareWarningIcon className="text-gray-800" size={18} />
								Minhas ocorrências
							</Link>
						</li>
						<li className="hidden md:block">
							<Link
								to="/"
								className="delay-200 hover:bg-gray-200 rounded-sm p-4 focus-visible:bg-gray-200 focus-visible:text-gray-800"
							>
								<ChartPieIcon className="text-gray-800" size={18} />
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className="delay-200 text-red-400 hover:bg-red-100 rounded-sm p-4 focus-visible:bg-red-100 focus-visible:text-red-400"
							>
								<LogOutIcon className="text-red-400" size={18} />
								Sair
							</Link>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
};
