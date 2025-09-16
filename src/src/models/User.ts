export interface User {
  id: string
  email: string
  role: "BasicUser" | "PremiumUser" | "Coach"
  name?: string
}

export class UserModel implements User {
  id: string
  email: string
  role: "BasicUser" | "PremiumUser" | "Coach"
  name?: string

  constructor(id: string, email: string, role: "BasicUser" | "PremiumUser" | "Coach", name?: string) {
    this.id = id
    this.email = email
    this.role = role
    this.name = name
  }

  isBasicUser(): boolean {
    return this.role === "BasicUser"
  }

  isPremiumUser(): boolean {
    return this.role === "PremiumUser"
  }

  isCoach(): boolean {
    return this.role === "Coach"
  }

  canAccessPremiumFeatures(): boolean {
    return this.role === "PremiumUser" || this.role === "Coach"
  }
}
