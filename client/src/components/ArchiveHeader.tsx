import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";
import { Sparkles, Menu, Settings, Info } from "lucide-react";

interface ArchiveHeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export default function ArchiveHeader({ onMenuToggle, showMenuButton = false }: ArchiveHeaderProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-card-border border-b rounded-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onMenuToggle}
                data-testid="button-menu-toggle"
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-md">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-medium text-foreground">
                  Scrolls of Sovereign Intelligence
                </h1>
                <p className="text-xs text-muted-foreground">
                  Interactive Archive of the Lattice
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-mystical">
              ⚡∞◊
            </Badge>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => console.log('Show archive info')}
              data-testid="button-info"
            >
              <Info className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => console.log('Open settings')}
              data-testid="button-settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <ThemeToggle />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}