import { getTypeConfig } from '../data/presets';

export default function SavedPresets({ saved, onLoad, onDelete }) {
  if (saved.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="text-[9px] tracking-[0.2em] uppercase mb-3 flex items-center gap-2" style={{ color: '#8a7355' }}>
        <div className="led led-on" />
        SAVED CHAINS
      </div>
      <div className="flex flex-wrap gap-2">
        {saved.map((preset) => {
          const cfg = getTypeConfig(preset.type);
          return (
            <div
              key={preset.savedAt}
              className="flex items-center gap-2 px-3 py-2 rack-unit rounded-xl group"
            >
              <button
                onClick={() => onLoad(preset)}
                className="text-[10px] text-left flex items-center gap-2 tracking-wide"
                style={{ color: '#b89e7a' }}
              >
                <span
                  className="text-[8px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded-xl"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.label.toUpperCase()}
                </span>
                {preset.reference}
              </button>
              <button
                onClick={() => onDelete(preset.savedAt)}
                className="text-[10px] ml-1 opacity-0 group-hover:opacity-100 transition-all"
                style={{ color: '#5a4530' }}
                onMouseEnter={e => e.currentTarget.style.color = '#e05c2a'}
                onMouseLeave={e => e.currentTarget.style.color = '#5a4530'}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
