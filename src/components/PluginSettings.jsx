import { useState } from 'react';

function ParamCell({ param }) {
  return (
    <div className="bg-[#141418] rounded-lg p-3 border border-[#2a2a32]">
      <div className="text-[9px] text-[#5a5a6e] font-mono uppercase tracking-wider mb-1">
        {param.name}
      </div>
      <div className="text-sm font-bold font-mono text-[#a084ff]">
        {param.value}
      </div>
      {param.note && (
        <div className="text-[9px] text-[#3a3a4e] mt-1 leading-tight">
          {param.note}
        </div>
      )}
    </div>
  );
}

export default function PluginSettings({ settings }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5a5a6e] mb-3">
        ⚙ Suggested Settings
      </div>
      {settings.map((s, i) => (
        <div key={i} className="border border-[#2a2a32] rounded-xl overflow-hidden" style={{ background: '#141418' }}>
          <button
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1c1c22] transition-colors text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div>
              <div className="text-sm font-semibold text-[#e8e8f0]">{s.plugin}</div>
              <div className="text-[10px] font-mono text-[#5a5a6e] mt-0.5">{s.category}</div>
            </div>
            <span
              className="text-[#5a5a6e] text-xs transition-transform duration-200"
              style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▼
            </span>
          </button>
          {open === i && (
            <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
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