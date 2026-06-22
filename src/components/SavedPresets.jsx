import { getTypeConfig } from '../data/presets';

export default function SavedPresets({ saved, onLoad, onDelete }) {
  if (saved.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5a5a6e] mb-3">
        ★ Saved Chains
      </div>
      <div className="flex flex-wrap gap-2">
        {saved.map((preset) => {
          const cfg = getTypeConfig(preset.type);
          return (
            <div
              key={preset.savedAt}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#2a2a32] bg-[#141418] group"
            >
              <button
                onClick={() => onLoad(preset)}
                className="text-xs text-[#9090a8] hover:text-[#e8e8f0] transition-colors text-left"
              >
                <span
                  className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded mr-2"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.label.toUpperCase()}
                </span>
                {preset.reference}
              </button>
              <button
                onClick={() => onDelete(preset.savedAt)}
                className="text-[#3a3a4e] hover:text-[#ff6b6b] transition-colors text-xs ml-1 opacity-0 group-hover:opacity-100"
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