import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Results from './pages/Results';
import { callClaude } from './utils/callClaude';
import SavedDrawer from './components/SavedDrawer';
import AuthModal from './components/AuthModal';
import { supabase } from './lib/supabase';

export default function App() {
  const [view, setView] = useState('home');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rm_saved') || '[]'); }
    catch { return []; }
  });

  // Track auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const isSaved = result
    ? saved.some((s) => s.id === result.id && s.reference === result.reference)
    : false;

  async function handleAnalyze({ query, sourceType }) {
    setError(null);
    setView('loading');
    try {
      const data = await callClaude(query, sourceType);
      setResult({ ...data, type: sourceType });
      setView('results');
    } catch (e) {
      setError(e.message);
      setView('home');
    }
  }

  function handleSave() {
    if (!result) return;
    setSaved((prev) => {
      const next = isSaved
        ? prev.filter((s) => !(s.id === result.id && s.reference === result.reference))
        : [...prev, { ...result, savedAt: Date.now() }];
      localStorage.setItem('rm_saved', JSON.stringify(next));
      return next;
    });
  }

  function handleLoadSaved(preset) {
    setResult(preset);
    setView('results');
  }

  function handleDeleteSaved(savedAt) {
    setSaved((prev) => {
      const next = prev.filter((s) => s.savedAt !== savedAt);
      localStorage.setItem('rm_saved', JSON.stringify(next));
      return next;
    });
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#1a1208' }}>
        <div className="w-10 h-10 rounded-full border-2 spin" style={{ borderColor: '#c4832a', borderTopColor: 'transparent' }} />
        <p className="text-sm font-mono tracking-wider" style={{ color: '#8a7355' }}>Analysing reference…</p>
      </div>
    );
  }

  if (view === 'results' && result) {
    return (
      <Results
        result={result}
        onBack={() => setView('home')}
        onSave={handleSave}
        isSaved={isSaved}
      />
    );
  }

  return (
    <>
      <Home
        onAnalyze={handleAnalyze}
        error={error}
        saved={saved}
        onOpenSaved={() => setShowSavedDrawer(true)}
        user={user}
        onOpenAuth={() => setShowAuth(true)}
        onSignOut={handleSignOut}
      />
      {showSavedDrawer && (
        <SavedDrawer
          saved={saved}
          onLoad={handleLoadSaved}
          onDelete={handleDeleteSaved}
          onClose={() => setShowSavedDrawer(false)}
        />
      )}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuth={setUser}
        />
      )}
    </>
  );
}