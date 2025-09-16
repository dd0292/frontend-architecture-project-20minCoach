import { AuthController } from "../controllers/authController"
import { UserModel } from "../models/User"

describe("AuthController", () => {
  describe("login", () => {
    test("should successfully login with valid credentials", async () => {
      const user = await AuthController.login("test@example.com", "password123")

      expect(user).toBeInstanceOf(UserModel)
      expect(user.email).toBe("test@example.com")
      expect(user.role).toBe("BasicUser")
      expect(user.name).toBe("test")
    })

    test("should create coach user for coach email", async () => {
      const user = await AuthController.login("coach@example.com", "password123")

      expect(user.role).toBe("Coach")
      expect(user.isCoach()).toBe(true)
    })

    test("should create premium user for premium email", async () => {
      const user = await AuthController.login("premium@example.com", "password123")

      expect(user.role).toBe("PremiumUser")
      expect(user.isPremiumUser()).toBe(true)
    })

    test("should throw error for empty email", async () => {
      await expect(AuthController.login("", "password123")).rejects.toThrow("Email and password are required")
    })

    test("should throw error for empty password", async () => {
      await expect(AuthController.login("test@example.com", "")).rejects.toThrow("Email and password are required")
    })

    test("should throw error for short password", async () => {
      await expect(AuthController.login("test@example.com", "123")).rejects.toThrow(
        "Password must be at least 6 characters",
      )
    })

    test("should handle email with dots and underscores in name", async () => {
      const user = await AuthController.login("john.doe_test@example.com", "password123")

      expect(user.name).toBe("john doe test")
    })
  })

  describe("logout", () => {
    test("should complete logout successfully", async () => {
      await expect(AuthController.logout()).resolves.toBeUndefined()
    })
  })
})
