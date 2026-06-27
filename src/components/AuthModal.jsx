import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const fn = mode === 'signup'
        ? supabase.auth.signUp({ email, password })
        : supabase.auth.signInWithPassword({ email, password });
      const { data, error } = await fn;
      if (error) throw error;
      if (mode === 'signup' && !data.session) {
        setError('Check your email to confirm your account.');
        setLoading(false);
        return;
      }
      onAuth?.(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 panel-texture"
        style={{ background: '#1a1208', border: '1.5px solid #3d2e1a', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="led led-on" />
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: '#f0e6c8' }}>
            {mode === 'signup' ? 'Create Account' : 'Sign In'}
          </div>
        </div>
        <p className="text-[10px] tracking-wide mb-5" style={{ color: '#8a7355' }}>
          Save your gear profile and get personalized chains.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="EMAIL"
            required
            className="w-full px-4 py-2.5 rounded-xl text-[11px] tracking-wider outline-none"
            style={{ background: '#120d07', border: '1.5px solid #3d2e1a', color: '#f0e6c8', fontFamily: "'JetBrains Mono', monospace" }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="PASSWORD"
            required
            minLength={6}
            className="w-full px-4 py-2.5 rounded-xl text-[11px] tracking-wider outline-none"
            style={{ background: '#120d07', border: '1.5px solid #3d2e1a', color: '#f0e6c8', fontFamily: "'JetBrains Mono', monospace" }}
          />

          {error && (
            <div className="text-[10px] tracking-wide px-3 py-2 rounded-lg" style={{ color: '#e05c2a', background: 'rgba(224,92,42,0.08)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="hw-button-active w-full py-2.5 rounded-xl text-[10px] font-bold tracking-[0.15em] uppercase"
          >
            {loading ? 'PLEASE WAIT…' : (mode === 'signup' ? 'SIGN UP' : 'SIGN IN')}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(null); }}
          className="w-full mt-4 text-[9px] tracking-wider uppercase transition-colors"
          style={{ color: '#8a7355' }}
          onMouseEnter={e => e.currentTarget.style.color = '#c4832a'}
          onMouseLeave={e => e.currentTarget.style.color = '#8a7355'}
        >
          {mode === 'signup' ? 'Already have an account? Sign in' : 'No account? Create one'}
        </button>
      </div>
    </div>
  );
}