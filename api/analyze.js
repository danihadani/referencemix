export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query, sourceType } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: `You are a professional audio engineer. Return ONLY valid JSON, no markdown:
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
Chain: 4-6 nodes. Colors: #3ddc84, #7c5cfc, #ff6b9d, #ff9f43, #00d2ff. Abbr: max 4 chars. Focus on ${sourceType} processing.`,
      messages: [{ role: 'user', content: `Reference: ${query}\nSource type: ${sourceType}` }],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;
  const cleaned = text.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '').trim();
  res.status(200).json(JSON.parse(cleaned));
}