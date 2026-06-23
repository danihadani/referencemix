import { useState } from 'react';
import ChainNode from '../components/ChainNode';
import PluginSettings from '../components/PluginSettings';
import VUMeter from '../components/VUMeter';
import { TYPE_CONFIG, getTypeConfig } from '../data/presets';

export default function Results({ result, onBack, onSave, isSaved }) {
  const [tab, setTab] = useState('chain');
  const cfg = getTypeConfig(result.type);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1a1208' }}>
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
  <div className="flex items-center gap-3">
    <div className="screw" />
    <button
      onClick={onBack}
      className="hw-button text-[10px] px-3 py-1.5 rounded-xl tracking-wider uppercase"
      style={{ color: '#8a7355' }}
    >
      ← BACK
    </button>
    <div className="w-px h-4" style={{ background: '#3d2e1a' }} />
    <div className="text-[9px] tracking-[0.2em] uppercase" style={{ color: '#8a7355' }}>Signal Chain</div>
  </div>
  <div className="flex items-center gap-3">
    <VUMeter active />
    <div className="screw" />
  </div>
</header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {/* Reference title */}
        <div className="mb-8">
          <div className="text-[9px] tracking-[0.2em] uppercase mb-2 flex items-center gap-2" style={{ color: '#8a7355' }}>
            <div className="led led-on" />
            REFERENCE
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: '#f0e6c8' }}>
              {result.reference}
            </h2>
            <span
              className="text-[8px] font-bold tracking-[0.15em] px-2 py-1 rounded-xl uppercase"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}44` }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-[12px] mt-2 leading-relaxed tracking-wide" style={{ color: '#8a7355' }}>{result.vibe}</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 mb-6 w-fit rack-unit rounded-xl">
          {[{ key: 'chain', label: 'CHAIN' }, { key: 'settings', label: 'SETTINGS' }].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-xl text-[9px] font-bold tracking-[0.15em] transition-all duration-100 ${tab === key ? 'hw-button-active' : 'hw-button'}`}
              style={{ color: tab === key ? '#1a1208' : '#8a7355' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Chain view */}
        {tab === 'chain' && (
          <div>
            <div
              className="p-6 rounded-xl border mb-6 panel-texture overflow-x-auto"
              style={{ background: '#0e0b06', borderColor: '#3d2e1a', borderWidth: '1.5px' }}
            >
              <div className="text-[8px] tracking-[0.25em] uppercase mb-5 flex items-center gap-2" style={{ color: '#5a4530' }}>
                <div className="led" style={{ background: '#5a4530' }} />
                SIGNAL FLOW
              </div>
              <div className="flex items-start gap-0 min-w-max">
                {/* Input */}
                <div className="flex flex-col items-center gap-1.5 mr-1">
                  <div
                    className="w-[72px] h-[72px] rack-unit rounded-xl flex flex-col items-center justify-center gap-1 relative"
                  >
                 
                    <div className="led led-on absolute top-1.5 left-1/2 -translate-x-1/2" />
                    <span className="text-[8px] font-bold tracking-[0.15em] mt-3" style={{ color: '#8a7355' }}>INPUT</span>
                  </div>
                  <span className="text-[8px] tracking-wider uppercase" style={{ color: '#5a4530' }}>{result.type}</span>
                </div>
                <div className="flex items-center mt-5 mx-1">
                  <div className="w-5 h-px" style={{ background: 'linear-gradient(90deg, #3d2e1a, #5a4030)' }} />
                  <div className="w-0 h-0" style={{
                    borderTop: '3px solid transparent',
                    borderBottom: '3px solid transparent',
                    borderLeft: '4px solid #5a4030',
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
                  <div className="w-5 h-px" style={{ background: 'linear-gradient(90deg, #3d2e1a, #5a4030)' }} />
                  <div className="w-0 h-0" style={{
                    borderTop: '3px solid transparent',
                    borderBottom: '3px solid transparent',
                    borderLeft: '4px solid #5a4030',
                  }} />
                </div>
                {/* Output */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-[72px] h-[72px] rack-unit rounded-xl flex flex-col items-center justify-center gap-1 relative">
                    <div className="led led-on absolute top-1.5 left-1/2 -translate-x-1/2" style={{ background: '#c4832a', boxShadow: '0 0 4px #c4832a' }} />
                    <span className="text-[8px] font-bold tracking-[0.15em] mt-3" style={{ color: '#c4832a' }}>OUT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why section */}
            <div className="p-5 rounded-xl rack-unit">
              <div className="text-[9px] tracking-[0.2em] uppercase mb-3 flex items-center gap-2" style={{ color: '#8a7355' }}>
                <div className="led led-on" />
                WHY THESE CHOICES?
              </div>
              <p className="text-[12px] leading-relaxed tracking-wide" style={{ color: '#b89e7a' }}>{result.why}</p>
            </div>
          </div>
        )}

        {tab === 'settings' && <PluginSettings settings={result.settings} />}

        {/* Save button */}
        <div className="mt-8">
          <button
            onClick={onSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-150 ${isSaved ? 'hw-button-active' : 'hw-button'}`}
            style={{ color: isSaved ? '#1a1208' : '#8a7355' }}
          >
            <span>{isSaved ? '★' : '☆'}</span>
            {isSaved ? 'SAVED' : 'SAVE CHAIN'}
          </button>
        </div>
      </main>
    </div>
  );
}
