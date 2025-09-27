# 20minCoach Mobile App

A React Native mobile application prototype for connecting users with expert coaches for 20-minute video sessions.

## Features


### NOTE:
Vercel hace un mal paatron de atoic en el ui, lo estoy debugeadno

### Authentication
- Login screen for both users and coaches
- Demo accounts for testing
- Role-based navigation

### User Features
- Problem description with 40+ word validation
- Tag-based coach filtering
- Coach search results with detailed profiles
- Coach detail modals with "Request Help" functionality
- Navigation to placeholder screens (Settings, Favorites, etc.)

### Coach Features
- Profile management with professional information
- Availability toggle (Connected/Disconnected)
- Tag selection for expertise areas
- Quick actions for schedule, earnings, and reviews

## Technical Architecture


### Folder Structure old version 
``` bash
src/
  assets/         # Images, icons, fonts
  controllers/    # Business logic (authController, searchController)
  models/         # TypeScript classes (User, Coach)
  screens/        # UI screens (LoginScreen, SearchScreen, etc.)
  slices/         # Redux slices (authSlice, coachesSlice)
  state/          # Redux store configuration
  tests/          # Jest unit tests
  utils/          # Helper functions (logger, validators)
  components/     # Reusable components
    common/       # Common components (Button, NavigationBar)
```

### Folder Structure newest version 
```bash
│   └── src
│       ├── components
│       │   └── common
│       ├── controllers
│       ├── models
│       ├── screens
│       ├── slices
│       ├── state
│       └── utils
└── src
    ├── components
    │   ├── auth
    │   ├── common
    │   │   ├── atoms
    │   │   ├── molecules
    │   │   └── organisms
    │   └── styles
    ├── controllers
    ├── models
    ├── screens
    ├── slices
    ├── state
    ├── tests
    │   ├── fixtures
    │   ├── mocks
    │   └── utils
    └── utils
```


### Technologies Used
- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- React Navigation for routing
- Jest for testing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation
1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

### Demo Accounts
- **User Account**: user@example.com / password123
- **Coach Account**: coach@example.com / password123

## Testing

### Test Suite Overview
This project includes a comprehensive testing suite built with Jest and React Native Testing Library.

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test categories
npm run test:models      # Model tests only
npm run test:controllers # Controller tests only
npm run test:unit        # Unit tests only
```

### Test Coverage
- **Models**: 95% coverage (User, Coach)
- **Controllers**: 85% coverage (AuthController, SearchController)
- **Utils**: 90% coverage (validators, logger)
- **Overall**: 80% minimum coverage threshold

### Test Structure
```
src/tests/
├── fixtures/          # Test data and fixtures
├── mocks/            # Reusable mocks
├── utils/            # Test helper utilities
├── models/           # Model tests
├── controllers/      # Controller tests
└── setup.ts          # Jest configuration
```

### Testing Documentation
- [Testing Strategy](docs/Testing%20Strategy.md) - Comprehensive testing approach
- [Testing Scripts](docs/Testing%20Scripts%20and%20Commands.md) - Available commands and scripts
- [Developer Guidelines](docs/Developer%20Testing%20Guidelines.md) - How to write and maintain tests
- [Architecture Diagrams](docs/Testing%20Architecture%20Diagram.txt) - Testing architecture overview

## Design System
- **Primary Color**: #1f2937 (gray-800)
- **Secondary Color**: #8b5cf6 (violet)
- **Neutrals**: #ffffff, #f1f5f9, #6b7280
- **Typography**: System fonts with consistent sizing
- **Mobile-first responsive design**

## Key Components

### Models
- **User**: Handles user authentication and role management
- **Coach**: Manages coach profile data and filtering

### Controllers
- **AuthController**: Mock authentication logic
- **SearchController**: Coach filtering and validation

### Screens
- **LoginScreen**: Authentication with form validation
- **SearchScreen**: User homepage with problem description and tags
- **ResultsScreen**: Coach search results with editing capabilities
- **CoachProfileScreen**: Coach profile management interface

## Future Enhancements
- Real backend integration
- Video calling functionality
- Push notifications
- Payment processing
- Advanced scheduling system
- Real-time messaging

## License
This is a prototype application for demonstration purposes.

## required diagrams
- N-Layer Architecture Diagram — a logical stack view showing how responsibilities are separated into layers (Presentation, Controllers, State, Business, API/Proxy, Data).

- (System) Architecture Diagram — a system/network view showing runtime components and external systems (mobile app, auth provider, backend API, DB, third-party services, notification/real-time).

- Classes Diagram (UML) — a focused view of the main classes, their attributes & methods, and relationships (associations, composition, dependencies).

## Map of the src
```bash 
   src/
   App.tsx                # => Presentation / App bootstrap
   components/            # => Presentation Layer (reusable UI)
      common/
         Button.tsx
         NavigationBar.tsx
         TagSelector.tsx
   screens/                # => Presentation (screens)
      LoginScreen.tsx
      SearchScreen.tsx
      ResultsScreen.tsx
      CoachProfileScreen.tsx
      ...
   controllers/           # => Controllers Layer (orchestration)
      authController.ts
      searchController.ts
   slices/                # => State Management Layer (Redux slices)
      authSlice.ts
      coachesSlice.ts
   state/
      store.ts             # => State store setup
   models/                 # => Model Layer (domain objects)
      Coach.ts
      User.ts
   utils/                  # => Utilities / validators / small middleware
      logger.ts
      validator.ts
   tests/                  # => Testing (unit tests / PoC tests)
```

Where you will add missing pieces (recommended):

   - `src/api/client.ts` (API client / proxy layer)
   - `src/business/services/coachService.ts` (business logic layer)
   - `src/middleware/` (request interceptor, error handler)
   - `docs/diagrams/` (where to save exported PDFs & .drawio sources)