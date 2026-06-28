# ReferenceMix AI — Roadmap

## ✅ Done
- Reference → AI signal chain + plugin suggestions
- Vintage hardware UI
- Premium plugin options (Waves, UA, FabFilter, Valhalla, Soundtoys, Safari Audio) + free alternatives, direct links
- User auth (Supabase)
- Gear profile (DAW, mics, interface, plugins) with view/edit
- Personalized chains based on owned gear
- Accuracy guardrails (no name "correcting", honesty about confidence)

## 🔜 Next: Audio Analysis (the big one)
The current tool relies on Claude's memory → it guesses per-stem sound and can be wrong.
Real fix = analyze actual audio.

### How it works
1. **Analyze the reference** (artist's track): measure EQ curve, dynamic range/compression,
   stereo width, presence, transients → real numbers, not guesses.
2. **Analyze the source** (what the user recorded): same measurements.
3. **The GAP**: compare the two → "your bass is -3dB at 80Hz vs the reference and too dynamic
   → here's a chain to close the gap."

### Legality (important)
- ✅ Acoustic analysis (extracting technical features) is legal — same as iZotope/Gullfoss.
- ✅ User uploads audio they own; analysis happens on-the-fly, file deleted immediately.
- ❌ Do NOT auto-download from Spotify/YouTube (violates ToS + copyright).
- ❌ Do NOT store reference audio on the server.
- Add disclaimer: "Upload only audio you have the rights to."
- If it becomes a commercial product → consult a music IP lawyer.

### Tech notes
- Needs a Python backend (librosa / essentia) for analysis.
- Frontend: file upload for reference snippet + source.
- Return only measurements (no audio) to the chain generator.

## 💡 Other ideas
- Confidence/"starting point, not exact recipe" label on results
- Share chain (link / image) — good for marketing
- Export chain as PDF/image
- Community features / email updates to registered users
- YouTube link → reference name (title only; no audio scraping)