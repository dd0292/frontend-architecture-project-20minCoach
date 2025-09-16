import { UserModel } from "../models/User"

describe("UserModel", () => {
  let basicUser: UserModel
  let premiumUser: UserModel
  let coach: UserModel

  beforeEach(() => {
    basicUser = new UserModel("1", "basic@example.com", "BasicUser", "Basic User")
    premiumUser = new UserModel("2", "premium@example.com", "PremiumUser", "Premium User")
    coach = new UserModel("3", "coach@example.com", "Coach", "Coach User")
  })

  describe("Role checking methods", () => {
    test("isBasicUser should return correct values", () => {
      expect(basicUser.isBasicUser()).toBe(true)
      expect(premiumUser.isBasicUser()).toBe(false)
      expect(coach.isBasicUser()).toBe(false)
    })

    test("isPremiumUser should return correct values", () => {
      expect(basicUser.isPremiumUser()).toBe(false)
      expect(premiumUser.isPremiumUser()).toBe(true)
      expect(coach.isPremiumUser()).toBe(false)
    })

    test("isCoach should return correct values", () => {
      expect(basicUser.isCoach()).toBe(false)
      expect(premiumUser.isCoach()).toBe(false)
      expect(coach.isCoach()).toBe(true)
    })
  })

  describe("Premium features access", () => {
    test("canAccessPremiumFeatures should return correct values", () => {
      expect(basicUser.canAccessPremiumFeatures()).toBe(false)
      expect(premiumUser.canAccessPremiumFeatures()).toBe(true)
      expect(coach.canAccessPremiumFeatures()).toBe(true)
    })
  })

  describe("User creation", () => {
    test("should create user with correct properties", () => {
      expect(basicUser.id).toBe("1")
      expect(basicUser.email).toBe("basic@example.com")
      expect(basicUser.role).toBe("BasicUser")
      expect(basicUser.name).toBe("Basic User")
    })

    test("should create user without name", () => {
      const userWithoutName = new UserModel("4", "test@example.com", "BasicUser")
      expect(userWithoutName.name).toBeUndefined()
    })
  })
})
