import { UserSchema } from "./validators/User";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "BasicUser" | "PremiumUser";
  profilePicture?: string;
  sessionsRemaining: number;
  packageType: string;
}

export class UserModel implements User {
  id: string;
  email: string;
  name: string;
  role: "BasicUser" | "PremiumUser";
  profilePicture?: string;
  sessionsRemaining: number;
  packageType: string;

  constructor(data: User) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.role = data.role;
    this.profilePicture = data.profilePicture;
    this.sessionsRemaining = data.sessionsRemaining;
    this.packageType = data.packageType;
  }

  validate(): { isValid: boolean; errors?: string[] } {
    const result = UserSchema.validate(this, { abortEarly: false });
    if (result.error) {
      return {
        isValid: false,
        errors: result.error.details.map((detail) => detail.message),
      };
    }
    return { isValid: true };
  }

  isPremium(): boolean {
    return this.role === "PremiumUser";
  }

  canBookSession(): boolean {
    return this.sessionsRemaining > 0;
  }
}
