import { SearchController } from "../controllers/searchController"
import type { Coach } from "../models/Coach"

describe("SearchController", () => {
  let mockCoaches: Coach[]

  beforeEach(() => {
    mockCoaches = [
      {
        id: "1",
        name: "Dr. María García",
        specialization: ["psychology", "therapy", "mental-health"],
        bio: "Experienced psychologist specializing in cognitive behavioral therapy",
        rating: 4.8,
        profilePicture: "https://example.com/maria.jpg",
        location: "Bogotá, Colombia",
        isAvailable: true,
        experience: "10 years",
        tags: ["psychology", "therapy", "cbt", "anxiety", "depression"]
      },
      {
        id: "2",
        name: "Carlos Developer",
        specialization: ["programming", "web-development", "react"],
        bio: "Senior software developer with expertise in React and Node.js",
        rating: 4.6,
        profilePicture: "https://example.com/carlos.jpg",
        location: "São Paulo, Brazil",
        isAvailable: true,
        experience: "8 years",
        tags: ["programming", "react", "javascript", "web-development"]
      },
      {
        id: "3",
        name: "Ana Fitness",
        specialization: ["health", "fitness", "nutrition"],
        bio: "Certified personal trainer and nutritionist",
        rating: 4.7,
        profilePicture: "https://example.com/ana.jpg",
        location: "Medellín, Colombia",
        isAvailable: false,
        experience: "6 years",
        tags: ["fitness", "nutrition", "health", "training"]
      },
      {
        id: "4",
        name: "Roberto Legal",
        specialization: ["law", "legal", "contracts"],
        bio: "Corporate lawyer with 15 years of experience",
        rating: 4.9,
        profilePicture: "https://example.com/roberto.jpg",
        location: "Buenos Aires, Argentina",
        isAvailable: true,
        experience: "15 years",
        tags: ["law", "legal", "contracts", "corporate"]
      }
    ]
  })

  describe("validateProblemDescription", () => {
    test("should return valid for description with 40+ words", () => {
      const longDescription = "I am experiencing significant anxiety and stress related to my work situation. I have been having trouble sleeping, concentrating, and making decisions. I feel overwhelmed by my responsibilities and deadlines. I would like to speak with a mental health professional who can help me develop coping strategies and better manage my stress levels. I am particularly interested in cognitive behavioral therapy techniques."
      
      const result = SearchController.validateProblemDescription(longDescription)
      
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    test("should return invalid for description with less than 40 words", () => {
      const shortDescription = "I need help with anxiety and stress management."
      
      const result = SearchController.validateProblemDescription(shortDescription)
      
      expect(result.isValid).toBe(false)
      expect(result.message).toContain("Please provide at least 40 words")
      expect(result.message).toContain("Current count: 8 words")
    })

    test("should handle empty description", () => {
      const result = SearchController.validateProblemDescription("")
      
      expect(result.isValid).toBe(false)
      expect(result.message).toContain("Current count: 1 words")
    })

    test("should handle description with only whitespace", () => {
      const result = SearchController.validateProblemDescription("   \n\t   ")
      
      expect(result.isValid).toBe(false)
      expect(result.message).toContain("Current count: 1 words")
    })

    test("should handle description with exactly 40 words", () => {
      const exactly40Words = "word ".repeat(40).trim()
      
      const result = SearchController.validateProblemDescription(exactly40Words)
      
      expect(result.isValid).toBe(true)
    })

    test("should handle description with multiple spaces between words", () => {
      const descriptionWithMultipleSpaces = "I    need    help    with    anxiety    and    stress    management    and    would    like    to    speak    with    a    professional    who    can    help    me    develop    coping    strategies    and    better    manage    my    stress    levels    and    I    am    particularly    interested    in    cognitive    behavioral    therapy    techniques    and    mindfulness    practices"
      
      const result = SearchController.validateProblemDescription(descriptionWithMultipleSpaces)
      
      expect(result.isValid).toBe(true)
    })
  })

  describe("filterCoaches", () => {
    test("should return all available coaches when no filters applied", () => {
      const result = SearchController.filterCoaches(mockCoaches, "", [])
      
      expect(result).toHaveLength(3) // Only 3 coaches are available
      expect(result.map(c => c.id)).toEqual(["1", "2", "4"])
    })

    test("should filter by name query", () => {
      const result = SearchController.filterCoaches(mockCoaches, "María", [])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Dr. María García")
    })

    test("should filter by specialization query", () => {
      const result = SearchController.filterCoaches(mockCoaches, "programming", [])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Carlos Developer")
    })

    test("should filter by bio query", () => {
      const result = SearchController.filterCoaches(mockCoaches, "cognitive", [])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Dr. María García")
    })

    test("should filter by tags", () => {
      const result = SearchController.filterCoaches(mockCoaches, "", ["psychology"])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Dr. María García")
    })

    test("should filter by multiple tags", () => {
      const result = SearchController.filterCoaches(mockCoaches, "", ["programming", "react"])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Carlos Developer")
    })

    test("should combine query and tags filters", () => {
      const result = SearchController.filterCoaches(mockCoaches, "psychology", ["therapy"])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Dr. María García")
    })

    test("should return empty array when no matches found", () => {
      const result = SearchController.filterCoaches(mockCoaches, "nonexistent", [])
      
      expect(result).toHaveLength(0)
    })

    test("should be case insensitive for name search", () => {
      const result = SearchController.filterCoaches(mockCoaches, "maría", [])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Dr. María García")
    })

    test("should be case insensitive for specialization search", () => {
      const result = SearchController.filterCoaches(mockCoaches, "PROGRAMMING", [])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Carlos Developer")
    })

    test("should be case insensitive for bio search", () => {
      const result = SearchController.filterCoaches(mockCoaches, "COGNITIVE", [])
      
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Dr. María García")
    })

    test("should exclude unavailable coaches", () => {
      const result = SearchController.filterCoaches(mockCoaches, "fitness", [])
      
      expect(result).toHaveLength(0) // Ana is unavailable
    })

    test("should handle empty coaches array", () => {
      const result = SearchController.filterCoaches([], "test", [])
      
      expect(result).toHaveLength(0)
    })
  })

  describe("getAvailableTags", () => {
    test("should return array of available tags", () => {
      const tags = SearchController.getAvailableTags()
      
      expect(Array.isArray(tags)).toBe(true)
      expect(tags.length).toBeGreaterThan(0)
    })

    test("should include expected tag categories", () => {
      const tags = SearchController.getAvailableTags()
      
      expect(tags).toContain("psychology")
      expect(tags).toContain("programming")
      expect(tags).toContain("health")
      expect(tags).toContain("business")
      expect(tags).toContain("law")
      expect(tags).toContain("arts")
    })

    test("should not contain duplicate tags", () => {
      const tags = SearchController.getAvailableTags()
      const uniqueTags = [...new Set(tags)]
      
      expect(tags.length).toBe(uniqueTags.length)
    })

    test("should return same tags on multiple calls", () => {
      const tags1 = SearchController.getAvailableTags()
      const tags2 = SearchController.getAvailableTags()
      
      expect(tags1).toEqual(tags2)
    })
  })
})
