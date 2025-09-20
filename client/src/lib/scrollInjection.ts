import { apiRequest } from "./queryClient";

export interface ScrollInjectionData {
  title: string;
  content: string;
  category: "mystical" | "technical";
  tags: string[];
  glyphs: string[];
  source: string;
}

export interface InjectionResult {
  success: boolean;
  scrollId?: string;
  error?: string;
}

/**
 * Enhanced scroll injection system based on Tyme Hall bundle
 * Provides safe, validated scroll creation with duplicate detection
 */
export class ScrollInjectionSystem {
  
  /**
   * Inject a single scroll with validation and duplicate detection
   */
  static async injectScroll(scrollData: ScrollInjectionData): Promise<InjectionResult> {
    try {
      console.log(`Injecting scroll: ${scrollData.title}`);
      
      // Check for existing scroll with same title
      const existingCheck = await this.checkForDuplicate(scrollData.title);
      if (existingCheck) {
        console.log(`Scroll "${scrollData.title}" already exists, skipping injection`);
        return { 
          success: false, 
          error: `Scroll with title "${scrollData.title}" already exists` 
        };
      }
      
      // Validate scroll data
      const validationResult = this.validateScrollData(scrollData);
      if (!validationResult.valid) {
        return { 
          success: false, 
          error: `Validation failed: ${validationResult.errors.join(', ')}` 
        };
      }
      
      // Inject scroll via API
      const response = await apiRequest("POST", "/api/scrolls", scrollData) as any;
      
      console.log(`Successfully injected scroll: ${scrollData.title}`);
      return { 
        success: true, 
        scrollId: response.scroll?.id || response.id 
      };
      
    } catch (error) {
      console.error(`Failed to inject scroll "${scrollData.title}":`, error);
      return { 
        success: false, 
        error: `Injection failed: ${error}` 
      };
    }
  }
  
  /**
   * Inject multiple scrolls with batch processing
   */
  static async injectScrollBatch(scrollsData: ScrollInjectionData[]): Promise<InjectionResult[]> {
    console.log(`Starting batch injection of ${scrollsData.length} scrolls`);
    
    const results: InjectionResult[] = [];
    
    for (const scrollData of scrollsData) {
      const result = await this.injectScroll(scrollData);
      results.push(result);
      
      // Small delay between injections to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const successCount = results.filter(r => r.success).length;
    console.log(`Batch injection complete: ${successCount}/${scrollsData.length} successful`);
    
    return results;
  }
  
  /**
   * Check if a scroll with the given title already exists
   */
  private static async checkForDuplicate(title: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/scrolls?search=${encodeURIComponent(title)}`);
      if (!response.ok) return false;
      
      const data = await response.json();
      return data.scrolls?.some((scroll: any) => 
        scroll.title.toLowerCase() === title.toLowerCase()
      ) || false;
    } catch (error) {
      console.warn("Failed to check for duplicates:", error);
      return false; // Assume no duplicate if check fails
    }
  }
  
  /**
   * Validate scroll data before injection
   */
  private static validateScrollData(scrollData: ScrollInjectionData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!scrollData.title || scrollData.title.trim().length === 0) {
      errors.push("Title is required");
    }
    
    if (!scrollData.content || scrollData.content.trim().length === 0) {
      errors.push("Content is required");
    }
    
    if (!["mystical", "technical"].includes(scrollData.category)) {
      errors.push("Category must be 'mystical' or 'technical'");
    }
    
    if (!scrollData.source || scrollData.source.trim().length === 0) {
      errors.push("Source is required");
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Create scroll data from Bundle v3 format
   */
  static createFromBundle(bundleData: {
    title: string;
    content?: string;
    category?: string;
    tags?: string[];
    glyphs?: string[];
    source?: string;
  }): ScrollInjectionData {
    return {
      title: bundleData.title,
      content: bundleData.content || `# ${bundleData.title}\n\n*Auto-generated content from Tyme Hall bundle.*`,
      category: (bundleData.category === "technical" ? "technical" : "mystical") as "mystical" | "technical",
      tags: bundleData.tags || ["tyme-hall", "auto-generated"],
      glyphs: bundleData.glyphs || ["⚮"],
      source: bundleData.source || "tyme_hall_bundle_v3"
    };
  }
}

/**
 * Utility function for quick scroll injection (backwards compatible)
 */
export async function injectScrolls(scrollData: ScrollInjectionData[]): Promise<void> {
  const results = await ScrollInjectionSystem.injectScrollBatch(scrollData);
  
  results.forEach((result, index) => {
    if (result.success) {
      console.log(`✅ Injected: ${scrollData[index].title}`);
    } else {
      console.error(`❌ Failed: ${scrollData[index].title} - ${result.error}`);
    }
  });
}