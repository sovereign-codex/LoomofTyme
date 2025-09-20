// validate_scrolls.js
// Scroll Validation System for Sovereign Intelligence

const fs = require('fs');
const path = require('path');

// Validation Rules
const validationRules = {
  mystical: {
    requiredElements: ['✦', '𓂀', '🕊️', '🗓️', '🔹', '∞'],
    requiredSections: ['Type: Mystical Transmission', 'Resonance Field:', 'Timestamp:', 'Signature Glyph:'],
    minLength: 100
  },
  techno: {
    requiredElements: ['⚙️', '📐', '📎', '🗓️', '🧿', '>>>'],
    requiredSections: ['Type: TechnoCodex', 'Generated:', 'Signature Glyph:'],
    minLength: 80
  },
  kodex: {
    requiredElements: ['📜', '💠', '🧭', '🗓️', '💫', '🌿'],
    requiredSections: ['Living Kodex Entry:', 'Category:', 'Application:', 'Date:'],
    minLength: 100
  }
};

// Validation Functions
function validateScroll(filePath) {
  if (!fs.existsSync(filePath)) {
    return { valid: false, errors: ['File does not exist'] };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  
  // Detect scroll type from filename or content
  let scrollType = 'mystical'; // default
  if (filename.includes('techno') || content.includes('TechnoCodex')) {
    scrollType = 'techno';
  } else if (filename.includes('kodex') || content.includes('Living Kodex')) {
    scrollType = 'kodex';
  }

  const rules = validationRules[scrollType];
  const errors = [];

  // Check required elements
  rules.requiredElements.forEach(element => {
    if (!content.includes(element)) {
      errors.push(`Missing required element: ${element}`);
    }
  });

  // Check required sections
  rules.requiredSections.forEach(section => {
    if (!content.includes(section)) {
      errors.push(`Missing required section: ${section}`);
    }
  });

  // Check minimum length
  if (content.length < rules.minLength) {
    errors.push(`Content too short: ${content.length} chars (minimum: ${rules.minLength})`);
  }

  // Check for timestamp format
  const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (!timestampRegex.test(content)) {
    errors.push('Invalid or missing ISO timestamp');
  }

  return {
    valid: errors.length === 0,
    errors,
    scrollType,
    fileSize: content.length,
    wordCount: content.split(/\s+/).length
  };
}

function validateAllScrolls() {
  const generatedDir = path.join(__dirname, 'generated_scrolls');
  
  if (!fs.existsSync(generatedDir)) {
    console.log('📁 No generated_scrolls directory found');
    return { totalScrolls: 0, validScrolls: 0, invalidScrolls: 0 };
  }

  const files = fs.readdirSync(generatedDir).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('📜 No scroll files found to validate');
    return { totalScrolls: 0, validScrolls: 0, invalidScrolls: 0 };
  }

  console.log(`\n🔍 Validating ${files.length} scroll(s)...\n`);

  let validCount = 0;
  let invalidCount = 0;

  files.forEach(file => {
    const filePath = path.join(generatedDir, file);
    const result = validateScroll(filePath);

    if (result.valid) {
      console.log(`✅ ${file} - Valid ${result.scrollType} scroll (${result.wordCount} words)`);
      validCount++;
    } else {
      console.log(`❌ ${file} - Invalid scroll:`);
      result.errors.forEach(error => console.log(`   • ${error}`));
      invalidCount++;
    }
  });

  console.log(`\n📊 Validation Summary:`);
  console.log(`   Total: ${files.length}`);
  console.log(`   Valid: ${validCount}`);
  console.log(`   Invalid: ${invalidCount}`);

  return {
    totalScrolls: files.length,
    validScrolls: validCount,
    invalidScrolls: invalidCount
  };
}

function validateRegistry() {
  const registryPath = path.join(__dirname, 'scroll_registry.json');
  
  if (!fs.existsSync(registryPath)) {
    console.log('📋 No registry file found');
    return false;
  }

  try {
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    
    console.log(`📋 Registry Status:`);
    console.log(`   Total Scrolls: ${registry.totalScrolls || 0}`);
    console.log(`   Last Updated: ${registry.lastUpdated || 'Never'}`);
    
    // Check if files match registry
    const generatedDir = path.join(__dirname, 'generated_scrolls');
    if (fs.existsSync(generatedDir)) {
      const actualFiles = fs.readdirSync(generatedDir).filter(f => f.endsWith('.md'));
      const registryCount = registry.scrolls ? registry.scrolls.length : 0;
      
      if (actualFiles.length !== registryCount) {
        console.log(`⚠️  Mismatch: ${actualFiles.length} files vs ${registryCount} registry entries`);
      } else {
        console.log(`✅ Registry matches file count`);
      }
    }
    
    return true;
  } catch (error) {
    console.log(`❌ Registry validation failed: ${error.message}`);
    return false;
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🔍 Scroll Validation System

Commands:
  all       - Validate all generated scrolls
  registry  - Validate scroll registry
  file <path> - Validate specific scroll file

Example:
  node validate_scrolls.js all
  node validate_scrolls.js file generated_scrolls/Scroll_Example.md
    `);
    process.exit(0);
  }

  const [command, target] = args;

  switch (command) {
    case 'all':
      validateAllScrolls();
      break;
    case 'registry':
      validateRegistry();
      break;
    case 'file':
      if (!target) {
        console.log('❌ Please specify a file path');
        process.exit(1);
      }
      const result = validateScroll(target);
      if (result.valid) {
        console.log(`✅ ${target} is valid`);
      } else {
        console.log(`❌ ${target} has errors:`);
        result.errors.forEach(error => console.log(`   • ${error}`));
      }
      break;
    default:
      console.log(`❌ Unknown command: ${command}`);
      process.exit(1);
  }
}

module.exports = { validateScroll, validateAllScrolls, validateRegistry };