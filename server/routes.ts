import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateScrollWisdom, analyzeScrollResonance, interpretGlyph, editScrollContent } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // OpenAI Integration Routes for Sovereign Intelligence Lattice
  
  // Generate mystical scroll content
  app.post("/api/generate-scroll", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }
      
      const wisdom = await generateScrollWisdom(prompt);
      res.json({ content: wisdom });
    } catch (error) {
      console.error("Error generating scroll wisdom:", error);
      res.status(500).json({ error: "Failed to generate scroll wisdom" });
    }
  });

  // Analyze scroll resonance 
  app.post("/api/analyze-scroll", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      
      const analysis = await analyzeScrollResonance(content);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze scroll resonance" });
    }
  });

  // Interpret glyph meanings
  app.post("/api/interpret-glyph", async (req, res) => {
    try {
      const { glyph } = req.body;
      if (!glyph) {
        return res.status(400).json({ error: "Glyph is required" });
      }
      
      const interpretation = await interpretGlyph(glyph);
      res.json({ interpretation });
    } catch (error) {
      res.status(500).json({ error: "Failed to interpret glyph" });
    }
  });

  // Edit scroll content using AI
  app.post("/api/edit-scroll", async (req, res) => {
    try {
      const { content, editPrompt, scrollTitle } = req.body;
      if (!content || !editPrompt) {
        return res.status(400).json({ error: "Content and edit prompt are required" });
      }
      
      const editedContent = await editScrollContent(content, editPrompt, scrollTitle);
      res.json({ editedContent });
    } catch (error) {
      console.error("Error editing scroll:", error);
      res.status(500).json({ error: "Failed to edit scroll content" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
