# macOS Web React - Project Documentation

## Project Overview
A React-based web application that recreates the macOS desktop experience in a browser. It provides a functional desktop environment with windows, dock, menus, and applications.

## Tech Stack
- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Vanilla Extract (CSS-in-JS)
- **State Management**: Zustand
- **Animation**: Framer Motion + Canvas API
- **Testing**: Vitest + React Testing Library
- **Code Quality**: Biome (linting & formatting)
- **Package Manager**: Yarn

## Project Structure

```
macos-web-react/
├── src/
│   ├── domains/              # Business logic domains
│   │   ├── app/             # Application system
│   │   ├── dock/            # Dock UI and behavior
│   │   ├── menu/            # Menu system
│   │   ├── window/          # Window management
│   │   └── window-animation/ # Window animations
│   ├── modules/              # Reusable technical modules
│   │   ├── movable/         # Drag and drop
│   │   ├── movable-react/   # React wrapper
│   │   ├── resizable/       # Resize functionality
│   │   └── resizable-react/ # React wrapper
│   ├── third-parties/        # External library wrappers
│   │   ├── classnames/      # Classname utilities
│   │   ├── floating-ui/     # Floating UI
│   │   ├── vanilla-extract/ # Style system
│   │   └── zustand/         # State management
│   ├── utils/                # Utility functions
│   │   ├── array/           # Array utilities
│   │   ├── canvas/          # Canvas utilities
│   │   ├── dom/             # DOM utilities
│   │   ├── math/            # Math functions
│   │   ├── object/          # Object utilities
│   │   └── type/            # Type utilities
│   ├── views/                # Page components
│   └── assets/               # Static resources
│       └── app-icons/       # Application icons
├── public/                   # Static files
├── tests/                    # Test files
└── config files...           # Configuration files
```

## Core Domains

### 1. Window System (`/domains/window/`)
Core window management system

**Key Features:**
- Draggable windows with screen boundary constraints
- Resizable windows (8 directions)
- Focus management with automatic z-index ordering
- Minimize/restore animations
- Window snapping (edge and inter-window)

**Store Structure:**
```typescript
interface WindowsState {
  windows: Window[]                    // Active windows list
  minimizedWindows: MinimizedWindow[]  // Minimized windows
  focusedWindowID: string | null       // Currently focused window
  isDraggingWindow: boolean            // Dragging state
}
```

**Recent Updates:**
- Mouse cursor constrained to screen boundaries during drag
- Dock hover animation disabled during window dragging

### 2. Window Animation (`/domains/window-animation/`)
Canvas-based implementation of macOS Genie effect

**Core Technologies:**
- Bézier curve-based image transformation
- RequestAnimationFrame utilization
- Screen capture and real-time rendering
- Reverse animation support

### 3. Application System (`/domains/app/`)
Pluggable application architecture

**Currently Implemented Apps:**
- **Calculator**: Fully functional calculator
  - 469 test cases
  - Floating-point precision handling
  - Operator precedence support
- **Finder**: File browser UI (basic implementation)

**Application Interface:**
```typescript
interface ApplicationConfig {
  id: ApplicationID
  app: () => React.ReactElement
  initialStyle: WindowStyle
}
```

### 4. Dock (`/domains/dock/`)
macOS-style dock implementation

**Features:**
- Icon magnification on hover
- Minimized window display
- App launch and restore
- Dynamic sizing (distance-based)

### 5. Menu System (`/domains/menu/`)
Floating UI-based menu system

**Components:**
- Apple menu dropdown
- Submenu support
- Keyboard navigation

## Technical Features

### State Management Pattern
Zustand with action separation pattern:
```typescript
export const useStore = create<State, Actions>((set) => ({
  // state
  windows: [],
  // actions separated
  actions: {
    createWindow: () => set(...),
    updateWindow: () => set(...)
  }
}))

// Hook for actions only
export const useStoreActions = () => 
  useStore(state => state.actions)
```

### Style System
Type-safe CSS with Vanilla Extract:
- Centralized design tokens
- Dark mode support
- Zero-runtime CSS extraction
- Component-specific `.css.ts` files

### Module System

**Movable Module:**
- Custom drag and drop implementation
- Event manager pattern
- React component wrapper provided

**Resizable Module:**
- 8-direction resize handlers
- Min/max size constraints
- Automatic cursor style changes

## Development Scripts

```bash
# Start development server
yarn dev

# Production build
yarn build

# Lint check
yarn lint

# Auto-fix linting issues
yarn lint:fix

# Run tests
yarn test

# Type check
yarn typecheck
```

## Recent Updates
- Window snap feature in development (`feat/snap` branch)
- Velocity-based snap implementation
- Improved window movement constraints (mouse cursor-based)
- Dock hover animation optimization

## Code Conventions
- TypeScript strict mode enabled
- Components: PascalCase
- Utilities: camelCase
- Barrel exports via `index.ts`
- Domain-based folder structure
- Test files colocated with source (`.spec.ts`)

## Performance Optimizations
- Canvas-based animations (GPU acceleration)
- Event delegation
- Appropriate use of React.memo and useMemo
- Zero-runtime CSS with Vanilla Extract

## Future Plans
- More native app implementations
- File system simulation
- System preferences
- Multitasking gestures
- Terminal application

## Key Strengths

1. **Clean Architecture**: Domain-driven design with clear separation of concerns
2. **Performance**: Optimized animations and event handling
3. **Type Safety**: Comprehensive TypeScript usage
4. **Testing**: Thorough test coverage for business logic
5. **Extensibility**: Pluggable application system
6. **User Experience**: Authentic macOS interactions
7. **Code Quality**: Modern tooling and consistent patterns

## Technical Highlights

- Custom animation engine with Bézier curves
- Advanced state management architecture
- Modular event system for drag/drop and resize
- Comprehensive design system with theming
- Floating-point precision in calculator
- Performance optimizations throughout