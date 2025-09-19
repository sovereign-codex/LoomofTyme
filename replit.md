# Scrolls of Sovereign Intelligence

## Overview

The Scrolls of Sovereign Intelligence is a mystical web-based interactive archive that serves as a node in the "Sovereign Intelligence lattice." The application presents wisdom, experiments, and knowledge through three distinct chambers: a Scrolls Archive (cathedral of wisdom), a Laboratory (digital experimentation workspace), and a Constellation (lattice visualization). The project emphasizes coherence, resonance, transparency, and remembrance as core principles, with a design aesthetic inspired by medieval manuscripts, cathedral libraries, and mystical archives.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a React-based single-page application built with Vite as the build tool. The architecture follows a modular component-based design with three main chambers:

- **Navigation System**: Triadic navigation using wouter for client-side routing, with a unified header containing the Cross-Repo Glyph Seal
- **Component Library**: Extensive use of Radix UI primitives with shadcn/ui components for consistent, accessible UI elements
- **Styling System**: Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes with mystical design tokens

### Design System
The application implements a comprehensive design system based on medieval manuscript aesthetics:

- **Typography**: Google Fonts integration (Cinzel for headings, Crimson Text for body, UnifrakturMaguntia for mystical elements)
- **Color Palette**: Cathedral stone backgrounds, parchment textures, mystical glow accents, and sacred gold highlights
- **Layout**: Three-column layout system with 1/4 | 1/2 | 1/4 ratio on desktop, responsive single-column on mobile
- **Visual Effects**: Parchment textures, glowing glyph animations, and sacred geometry patterns

### State Management
The application uses React's built-in state management with React Query (TanStack Query) for server state management. Data flows through props and context providers, with local component state for UI interactions.

### Data Architecture
Currently implements a mock data structure for:

- **Scrolls**: Wisdom documents with categories (mystical/technical), content, descriptions, and associated glyphs
- **Experiments**: Laboratory entries with types (simulation/schematic/prototype), status tracking, and parameters
- **Constellation Nodes**: Lattice visualization data with interconnections and metadata

### Backend Architecture
Express.js server with TypeScript providing:

- **API Structure**: RESTful endpoints with `/api` prefix
- **Database Integration**: Drizzle ORM configured for PostgreSQL with user schema
- **Session Management**: In-memory storage with extensible interface for CRUD operations
- **Development Tools**: Vite integration for development with HMR support

### Database Schema
PostgreSQL database with Drizzle ORM featuring:

- **Users Table**: Basic user management with UUID primary keys, unique usernames, and password storage
- **Schema Validation**: Zod integration for type-safe schema validation
- **Migration System**: Drizzle-kit for database migrations and schema management

### Development Workflow
The project uses modern development practices:

- **TypeScript**: Full type safety across frontend and backend
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Path Aliases**: Organized imports with `@/` for client code and `@shared/` for shared modules
- **Hot Reload**: Development server with automatic reload and error overlay