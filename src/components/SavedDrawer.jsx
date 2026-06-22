import { getTypeConfig } from '../data/presets';

export default function SavedDrawer({ saved, onLoad, onDelete, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm h-full flex flex-col border-l"
        style={{ background: '#0e0e12', borderColor: '#2a2a32' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#2a2a32' }}>
          <div className="text-sm font-bold text-[#e8e8f0]">★ Saved Chains</div>
          <button onClick={onClose} className="text-[#5a5a6e] hover:text-[#e8e8f0] transition-colors text-lg">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {saved.length === 0 ? (
            <p className="text-[#5a5a6e] text-sm text-center mt-8">No saved chains yet.</p>
          ) : (
            saved.map((preset) => {
              const cfg = getTypeConfig(preset.type);
              return (
                <div
                  key={preset.savedAt}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#2a2a32] bg-[#141418] group"
                >
                  <button
                    onClick={() => { onLoad(preset); onClose(); }}
                    className="flex-1 text-left"
                  >
                    <span
                      className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded mr-2"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.label.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#9090a8] hover:text-[#e8e8f0] transition-colors">
                      {preset.reference}
                    </span>
                  </button>
                  <button
                    onClick={() => onDelete(preset.savedAt)}
                    className="text-[#3a3a4e] hover:text-[#ff6b6b] transition-colors text-xs ml-2 opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}