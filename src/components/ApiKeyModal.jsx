import { useState } from 'react';

export default function ApiKeyModal({ onSave, onClose }) {
  const [key, setKey] = useState('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm mx-4 rounded-2xl border p-6"
        style={{ background: '#141418', borderColor: '#2a2a32' }}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-sm font-bold text-[#e8e8f0] mb-1">Connect Claude API</h3>
        <p className="text-[11px] text-[#5a5a6e] mb-4 leading-relaxed">
          Your key stays in the browser only. Never sent to any server — calls go directly to Anthropic.
        </p>
        <input
          type="password"
          placeholder="sk-ant-api03-..."
          value={key}
          onChange={e => setKey(e.target.value)}
          className="w-full bg-[#0e0e12] border border-[#2a2a32] rounded-xl px-4 py-3 text-sm font-mono text-[#e8e8f0] outline-none mb-3 focus:border-[#7c5cfc]"
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-[#5a5a6e] border border-[#2a2a32] hover:text-[#e8e8f0] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(key.trim()); onClose(); }}
            disabled={!key.trim()}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #7c5cfc, #ff6b9d)' }}
          >
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  );
}