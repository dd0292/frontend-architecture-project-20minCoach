import type { User } from "../models/User";

// Hard-coded users for testing
const hardCodedUsers: User[] = [
  {
    id: "user1",
    email: "john@example.com",
    name: "John Doe",
    role: "PremiumUser",
    profilePicture: "/professional-man-user.jpg",
    sessionsRemaining: 8,
    packageType: "Premium Monthly",
  },
  {
    id: "user2",
    email: "sarah@example.com",
    name: "Sarah Smith",
    role: "BasicUser",
    profilePicture: "/professional-woman-user.jpg",
    sessionsRemaining: 3,
    packageType: "Basic Package",
  },
  {
    id: "coach1",
    email: "maria@example.com",
    name: "Dr. Maria Rodriguez",
    role: "PremiumUser",
    profilePicture: "/professional-woman-psychologist.png",
    sessionsRemaining: 0,
    packageType: "Coach Account",
  },
];

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock authentication - in real app, this would validate against backend
  const user = hardCodedUsers.find((u) => u.email === email);

  if (user && password.length > 0) {
    return user;
  }

  return null;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
