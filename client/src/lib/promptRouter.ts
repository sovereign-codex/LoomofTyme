import { SCROLL_TEMPLATES, TemplateId } from './scrollTemplates';

// Intelligent Prompt Router based on the injection pack logic
export function routePrompt(input: string): TemplateId {
  const lowerInput = input.toLowerCase();
  
  // Scientific keywords route to Scientific Scroll
  if (lowerInput.includes("hypothesis") || 
      lowerInput.includes("experiment") || 
      lowerInput.includes("data") ||
      lowerInput.includes("research") ||
      lowerInput.includes("analysis") ||
      lowerInput.includes("test") ||
      lowerInput.includes("study")) {
    return "scientific";
  }
  
  // Mystical/Invocation keywords route to Invocation Template
  if (lowerInput.includes("prophecy") || 
      lowerInput.includes("glyph") ||
      lowerInput.includes("invoke") ||
      lowerInput.includes("call") ||
      lowerInput.includes("alignment") ||
      lowerInput.includes("activation") ||
      lowerInput.includes("field") ||
      lowerInput.includes("htfl") ||
      lowerInput.includes("tone")) {
    return "invocation";
  }
  
  // Default to Codex Entry for insights, observations, etc.
  return "codex";
}

export function getRecommendedTemplate(prompt: string): { 
  templateId: TemplateId; 
  confidence: 'high' | 'medium' | 'low';
  reason: string;
} {
  const templateId = routePrompt(prompt);
  const lowerPrompt = prompt.toLowerCase();
  
  let confidence: 'high' | 'medium' | 'low' = 'low';
  let reason = '';
  
  if (templateId === 'scientific') {
    const scientificTerms = ['hypothesis', 'experiment', 'data', 'research', 'analysis', 'test', 'study'];
    const matchCount = scientificTerms.filter(term => lowerPrompt.includes(term)).length;
    confidence = matchCount >= 2 ? 'high' : matchCount === 1 ? 'medium' : 'low';
    reason = `Detected ${matchCount} scientific term(s)`;
  } else if (templateId === 'invocation') {
    const invocationTerms = ['prophecy', 'glyph', 'invoke', 'call', 'alignment', 'activation', 'field', 'htfl', 'tone'];
    const matchCount = invocationTerms.filter(term => lowerPrompt.includes(term)).length;
    confidence = matchCount >= 2 ? 'high' : matchCount === 1 ? 'medium' : 'low';
    reason = `Detected ${matchCount} invocation term(s)`;
  } else {
    confidence = 'medium';
    reason = 'Default codex entry for general insights';
  }
  
  return { templateId, confidence, reason };
}