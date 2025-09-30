// Test helper utilities

import { UserModel } from "../../models/User";
import { CoachModel } from "../../models/Coach";
import type { User, Coach } from "../../models/User";

// User Builder
export class UserBuilder {
  private user: Partial<User> = {};

  withId(id: string) {
    this.user.id = id;
    return this;
  }

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withRole(role: "BasicUser" | "PremiumUser" | "Coach") {
    this.user.role = role;
    return this;
  }

  withName(name: string) {
    this.user.name = name;
    return this;
  }

  asBasic() {
    this.user.role = "BasicUser";
    return this;
  }

  asPremium() {
    this.user.role = "PremiumUser";
    return this;
  }

  asCoach() {
    this.user.role = "Coach";
    return this;
  }

  build(): UserModel {
    return new UserModel(
      this.user.id || "default-id",
      this.user.email || "default@example.com",
      this.user.role || "BasicUser",
      this.user.name,
    );
  }
}

// Coach Builder
export class CoachBuilder {
  private coach: Partial<Coach> = {};

  withId(id: string) {
    this.coach.id = id;
    return this;
  }

  withName(name: string) {
    this.coach.name = name;
    return this;
  }

  withSpecialization(specialization: string[]) {
    this.coach.specialization = specialization;
    return this;
  }

  withBio(bio: string) {
    this.coach.bio = bio;
    return this;
  }

  withRating(rating: number) {
    this.coach.rating = rating;
    return this;
  }

  withLocation(location: string) {
    this.coach.location = location;
    return this;
  }

  withTags(tags: string[]) {
    this.coach.tags = tags;
    return this;
  }

  asAvailable() {
    this.coach.isAvailable = true;
    return this;
  }

  asUnavailable() {
    this.coach.isAvailable = false;
    return this;
  }

  build(): CoachModel {
    const defaultCoach: Coach = {
      id: this.coach.id || "default-id",
      name: this.coach.name || "Default Coach",
      specialization: this.coach.specialization || ["default"],
      bio: this.coach.bio || "Default bio",
      rating: this.coach.rating || 4.0,
      profilePicture: this.coach.profilePicture || "",
      location: this.coach.location || "Default Location",
      isAvailable: this.coach.isAvailable ?? true,
      experience: this.coach.experience || "5 years",
      tags: this.coach.tags || ["default"],
    };

    return new CoachModel(defaultCoach);
  }
}

// Test Data Factory
export class TestDataFactory {
  static createBasicUser(overrides: Partial<User> = {}): UserModel {
    return new UserBuilder()
      .asBasic()
      .withEmail(overrides.email || "basic@example.com")
      .withName(overrides.name || "Basic User")
      .build();
  }

  static createPremiumUser(overrides: Partial<User> = {}): UserModel {
    return new UserBuilder()
      .asPremium()
      .withEmail(overrides.email || "premium@example.com")
      .withName(overrides.name || "Premium User")
      .build();
  }

  static createCoach(overrides: Partial<Coach> = {}): CoachModel {
    return new CoachBuilder()
      .asCoach()
      .withName(overrides.name || "Test Coach")
      .withSpecialization(overrides.specialization || ["psychology"])
      .withBio(overrides.bio || "Test coach bio")
      .withRating(overrides.rating || 4.5)
      .withLocation(overrides.location || "Test Location")
      .withTags(overrides.tags || ["psychology", "therapy"])
      .asAvailable()
      .build();
  }

  static createUnavailableCoach(overrides: Partial<Coach> = {}): CoachModel {
    return new CoachBuilder()
      .asCoach()
      .withName(overrides.name || "Unavailable Coach")
      .asUnavailable()
      .build();
  }
}

// Async Test Helpers
export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const waitForCondition = async (
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100,
): Promise<void> => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (condition()) {
      return;
    }
    await waitFor(interval);
  }

  throw new Error(`Condition not met within ${timeout}ms`);
};

// Mock Helpers
export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T,
): jest.MockedFunction<T> => {
  return jest.fn(implementation) as jest.MockedFunction<T>;
};

export const createMockObject = <T extends Record<string, any>>(
  partial: Partial<T> = {},
): jest.Mocked<T> => {
  return partial as jest.Mocked<T>;
};

// Assertion Helpers
export const expectToThrow = async (
  fn: () => Promise<any>,
  expectedError?: string | RegExp,
): Promise<void> => {
  try {
    await fn();
    throw new Error("Expected function to throw");
  } catch (error) {
    if (expectedError) {
      if (typeof expectedError === "string") {
        expect(error.message).toContain(expectedError);
      } else {
        expect(error.message).toMatch(expectedError);
      }
    }
  }
};

export const expectToNotThrow = async (
  fn: () => Promise<any>,
): Promise<void> => {
  try {
    await fn();
  } catch (error) {
    throw new Error(
      `Expected function not to throw, but it threw: ${error.message}`,
    );
  }
};

// Test Environment Helpers
export const setupTestEnvironment = () => {
  // Clear all mocks
  jest.clearAllMocks();

  // Reset modules
  jest.resetModules();

  // Setup console mocks to avoid noise in tests
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
};

export const cleanupTestEnvironment = () => {
  // Restore console
  jest.restoreAllMocks();

  // Clear timers
  jest.clearAllTimers();
};
