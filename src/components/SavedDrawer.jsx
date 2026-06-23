import { getTypeConfig } from '../data/presets';

export default function SavedDrawer({ saved, onLoad, onDelete, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm h-full flex flex-col"
        style={{ background: '#120d07', borderLeft: '1.5px solid #3d2e1a' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1.5px solid #3d2e1a' }}>
          <div className="flex items-center gap-2">
            <div className="led led-on" />
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#f0e6c8' }}>Saved Chains</div>
          </div>
          <button
            onClick={onClose}
            className="text-base transition-colors hw-button px-2 py-1 rounded-xl"
            style={{ color: '#8a7355' }}
          >✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {saved.length === 0 ? (
            <p className="text-[10px] text-center mt-8 tracking-wider" style={{ color: '#8a7355' }}>NO SAVED CHAINS</p>
          ) : (
            saved.map((preset) => {
              const cfg = getTypeConfig(preset.type);
              return (
                <div
                  key={preset.savedAt}
                  className="flex items-center justify-between p-3 rack-unit rounded-xl group"
                >
                  <button
                    onClick={() => { onLoad(preset); onClose(); }}
                    className="flex-1 text-left flex items-center gap-2"
                  >
                    <div className="led" style={{ background: cfg.color, boxShadow: `0 0 4px ${cfg.color}` }} />
                    <span
                      className="text-[8px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded-xl"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.label.toUpperCase()}
                    </span>
                    <span className="text-[10px] tracking-wide truncate" style={{ color: '#b89e7a' }}>
                      {preset.reference}
                    </span>
                  </button>
                  <button
                    onClick={() => onDelete(preset.savedAt)}
                    className="text-[10px] ml-2 opacity-0 group-hover:opacity-100 transition-all hw-button px-1.5 py-0.5 rounded-xl"
                    style={{ color: '#8a7355' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e05c2a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8a7355'}
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
