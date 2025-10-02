import type { Coach } from "../models/Coach";

export const searchCoaches = (
  coaches: Coach[],
  query: string,
  tags: string[],
): Coach[] => {
  return coaches.filter((coach) => {
    const matchesQuery =
      !query ||
      coach.name.toLowerCase().includes(query.toLowerCase()) ||
      coach.title.toLowerCase().includes(query.toLowerCase());

    const matchesTags =
      tags.length === 0 ||
      tags.some((tag) =>
        coach.tags.some((coachTag) =>
          coachTag.toLowerCase().includes(tag.toLowerCase()),
        ),
      );

    return matchesQuery || matchesTags;
  });
};

export const getAvailableCoaches = (coaches: Coach[]): Coach[] => {
  return coaches.filter((coach) => coach.isAvailable);
};

export const sortCoachesByRating = (coaches: Coach[]): Coach[] => {
  return [...coaches].sort((a, b) => b.rating - a.rating);
};

export class SearchController {
  static validateProblemDescription(description: string): { isValid: boolean; message?: string } {
    const words = description.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    if (wordCount < 40) {
      return {
        isValid: false,
        message: `Please provide at least 40 words to help us understand your needs better. Current count: ${wordCount} words`
      };
    }

    return { isValid: true };
  }

  static filterCoaches(coaches: Coach[], query: string, tags: string[]): Coach[] {
    return coaches.filter((coach) => {
      // Only show available coaches
      if (!coach.isAvailable) return false;

      // Check query match (name, specialization, bio)
      const matchesQuery = !query || 
        coach.name.toLowerCase().includes(query.toLowerCase()) ||
        coach.specialization.some(spec => 
          spec.toLowerCase().includes(query.toLowerCase())
        ) ||
        coach.bio.toLowerCase().includes(query.toLowerCase());

      // Check tags match
      const matchesTags = tags.length === 0 ||
        tags.some(tag =>
          coach.tags.some(coachTag =>
            coachTag.toLowerCase().includes(tag.toLowerCase())
          )
        );

      return matchesQuery && matchesTags;
    });
  }

  static getAvailableTags(): string[] {
    return [
      // Psychology & Mental Health
      "psychology", "therapy", "cbt", "anxiety", "depression", "mental-health",
      "counseling", "stress-management", "mindfulness", "trauma",
      
      // Programming & Tech
      "programming", "react", "javascript", "web-development", "frontend",
      "backend", "full-stack", "mobile-development", "database",
      
      // Health & Fitness
      "health", "fitness", "nutrition", "wellness", "exercise", "weight-loss",
      "muscle-building", "cardio", "strength-training",
      
      // Business & Career
      "business", "entrepreneurship", "career", "leadership", "management",
      "marketing", "sales", "finance", "startup",
      
      // Law & Legal
      "law", "legal", "contracts", "corporate", "criminal", "family-law",
      "real-estate", "immigration", "employment",
      
      // Arts & Creative
      "arts", "design", "photography", "music", "writing", "painting",
      "graphic-design", "digital-art", "creative-writing",
      
      // Education & Learning
      "education", "tutoring", "mathematics", "science", "language-learning",
      "academic-support", "study-skills", "test-preparation",
      
      // Other
      "coaching", "consulting", "personal-development", "life-coaching",
      "relationship", "communication", "time-management"
    ];
  }
}