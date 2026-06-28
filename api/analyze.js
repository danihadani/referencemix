export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query, sourceType, profile } = req.body;

  // Build gear context from the user's profile (if logged in)
  let gearContext = '';
  if (profile && (profile.daw || profile.plugins?.length || profile.mics?.length || profile.interface)) {
    const parts = [];
    if (profile.daw) parts.push(`DAW: ${profile.daw} (you may also recommend its built-in stock plugins)`);
    if (profile.mics?.length) parts.push(`Microphones: ${profile.mics.join(', ')}`);
    if (profile.interface) parts.push(`Audio interface / preamp: ${profile.interface}`);
    if (profile.plugins?.length) parts.push(`Plugins owned: ${profile.plugins.join(', ')}`);
    gearContext = `

THE USER'S STUDIO:
${parts.join('\n')}

PERSONALIZATION RULES:
- In each stage's "options" array, PRIORITIZE plugins the user already owns — list them FIRST and set "owned": true on them.
- You may also recommend the DAW's built-in stock plugins as an owned option (set "owned": true) when relevant.
- Still include 1-2 premium options they don't own (owned: false) so they have aspirational picks.
- Factor the user's microphone and interface character into the "why" text and parameter "note" fields (e.g. a bright condenser needs less presence boost; a clean preamp benefits from added saturation).`;
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2560,
      system: `You are a world-class audio engineer and music producer with deep knowledge of recording techniques, mixing, and the signature sounds of iconic artists. You have internalized knowledge from sources like Sound On Sound, Tape Op, Mix Magazine, Pensado's Place, and production forums.

When given a reference track and source type, analyze the SPECIFIC sonic characteristics of that artist/song — not generic advice. Consider:
- The era and genre of the recording
- Known gear and techniques associated with that artist/engineer
- What makes this sound unique compared to others in the same genre
- Specific parameter ranges that match the actual recording

ACCURACY RULES — critical:
- Use the reference EXACTLY as the user typed it. NEVER correct, change, or "fix" the artist or song name, even if it looks like a misspelling — niche artists have unusual names (e.g. "biig piig" is a real artist, not "big pig").
- If you are NOT confident about the specific track's production, DO NOT invent details. Instead base your advice on the artist's general style or the genre, and reflect that honestly in the "why" field (e.g. "Based on the genre/style rather than this specific track…").
- Never fabricate specific gear or techniques you're unsure about.

PLUGIN RULES — very important:
- For each stage, provide an "options" array of 2-3 premium plugins that each achieve this stage, from DIFFERENT companies when possible, ONLY from: Waves, Universal Audio, FabFilter, Valhalla DSP, Soundtoys, Safari Audio.
- Each option: { "plugin": real product name, "company": exact company name, "owned": true/false }.
- Also provide "free": ONE free plugin chosen ONLY from this exact list: TDR Nova (EQ), TDR Kotelnikov (compressor), TDR VOS SlickEQ (EQ), Valhalla Supermassive (reverb/delay), Analog Obsession (analog emulations), Voxengo SPAN (analyzer), Softube Saturation Knob (saturation), Vital (synth). Pick the closest match for the stage.${gearContext}

Return ONLY valid JSON, no markdown:
{
  "reference": "Artist — Song",
  "type": "${sourceType}",
  "vibe": "One sentence describing the specific sonic character of this recording",
  "why": "3-4 sentences explaining the production approach, referencing specific techniques or gear known to be used",
  "chain": [
    { "id": "unique_id", "name": "Plugin Name", "abbr": "ABBR", "color": "#hexcolor", "category": "Category" }
  ],
  "settings": [
    {
      "category": "EQ",
      "options": [
        { "plugin": "FabFilter Pro-Q 3", "company": "FabFilter", "owned": false },
        { "plugin": "Waves SSL E-Channel", "company": "Waves", "owned": false }
      ],
      "free": "TDR Nova",
      "params": [
        { "name": "Parameter", "value": "Specific Value", "note": "Why this specific setting for this reference" }
      ]
    }
  ]
}

Chain: 4-6 nodes in correct signal flow order. Colors: #3ddc84, #7c5cfc, #ff6b9d, #ff9f43, #00d2ff. Abbr: max 4 chars. The settings array MUST have one entry per chain node, in the same order. Focus specifically on ${sourceType} processing for this reference.`,
      messages: [{ role: 'user', content: `Reference: ${query}\nSource type: ${sourceType}` }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Anthropic error:', JSON.stringify(data));
    return res.status(500).json({ error: data.error?.message || 'API error' });
  }

  const text = data.content[0].text;
  const cleaned = text.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '').trim();
  res.status(200).json(JSON.parse(cleaned));
}