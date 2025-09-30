// Test data fixtures for 20minCoach testing

export const mockUsers = {
  basicUser: {
    id: "1",
    email: "basic@example.com",
    role: "BasicUser" as const,
    name: "Basic User",
  },
  premiumUser: {
    id: "2",
    email: "premium@example.com",
    role: "PremiumUser" as const,
    name: "Premium User",
  },
  coach: {
    id: "3",
    email: "coach@example.com",
    role: "Coach" as const,
    name: "Coach User",
  },
};

export const mockCoaches = [
  {
    id: "coach-1",
    name: "Dr. María García",
    specialization: ["psychology", "therapy", "mental-health"],
    bio: "Experienced psychologist with 10 years of practice in cognitive behavioral therapy",
    rating: 4.8,
    profilePicture: "https://example.com/maria.jpg",
    location: "Bogotá, Colombia",
    isAvailable: true,
    experience: "10 years",
    tags: ["psychology", "therapy", "cbt", "anxiety", "depression"],
  },
  {
    id: "coach-2",
    name: "Carlos Developer",
    specialization: ["programming", "web-development", "react"],
    bio: "Senior software developer with expertise in React and Node.js",
    rating: 4.6,
    profilePicture: "https://example.com/carlos.jpg",
    location: "São Paulo, Brazil",
    isAvailable: true,
    experience: "8 years",
    tags: ["programming", "react", "javascript", "web-development"],
  },
  {
    id: "coach-3",
    name: "Ana Fitness",
    specialization: ["health", "fitness", "nutrition"],
    bio: "Certified personal trainer and nutritionist",
    rating: 4.7,
    profilePicture: "https://example.com/ana.jpg",
    location: "Medellín, Colombia",
    isAvailable: false,
    experience: "6 years",
    tags: ["fitness", "nutrition", "health", "training"],
  },
  {
    id: "coach-4",
    name: "Roberto Legal",
    specialization: ["law", "legal", "contracts"],
    bio: "Corporate lawyer with 15 years of experience",
    rating: 4.9,
    profilePicture: "https://example.com/roberto.jpg",
    location: "Buenos Aires, Argentina",
    isAvailable: true,
    experience: "15 years",
    tags: ["law", "legal", "contracts", "corporate"],
  },
];

export const mockProblemDescriptions = {
  valid:
    "I am experiencing significant anxiety and stress related to my work situation. I have been having trouble sleeping, concentrating, and making decisions. I feel overwhelmed by my responsibilities and deadlines. I would like to speak with a mental health professional who can help me develop coping strategies and better manage my stress levels. I am particularly interested in cognitive behavioral therapy techniques.",
  tooShort: "I need help with anxiety.",
  empty: "",
  whitespace: "   \n\t   ",
};

export const mockSearchQueries = {
  byName: "María",
  bySpecialization: "programming",
  byBio: "cognitive",
  nonExistent: "nonexistent",
  empty: "",
};

export const mockTags = {
  psychology: ["psychology", "therapy", "cbt", "anxiety", "depression"],
  programming: ["programming", "react", "javascript", "web-development"],
  health: ["fitness", "nutrition", "health", "training"],
  legal: ["law", "legal", "contracts", "corporate"],
};

export const mockApiResponses = {
  loginSuccess: {
    success: true,
    user: mockUsers.basicUser,
    token: "mock-jwt-token",
  },
  loginError: {
    success: false,
    error: "Invalid credentials",
  },
  coachesList: {
    success: true,
    coaches: mockCoaches,
    total: mockCoaches.length,
  },
};

export const mockErrorMessages = {
  emailRequired: "Email and password are required",
  passwordRequired: "Email and password are required",
  passwordTooShort: "Password must be at least 6 characters",
  invalidEmail: "Invalid email format",
  networkError: "Network error occurred",
  serverError: "Internal server error",
};
