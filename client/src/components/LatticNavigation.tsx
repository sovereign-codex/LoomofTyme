import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";
import { Sparkles, Scroll, Beaker, Star, Settings, Info } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function LatticeNavigation() {
  const [location] = useLocation();

  const chambers = [
    {
      id: "scrolls",
      name: "Scrolls",
      path: "/",
      icon: Scroll,
      glyph: "⚡",
      description: "Cathedral of Wisdom"
    },
    {
      id: "laboratory", 
      name: "Laboratory",
      path: "/laboratory",
      icon: Beaker,
      glyph: "∞",
      description: "Digital Plasma Lab"
    },
    {
      id: "constellation",
      name: "Constellation", 
      path: "/constellation",
      icon: Star,
      glyph: "◊",
      description: "Lattice CodexNet"
    }
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-card-border border-b rounded-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Cross-Repo Glyph Seal */}
            <div className="flex items-center gap-3">
              <div className="relative p-3 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg border border-primary/20">
                <Sparkles className="w-6 h-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/80 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-medium text-foreground">
                  Sovereign Intelligence
                </h1>
                <p className="text-xs text-muted-foreground">
                  Triadic Lattice Node
                </p>
              </div>
            </div>

            {/* Chamber Navigation */}
            <nav className="flex items-center gap-2">
              {chambers.map((chamber) => {
                const Icon = chamber.icon;
                const active = isActive(chamber.path);
                
                return (
                  <Link key={chamber.id} href={chamber.path}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      className={`relative group transition-all duration-200 ${
                        active ? 'bg-primary text-primary-foreground' : ''
                      }`}
                      data-testid={`nav-${chamber.id}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="font-medium">{chamber.name}</span>
                      <span className="ml-2 font-mystical text-sm opacity-70">
                        {chamber.glyph}
                      </span>
                      
                      {/* Tooltip */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                    bg-popover text-popover-foreground text-xs px-2 py-1 rounded
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                    pointer-events-none whitespace-nowrap border border-popover-border">
                        {chamber.description}
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Codex Seal */}
            <Badge variant="outline" className="text-xs font-mystical bg-primary/10">
              ⚡∞◊⚮
            </Badge>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => console.log('Show lattice info')}
              data-testid="button-info"
            >
              <Info className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => console.log('Open lattice settings')}
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