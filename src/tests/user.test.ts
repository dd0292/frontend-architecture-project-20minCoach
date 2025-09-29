import { UserModel } from "../models/User"

describe("UserModel", () => {
  const mockUser = {
    id: "1",
    email: "test@example.com",
    name: "Test User",
    role: "PremiumUser" as const,
    sessionsRemaining: 5,
    packageType: "Premium Monthly",
  }

  test("should create user instance correctly", () => {
    const user = new UserModel(mockUser)
    expect(user.email).toBe("test@example.com")
    expect(user.name).toBe("Test User")
    expect(user.role).toBe("PremiumUser")
  })

  test("should correctly identify premium user", () => {
    const user = new UserModel(mockUser)
    expect(user.isPremium()).toBe(true)
  })

  test("should correctly identify basic user", () => {
    const basicUser = new UserModel({
      ...mockUser,
      role: "BasicUser",
    })
    expect(basicUser.isPremium()).toBe(false)
  })

  test("should check if user can book session", () => {
    const user = new UserModel(mockUser)
    expect(user.canBookSession()).toBe(true)

    const userWithNoSessions = new UserModel({
      ...mockUser,
      sessionsRemaining: 0,
    })
    expect(userWithNoSessions.canBookSession()).toBe(false)
  })
})
