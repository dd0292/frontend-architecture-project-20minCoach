import { authenticateUser, validateEmail } from "../controllers/authController";

describe("AuthController", () => {
  test("should authenticate valid user", async () => {
    const user = await authenticateUser("john@example.com", "password123");
    expect(user).toBeTruthy();
    expect(user?.email).toBe("john@example.com");
    expect(user?.name).toBe("John Doe");
  });

  test("should reject invalid user", async () => {
    const user = await authenticateUser("invalid@example.com", "password123");
    expect(user).toBeNull();
  });

  test("should reject empty password", async () => {
    const user = await authenticateUser("john@example.com", "");
    expect(user).toBeNull();
  });

  test("should validate correct email format", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name@domain.co.uk")).toBe(true);
  });

  test("should reject invalid email format", () => {
    expect(validateEmail("invalid-email")).toBe(false);
    expect(validateEmail("test@")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
  });
});
