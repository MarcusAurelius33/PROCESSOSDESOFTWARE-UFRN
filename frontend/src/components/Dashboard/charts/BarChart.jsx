const COLORS = ["#0e7490", "#06b6d4", "#67e8f9", "#a5f3fc", "#0369a1"];

export function BarChart({ data, dataKey, nameKey, color }) {
    const max = Math.max(...data.map((d) => d[dataKey]), 1);

    return (
        <div className="relative flex items-end justify-around gap-2 h-56 w-full pt-8 pb-6">
            <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none z-0">
                <div className="w-full border-t border-dashed border-gray-200 flex-1" />
                <div className="w-full border-t border-dashed border-gray-200 flex-1" />
                <div className="w-full border-t border-dashed border-gray-200 flex-1" />
                <div className="w-full border-t border-solid border-gray-300" />
            </div>

            {data.map((d, i) => (
                <div
                    key={i}
                    className="group relative flex flex-col items-center flex-1 gap-1 h-full justify-end cursor-pointer z-10"
                >
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-[10px] font-medium py-1 px-2 rounded shadow-md whitespace-nowrap pointer-events-none">
                        {d[nameKey]}: {d[dataKey]}
                    </div>

                    <span className="text-xs font-semibold text-gray-400 transition-colors duration-200 group-hover:text-gray-700">
                        {d[dataKey]}
                    </span>

                    <div
                        className="w-full max-w-[48px] rounded-t-md shadow-sm transition-all duration-300 ease-out group-hover:brightness-110 group-hover:-translate-y-1"
                        style={{
                            height: `${(d[dataKey] / max) * 140}px`,
                            backgroundColor: Array.isArray(color) ? color[i % color.length] : color,
                        }}
                    />

                    <span className="absolute -bottom-5 text-[10px] font-medium text-gray-400 text-center truncate w-full transition-colors duration-200 group-hover:text-gray-800">
                        {d[nameKey]}
                    </span>
                </div>
            ))}
        </div>
    );
}