export async function callClaude(query, sourceType, profile = null) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, sourceType, profile }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}