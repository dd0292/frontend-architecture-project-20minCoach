import { CoachModel } from "../models/Coach";

describe("CoachModel", () => {
  let coach: CoachModel;
  let coachData: any;

  beforeEach(() => {
    coachData = {
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
    };
    coach = new CoachModel(coachData);
  });

  describe("Constructor and Properties", () => {
    test("should create coach with all required properties", () => {
      expect(coach.id).toBe("coach-1");
      expect(coach.name).toBe("Dr. María García");
      expect(coach.specialization).toEqual([
        "psychology",
        "therapy",
        "mental-health",
      ]);
      expect(coach.bio).toBe(
        "Experienced psychologist with 10 years of practice in cognitive behavioral therapy",
      );
      expect(coach.rating).toBe(4.8);
      expect(coach.profilePicture).toBe("https://example.com/maria.jpg");
      expect(coach.location).toBe("Bogotá, Colombia");
      expect(coach.isAvailable).toBe(true);
      expect(coach.experience).toBe("10 years");
      expect(coach.tags).toEqual([
        "psychology",
        "therapy",
        "cbt",
        "anxiety",
        "depression",
      ]);
    });

    test("should create coach with minimal data", () => {
      const minimalData = {
        id: "coach-2",
        name: "John Doe",
        specialization: ["programming"],
        bio: "Software developer",
        rating: 4.0,
        profilePicture: "",
        location: "São Paulo, Brazil",
        isAvailable: false,
        experience: "5 years",
        tags: ["programming"],
      };

      const minimalCoach = new CoachModel(minimalData);

      expect(minimalCoach.id).toBe("coach-2");
      expect(minimalCoach.name).toBe("John Doe");
      expect(minimalCoach.isAvailable).toBe(false);
    });
  });

  describe("hasTag method", () => {
    test("should return true when coach has the specified tag", () => {
      expect(coach.hasTag("psychology")).toBe(true);
      expect(coach.hasTag("therapy")).toBe(true);
      expect(coach.hasTag("cbt")).toBe(true);
    });

    test("should return false when coach does not have the specified tag", () => {
      expect(coach.hasTag("programming")).toBe(false);
      expect(coach.hasTag("fitness")).toBe(false);
      expect(coach.hasTag("law")).toBe(false);
    });

    test("should be case sensitive", () => {
      expect(coach.hasTag("Psychology")).toBe(false);
      expect(coach.hasTag("THERAPY")).toBe(false);
    });

    test("should handle empty string tag", () => {
      expect(coach.hasTag("")).toBe(false);
    });
  });

  describe("matchesSpecialization method", () => {
    test("should return true when specialization matches exactly", () => {
      expect(coach.matchesSpecialization("psychology")).toBe(true);
      expect(coach.matchesSpecialization("therapy")).toBe(true);
      expect(coach.matchesSpecialization("mental-health")).toBe(true);
    });

    test("should return true when specialization contains the search term", () => {
      expect(coach.matchesSpecialization("psych")).toBe(true);
      expect(coach.matchesSpecialization("mental")).toBe(true);
      expect(coach.matchesSpecialization("health")).toBe(true);
    });

    test("should be case insensitive", () => {
      expect(coach.matchesSpecialization("PSYCHOLOGY")).toBe(true);
      expect(coach.matchesSpecialization("Therapy")).toBe(true);
      expect(coach.matchesSpecialization("MENTAL-HEALTH")).toBe(true);
    });

    test("should return false when no specialization matches", () => {
      expect(coach.matchesSpecialization("programming")).toBe(false);
      expect(coach.matchesSpecialization("fitness")).toBe(false);
      expect(coach.matchesSpecialization("law")).toBe(false);
    });

    test("should handle empty search term", () => {
      // Empty string matches any specialization due to includes("") returning true
      expect(coach.matchesSpecialization("")).toBe(true);
    });

    test("should handle partial matches within specialization", () => {
      expect(coach.matchesSpecialization("cogn")).toBe(false); // "cognitive" is in bio, not specialization
      expect(coach.matchesSpecialization("behav")).toBe(false); // "behavioral" is in bio, not specialization
    });
  });

  describe("Edge Cases and Error Handling", () => {
    test("should handle coach with empty tags array", () => {
      const coachWithNoTags = new CoachModel({
        ...coachData,
        tags: [],
      });

      expect(coachWithNoTags.hasTag("psychology")).toBe(false);
      expect(coachWithNoTags.matchesSpecialization("psychology")).toBe(true);
    });

    test("should handle coach with empty specialization array", () => {
      const coachWithNoSpecialization = new CoachModel({
        ...coachData,
        specialization: [],
      });

      expect(
        coachWithNoSpecialization.matchesSpecialization("psychology"),
      ).toBe(false);
    });

    test("should handle special characters in tags", () => {
      const coachWithSpecialTags = new CoachModel({
        ...coachData,
        tags: ["cbt", "cbt-i", "dbt", "emdr"],
      });

      expect(coachWithSpecialTags.hasTag("cbt-i")).toBe(true);
      expect(coachWithSpecialTags.hasTag("dbt")).toBe(true);
    });
  });
});
