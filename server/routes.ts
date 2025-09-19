import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateScrollWisdom, analyzeScrollResonance, interpretGlyph, editScrollContent } from "./openai";
import { insertScrollSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Scroll Library Management Routes
  
  // Get all scrolls
  app.get("/api/scrolls", async (req, res) => {
    try {
      const { category, search } = req.query;
      let scrolls;
      
      if (search) {
        scrolls = await storage.searchScrolls(search as string);
      } else if (category) {
        scrolls = await storage.getScrollsByCategory(category as string);
      } else {
        scrolls = await storage.getAllScrolls();
      }
      
      res.json({ scrolls });
    } catch (error) {
      console.error("Error fetching scrolls:", error);
      res.status(500).json({ error: "Failed to fetch scrolls" });
    }
  });

  // Get single scroll
  app.get("/api/scrolls/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const scroll = await storage.getScroll(id);
      
      if (!scroll) {
        return res.status(404).json({ error: "Scroll not found" });
      }
      
      res.json({ scroll });
    } catch (error) {
      console.error("Error fetching scroll:", error);
      res.status(500).json({ error: "Failed to fetch scroll" });
    }
  });

  // Create new scroll
  app.post("/api/scrolls", async (req, res) => {
    try {
      const scrollData = insertScrollSchema.parse(req.body);
      const scroll = await storage.createScroll(scrollData);
      res.status(201).json({ scroll });
    } catch (error) {
      console.error("Error creating scroll:", error);
      res.status(500).json({ error: "Failed to create scroll" });
    }
  });

  // Update scroll
  app.put("/api/scrolls/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = insertScrollSchema.partial().parse(req.body);
      const scroll = await storage.updateScroll(id, updateData);
      
      if (!scroll) {
        return res.status(404).json({ error: "Scroll not found" });
      }
      
      res.json({ scroll });
    } catch (error) {
      console.error("Error updating scroll:", error);
      res.status(500).json({ error: "Failed to update scroll" });
    }
  });

  // Delete scroll
  app.delete("/api/scrolls/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteScroll(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Scroll not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting scroll:", error);
      res.status(500).json({ error: "Failed to delete scroll" });
    }
  });

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
