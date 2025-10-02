import { ImageSourcePropType } from "react-native";
import { CoachSchema } from "./validators/Coach";

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

export class CoachModel implements Coach {
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

  constructor(data: Coach) {
    this.id = data.id;
    this.name = data.name;
    this.title = data.title;
    this.specialization = data.specialization;
    this.rating = data.rating;
    this.reviewCount = data.reviewCount;
    this.tags = data.tags;
    this.profilePicture = data.profilePicture;
    this.isAvailable = data.isAvailable;
    this.bio = data.bio;
    this.experience = data.experience;
    this.hourlyRate = data.hourlyRate;
    this.coverPhoto = data.coverPhoto;
  }

  validate(): { isValid: boolean; errors?: string[] } {
    const result = CoachSchema.validate(this, { abortEarly: false });
    if (result.error) {
      return {
        isValid: false,
        errors: result.error.details.map((detail) => detail.message),
      };
    }
    return { isValid: true };
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag);
  }

  matchesSpecialization(searchTerm: string): boolean {
    if (!searchTerm) return true;

    return this.specialization.some((spec) =>
      spec.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
}
