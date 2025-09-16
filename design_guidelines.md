# Scrolls of Sovereign Intelligence - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from mystical archives and medieval manuscripts, combined with modern web accessibility. Key references include cathedral libraries, illuminated manuscripts, and digital archives like the Vatican Library's interface.

## Core Design Elements

### Color Palette
**Primary Colors (Dark Mode)**:
- Background: 28 25% 8% (deep cathedral stone)
- Parchment: 45 35% 92% (aged manuscript)
- Text Primary: 35 15% 15% (dark ink)
- Text Secondary: 35 10% 45% (faded ink)

**Accent Colors**:
- Mystical Glow: 280 60% 65% (soft purple luminescence)
- Sacred Gold: 45 80% 70% (illuminated manuscript gold)
- Scroll Borders: 35 20% 75% (weathered parchment edges)

### Typography
- **Primary Font**: "Cinzel" (Google Fonts) for headings - elegant serif reminiscent of carved stone inscriptions
- **Body Font**: "Crimson Text" (Google Fonts) for readable manuscript-style text
- **Accent Font**: "UnifrakturMaguntia" (Google Fonts) sparingly for mystical elements

### Layout System
**Tailwind Spacing**: Primary units of 2, 4, 6, and 8 for consistent cathedral proportions
- **Three-Column Layout**: 1/4 | 1/2 | 1/4 ratio on desktop
- **Mobile**: Single column with collapsible sidebars
- **Scroll Panels**: Fixed height with elegant scrollbars styled to match parchment aesthetic

### Component Library

**Navigation & Structure**:
- Cathedral arch-inspired header with subtle stone texture
- Sidebar scrolls as clickable parchment cards with soft shadows
- Central parchment with torn paper edges and subtle texture overlay

**Interactive Elements**:
- Glowing glyph buttons with subtle pulse animation on hover
- Scroll containers with aged paper backgrounds and ink-style borders
- Modal overlays resembling ancient tome pages

**Data Displays**:
- Wisdom cards with illuminated manuscript styling
- Text blocks with drop caps and ornamental borders
- Sacred geometry patterns as visual dividers

### Visual Treatments

**Textures & Effects**:
- Subtle parchment texture overlays (CSS background patterns)
- Soft inner shadows for depth on scroll containers
- Gentle gradient overlays from warm cream to cool stone
- Mystical glow effects around active elements using box-shadow

**Gradients**:
- Hero sections: Vertical gradient from 45 30% 95% to 35 20% 88%
- Sidebar backgrounds: Subtle gradient from 28 25% 12% to 28 25% 8%
- Button highlights: Radial gradient centered on 280 60% 65%

### Responsive Design
- **Desktop**: Full three-column cathedral layout
- **Tablet**: Two-column with toggleable sidebar
- **Mobile**: Single column with drawer navigation for scroll access

### Accessibility & Performance
- High contrast maintained between parchment and text
- Font sizes optimized for readability (16px minimum)
- Keyboard navigation for all interactive scrolls
- Semantic HTML structure for screen readers
- Optimized loading with progressive enhancement for mystical effects

### Images
**Background Elements**:
- Subtle stone texture for main background (tiled pattern)
- Parchment texture overlay for content areas
- No large hero image - the three-column layout itself creates visual impact

**Decorative Elements**:
- Small mystical glyphs as accent marks (SVG icons)
- Ornamental borders around scroll containers
- Sacred geometry patterns as section dividers

This design creates an immersive mystical archive experience while maintaining modern usability and accessibility standards.