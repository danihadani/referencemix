import { useState } from 'react';

const COMPANY_LINK = {
  'fabfilter':       () => 'https://www.fabfilter.com/products',
  'universal audio': (p) => `https://www.uaudio.com/search?q=${encodeURIComponent(p)}`,
  'uad':             (p) => `https://www.uaudio.com/search?q=${encodeURIComponent(p)}`,
  'waves':           (p) => `https://www.waves.com/search?q=${encodeURIComponent(p)}`,
  'valhalla dsp':    () => 'https://valhalladsp.com/shop/',
  'valhalla':        () => 'https://valhalladsp.com/shop/',
  'soundtoys':       (p) => `https://www.soundtoys.com/?s=${encodeURIComponent(p)}`,
  'safari audio':    (p) => `https://safariaudio.com/search?q=${encodeURIComponent(p)}`,
};

const FREE_LINK = [
  ['supermassive',     'https://valhalladsp.com/shop/reverb/valhalla-supermassive/'],
  ['valhalla freq',    'https://valhalladsp.com/shop/reverb/valhalla-freq-echo/'],
  ['valhalla space',   'https://valhalladsp.com/shop/modulation/valhalla-space-modulator/'],
  ['tdr nova',         'https://www.tokyodawn.net/tdr-nova/'],
  ['nova',             'https://www.tokyodawn.net/tdr-nova/'],
  ['kotelnikov',       'https://www.tokyodawn.net/tdr-kotelnikov/'],
  ['slickeq',          'https://www.tokyodawn.net/tdr-vos-slickeq/'],
  ['slick eq',         'https://www.tokyodawn.net/tdr-vos-slickeq/'],
  ['span',             'https://www.voxengo.com/product/span/'],
  ['saturation knob',  'https://www.softube.com/saturation-knob'],
  ['vital',            'https://vital.audio/'],
  ['analog obsession', 'https://analogobsession.com/'],
];

function officialLink(company, plugin) {
  const fn = COMPANY_LINK[(company || '').toLowerCase().trim()];
  if (fn) return fn(plugin);
  // Fallback for unknown company → Google
  return `https://www.google.com/search?q=${encodeURIComponent(`${company} ${plugin} plugin`)}`;
}

function freeLink(plugin) {
  const name = (plugin || '').toLowerCase();
  const hit = FREE_LINK.find(([key]) => name.includes(key));
  if (hit) return hit[1];
  // Fallback for anything not in the map → Google
  return `https://www.google.com/search?q=${encodeURIComponent(`${plugin} free plugin download`)}`;
}


function LinkPill({ href, children, accent }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[8px] font-bold tracking-[0.12em] px-2 py-1 rounded-lg transition-all"
      style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}33` }}
      onMouseEnter={e => { e.currentTarget.style.background = `${accent}26`; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${accent}14`; }}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </a>
  );
}

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
        SUGGESTED PLUGINS & SETTINGS
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
                <div className="text-[11px] font-bold tracking-wider" style={{ color: '#f0e6c8' }}>{s.category.toUpperCase()}</div>
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
            <div className="px-4 pb-4" style={{ borderTop: '1px solid #3d2e1a' }}>
              <div className="flex flex-col gap-2 py-3 mb-2">
                <div className="flex items-center justify-between gap-2 flex-wrap rounded-xl p-3" style={{ background: '#120d07', border: '1px solid #3d2e1a' }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[7px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded" style={{ background: '#c4832a22', color: '#c4832a' }}>PREMIUM</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold tracking-wide truncate" style={{ color: '#f0e6c8' }}>{s.plugin}</div>
                      {s.company && <div className="text-[8px] tracking-[0.15em]" style={{ color: '#8a7355' }}>{s.company.toUpperCase()}</div>}
                    </div>
                  </div>
                  <LinkPill href={officialLink(s.company || '', s.plugin)} accent="#c4832a">VIEW ↗</LinkPill>
                </div>
                {s.free && (
                  <div className="flex items-center justify-between gap-2 flex-wrap rounded-xl p-3" style={{ background: '#120d07', border: '1px solid #3d2e1a' }}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[7px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded" style={{ background: '#3ddc8422', color: '#3ddc84' }}>FREE</span>
                      <div className="text-[10px] font-bold tracking-wide truncate" style={{ color: '#f0e6c8' }}>{s.free}</div>
                    </div>
                    <LinkPill href={freeLink(s.free)} accent="#3ddc84">GET ↗</LinkPill>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {s.params.map((p, j) => (
                  <ParamCell key={j} param={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}