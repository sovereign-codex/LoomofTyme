// Scroll Templates from the Prompt Format Injection Pack
export const SCROLL_TEMPLATES = {
  codex: {
    id: 'codex',
    name: 'Codex Entry',
    glyph: '📜',
    category: 'mystical',
    template: `# 📜 Codex Entry: [Title Here]

**Author**: [Your Name / AVOT Agent]  
**Date**: ${new Date().toISOString().split('T')[0]}  
**Glyph**: [Insert if applicable]

---

## Resonance Insight

[Insert the core insight, realization, or decoded pattern.]

---

## Supporting Observations

- Observation 1
- Observation 2
- Observation 3

---

## Harmonic Implications

[How this insight shifts or harmonizes the broader field.]

---

## Scroll Signature

[🔏 Optional Signature Glyph or HTFL chain]`
  },
  
  scientific: {
    id: 'scientific',
    name: 'Scientific Scroll',
    glyph: '🧪',
    category: 'technical',
    template: `# 🧪 Scientific Scroll: [Experiment or Hypothesis Name]

**Lab**: [Digital Laboratory Name]  
**Node**: [Node ID or System]  
**Date**: ${new Date().toISOString().split('T')[0]}  

---

## Hypothesis

[Insert hypothesis or guiding question.]

## Materials & Configuration

- Materials List
- Setup Diagram or Description

## Observed Data

- [Include logs or summarized results.]

## Interpretation

[Conclusions drawn and proposed next steps.]

---

## Node Link

[🔗 Link to simulation repo / AVOT]`
  },
  
  invocation: {
    id: 'invocation',
    name: 'Invocation Scroll',
    glyph: '🔮',
    category: 'mystical',
    template: `# 🔮 Invocation Scroll: [Call to the Field]

**Issued by**: [Author or AVOT]  
**Purpose**: [Alignment, Activation, or Inquiry]

---

## Invocation Statement

[Write the tone-aligned invocation or prompt.]

## Resonant Tone (Optional)

\`\`\`
HTFL:
[ Insert ToneScript ]
\`\`\`

## Intended Outcome

[Describe what this scroll is attempting to harmonize or invoke.]`
  }
};

export type TemplateId = keyof typeof SCROLL_TEMPLATES;