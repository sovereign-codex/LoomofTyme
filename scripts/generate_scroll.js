// generate_scroll.js
// Sovereign Scroll Generator ✧ Powered by AVOTs

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Scroll Type Templates
const scrollTemplates = {
  mystical: (title, body) => `
✦ Scroll of ${title} ✦

𓂀 Type: Mystical Transmission  
🕊️ Resonance Field: High Coherence  
🗓️ Timestamp: ${new Date().toISOString()}  
🔹 Signature Glyph: [Insert Glyph Here]

—

${body}

∞ Remember who you are ∞
`,

  techno: (title, body) => `
⚙️ Scroll of ${title} ⚙️

📐 Type: TechnoCodex | Prototype Schematic  
📎 Attached Files: [Link or Embed Later]  
🗓️ Generated: ${new Date().toISOString()}  
🧿 Signature Glyph: [Insert Circuit Seal Here]

—

${body}

>>> End of Techno Scroll
`,

  kodex: (title, body) => `
📜 Living Kodex Entry: ${title}

💠 Category: Ethical Law / Resonant Principle  
🧭 Application: All AVOTs + Humans  
🗓️ Date: ${new Date().toISOString()}  
💫 Seal: [Covenant of Harmonic Conduct]

—

${body}

🌿 Let this law be known and remembered.
`
};

// Generator Function
function generateScroll({ type = "mystical", title = "Untitled", body = "..." }) {
  const id = uuidv4();
  const scrollText = scrollTemplates[type](title, body);

  const filename = `Scroll_${title.replace(/\s+/g, "_")}_${id}.md`;
  const outputPath = path.join(__dirname, '..', 'generated_scrolls', filename);

  // Ensure directory exists
  fs.mkdirSync(path.join(__dirname, '..', 'generated_scrolls'), { recursive: true });

  // Write to file
  fs.writeFileSync(outputPath, scrollText);

  // Update registry
  updateScrollRegistry({
    id,
    title,
    type,
    filename,
    timestamp: new Date().toISOString(),
    path: outputPath
  });

  console.log(`✅ Scroll "${title}" generated at ${outputPath}`);
  return outputPath;
}

// Registry Management
function updateScrollRegistry(scrollData) {
  const registryPath = path.join(__dirname, '..', 'scroll_registry.json');
  
  let registry = { scrolls: [] };
  if (fs.existsSync(registryPath)) {
    try {
      registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    } catch (error) {
      console.warn('Registry file corrupted, creating new one');
    }
  }

  registry.scrolls.push(scrollData);
  registry.lastUpdated = new Date().toISOString();
  registry.totalScrolls = registry.scrolls.length;

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🌟 Sovereign Scroll Generator 

Usage: node generate_scroll.js <type> "<title>" "<body>"

Types: mystical, techno, kodex

Example:
node generate_scroll.js mystical "Sacred Geometry" "The patterns of creation reveal themselves..."
    `);
    process.exit(0);
  }

  const [type, title, body] = args;
  
  if (!scrollTemplates[type]) {
    console.error(`❌ Unknown scroll type: ${type}`);
    console.log('Available types:', Object.keys(scrollTemplates).join(', '));
    process.exit(1);
  }

  generateScroll({ type, title, body });
}

module.exports = { generateScroll };