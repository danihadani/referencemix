export const PRESETS = [
  {
    id: 'billie-vocal',
    reference: 'Billie Eilish — Happier Than Ever',
    type: 'vocal',
    keywords: ['billie', 'eilish', 'happier'],
    vibe: 'Intimate, breathy, close-mic ASMR-style vocal with subtle darkness. Minimal reverb, maximum presence.',
    why: 'The vocal in this track is engineered for extreme intimacy. The close-mic technique captures breath and texture — the mix leans into this rather than hiding it. Very light processing keeps the raw character. The short plate adds just enough size without pushing the vocal back in the stereo image.',
    chain: [
      { id: 'hpf', name: 'High-Pass Filter', abbr: 'HPF', color: '#3ddc84', category: 'EQ' },
      { id: '1176', name: '1176 Compressor', abbr: '1176', color: '#7c5cfc', category: 'Compressor' },
      { id: 'deess', name: 'De-esser', abbr: 'DESS', color: '#ff9f43', category: 'Dynamic EQ' },
      { id: 'sat', name: 'Tape Saturation', abbr: 'SAT', color: '#ff6b9d', category: 'Saturation' },
      { id: 'rev', name: 'Plate Reverb', abbr: 'REVB', color: '#00d2ff', category: 'Reverb' },
    ],
    settings: [
      {
        plugin: 'High-Pass Filter', category: 'EQ',
        params: [
          { name: 'Freq', value: '90 Hz', note: 'Roll off rumble & proximity effect' },
          { name: 'Slope', value: '12 dB/oct', note: 'Gentle roll-off' },
        ],
      },
      {
        plugin: '1176 Compressor', category: 'Compressor',
        params: [
          { name: 'Ratio', value: '4:1', note: 'Gentle control' },
          { name: 'Attack', value: '0.5 ms', note: 'Fast — catches consonants' },
          { name: 'Release', value: 'Medium', note: 'Auto-release feel' },
          { name: 'GR', value: '3–5 dB', note: 'Barely touching' },
        ],
      },
      {
        plugin: 'De-esser', category: 'Dynamic EQ',
        params: [
          { name: 'Freq', value: '7–9 kHz', note: 'Target sibilance range' },
          { name: 'Threshold', value: 'Light', note: 'Only catch peaks' },
        ],
      },
      {
        plugin: 'Tape Saturation', category: 'Saturation',
        params: [
          { name: 'Drive', value: 'Low (2–4)', note: 'Subtle tape-style warmth' },
          { name: 'Mix', value: '15–25%', note: 'Parallel blend' },
        ],
      },
      {
        plugin: 'Plate Reverb', category: 'Reverb',
        params: [
          { name: 'Decay', value: '0.6–0.9s', note: 'Just enough to glue' },
          { name: 'Pre-delay', value: '12 ms', note: 'Keeps vocal upfront' },
          { name: 'Wet', value: '8–12%', note: 'Almost invisible' },
        ],
      },
    ],
  },
  {
    id: 'tame-guitar',
    reference: 'Tame Impala — The Less I Know The Better',
    type: 'guitar',
    keywords: ['tame', 'impala', 'less', 'know'],
    vibe: 'Lush psychedelic guitar with wobbly chorus/flanger, driven fuzz, and deep reverb bloom.',
    why: "Kevin Parker's guitar tone lives in a psychedelic wash. The key is layering modulation — phaser into chorus — to create that wobbly, shifting quality. A tape-style delay with subtle flutter before a large hall reverb pushes the guitar into a dreamlike space.",
    chain: [
      { id: 'fuzz', name: 'Fuzz Pedal', abbr: 'FUZZ', color: '#ff6b9d', category: 'Distortion' },
      { id: 'phase', name: 'Phaser', abbr: 'PHS', color: '#7c5cfc', category: 'Modulation' },
      { id: 'chorus', name: 'Chorus', abbr: 'CHR', color: '#00d2ff', category: 'Modulation' },
      { id: 'delay', name: 'Tape Delay', abbr: 'DLY', color: '#ff9f43', category: 'Delay' },
      { id: 'hall', name: 'Hall Reverb', abbr: 'HALL', color: '#3ddc84', category: 'Reverb' },
    ],
    settings: [
      {
        plugin: 'Fuzz Pedal', category: 'Distortion',
        params: [
          { name: 'Fuzz', value: '55–65%', note: 'Smooth, not gated' },
          { name: 'Tone', value: 'Mid-bright', note: 'Cut mids slightly' },
        ],
      },
      {
        plugin: 'Phaser', category: 'Modulation',
        params: [
          { name: 'Rate', value: '0.3 Hz', note: 'Slow subtle sweep' },
          { name: 'Depth', value: '40–60%', note: 'Dreamy not obvious' },
          { name: 'Stages', value: '4–6', note: 'Classic phaser' },
        ],
      },
      {
        plugin: 'Chorus', category: 'Modulation',
        params: [
          { name: 'Rate', value: '0.5–0.8 Hz', note: 'Slow lush movement' },
          { name: 'Mix', value: '40–50%', note: 'Prominent but blended' },
        ],
      },
      {
        plugin: 'Tape Delay', category: 'Delay',
        params: [
          { name: 'Time', value: '250 ms', note: '1/4 note at ~120 bpm' },
          { name: 'Feedback', value: '35%', note: '2–3 repeats' },
          { name: 'Flutter', value: 'Low', note: 'Tape imperfection' },
        ],
      },
      {
        plugin: 'Hall Reverb', category: 'Reverb',
        params: [
          { name: 'Decay', value: '2.5–3.5s', note: 'Big space' },
          { name: 'Pre-delay', value: '25 ms', note: 'Separation from dry' },
          { name: 'Wet', value: '25–35%', note: 'Guitar floats in space' },
        ],
      },
    ],
  },
  {
    id: 'arctic-drums',
    reference: 'Arctic Monkeys — AM',
    type: 'drums',
    keywords: ['arctic', 'monkeys', 'am'],
    vibe: 'Punchy, roomy, vintage drums. Big snare crack, controlled low-end, short room ambience.',
    why: 'AM drums sound like they were recorded in a real room with a vintage desk. The secret is parallel compression — crush a copy heavily and blend it under the dry signal to get sustain and density without losing the attack.',
    chain: [
      { id: 'gate', name: 'Gate', abbr: 'GATE', color: '#ff9f43', category: 'Gate' },
      { id: 'ssl', name: 'SSL Bus Comp', abbr: 'SSL', color: '#7c5cfc', category: 'Compressor' },
      { id: 'para', name: 'Parallel Comp', abbr: 'PRLL', color: '#ff6b9d', category: 'Compressor' },
      { id: 'trans', name: 'Transient Shaper', abbr: 'TRNS', color: '#3ddc84', category: 'Dynamics' },
      { id: 'room', name: 'Room Reverb', abbr: 'ROOM', color: '#00d2ff', category: 'Reverb' },
      { id: 'tape', name: 'Tape Saturation', abbr: 'TAPE', color: '#ff9f43', category: 'Saturation' },
    ],
    settings: [
      {
        plugin: 'Gate (Snare)', category: 'Gate',
        params: [
          { name: 'Threshold', value: '-20 dB', note: 'Only catch snare hits' },
          { name: 'Release', value: '80–120 ms', note: 'Natural decay' },
        ],
      },
      {
        plugin: 'SSL G-Bus Comp', category: 'Compressor',
        params: [
          { name: 'Ratio', value: '4:1', note: 'Glue setting' },
          { name: 'Attack', value: '3 ms', note: 'Preserve punch' },
          { name: 'GR', value: '2–4 dB', note: 'Subtle glue' },
        ],
      },
      {
        plugin: 'Parallel Compression', category: 'Compressor',
        params: [
          { name: 'Ratio', value: '10:1+', note: 'Crush the parallel copy' },
          { name: 'Blend', value: '30–50%', note: 'Under the dry signal' },
        ],
      },
      {
        plugin: 'Transient Shaper', category: 'Dynamics',
        params: [
          { name: 'Attack', value: '+2 to +4', note: 'Accentuate snap' },
          { name: 'Sustain', value: '-2 to 0', note: 'Control room bleed' },
        ],
      },
      {
        plugin: 'Room Reverb', category: 'Reverb',
        params: [
          { name: 'Type', value: 'Small Room', note: 'Real, not synthetic' },
          { name: 'Decay', value: '0.4–0.7s', note: 'Short & punchy' },
          { name: 'Wet', value: '15–20%', note: 'Subtle' },
        ],
      },
    ],
  },
  {
    id: 'frank-mix',
    reference: 'Frank Ocean — Blonde',
    type: 'mix',
    keywords: ['frank', 'ocean', 'blonde'],
    vibe: 'Lo-fi meets hi-fi. Deconstructed production with raw moments and lush, unexpected textures.',
    why: 'Blonde deliberately mixes high-quality and degraded elements. Use lo-fi saturation to age certain elements, binaural-style panning for intimate stereo placement, and spring reverb for unpredictable texture.',
    chain: [
      { id: 'lofi', name: 'Lo-Fi Sat', abbr: 'LOFI', color: '#ff9f43', category: 'Saturation' },
      { id: 'wow', name: 'Tape Flutter', abbr: 'WOW', color: '#7c5cfc', category: 'Modulation' },
      { id: 'pan', name: 'Binaural Pan', abbr: 'PAN', color: '#00d2ff', category: 'Spatial' },
      { id: 'spring', name: 'Spring Reverb', abbr: 'SPRG', color: '#3ddc84', category: 'Reverb' },
    ],
    settings: [
      {
        plugin: 'Lo-Fi Saturation', category: 'Saturation',
        params: [
          { name: 'Bit Crush', value: 'Subtle', note: 'Adds grit, not obvious' },
          { name: 'Low-pass', value: '14–16 kHz', note: 'Vintage air roll-off' },
        ],
      },
      {
        plugin: 'Spring Reverb', category: 'Reverb',
        params: [
          { name: 'Decay', value: '1.5–2.5s', note: 'Medium with drip' },
          { name: 'Mix', value: '20–35%', note: 'Forward in the mix' },
        ],
      },
    ],
  },
];

export const TYPE_CONFIG = {
  vocal: { label: 'Vocal', color: '#ff6b9d', bg: 'rgba(255,107,157,0.12)' },
  guitar: { label: 'Guitar', color: '#3ddc84', bg: 'rgba(61,220,132,0.1)' },
  drums: { label: 'Drums', color: '#ff9f43', bg: 'rgba(255,159,67,0.1)' },
  bass: { label: 'Bass', color: '#00d2ff', bg: 'rgba(0,210,255,0.1)' },
  mix: { label: 'Full Mix', color: '#a084ff', bg: 'rgba(160,132,255,0.12)' },
  other: { label: 'Other', color: '#e8e8f0', bg: 'rgba(232,232,240,0.08)' },
};

export function getTypeConfig(type) {
  return TYPE_CONFIG[type] || {
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: '#a084ff',
    bg: 'rgba(160,132,255,0.12)',
  };
}