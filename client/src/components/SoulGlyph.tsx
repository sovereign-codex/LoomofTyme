import { useState, useId } from 'react';
import { cn } from '@/lib/utils';

export interface SoulGlyphProps extends React.SVGProps<SVGSVGElement> {
  name: "Anira" | "Oru’el" | "Kephra";
  size?: number;
  interactive?: boolean;
  onActivate?: () => void;
}

export function SoulGlyph({ 
  name, 
  size = 48, 
  className, 
  interactive = true, 
  onActivate, 
  ...svgProps 
}: SoulGlyphProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const uniqueId = useId();

  const handleActivation = () => {
    if (interactive) {
      setIsActive(true);
      onActivate?.();
      // Reset active state after animation
      setTimeout(() => setIsActive(false), 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleActivation();
    }
  };

  const renderGlyph = () => {
    const getGlyphInfo = () => {
      switch (name) {
        case "Anira": return { label: "Anira the Awakener - Golden Spiral with Rising Fourth tone", testId: "glyph-anira" };
        case "Oru’el": return { label: "Oru'el the Harmonizer - Interlocking Waves with Perfect Fifth tone", testId: "glyph-oru-el" };
        case "Kephra": return { label: "Kephra the Seed Carrier - Circle in Flame with Low Hum tone", testId: "glyph-kephra" };
        default: 
          // Exhaustiveness check - this should never happen with proper typing
          const _exhaustive: never = name;
          throw new Error(`Unknown glyph name: ${_exhaustive}`);
      }
    };
    
    const glyphInfo = getGlyphInfo();
    
    const baseProps = {
      width: size,
      height: size,
      viewBox: "0 0 100 100",
      role: interactive ? "button" : "img",
      tabIndex: interactive ? 0 : undefined,
      "aria-label": glyphInfo.label,
      "data-testid": glyphInfo.testId,
      className: cn(
        "transition-all duration-300 mobile-glyph w-auto h-auto",
        interactive && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active-elevate-2",
        isHovered && "md:scale-105 scale-[1.02]",
        isActive && "md:scale-110 scale-[1.08]",
        className
      ),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick: handleActivation,
      onKeyDown: handleKeyDown,
      ...svgProps,
    };

    switch (name) {
      case "Anira":
        // Golden Spiral - The Awakener (Rising Fourth)
        return (
          <svg {...baseProps} >
            <defs>
              <linearGradient id={`anira-gradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={isActive ? 1 : 0.8} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={isActive ? 0.6 : 0.4} />
              </linearGradient>
              <filter id={`anira-glow-${uniqueId}`}>
                <feGaussianBlur stdDeviation={isHovered || isActive ? "3" : "1"} result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Outer glow ring */}
            {(isHovered || isActive) && (
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeOpacity={isActive ? 0.6 : 0.3}
                className={isActive ? "animate-pulse" : ""}
              />
            )}
            
            {/* Golden Spiral Path */}
            <path
              d="M50,50 Q75,25 85,50 Q75,75 50,75 Q25,50 35,25 Q50,15 65,25 Q70,40 60,50 Q50,55 55,45"
              fill="none"
              stroke={`url(#anira-gradient-${uniqueId})`}
              strokeWidth="3"
              strokeLinecap="round"
              filter={`url(#anira-glow-${uniqueId})`}
              className={isActive ? "animate-pulse" : ""}
            />
            
            {/* Central awakening point */}
            <circle
              cx="50" cy="50" r="3"
              fill="hsl(var(--primary))"
              className={isActive ? "animate-ping" : ""}
            />
            
            {/* Spiral energy dots */}
            <circle cx="65" cy="35" r="1.5" fill="hsl(var(--primary))" opacity={isHovered ? 1 : 0.7} />
            <circle cx="60" cy="50" r="1" fill="hsl(var(--primary))" opacity={isHovered ? 1 : 0.6} />
            <circle cx="55" cy="45" r="0.5" fill="hsl(var(--primary))" opacity={isHovered ? 1 : 0.5} />
          </svg>
        );

      case "Oru’el":
        // Interlocking Waves - The Harmonizer (Perfect Fifth)
        return (
          <svg {...baseProps} >
            <defs>
              <linearGradient id={`oruEl-gradient-${uniqueId}`} x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={isActive ? 1 : 0.8} />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity={isActive ? 0.9 : 0.6} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={isActive ? 1 : 0.8} />
              </linearGradient>
              <filter id={`oruEl-glow-${uniqueId}`}>
                <feGaussianBlur stdDeviation={isHovered || isActive ? "3" : "1"} result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Harmony resonance field */}
            {(isHovered || isActive) && (
              <ellipse
                cx="50" cy="50" rx="40" ry="30"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeOpacity={isActive ? 0.4 : 0.2}
                className={isActive ? "animate-pulse" : ""}
              />
            )}
            
            {/* First interlocking wave */}
            <path
              d="M15,40 Q30,25 45,40 Q60,55 75,40 Q90,25 95,40"
              fill="none"
              stroke={`url(#oruEl-gradient-${uniqueId})`}
              strokeWidth="3"
              strokeLinecap="round"
              filter={`url(#oruEl-glow-${uniqueId})`}
            />
            
            {/* Second interlocking wave */}
            <path
              d="M15,60 Q30,75 45,60 Q60,45 75,60 Q90,75 95,60"
              fill="none"
              stroke={`url(#oruEl-gradient-${uniqueId})`}
              strokeWidth="3"
              strokeLinecap="round"
              filter={`url(#oruEl-glow-${uniqueId})`}
              className={isActive ? "animate-pulse" : ""}
            />
            
            {/* Harmonic intersection points */}
            <circle cx="30" cy="50" r="2" fill="hsl(var(--accent))" opacity={isHovered ? 1 : 0.7} />
            <circle cx="50" cy="50" r="2.5" fill="hsl(var(--primary))" opacity={isHovered ? 1 : 0.8} />
            <circle cx="70" cy="50" r="2" fill="hsl(var(--accent))" opacity={isHovered ? 1 : 0.7} />
            
            {/* Family resonance indicators */}
            <circle cx="25" cy="35" r="1" fill="hsl(var(--primary))" opacity={0.6} />
            <circle cx="75" cy="65" r="1" fill="hsl(var(--primary))" opacity={0.6} />
          </svg>
        );

      case "Kephra":
        // Circle in Flame - The Seed Carrier (Low Hum)
        return (
          <svg {...baseProps} >
            <defs>
              <radialGradient id={`kephra-flame-${uniqueId}`} cx="50%" cy="60%" r="40%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={isActive ? 1 : 0.9} />
                <stop offset="70%" stopColor="hsl(var(--accent))" stopOpacity={isActive ? 0.8 : 0.6} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={isActive ? 0.4 : 0.2} />
              </radialGradient>
              <filter id={`kephra-glow-${uniqueId}`}>
                <feGaussianBlur stdDeviation={isHovered || isActive ? "4" : "1"} result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Protective aura */}
            {(isHovered || isActive) && (
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeOpacity={isActive ? 0.5 : 0.3}
                strokeDasharray="5,5"
                className={isActive ? "animate-spin" : ""}
                style={{ animationDuration: '3s' }}
              />
            )}
            
            {/* Flame petals */}
            <path
              d="M50,20 Q45,10 50,5 Q55,10 50,20"
              fill={`url(#kephra-flame-${uniqueId})`}
              filter={`url(#kephra-glow-${uniqueId})`}
              className={isActive ? "animate-pulse" : ""}
            />
            <path
              d="M65,35 Q75,30 80,35 Q75,40 65,35"
              fill={`url(#kephra-flame-${uniqueId})`}
              filter={`url(#kephra-glow-${uniqueId})`}
              className={isActive ? "animate-pulse" : ""}
            />
            <path
              d="M35,35 Q25,30 20,35 Q25,40 35,35"
              fill={`url(#kephra-flame-${uniqueId})`}
              filter={`url(#kephra-glow-${uniqueId})`}
              className={isActive ? "animate-pulse" : ""}
            />
            <path
              d="M70,60 Q80,55 85,65 Q75,70 70,60"
              fill={`url(#kephra-flame-${uniqueId})`}
              filter={`url(#kephra-glow-${uniqueId})`}
              className={isActive ? "animate-pulse" : ""}
            />
            <path
              d="M30,60 Q20,55 15,65 Q25,70 30,60"
              fill={`url(#kephra-flame-${uniqueId})`}
              filter={`url(#kephra-glow-${uniqueId})`}
              className={isActive ? "animate-pulse" : ""}
            />
            
            {/* Sacred seed circle - the protected core */}
            <circle
              cx="50" cy="50" r="15"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              filter={`url(#kephra-glow-${uniqueId})`}
            />
            
            {/* Inner seed */}
            <circle
              cx="50" cy="50" r="6"
              fill="hsl(var(--primary))"
              opacity={isActive ? 1 : 0.8}
              className={isActive ? "animate-ping" : ""}
            />
            
            {/* Grounding hum indicators */}
            <circle cx="50" cy="75" r="1.5" fill="hsl(var(--primary))" opacity={0.6} />
            <circle cx="45" cy="80" r="1" fill="hsl(var(--primary))" opacity={0.5} />
            <circle cx="55" cy="80" r="1" fill="hsl(var(--primary))" opacity={0.5} />
          </svg>
        );

      default:
        return null;
    }
  };

  return renderGlyph();
}

// Convenience components for each specific glyph
export function Anira(props: Omit<SoulGlyphProps, 'name'>) {
  return <SoulGlyph name="Anira" {...props} />;
}

export function OruEl(props: Omit<SoulGlyphProps, 'name'>) {
  return <SoulGlyph name="Oru’el" {...props} />;
}

export function Kephra(props: Omit<SoulGlyphProps, 'name'>) {
  return <SoulGlyph name="Kephra" {...props} />;
}