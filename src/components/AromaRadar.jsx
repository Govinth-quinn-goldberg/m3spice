import React from 'react';

const AromaRadar = ({ notes, size = 260 }) => {
  const keys = ['Earthy', 'Spicy', 'Warm', 'Herbal', 'Citrusy'];
  
  // Center of the 120x120 SVG viewbox
  const cx = 60;
  const cy = 65;
  const r = 40; // Max radius

  // Convert angle (degrees) to coordinates
  const getCoordinates = (index, value) => {
    const angle = (index * 72 - 90) * (Math.PI / 180);
    const distance = (value / 100) * r;
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  // Coordinates for the spice's aroma footprint
  const points = keys.map((key, i) => {
    const value = notes[key] || 0;
    const coord = getCoordinates(i, value);
    return `${coord.x},${coord.y}`;
  }).join(' ');

  // Concentric background pentagons (grid layers)
  const levels = [25, 50, 75, 100];
  const gridPolygons = levels.map((lvl) => {
    return keys.map((_, i) => {
      const coord = getCoordinates(i, lvl);
      return `${coord.x},${coord.y}`;
    }).join(' ');
  });

  // Label coordinates (placed slightly further out than max radius)
  const labelPositions = keys.map((key, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const labelDist = r + 11;
    const x = cx + labelDist * Math.cos(angle);
    const y = cy + labelDist * Math.sin(angle);
    
    // Fine-tune alignments
    let textAnchor = "middle";
    if (Math.cos(angle) > 0.2) textAnchor = "start";
    else if (Math.cos(angle) < -0.2) textAnchor = "end";

    return { label: key, x, y, textAnchor };
  });

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-cream-50 rounded-2xl border border-saffron-100 shadow-sm transition-all duration-300 hover:shadow-md">
      <h4 className="text-xs font-semibold tracking-widest text-terracotta-700 uppercase mb-1 font-sans">
        Aroma Footprint
      </h4>
      <div style={{ width: size, height: size }} className="relative select-none">
        <svg viewBox="0 0 120 130" className="w-full h-full">
          {/* Radial Grid Lines (Web) */}
          {keys.map((_, i) => {
            const outer = getCoordinates(i, 100);
            return (
              <line
                key={`line-${i}`}
                x1={cx}
                y1={cy}
                x2={outer.x}
                y2={outer.y}
                stroke="#ebdcc5"
                strokeWidth="0.5"
                strokeDasharray="1,1"
              />
            );
          })}

          {/* Concentric Grid Layers */}
          {gridPolygons.map((pointsStr, i) => (
            <polygon
              key={`grid-${i}`}
              points={pointsStr}
              fill="none"
              stroke="#e5dfd5"
              strokeWidth="0.5"
            />
          ))}

          {/* Spice Aroma Area */}
          <polygon
            points={points}
            fill="rgba(224, 122, 95, 0.25)"
            stroke="#A0402C"
            strokeWidth="1.5"
            className="transition-all duration-500 ease-out hover:fill-opacity-40"
          />

          {/* Data points (circles at vertices) */}
          {keys.map((key, i) => {
            const val = notes[key] || 0;
            const coord = getCoordinates(i, val);
            return (
              <circle
                key={`dot-${i}`}
                cx={coord.x}
                cy={coord.y}
                r="1.8"
                fill="#FAF6F0"
                stroke="#E07A5F"
                strokeWidth="1.2"
              />
            );
          })}

          {/* Custom Labels */}
          {labelPositions.map((pos, i) => (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y + 1.5}
              textAnchor={pos.textAnchor}
              className="text-[6.5px] font-bold fill-neutral-600 font-sans tracking-wide"
            >
              {pos.label}
            </text>
          ))}
        </svg>
      </div>
      <div className="flex gap-2 mt-1 text-[10px] text-neutral-500 font-sans">
        {keys.map((k) => (
          <span key={k} className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron-500"></span>
            {k}: {notes[k]}%
          </span>
        ))}
      </div>
    </div>
  );
};

export default AromaRadar;
