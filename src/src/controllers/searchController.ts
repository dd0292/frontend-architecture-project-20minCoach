import type { Coach } from "../models/Coach"

export class SearchController {
  static validateProblemDescription(description: string): { isValid: boolean; message?: string } {
    const wordCount = description.trim().split(/\s+/).length

    if (wordCount < 40) {
      return {
        isValid: false,
        message: `Please provide at least 40 words. Current count: ${wordCount} words.`,
      }
    }

    return { isValid: true }
  }

  static filterCoaches(coaches: Coach[], query: string, tags: string[]): Coach[] {
    return coaches.filter((coach) => {
      const matchesQuery =
        query === "" ||
        coach.name.toLowerCase().includes(query.toLowerCase()) ||
        coach.specialization.some((spec) => spec.toLowerCase().includes(query.toLowerCase())) ||
        coach.bio.toLowerCase().includes(query.toLowerCase())

      const matchesTags = tags.length === 0 || tags.some((tag) => coach.tags.includes(tag))

      return matchesQuery && matchesTags && coach.isAvailable
    })
  }

  static getAvailableTags(): string[] {
    return [
      "psychology",
      "life-coaching",
      "therapy",
      "mental-health",
      "programming",
      "web-development",
      "react",
      "cloud",
      "tech",
      "arts",
      "writing",
      "creativity",
      "mechanics",
      "engineering",
      "automotive",
      "health",
      "fitness",
      "nutrition",
      "business",
      "finance",
      "entrepreneurship",
      "law",
      "legal",
      "contracts",
      "agriculture",
      "sustainability",
      "farming",
    ]
  }
}
