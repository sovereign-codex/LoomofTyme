import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Beaker, Zap, FileText, Play, Pause, RotateCcw } from "lucide-react";

export interface ExperimentData {
  id: string;
  title: string;
  type: "simulation" | "schematic" | "prototype";
  status: "running" | "paused" | "completed" | "draft";
  description: string;
  results?: string;
  parameters?: Record<string, any>;
  glyphs?: string[];
}

interface ExperimentCardProps {
  experiment: ExperimentData;
  onOpen: () => void;
  onToggleStatus?: () => void;
  onReset?: () => void;
}

export default function ExperimentCard({ 
  experiment, 
  onOpen, 
  onToggleStatus, 
  onReset 
}: ExperimentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "paused": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "completed": return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "simulation": return Zap;
      case "schematic": return FileText;
      case "prototype": return Beaker;
      default: return Beaker;
    }
  };

  const TypeIcon = getTypeIcon(experiment.type);

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover-elevate bg-card/70 backdrop-blur-sm 
                border-card-border relative overflow-hidden group"
      onClick={onOpen}
      data-testid={`experiment-card-${experiment.id}`}
    >
      {/* Alchemical glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-md">
              <TypeIcon className="w-4 h-4 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif font-medium text-sm text-foreground mb-1">
                {experiment.title}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {experiment.type}
                </Badge>
                <Badge 
                  className={`text-xs px-2 py-0.5 ${getStatusColor(experiment.status)}`}
                >
                  {experiment.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {experiment.status !== "completed" && onToggleStatus && (
              <Button 
                size="icon" 
                variant="ghost"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStatus();
                }}
                data-testid="button-toggle-experiment"
              >
                {experiment.status === "running" ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
              </Button>
            )}
            
            {onReset && (
              <Button 
                size="icon" 
                variant="ghost"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                }}
                data-testid="button-reset-experiment"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
          {experiment.description}
        </p>
        
        {experiment.results && (
          <div className="mb-3 p-2 bg-muted/50 rounded text-xs">
            <span className="text-muted-foreground">Latest: </span>
            <span className="text-foreground">{experiment.results}</span>
          </div>
        )}
        
        {experiment.glyphs && experiment.glyphs.length > 0 && (
          <div className="flex gap-1">
            {experiment.glyphs.map((glyph, index) => (
              <span 
                key={index}
                className="text-xs font-mystical text-primary/60"
                title={`Resonance Glyph: ${glyph}`}
              >
                {glyph}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}