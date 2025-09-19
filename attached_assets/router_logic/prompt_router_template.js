
// Simple Prompt Router Skeleton
function routePrompt(input) {
  if (input.includes("hypothesis") || input.includes("experiment")) {
    return "Scientific_Scroll_Template.md";
  } else if (input.includes("prophecy") || input.includes("glyph")) {
    return "Invocation_Template.md";
  } else {
    return "Codex_Entry_Template.md";
  }
}
