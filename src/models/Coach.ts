import { ImageSourcePropType } from "react-native";

export interface Coach {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  profilePicture: ImageSourcePropType;
  isAvailable: boolean;
  bio: string;
  experience: string;
  hourlyRate: number;
  coverPhoto?: ImageSourcePropType;
}

export interface Session {
  id: string;
  coachId: string;
  userId: string;
  problem: string;
  tags: string[];
  scheduledTime: string;
  status: "upcoming" | "completed" | "cancelled";
  rating?: number;
  review?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
