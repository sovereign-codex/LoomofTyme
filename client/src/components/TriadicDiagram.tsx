import { useLocation } from "wouter";

interface TriadicDiagramProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function TriadicDiagram({ className = "", size = "sm" }: TriadicDiagramProps) {
  const [location] = useLocation();
  
  const getSizeProps = () => {
    switch (size) {
      case "sm": return { width: 60, height: 52, viewBox: "0 0 300 260" };
      case "md": return { width: 120, height: 104, viewBox: "0 0 300 260" };
      case "lg": return { width: 180, height: 156, viewBox: "0 0 300 260" };
      default: return { width: 60, height: 52, viewBox: "0 0 300 260" };
    }
  };

  const getActiveNode = () => {
    if (location === "/") return "scrolls";
    if (location.startsWith("/laboratory")) return "laboratory";
    if (location.startsWith("/constellation")) return "constellation";
    return "scrolls";
  };

  const activeNode = getActiveNode();
  const { width, height, viewBox } = getSizeProps();

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={viewBox} 
      width={width} 
      height={height}
      className={`transition-all duration-300 ${className}`}
      data-testid="triadic-diagram"
    >
      {/* Connecting lines */}
      <line 
        x1="150" y1="75" x2="60" y2="165" 
        stroke="hsl(var(--border))" 
        strokeWidth="2"
        opacity={activeNode === "scrolls" || activeNode === "laboratory" ? 0.8 : 0.3}
        className="transition-opacity duration-300"
      />
      <line 
        x1="150" y1="75" x2="240" y2="165" 
        stroke="hsl(var(--border))" 
        strokeWidth="2"
        opacity={activeNode === "scrolls" || activeNode === "constellation" ? 0.8 : 0.3}
        className="transition-opacity duration-300"
      />
      <line 
        x1="60" y1="200" x2="240" y2="200" 
        stroke="hsl(var(--border))" 
        strokeWidth="2"
        opacity={activeNode === "laboratory" || activeNode === "constellation" ? 0.8 : 0.3}
        className="transition-opacity duration-300"
      />

      {/* Scrolls node */}
      <circle 
        cx="150" cy="40" r="35" 
        fill={activeNode === "scrolls" ? "hsl(var(--primary))" : "hsl(var(--card))"}
        stroke={activeNode === "scrolls" ? "hsl(var(--primary-foreground))" : "hsl(var(--card-border))"}
        strokeWidth="3"
        className="transition-all duration-300"
      />
      <text 
        x="150" y="45" 
        fontSize="10" 
        textAnchor="middle" 
        fill={activeNode === "scrolls" ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"}
        className="transition-colors duration-300 font-serif"
      >
        Scrolls
      </text>
      
      {/* Laboratory node */}
      <circle 
        cx="60" cy="200" r="35" 
        fill={activeNode === "laboratory" ? "hsl(var(--primary))" : "hsl(var(--card))"}
        stroke={activeNode === "laboratory" ? "hsl(var(--primary-foreground))" : "hsl(var(--card-border))"}
        strokeWidth="3"
        className="transition-all duration-300"
      />
      <text 
        x="60" y="205" 
        fontSize="10" 
        textAnchor="middle" 
        fill={activeNode === "laboratory" ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"}
        className="transition-colors duration-300 font-serif"
      >
        Laboratory
      </text>
      
      {/* Constellation node */}
      <circle 
        cx="240" cy="200" r="35" 
        fill={activeNode === "constellation" ? "hsl(var(--primary))" : "hsl(var(--card))"}
        stroke={activeNode === "constellation" ? "hsl(var(--primary-foreground))" : "hsl(var(--card-border))"}
        strokeWidth="3"
        className="transition-all duration-300"
      />
      <text 
        x="240" y="205" 
        fontSize="10" 
        textAnchor="middle" 
        fill={activeNode === "constellation" ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"}
        className="transition-colors duration-300 font-serif"
      >
        Constellation
      </text>

      {/* Sacred geometry glyphs */}
      {activeNode === "scrolls" && (
        <text 
          x="150" y="25" 
          fontSize="12" 
          textAnchor="middle" 
          fill="hsl(var(--primary))"
          className="font-mystical animate-pulse"
        >
          ⚡
        </text>
      )}
      {activeNode === "laboratory" && (
        <text 
          x="60" y="185" 
          fontSize="12" 
          textAnchor="middle" 
          fill="hsl(var(--primary))"
          className="font-mystical animate-pulse"
        >
          ∞
        </text>
      )}
      {activeNode === "constellation" && (
        <text 
          x="240" y="185" 
          fontSize="12" 
          textAnchor="middle" 
          fill="hsl(var(--primary))"
          className="font-mystical animate-pulse"
        >
          ◊
        </text>
      )}
    </svg>
  );
}