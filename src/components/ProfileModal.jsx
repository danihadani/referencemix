import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PLUGIN_CATALOG } from '../data/pluginCatalog';

const DAWS = ['Logic Pro', 'Ableton Live', 'Pro Tools', 'FL Studio', 'Cubase', 'Studio One', 'Reaper', 'GarageBand', 'Other'];

export default function ProfileModal({ user, onClose }) {
  const [mode, setMode] = useState('view');
  const [daw, setDaw] = useState('');
  const [mics, setMics] = useState([]);
  const [micInput, setMicInput] = useState('');
  const [iface, setIface] = useState('');
  const [plugins, setPlugins] = useState([]);
  const [pluginInput, setPluginInput] = useState('');
  const [openBrand, setOpenBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [openViewBrand, setOpenViewBrand] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setDaw(data.daw || '');
        setMics(data.mics || (data.mic ? [data.mic] : []));
        setIface(data.interface || '');
        setPlugins(data.plugins || []);
        const filled = data.daw || data.mics?.length || data.interface || data.plugins?.length;
        setHasProfile(!!filled);
        setMode(filled ? 'view' : 'edit');
      } else {
        setMode('edit');
      }
      setLoading(false);
    })();
  }, [user.id]);

  const addMic = () => {
    const v = micInput.trim();
    if (v && !mics.includes(v)) setMics([...mics, v]);
    setMicInput('');
  };
  const removeMic = (m) => setMics(mics.filter(x => x !== m));

  const togglePlugin = (name) => {
    setPlugins(prev => prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]);
  };
  const addManualPlugin = () => {
    const v = pluginInput.trim();
    if (v && !plugins.includes(v)) setPlugins([...plugins, v]);
    setPluginInput('');
  };

  const catalogNames = Object.values(PLUGIN_CATALOG).flat();
  const customPlugins = plugins.filter(p => !catalogNames.includes(p));

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: user.id, email: user.email, daw, mics, interface: iface, plugins,
    });
    setSaving(false);
    if (!error) { setHasProfile(true); setMode('view'); }
  };

  const labelStyle = { color: '#8a7355' };
  const inputStyle = { background: '#120d07', border: '1.5px solid #3d2e1a', color: '#f0e6c8', fontFamily: "'JetBrains Mono', monospace" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 panel-texture my-8"
        style={{ background: '#1a1208', border: '1.5px solid #3d2e1a', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="led led-on" />
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: '#f0e6c8' }}>My Studio</div>
          </div>
          <div className="flex items-center gap-2">
            {mode === 'view' && hasProfile && (
              <button onClick={() => setMode('edit')} className="hw-button text-[9px] px-2.5 py-1 rounded-xl tracking-wider uppercase" style={{ color: '#c4832a' }}>Edit</button>
            )}
            <button onClick={onClose} className="text-base hw-button px-2 py-1 rounded-xl" style={labelStyle}>✕</button>
          </div>
        </div>

        {loading ? (
          <p className="text-[10px] text-center py-8 tracking-wider" style={labelStyle}>LOADING…</p>
        ) : mode === 'view' ? (
          /* ---------- VIEW MODE ---------- */
          <div className="space-y-4">
            <ViewRow label="DAW" value={daw || '—'} />
            <div>
              <div className="text-[8px] tracking-[0.2em] uppercase mb-1.5" style={labelStyle}>Microphones</div>
              {mics.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {mics.map(m => <span key={m} className="text-[10px] px-2.5 py-1 rounded-xl" style={{ background: '#120d07', border: '1px solid #3d2e1a', color: '#f0e6c8' }}>{m}</span>)}
                </div>
              ) : <span className="text-[10px]" style={labelStyle}>—</span>}
            </div>
            <ViewRow label="Audio Interface / Preamp" value={iface || '—'} />
                        <div>
              <div className="text-[8px] tracking-[0.2em] uppercase mb-1.5" style={labelStyle}>Plugins ({plugins.length})</div>
              {plugins.length ? (
                <div className="space-y-1.5">
                  {[...Object.entries(PLUGIN_CATALOG).map(([brand, list]) => [brand, plugins.filter(p => list.includes(p))]), ['Other', customPlugins]]
                    .filter(([, owned]) => owned.length > 0)
                    .map(([brand, owned]) => {
                      const isOpen = openViewBrand === brand;
                      return (
                        <div key={brand} className="rack-unit rounded-xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setOpenViewBrand(isOpen ? null : brand)}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-left"
                          >
                            <span className="text-[9px] tracking-[0.15em] uppercase font-bold" style={{ color: '#c4832a' }}>
                              {brand} <span style={{ color: '#8a7355' }}>· {owned.length}</span>
                            </span>
                            <span className="text-[9px] transition-transform duration-200" style={{ color: '#8a7355', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
                          </button>
                          {isOpen && (
                            <div className="flex flex-wrap gap-1.5 px-3 pb-3" style={{ borderTop: '1px solid #3d2e1a', paddingTop: '0.6rem' }}>
                              {owned.map(p => <span key={p} className="text-[10px] px-2.5 py-1 rounded-xl" style={{ background: '#c4832a14', border: '1px solid #c4832a33', color: '#c4832a' }}>{p}</span>)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              ) : <span className="text-[10px]" style={labelStyle}>—</span>}
            </div>
          </div>
        ) : (
          /* ---------- EDIT MODE ---------- */
          <div className="space-y-4">
            <div>
              <div className="text-[8px] tracking-[0.2em] uppercase mb-1.5" style={labelStyle}>DAW</div>
              <select value={daw} onChange={e => setDaw(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-[11px] outline-none" style={inputStyle}>
                <option value="">Select your DAW…</option>
                {DAWS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <div className="text-[8px] tracking-[0.2em] uppercase mb-1.5" style={labelStyle}>Microphones</div>
              <div className="flex gap-1.5 mb-2">
                <input
                  value={micInput}
                  onChange={e => setMicInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMic(); } }}
                  placeholder="E.G. RODE NT1 (CONDENSER)"
                  className="flex-1 px-3 py-2.5 rounded-xl text-[11px] tracking-wider outline-none" style={inputStyle}
                />
                <button onClick={addMic} className="hw-button-active px-3 rounded-xl text-[14px]">+</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mics.map(m => (
                  <span key={m} className="text-[10px] px-2.5 py-1 rounded-xl flex items-center gap-1.5" style={{ background: '#120d07', border: '1px solid #3d2e1a', color: '#f0e6c8' }}>
                    {m}
                    <button onClick={() => removeMic(m)} style={{ color: '#e05c2a' }}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[8px] tracking-[0.2em] uppercase mb-1.5" style={labelStyle}>Audio Interface / Preamp</div>
              <input value={iface} onChange={e => setIface(e.target.value)} placeholder="E.G. FOCUSRITE SCARLETT 2I2" className="w-full px-3 py-2.5 rounded-xl text-[11px] tracking-wider outline-none" style={inputStyle} />
            </div>

            <div>
              <div className="text-[8px] tracking-[0.2em] uppercase mb-2" style={labelStyle}>Plugins I Own</div>
              <div className="space-y-1.5">
                {Object.entries(PLUGIN_CATALOG).map(([brand, list]) => {
                  if (!list.length) return null;
                  const count = list.filter(n => plugins.includes(n)).length;
                  const isOpen = openBrand === brand;
                  return (
                    <div key={brand} className="rack-unit rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenBrand(isOpen ? null : brand)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-left"
                      >
                        <span className="text-[9px] tracking-[0.15em] uppercase font-bold" style={{ color: '#c4832a' }}>
                          {brand}{count > 0 && <span style={{ color: '#8a7355' }}> · {count}</span>}
                        </span>
                        <span className="text-[9px] transition-transform duration-200" style={{ color: '#8a7355', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
                      </button>
                      {isOpen && (
                        <div className="flex flex-wrap gap-1.5 px-3 pb-3" style={{ borderTop: '1px solid #3d2e1a', paddingTop: '0.6rem' }}>
                          {list.map(name => (
                            <button
                              key={name}
                              type="button"
                              onClick={() => togglePlugin(name)}
                              className={`text-[9px] px-2 py-1 rounded-lg tracking-wide transition-all ${plugins.includes(name) ? 'hw-button-active' : 'hw-button'}`}
                              style={{ color: plugins.includes(name) ? '#1a1208' : '#8a7355' }}
                            >
                              {name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-3">
                <div className="text-[8px] tracking-[0.15em] uppercase mb-1.5" style={labelStyle}>Add Your Own</div>
                <div className="flex gap-1.5 mb-2">
                  <input
                    value={pluginInput}
                    onChange={e => setPluginInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addManualPlugin(); } }}
                    placeholder="E.G. IZOTOPE OZONE 11"
                    className="flex-1 px-3 py-2.5 rounded-xl text-[11px] tracking-wider outline-none" style={inputStyle}
                  />
                  <button onClick={addManualPlugin} className="hw-button-active px-3 rounded-xl text-[14px]">+</button>
                </div>
                {customPlugins.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {customPlugins.map(p => (
                      <span key={p} className="text-[10px] px-2.5 py-1 rounded-xl flex items-center gap-1.5" style={{ background: '#c4832a14', border: '1px solid #c4832a33', color: '#c4832a' }}>
                        {p}
                        <button onClick={() => togglePlugin(p)} style={{ color: '#e05c2a' }}>✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="hw-button-active w-full py-2.5 rounded-xl text-[10px] font-bold tracking-[0.15em] uppercase mt-2">
              {saving ? 'SAVING…' : 'SAVE PROFILE'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ViewRow({ label, value }) {
  return (
    <div>
      <div className="text-[8px] tracking-[0.2em] uppercase mb-1" style={{ color: '#8a7355' }}>{label}</div>
      <div className="text-[12px] tracking-wide" style={{ color: '#f0e6c8' }}>{value}</div>
    </div>
  );
}