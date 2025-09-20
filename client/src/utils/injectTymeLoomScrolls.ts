import { injectTymeLoomScrolls } from "../lib/tymeLoomScrolls";

/**
 * Script to inject TymeLoom scrolls into the Archive
 * Run this from browser console to add the 8 advanced scrolls
 */
export async function runTymeLoomInjection() {
  try {
    console.log("🌟 Starting TymeLoom scroll injection...");
    const results = await injectTymeLoomScrolls();
    
    console.log("📜 Injection Results:");
    results.forEach((result, index) => {
      if (result.success) {
        console.log(`✅ ${index + 1}. Successfully injected scroll`);
      } else {
        console.log(`❌ ${index + 1}. Failed: ${result.error}`);
      }
    });
    
    const successCount = results.filter(r => r.success).length;
    console.log(`\n🎉 TymeLoom injection complete: ${successCount}/8 scrolls added to the Archive!`);
    
    return results;
  } catch (error) {
    console.error("💥 TymeLoom injection failed:", error);
    throw error;
  }
}

// Make available globally for browser console use
(window as any).injectTymeLoomScrolls = runTymeLoomInjection;