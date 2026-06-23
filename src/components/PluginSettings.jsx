import { useState } from 'react';

function ParamCell({ param }) {
  return (
    <div className="rounded-xl p-3 panel-texture" style={{ background: '#120d07', border: '1px solid #3d2e1a' }}>
      <div className="text-[8px] tracking-[0.15em] uppercase mb-1.5" style={{ color: '#8a7355' }}>
        {param.name}
      </div>
      <div className="text-sm font-bold tracking-wide" style={{ color: '#c4832a' }}>
        {param.value}
      </div>
      {param.note && (
        <div className="text-[8px] mt-1.5 leading-tight tracking-wide" style={{ color: '#5a4530' }}>
          {param.note}
        </div>
      )}
    </div>
  );
}

export default function PluginSettings({ settings }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-1.5">
      <div className="text-[9px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={{ color: '#8a7355' }}>
        <div className="led led-on" />
        SUGGESTED SETTINGS
      </div>
      {settings.map((s, i) => (
        <div key={i} className="rack-unit rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 transition-colors text-left"
            style={{ background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,200,100,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex items-center gap-3">
              <div className={`led ${open === i ? 'led-on' : ''}`} />
              <div>
                <div className="text-[11px] font-bold tracking-wider" style={{ color: '#f0e6c8' }}>{s.plugin.toUpperCase()}</div>
                <div className="text-[8px] tracking-[0.15em] mt-0.5" style={{ color: '#8a7355' }}>{s.category.toUpperCase()}</div>
              </div>
            </div>
            <span
              className="text-[10px] transition-transform duration-200"
              style={{ color: '#8a7355', transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▼
            </span>
          </button>
          {open === i && (
            <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-2" style={{ borderTop: '1px solid #3d2e1a' }}>
              <div className="col-span-full h-3" />
              {s.params.map((p, j) => (
                <ParamCell key={j} param={p} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
