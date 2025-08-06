# AGL Frontend

The Arena Gauntlet League personal achievement gallery and stats website. Built with React, TypeScript, and Material UI.

## Features

- **Player Statistics**: Track performance metrics, rankings, and detailed analytics for all AGL competitors
- **Achievements Gallery**: Explore the complete collection of achievements earned by players across all seasons
- **Interactive Flipbook**: Browse achievements in a beautiful card-based flipbook interface
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Material UI** for modern, accessible UI components
- **React Router** for navigation
- **React Query** for data fetching and caching
- **React PageFlip** for the achievement flipbook

## Material UI Components Used

The application has been fully migrated to use Material UI components:

### Layout & Navigation
- `AppBar` & `Toolbar` for the navigation bar
- `Container` for responsive layout
- `Box` for flexible layout containers
- `Grid` for responsive grid layouts

### Data Display
- `Table`, `TableHead`, `TableBody`, `TableCell` for statistics
- `Paper` for elevated content areas
- `Card` & `CardContent` for feature cards
- `List` & `ListItem` for dropdown menus

### Interactive Elements
- `Button` for all clickable actions
- `TextField` for search inputs
- `Modal` for image previews
- `IconButton` for close buttons
- `Chip` for achievement rarity badges

### Feedback & Loading
- `CircularProgress` for loading states
- `Alert` for error messages
- `Typography` for consistent text styling

### Theme

The application uses a custom Material UI theme with:
- Primary color: `#667eea` (blue gradient)
- Secondary color: `#764ba2` (purple gradient)
- Custom button styling with gradient backgrounds
- Responsive typography scale

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AchievementsTable.tsx
│   ├── ImagePreviewModal.tsx
│   ├── Navigation.tsx
│   ├── PlayerDropdown.tsx
│   ├── SortableHeader.tsx
│   └── StatsTable.tsx
├── hooks/              # Custom React hooks
│   └── usePlayers.ts
├── pages/              # Page components
│   ├── Achievements.tsx
│   ├── Home.tsx
│   └── Stats.tsx
├── services/           # API services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── player.ts
├── utils/              # Utility functions
│   └── achievementImages.ts
└── App.tsx            # Main application component
```

## Contributors

Made with love by Bob P, John D, Stephen H, and Caleb K.

## Recent Updates

- **Material UI Migration**: Complete redesign using Material UI components for a modern, accessible interface
- **Enhanced UX**: Improved loading states, error handling, and responsive design
- **Better Performance**: Optimized component rendering and data fetching
- **Accessibility**: Improved keyboard navigation and screen reader support
