import { type User, type InsertUser, type Scroll, type InsertScroll, users, scrolls } from "@shared/schema";
import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, ilike, desc, sql } from "drizzle-orm";

// Database connection (only if DATABASE_URL is available)
let db: any = null;
if (process.env.DATABASE_URL) {
  const dbClient = neon(process.env.DATABASE_URL);
  db = drizzle(dbClient);
}

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scroll methods
  getAllScrolls(): Promise<Scroll[]>;
  getScroll(id: string): Promise<Scroll | undefined>;
  getScrollsByCategory(category: string): Promise<Scroll[]>;
  searchScrolls(query: string): Promise<Scroll[]>;
  createScroll(scroll: InsertScroll): Promise<Scroll>;
  updateScroll(id: string, scroll: Partial<InsertScroll>): Promise<Scroll | undefined>;
  deleteScroll(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Scroll methods
  async getAllScrolls(): Promise<Scroll[]> {
    return await db.select().from(scrolls).orderBy(desc(scrolls.updatedAt));
  }

  async getScroll(id: string): Promise<Scroll | undefined> {
    const result = await db.select().from(scrolls).where(eq(scrolls.id, id));
    return result[0];
  }

  async getScrollsByCategory(category: string): Promise<Scroll[]> {
    return await db.select().from(scrolls)
      .where(eq(scrolls.category, category))
      .orderBy(desc(scrolls.updatedAt));
  }

  async searchScrolls(query: string): Promise<Scroll[]> {
    return await db.select().from(scrolls)
      .where(sql`${scrolls.title} ILIKE ${`%${query}%`} OR ${scrolls.content} ILIKE ${`%${query}%`}`)
      .orderBy(desc(scrolls.updatedAt));
  }

  async createScroll(insertScroll: InsertScroll): Promise<Scroll> {
    const result = await db.insert(scrolls).values({
      ...insertScroll,
      updatedAt: new Date()
    }).returning();
    return result[0];
  }

  async updateScroll(id: string, updateData: Partial<InsertScroll>): Promise<Scroll | undefined> {
    const result = await db.update(scrolls)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(scrolls.id, id))
      .returning();
    return result[0];
  }

  async deleteScroll(id: string): Promise<boolean> {
    const result = await db.delete(scrolls).where(eq(scrolls.id, id));
    return result.rowCount > 0;
  }
}

// Fallback MemStorage for development
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private scrollsMap: Map<string, Scroll>;

  constructor() {
    this.users = new Map();
    this.scrollsMap = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllScrolls(): Promise<Scroll[]> {
    return Array.from(this.scrollsMap.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async getScroll(id: string): Promise<Scroll | undefined> {
    return this.scrollsMap.get(id);
  }

  async getScrollsByCategory(category: string): Promise<Scroll[]> {
    return Array.from(this.scrollsMap.values())
      .filter(scroll => scroll.category === category)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async searchScrolls(query: string): Promise<Scroll[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.scrollsMap.values())
      .filter(scroll => 
        scroll.title.toLowerCase().includes(lowerQuery) ||
        scroll.content.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async createScroll(insertScroll: InsertScroll): Promise<Scroll> {
    const id = randomUUID();
    const now = new Date();
    const scroll: Scroll = { 
      category: "mystical",
      tags: [],
      glyphs: [],
      source: "original",
      ...insertScroll, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.scrollsMap.set(id, scroll);
    return scroll;
  }

  async updateScroll(id: string, updateData: Partial<InsertScroll>): Promise<Scroll | undefined> {
    const existing = this.scrollsMap.get(id);
    if (!existing) return undefined;
    
    const updated: Scroll = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.scrollsMap.set(id, updated);
    return updated;
  }

  async deleteScroll(id: string): Promise<boolean> {
    return this.scrollsMap.delete(id);
  }
}

// Use database storage if available, fall back to memory storage
export const storage = (process.env.DATABASE_URL && db) 
  ? new DatabaseStorage() 
  : new MemStorage();
