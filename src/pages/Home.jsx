import { useState } from 'react';
import VUMeter from '../components/VUMeter';

const EXAMPLES = [
  { label: 'Vocal like Billie Eilish', query: 'Billie Eilish — Happier Than Ever', type: 'vocal' },
  { label: 'Guitar like Tame Impala', query: 'Tame Impala — The Less I Know The Better', type: 'guitar' },
  { label: 'Drum room like Arctic Monkeys', query: 'Arctic Monkeys AM', type: 'drums' },
  { label: 'Full mix like Frank Ocean', query: 'Frank Ocean — Blonde', type: 'mix' },
];

const SOURCE_TYPES = ['vocal', 'guitar', 'drums', 'bass', 'synth', 'piano', 'mix', 'other'];

export default function Home({ onAnalyze, apiKey, onOpenApiModal, error, saved, onOpenSaved }) {
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
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0c' }}>
            <header
        className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
        style={{ borderColor: '#1c1c22', background: 'rgba(10,10,12,0.9)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #7c5cfc, #ff6b9d)' }}
          >
            RM
          </div>
          <div>
            <div className="text-sm font-bold text-[#e8e8f0] leading-none">ReferenceMix</div>
            <div className="text-[9px] text-[#5a5a6e] font-mono tracking-wider mt-0.5">AI CHAIN BUILDER</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <VUMeter active={focused} />
          {saved && saved.length > 0 && (
            <button
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all"
              style={{ borderColor: '#2a2a32', color: '#ff9f43', background: 'rgba(255,159,67,0.08)' }}
            >
              ★ {saved.length}
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-12 max-w-lg">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#5a5a6e] mb-4 uppercase">
            Signal Chain Generator
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #e8e8f0 40%, #a084ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em',
            }}
          >
            Sound like your reference.
          </h1>
          <p className="text-[#9090a8] text-base leading-relaxed">
            Describe a reference track and get a complete processing chain
            with plugin suggestions and parameter settings.
          </p>
        </div>

        <div
          className="flex gap-1 p-1 rounded-xl mb-4 w-full max-w-md"
          style={{ background: '#141418', border: '1px solid #1c1c22' }}
        >
          {SOURCE_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setSourceType(t)}
              className="flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all duration-150 capitalize"
              style={sourceType === t
                ? { background: '#7c5cfc', color: 'white' }
                : { color: '#5a5a6e', background: 'transparent' }
              }
            >
              {t}
            </button>
          ))}
        </div>
        
{sourceType === 'other' && (
  <input
    value={customType}
    onChange={(e) => setCustomType(e.target.value)}
    placeholder="e.g. synth, strings, piano…"
    className="w-full max-w-md mb-4 px-4 py-2.5 rounded-xl text-sm text-[#e8e8f0] placeholder-[#3a3a4e] outline-none"
    style={{ background: '#141418', border: '1.5px solid #2a2a32' }}
  />
)}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div
            className="relative rounded-2xl transition-all duration-200"
            style={{
              background: '#141418',
              border: `1.5px solid ${focused ? '#7c5cfc' : '#2a2a32'}`,
              boxShadow: focused ? '0 0 0 3px rgba(124,92,252,0.12)' : 'none',
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
              placeholder={`e.g. Billie Eilish — Happier Than Ever ${sourceType}`}
              rows={2}
              className="w-full bg-transparent text-[#e8e8f0] placeholder-[#3a3a4e] text-sm resize-none outline-none px-5 pt-4 pb-14 leading-relaxed"
            />
            <button
              type="submit"
              className="absolute right-3 bottom-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, #7c5cfc, #ff6b9d)' }}
            >
              Analyze →
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 mt-4 justify-center max-w-md">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => { setQuery(ex.query); setSourceType(ex.type); }}
              className="text-[11px] px-3 py-1.5 rounded-full border transition-all duration-150 hover:border-[#7c5cfc] hover:text-[#a084ff]"
              style={{ borderColor: '#2a2a32', color: '#5a5a6e' }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="mt-20 flex items-center gap-4 opacity-20">
          {['EQ', 'COMP', 'REVB', 'SAT', 'DLY'].map((label) => (
            <div
              key={label}
              className="w-12 h-10 rounded-lg border flex items-center justify-center panel-texture"
              style={{ borderColor: '#2a2a32', background: '#141418' }}
            >
              <span className="text-[8px] font-mono font-bold text-[#5a5a6e] tracking-widest">{label}</span>
            </div>
          ))}
          <div className="text-[8px] font-mono text-[#3a3a3e] tracking-widest">→ OUTPUT</div>
                  {error && (
          <div className="mt-4 px-4 py-3 rounded-xl text-xs text-[#ff6b6b] border border-[#ff6b6b22] bg-[#ff6b6b0a] max-w-md text-center">
            {error}
          </div>
        )}
        </div>
        
      </main>
    </div>
  );
}