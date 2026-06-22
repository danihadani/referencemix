import { useState } from 'react';
import ChainNode from '../components/ChainNode';
import PluginSettings from '../components/PluginSettings';
import VUMeter from '../components/VUMeter';
import { TYPE_CONFIG, getTypeConfig } from '../data/presets';

export default function Results({ result, onBack, onSave, isSaved }) {
  const [tab, setTab] = useState('chain');
  const cfg = getTypeConfig(result.type);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0c' }}>
      <header
        className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
        style={{ borderColor: '#1c1c22', background: 'rgba(10,10,12,0.9)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[#5a5a6e] hover:text-[#e8e8f0] transition-colors text-sm"
          >
            ← Back
          </button>
          <div className="w-px h-4" style={{ background: '#2a2a32' }} />
          <div className="text-[9px] text-[#5a5a6e] font-mono tracking-wider uppercase">Signal Chain</div>
        </div>
        <VUMeter active />
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="mb-8">
          <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#5a5a6e] mb-2">Reference</div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-[#e8e8f0]" style={{ letterSpacing: '-0.02em' }}>
              {result.reference}
            </h2>
            <span
              className="text-[9px] font-bold font-mono px-2 py-1 rounded-lg uppercase tracking-wider"
              style={{ background: cfg.bg, color: cfg.color }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-[#5a5a6e] text-sm mt-2 leading-relaxed">{result.vibe}</p>
        </div>

        <div
          className="flex gap-1 p-1 rounded-xl mb-6 w-fit"
          style={{ background: '#141418', border: '1px solid #1c1c22' }}
        >
          {[{ key: 'chain', label: 'Chain' }, { key: 'settings', label: 'Settings' }].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="px-5 py-2 rounded-lg text-[11px] font-semibold transition-all duration-150"
              style={tab === key
                ? { background: '#7c5cfc', color: 'white' }
                : { color: '#5a5a6e', background: 'transparent' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'chain' && (
          <div>
            <div
              className="p-6 rounded-2xl border mb-6 panel-texture overflow-x-auto"
              style={{ background: '#0e0e12', borderColor: '#1c1c22' }}
            >
              <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#3a3a4e] mb-5">
                Signal Flow
              </div>
              <div className="flex items-start gap-0 min-w-max">
                <div className="flex flex-col items-center gap-1 mr-1">
                  <div
                    className="w-16 h-16 rounded-xl border flex items-center justify-center"
                    style={{ background: '#141418', borderColor: '#2a2a32' }}
                  >
                    <span className="text-[9px] font-mono font-bold text-[#3a3a4e] tracking-widest">INPUT</span>
                  </div>
                  <span className="text-[9px] text-[#3a3a4e]">{result.type}</span>
                </div>
                <div className="flex items-center mt-5 mx-1">
                  <div className="w-4 h-px bg-[#2a2a32]" />
                  <div className="w-0 h-0" style={{
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderLeft: '5px solid #2a2a32',
                  }} />
                </div>
                {result.chain.map((node, i) => (
                  <ChainNode
                    key={node.id}
                    node={node}
                    isLast={i === result.chain.length - 1}
                    delay={i * 60}
                  />
                ))}
                <div className="flex items-center mt-5 mx-1">
                  <div className="w-4 h-px bg-[#2a2a32]" />
                  <div className="w-0 h-0" style={{
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderLeft: '5px solid #2a2a32',
                  }} />
                </div>
                <div className="w-16 h-16 rounded-xl border flex items-center justify-center" style={{ background: '#141418', borderColor: '#2a2a32' }}>
                  <span className="text-[9px] font-mono font-bold text-[#3a3a4e] tracking-widest">OUT</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border" style={{ background: '#0e0e12', borderColor: '#1c1c22' }}>
              <div className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#5a5a6e] mb-3">
                Why these choices?
              </div>
              <p className="text-[#9090a8] text-sm leading-relaxed">{result.why}</p>
            </div>
          </div>
        )}

        {tab === 'settings' && <PluginSettings settings={result.settings} />}

        <div className="mt-8">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150"
            style={isSaved
              ? { borderColor: '#7c5cfc', color: '#a084ff', background: 'rgba(124,92,252,0.1)' }
              : { borderColor: '#2a2a32', color: '#5a5a6e', background: 'transparent' }
            }
          >
            <span>{isSaved ? '★' : '☆'}</span>
            {isSaved ? 'Saved' : 'Save Chain'}
          </button>
        </div>
      </main>
    </div>
  );
}