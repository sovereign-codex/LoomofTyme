// Secure OpenAI client for Sovereign Intelligence Lattice
// Calls backend API instead of exposing API keys to frontend

import { apiRequest } from "@/lib/queryClient";

export async function queryOpenAI(prompt: string): Promise<string> {
  try {
    const response = await apiRequest("POST", "/api/generate-scroll", { prompt });
    const data = await response.json();
    return data.content || "No response generated";
  } catch (error) {
    console.error("OpenAI query failed:", error);
    return "Error generating response. Please try again.";
  }
}

export async function analyzeScroll(content: string): Promise<{
  resonance: number,
  themes: string[],
  coherence: number
}> {
  try {
    const response = await apiRequest("POST", "/api/analyze-scroll", { content });
    return await response.json();
  } catch (error) {
    console.error("Scroll analysis failed:", error);
    return { resonance: 0, themes: [], coherence: 0 };
  }
}

export async function interpretGlyph(glyph: string): Promise<string> {
  try {
    const response = await apiRequest("POST", "/api/interpret-glyph", { glyph });
    const data = await response.json();
    return data.interpretation || "Glyph interpretation unavailable";
  } catch (error) {
    console.error("Glyph interpretation failed:", error);
    return "Error interpreting glyph. Please try again.";
  }
}