import { UserModel } from "../models/User"

export class AuthController {
  // Mock authentication - in real app this would call an API
  static async login(email: string, password: string): Promise<UserModel> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    // Mock user creation based on email domain
    const isCoach = email.includes("coach")
    const isPremium = email.includes("premium")

    const role = isCoach ? "Coach" : isPremium ? "PremiumUser" : "BasicUser"
    const name = email.split("@")[0].replace(/[._]/g, " ")

    return new UserModel(Math.random().toString(36).substr(2, 9), email, role, name)
  }

  static async logout(): Promise<void> {
    // In real app, this would clear tokens, call logout API, etc.
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}
