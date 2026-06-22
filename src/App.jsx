import { useState } from 'react';
import Home from './pages/Home';
import Results from './pages/Results';
import SavedPresets from './components/SavedPresets';
import ApiKeyModal from './components/ApiKeyModal';
import { PRESETS } from './data/presets';
import { callClaude } from './utils/callClaude';
import SavedDrawer from './components/SavedDrawer';

function findPreset(query) {
  const lower = query.toLowerCase();
  return PRESETS.find((p) =>
    p.keywords.some((kw) => lower.includes(kw))
  ) || null;
}

export default function App() {
  const [view, setView] = useState('home');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('rm_api_key') || '');
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rm_saved') || '[]'); }
    catch { return []; }
  });

  const isSaved = result
    ? saved.some((s) => s.id === result.id && s.reference === result.reference)
    : false;

  function saveApiKey(key) {
    setApiKey(key);
    localStorage.setItem('rm_api_key', key);
  }

  async function handleAnalyze({ query, sourceType }) {
    setError(null);
    const preset = findPreset(query);
    if (preset) {
      setResult({ ...preset });
      setView('results');
      return;
    }

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

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#0a0a0c' }}>
        <div className="w-10 h-10 rounded-full border-2 spin" style={{ borderColor: '#7c5cfc', borderTopColor: 'transparent' }} />
        <p className="text-[#5a5a6e] text-sm font-mono tracking-wider">Analysing reference…</p>
      </div>
    );
  }

  if (view === 'results' && result) {
    return (
      <>
        <Results
          result={result}
          onBack={() => setView('home')}
          onSave={handleSave}
          isSaved={isSaved}
          apiKey={apiKey}
          onOpenApiModal={() => setShowApiModal(true)}
        />
        {saved.length > 0 && (
          <div className="max-w-2xl mx-auto w-full px-4 pb-16">
            <SavedPresets saved={saved} onLoad={handleLoadSaved} onDelete={handleDeleteSaved} />
          </div>
        )}
        {showApiModal && (
          <ApiKeyModal onSave={saveApiKey} onClose={() => setShowApiModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
       <Home
        onAnalyze={handleAnalyze}
        apiKey={apiKey}
        onOpenApiModal={() => setShowApiModal(true)}
        error={error}
        saved={saved}
        onOpenSaved={() => setShowSavedDrawer(true)}
      />
      {saved.length > 0 && (
        <div className="max-w-md mx-auto w-full px-4 pb-16">
          <SavedPresets saved={saved} onLoad={handleLoadSaved} onDelete={handleDeleteSaved} />
        </div>
      )}
      {showApiModal && (
        <ApiKeyModal onSave={saveApiKey} onClose={() => setShowApiModal(false)} />
      )}
      {showSavedDrawer && (
        <SavedDrawer
          saved={saved}
          onLoad={handleLoadSaved}
          onDelete={handleDeleteSaved}
          onClose={() => setShowSavedDrawer(false)}
        />
      )}
    </>
  );
}