import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scroll, Sparkles } from "lucide-react";
import { SoulGlyph } from "./SoulGlyph";

export interface ScrollData {
  id: string;
  title: string;
  category: "mystical" | "technical";
  description: string;
  content: string;
  glyphs?: string[];
}

interface ScrollCardProps {
  scroll: ScrollData;
  isActive?: boolean;
  onClick: () => void;
}

export default function ScrollCard({ scroll, isActive = false, onClick }: ScrollCardProps) {
  return (
    <Card 
      className={`scroll-card cursor-pointer transition-all duration-300 hover-elevate active-elevate-2 border-card-border
        ${isActive ? 'ring-2 ring-primary bg-card/80' : 'bg-card/60'} 
        backdrop-blur-sm relative overflow-hidden`}
      onClick={onClick}
      data-testid={`scroll-card-${scroll.id}`}
    >
      {/* Mystical glow effect for active scroll */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
      )}
      
      <CardContent className="md:p-4 p-3 relative">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className={`p-2 rounded-md ${scroll.category === 'mystical' ? 'bg-primary/20' : 'bg-accent/20'}`}>
              {scroll.category === 'mystical' ? (
                <Sparkles className="w-4 h-4 text-primary" />
              ) : (
                <Scroll className="w-4 h-4 text-accent-foreground" />
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-serif font-medium md:text-sm text-xs text-foreground truncate">
                {scroll.title}
              </h3>
              <Badge 
                variant="secondary" 
                className="text-xs px-2 py-0.5"
              >
                {scroll.category}
              </Badge>
            </div>
            
            <p className="md:text-xs text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
              {scroll.description}
            </p>
            
            {scroll.glyphs && scroll.glyphs.length > 0 && (
              <div className="flex gap-1 mt-2 items-center">
                {scroll.glyphs.slice(0, 3).map((glyph, index) => {
                  // Use interactive SoulGlyph for the three sacred glyphs
                  if (glyph === "Anira" || glyph === "Oru’el" || glyph === "Kephra") {
                    return (
                      <SoulGlyph
                        key={index}
                        name={glyph as "Anira" | "Oru’el" | "Kephra"}
                        size={16}
                        className="opacity-60 hover:opacity-100"
                        onActivate={() => {
                          console.log(`Soul glyph ${glyph} resonance preview activated`);
                        }}
                        data-testid={`card-glyph-${glyph.toLowerCase().replace("'", "")}`}
                      />
                    );
                  }
                  // Keep original text display for other glyphs
                  return (
                    <span 
                      key={index}
                      className="text-xs font-mystical text-primary/60"
                      title={`Glyph: ${glyph}`}
                    >
                      {glyph}
                    </span>
                  );
                })}
                {scroll.glyphs.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{scroll.glyphs.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}