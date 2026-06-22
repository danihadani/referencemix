export async function callClaude(query, sourceType, apiKey) {
  const system = `You are a professional audio engineer and mixer. When given a reference song or artist, return a JSON object describing the ideal processing chain for the specified source type.

Return ONLY valid JSON, no markdown, no explanation:
{
  "reference": "Artist — Song",
  "type": "${sourceType}",
  "vibe": "One sentence describing the sonic character",
  "why": "2-3 sentences explaining the production approach",
  "chain": [
    { "id": "unique_id", "name": "Plugin Name", "abbr": "ABBR", "color": "#hexcolor", "category": "Category" }
  ],
  "settings": [
    {
      "plugin": "Plugin Name",
      "category": "Plugin Category",
      "params": [
        { "name": "Parameter", "value": "Value", "note": "Brief explanation" }
      ]
    }
  ]
}

Chain: 4-6 nodes in signal flow order. 
Colors: use only #3ddc84, #7c5cfc, #ff6b9d, #ff9f43, #00d2ff.
Abbr: max 4 characters.
Focus on ${sourceType} processing specifically.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
          max_tokens: 2048,
      system,
      messages: [{ role: 'user', content: `Reference: ${query}\nSource type: ${sourceType}` }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${response.status}`);
  }

   const json = await response.json();
  const text = json.content[0].text;
  console.log('Claude response:', text);
  // strip markdown code blocks if present
  const cleaned = text.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '').trim();
  return JSON.parse(cleaned);
}