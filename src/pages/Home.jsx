import { useState } from 'react';
import VUMeter from '../components/VUMeter';


const SOURCE_TYPES = ['vocal', 'guitar', 'drums', 'bass', 'synth', 'piano', 'mix', 'other'];

export default function Home({ onAnalyze, error, saved, onOpenSaved, user, onOpenAuth, onSignOut }) {
  const [query, setQuery] = useState('');
  const [sourceType, setSourceType] = useState('vocal');
  const [customType, setCustomType] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    const type = sourceType === 'other' ? (customType.trim() || 'other') : sourceType;
    onAnalyze({ query: query.trim(), sourceType: type });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1a1208' }}>
      {/* Header — rack panel style */}
      <header
  className="flex items-center justify-between px-6 py-3 sticky top-0 z-10 panel-texture"
  style={{
    borderBottom: '2px solid #3d2e1a',
    borderTop: '1px solid #5a4030',
    background: 'rgba(26,18,8,0.96)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
  }}
>
  <div className="flex items-center gap-4">
    <div className="screw" />
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold"
      style={{
        background: 'linear-gradient(135deg, #c4832a, #e05c2a)',
        color: '#1a1208',
        boxShadow: '0 0 8px rgba(196,131,42,0.3)',
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.05em',
      }}
    >
      RM
    </div>
    <div>
      <div className="text-[13px] font-bold tracking-[0.08em]" style={{ color: '#f0e6c8' }}>REFERENCEMIX</div>
      <div className="text-[8px] tracking-[0.25em]" style={{ color: '#8a7355' }}>AI SIGNAL CHAIN BUILDER</div>
    </div>
  </div>

         <div className="flex items-center gap-4">
          <VUMeter active={focused} />
          {saved && saved.length > 0 && (
            <button
              onClick={onOpenSaved}
              className="hw-button flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider"
              style={{ color: '#c4832a' }}
            >
              ★ {saved.length}
            </button>
          )}
          {user ? (
            <button
              onClick={onSignOut}
              className="hw-button flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider"
              style={{ color: '#8a7355' }}
              title={user.email}
            >
              ⏻ SIGN OUT
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hw-button flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider"
              style={{ color: '#c4832a' }}
            >
              SIGN IN
            </button>
          )}
          <div className="screw" />
        </div>
</header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-12 max-w-lg">
          <div className="text-[9px] tracking-[0.3em] mb-4 uppercase flex items-center justify-center gap-2" style={{ color: '#8a7355' }}>
            <div className="led led-on led-blink" />
            SIGNAL CHAIN GENERATOR
            <div className="led led-on led-blink" />
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #f0e6c8 30%, #c4832a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            Sound like your<br />reference.
          </h1>
          <p className="text-[13px] leading-relaxed tracking-wide" style={{ color: '#b89e7a' }}>
            Describe a reference track and get a complete processing chain
            with plugin suggestions and parameter settings.
          </p>
        </div>

        {/* Source type selector — hardware button style */}
        <div
          className="flex gap-1 p-1.5 mb-4 w-full max-w-lg rack-unit rounded-xl"
        >
          {SOURCE_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setSourceType(t)}
              className={`flex-1 py-2 rounded-xl text-[9px] font-bold tracking-[0.1em] uppercase transition-all duration-100 ${sourceType === t ? 'hw-button-active' : 'hw-button'}`}
              style={{ color: sourceType === t ? '#1a1208' : '#8a7355' }}
            >
              {t}
            </button>
          ))}
        </div>

        {sourceType === 'other' && (
          <input
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            placeholder="E.G. SYNTH, STRINGS, PIANO…"
            className="w-full max-w-lg mb-4 px-4 py-2.5 rounded-xl text-[11px] tracking-wider outline-none"
            style={{
              background: '#120d07',
              border: '1.5px solid #3d2e1a',
              color: '#f0e6c8',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          />
        )}

        {/* Search form */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div
            className="relative rounded-xl transition-all duration-200 panel-texture"
            style={{
              background: '#120d07',
              border: `1.5px solid ${focused ? '#c4832a' : '#3d2e1a'}`,
              boxShadow: focused ? '0 0 0 2px rgba(196,131,42,0.2), inset 0 2px 8px rgba(0,0,0,0.3)' : 'inset 0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
              }}
              placeholder="TYPE YOUR REFERENCE HERE — ARTIST, SONG, OR VIBE…"
              rows={2}
              className="w-full bg-transparent text-[11px] resize-none outline-none px-5 pt-4 pb-14 leading-relaxed tracking-wider"
              style={{ color: '#f0e6c8', fontFamily: "'JetBrains Mono', monospace" }}
            />
            <button
              type="submit"
              className="hw-button-active absolute right-3 bottom-3 px-5 py-2 rounded-xl text-[10px] font-bold tracking-[0.15em] uppercase"
            >
              ANALYZE →
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 px-4 py-3 rounded-xl text-[10px] border max-w-lg text-center tracking-wider" style={{ color: '#e05c2a', borderColor: 'rgba(224,92,42,0.2)', background: 'rgba(224,92,42,0.06)' }}>
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
