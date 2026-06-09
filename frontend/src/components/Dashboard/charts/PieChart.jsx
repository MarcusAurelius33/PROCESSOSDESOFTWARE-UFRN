const STATUS_COLORS = ["#0e7490", "#f59e0b", "#22c55e", "#6b7280"];

export function PieChart({ data }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    
    if (total === 0) return (
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            Sem dados
        </div>
    );

    const hasOnlyOne = data.filter((d) => d.value > 0).length === 1;
    const size = 200;
    const center = size / 2;
    const radius = 90;

    let cumulative = 0;
    const slices = data
        .filter((d) => d.value > 0)
        .map((d) => {
            if (hasOnlyOne) {
                return { ...d, color: STATUS_COLORS[data.indexOf(d) % STATUS_COLORS.length], full: true };
            }
            const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
            cumulative += d.value;
            const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;

            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);
            const large = endAngle - startAngle > Math.PI ? 1 : 0;

            return {
                ...d,
                path: `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${large},1 ${x2},${y2} Z`,
                color: STATUS_COLORS[data.indexOf(d) % STATUS_COLORS.length],
            };
        });

    return (
        <div className="flex items-center justify-center gap-10 w-full py-4">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {slices.map((s, i) =>
                    s.full ? (
                        <circle key={i} cx={center} cy={center} r={radius} fill={s.color} />
                    ) : (
                        <path
                            key={i}
                            d={s.path}
                            fill={s.color}
                            stroke="#fff"
                            strokeWidth="2"
                            className="hover:opacity-80 cursor-pointer transition-opacity duration-200"
                        />
                    )
                )}
            </svg>

            <div className="flex flex-col gap-3">
                {data.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        <div
                            className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: STATUS_COLORS[i % STATUS_COLORS.length] }}
                        />
                        <span className="text-gray-600 w-24">{d.name}</span>
                        <span className="font-semibold text-gray-800">{d.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}