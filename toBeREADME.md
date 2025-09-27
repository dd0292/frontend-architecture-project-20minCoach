# 20minCoach — Frontend Architecture & Prototype

> **Case #1, 30%**  
> Group Project — 3 members 
> Jose David Chaves Mena, ---, --- 

---

## Project Overview

**20minCoach** is a real-time coaching platform that connects users with experts across multiple fields (health, psychology, law, mechanics, programming, arts, agriculture, and more) through on-demand **20-minute video sessions**.  

Users can:  
- Describe their needs (via text or voice).  
- Search and filter available coaches by specialty, tags, or ratings.  
- Instantly connect with a coach once availability is confirmed.  

Coaches can:  
- Manage their profiles and availability.  
- Accept or reject coaching requests.  
- Build reputation through ratings, directly influencing their earnings.  

**Business model:** Prepaid session packages (Starter, Pro, etc.), launched initially in **Colombia** and **Brazil**.

---

## Repository Structure

```
repo-root/
│── README.md                 # This documentation
│── docs/                     # Documentation files & diagrams
│   ├── diagrams/             # Architecture & UML diagrams
│   ├── Testing Strategy.md
│   ├── Developer Guidelines.md
│   └── ...
│── src/                      # Source code (PoCs + architecture implementation)
│   ├── App.tsx               # App bootstrap
│   ├── components/           # Visual components
│   │   ├── auth/
│   │   ├── common/           # Atoms, Molecules, Organisms
│   │   └── styles/
│   ├── coverage/
│   ├── controllers/          # Controllers (Auth, Search, etc.)
│   ├── models/               # Models (User, Coach, etc.)
│   ├── screens/              # Screens (Login, Search, Results, Profile)
│   ├── slices/               # Redux slices
│   ├── state/                # Store config
│   ├── api/                  # Proxy/Client layer
│   ├── business/             # Business logic services
│   ├── middleware/           # Middlewares (logging, validation, error handler)
│   ├── validators/           # Validation rules
│   ├── utils/                # Helpers (logger, formatters, singletons)
│   └── tests/                # Unit tests (fixtures, mocks, utils)
├── App.tsx     
│── package.json
│── tsconfig.json
│── .gitignore
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js >= 16.x  
- Expo CLI  
- iOS Simulator / Android Emulator or Expo App on cellphone

### Installation
```bash
git clone <REPO_URL>
cd 20minCoach/scr
npm install
```

### Running the app
```bash
cd scr
npm start
```

### Demo Accounts
- **User** → `user@example.com / password123`  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

---

### Testing Strategy  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
- Unit tests (Models, Controllers, Utils).  
- Coverage goal: **80% minimum**.  
- Testing library: **Jest + React Native Testing Library**.  

## Testing
 TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

### 🏃 Running Tests  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:models      # Only model tests
npm run test:controllers # Only controllers
```

### 📂 Test Structure  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
```bash
src/tests/
├── fixtures/        # Test data
├── mocks/           # Reusable mocks
├── utils/           # Helpers
├── models/          # Unit tests for models
├── controllers/     # Unit tests for controllers
└── setup.ts         # Jest config
```

---

## UX & Security Proof of Concepts

### 1. Prototype Screen
- AI tool used: Vercel's `v0` [https://v0.app/]
- Prototype created for: **Search Screen + Coach Results**.  
- Stored under: `src/src/screens`  

### 2. UX Testing
- Tool: `Maze`  
- Tasks:  
  1. Search for a coach specialized in `<PLACEHOLDER: Fitness>`.    TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  2. Accept suggested coach.   TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
- Participants: 3–5 testers 
- Results stored in: `/docs/ux-tests/`  

### 3. Authentication & Authorization  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
- Provider: `Supabase`  
- Roles:  
  - `BasicUser` → Action A only.  
  - `PremiumUser` → Action A + Action B.  
- Two-Factor Authentication enabled.  
- Login screen integrated (`LoginScreen.tsx`).  

---

## Frontend Architecture Design 

### 1. Technology Selection  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
- Framework: **React Native with Expo**  
- State Management: **Redux Toolkit**  
- Testing: **Jest + React Native Testing Library**   

See `/docs/Technology-Selection.md` for full justification.  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

---

### 2. N-Layer Architecture  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

**Layers included:**  
- **Presentation Layer** → `components/`, `screens/`  
- **Controllers Layer** → `controllers/`  
- **Model Layer** → `models/`  
- **Middleware Layer** → `middleware/`  
- **Business Layer** → `business/`  
- **Proxy/Client Layer** → `api/`  
- **State Management Layer** → `slices/`, `state/`  
- **Validators & DTOs** → `validators/`, `dto/`  
- **Utilities** → `utils/`  
- **Security** → Integrated auth provider  

Diagrams stored in `/docs/diagrams/`.

---

### 3. Detailed Layer Design Requirements  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

Each of these subsections must describe **responsibilities, examples, templates, and outputs** for developers:

- **Visual Components** — hierarchy (atoms/molecules/organisms), accessibility rules, responsive design examples.  
- **Controllers** — mediation logic, hooks integration, validation handling.  
- **Models** — domain objects (`User`, `Coach`), validators, usage examples.  
- **Middleware** — interceptors, error handling, logging.  
- **Business Logic** — reusable services, domain rules.  
- **Proxy/Client** — API abstraction (`api/client.ts`).  
- **Background/Listeners** — WebSocket listeners, periodic refreshers.  
- **Validators** — `validators/validator.ts`, templates.  
- **DTOs** — mapping between API and frontend models.  
- **State Management** — Redux slices + store.  
- **Styles** — responsive rules, dark/light mode strategy.  
- **Utilities** — helpers, singletons.  
- **Exception Handling** — friendly error handling + logging.  
- **Logging** — strategy-pattern logger with pluggable providers.  
- **Security** — auth integration with roles.  

---

## Required Diagrams  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

All diagrams are stored in `/docs/diagrams/` and exported as **PDF** and editable source files:

1. **N-Layer Architecture Diagram**   TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!
2. **Class Diagram (UML)**   TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

---

## Deliverables Checklist  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

- [ ] Proof of Concepts (Prototype, UX test, Auth test).  
- [ ] Documentation (`README.md`, `/docs/*`).  
- [ ] Frontend Architecture Design.  
- [ ] N-Layer & UML Diagrams.  
- [ ] `src/` with correct folder structure & code templates.  
- [ ] Unit Tests (3 for 2 classes minimum).  
- [ ] Linter configuration.  
- [ ] Build & Deployment scripts.  

---

## Timeline

- **Last commit date:** Saturday, September 27  
- **Participation requirement:** Every group member must contribute commits weekly.  

---

## License
This repository is for **educational and prototype purposes only**.  
