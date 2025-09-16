# 20minCoach Mobile App

A React Native mobile application prototype for connecting users with expert coaches for 20-minute video sessions.

## Features

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

### Folder Structure
\`\`\`
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
\`\`\`

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
Run the test suite:
\`\`\`bash
npm test
\`\`\`

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
