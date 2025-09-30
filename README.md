# 20minCoach — Frontend Architecture & Prototype

> **Case #1, 30%**  
> Group Project — 3 members 
> Jose David Chaves Mena, <no olvidar nombre>, <no olvidar nombre> 

---
### Project Overview

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
### Technologies Used
- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- React Navigation for routing
- Jest for testing
- Supabase for authentification

---
## Repository Structure

```bash
repo-root/
│── README.md                 # This documentation
│── docs/                     # Documentation files & diagrams
│   ├── diagrams/             # Architecture & UML diagrams
│   ├── Testing Guide.md      # Complete testing documentation
│   └── ...
│── src/                      # Source code (PoCs + architecture implementation)
│   ├── App.tsx               # App bootstrap
│   ├── pocs/                 # PRUEBAS DE CONCEPTO FUNCIONALES !!!!!!!!~
│   │   ├── video-call/
│   │   ├── auth-roles/
│   │   ├── real-time-search/
│   │   └── notifications/
│   ├── components/           # Visual components
│   │   ├── auth/
│   │   ├── common/           # Atoms, Molecules, Organisms
│   │   │   ├── atoms/        # Componentes básicos
│   │   │   ├── molecules/    # Componentes compuestos
│   │   │   └── organisms/    # Componentes complejos
│   │   └── styles/
│   ├── controllers/          # Controllers (Auth, Search, etc.)
│   ├── models/               # Models (User, Coach, etc.)
│   ├── screens/              # Screens (Login, Search, Results, Profile)
│   ├── slices/               # Redux slices
│   ├── state/                # Store config
│   ├── api/                  # Proxy/Client layer [TODO]
│   ├── business/             # Business logic services [TODO]
│   ├── middleware/           # Middlewares (logging, validation, error handler) [TODO]
│   ├── validators/           # Validation rules [TODO]
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

### Installation & Running the app
```bash
git clone <REPO_URL>
cd frontend-architecture-project-20minCoach
npm install
npm start # Run the app
```

### Demo Accounts
- **User** → `user@example.com / password123`  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

---

## Testing

### 🧪 Testing Strategy
- **Framework**: Jest 29.7.0 + React Native Testing Library
- **Cobertura**: 80% líneas, 90% funciones, 75% ramas
- **Tests implementados**: 52 tests unitarios pasando
- **Documentación completa**: Ver [Testing Guide](docs/Testing%20Guide.md)

### 🏃 Running Tests
```bash
cd src
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:models      # Only model tests
npm run test:controllers # Only controllers
```

### 📊 Test Coverage
- **UserModel**: 6 tests (roles, validaciones, acceso premium)
- **CoachModel**: 15 tests (constructor, búsqueda, especialización)
- **AuthController**: 8 tests (login, validaciones, roles)
- **SearchController**: 23 tests (búsqueda, filtros, validaciones)

### 📂 Test Structure
```bash
src/tests/
├── fixtures/        # Test data
├── mocks/           # Reusable mocks
├── utils/           # Helpers
├── user.test.ts     # UserModel tests
├── coach.test.ts    # CoachModel tests
├── authController.test.ts    # AuthController tests
├── searchController.test.ts  # SearchController tests
└── setup.ts         # Jest config
```

**📖 Para más detalles, consulta la [Guía Completa de Testing](docs/Testing%20Guide.md)**

---

## UX & Security Proof of Concepts

### 1. Prototype Screen
- AI tool used: Vercel's `v0` [https://v0.app/]
- Prototype created for: **Search Screen + Coach Results**.  
- Stored under: `src/screens`  

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

## Linter configuration

This project uses [ESLint](https://eslint.org/) as the linting tool to ensure clean, consistent, and error-free code. ESLint is configured with support for TypeScript, React, React Hooks, and Prettier integration for formatting. Also other pluggins used are:
- `@typescript-eslint/eslint-plugin` — TypeScript support.
- `eslint-plugin-react` — React-specific rules.
- `eslint-plugin-react-hooks` — Rules for hooks best practices.
- `eslint-plugin-prettier` — Enforces Prettier formatting rules. 

### Rules/conventions

#### Base JavaScript Rules (from `@eslint/js`)

Standard best practices for JavaScript, including:
- Disallow unused variables
- Disallow unreachable code
- Warn about confusing arrow functions or misuse of == vs ===
- Enforce curly braces for blocks
- Encourage === over ==

#### TypeScript Rules (from `@typescript-eslint`)

- `@typescript-eslint/no-unused-vars`: Disallow unused variables (Error)
- `@typescript-eslint/no-explicit-any`: Discourages using any type (Warning)
- Enforces strict typing and clean, maintainable TypeScript code
- Checks function return types, parameter consistency, and type safety

#### React Rules (from `eslint-plugin-react`)

- Enforces best practices in React components
- Validates JSX syntax
- Warns if component props aren’t used properly
- Helps avoid unnecessary re-renders or unsafe lifecycle methods

#### Prettier Formatting Rules (from `eslint-plugin-prettier`)

- All code must follow Prettier formatting
- Any formatting issues (indentation, spacing, quotes, etc.) are treated as errors
- Helps keep consistent code style across the entire team

#### Custom Rules
- `no-console`: Warn when using console.log
- `prefer-const`: Prefer const over let if possible
- `no-var`: Disallow use of var

### Running ESLint
```bash
npm run lint # to check your code
npm run lint --fix # to automatically fix problems
```

## Deliverables Checklist  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

1. DIAGRAMAS FALTANTES
  - [ ] Architecture-diagram.pdf - Diagrama N-Layer claro
  - [ ] Class-diagram.pdf - Con patrones de diseño etiquetados
  - [ ] Component-hierarchy.pdf - Estructura de componentes React

2. PRUEBAS DE CONCEPTO (PoCs) REALES
  - [ ] PoC #1: Video llamada funcional (20min timer incluido)
  - [ ] PoC #2: Sistema de roles funcionando (BasicUser/PremiumUser)
  - [ ] PoC #3: Búsqueda en tiempo real con filtros
  - [ ] PoC #4: Notificaciones en tiempo real

3. AUTENTICACIÓN
  - [ ] Auth0/Clerk configurado con 2 roles
  - [ ] BasicUser: Solo puede buscar coaches
  - [ ] PremiumUser: Puede buscar + reservar instantáneamente
  - [ ] MFA (Two Factor) funcionando
  - [ ] Middleware de permisos implementado

4. TESTING
  - [ ] 3 UNIT TESTS para AuthController (deben pasar)
  - [ ] 3 UNIT TESTS para Coach model (deben pasar)
  - [ ] Tests ejecutándose en pipeline
  - [ ] Scripts: npm test → funciona

5. UX/UI
  - [ ] Test con Maze/Useberry (5 participantes reales)
  - [ ] Evidencia: screenshots de resultados

6. ARQUITECTURA IMPLEMENTADA
  - [ ] Capa Middleware: error handling, logging, auth
  - [ ] Capa Business: lógica de negocio real
  - [ ] Capa Services: API clients funcionales
  - [ ] Capa Utils: loggers, validators

LO QUE EL PROFESOR VA A REVISAR ESPECÍFICAMENTE
[ ] 1. ¿Puedo clonar el repo y ejecutar `npm test` sin errores?
[ ] 2. ¿Los 6 tests unitarios PASAN?
[ ] 3. ¿Puedo hacer login como BasicUser y PremiumUser?
[ ] 4. ¿Veo diferentes funcionalidades según mi rol?
[ ] 5. ¿El diagrama de arquitectura es claro y profesional?
[ ] 6. ¿Hay evidencia de testing UX con personas reales?
[ ] 7. ¿Puedo entender TODO con solo leer el README.md?

---

## Timeline

- **Last commit date:** Saturday, September 27  
- **Participation requirement:** Every group member must contribute commits weekly.  

---

## License
This repository is for **educational and prototype purposes only**.  
