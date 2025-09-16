export class Validator {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static isValidPassword(password: string): boolean {
    return password.length >= 6
  }

  static validateProblemDescription(description: string): { isValid: boolean; wordCount: number; message?: string } {
    const words = description
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    const wordCount = words.length

    if (wordCount < 40) {
      return {
        isValid: false,
        wordCount,
        message: `Please provide at least 40 words to help us find the best coach for you. Current count: ${wordCount} words.`,
      }
    }

    return { isValid: true, wordCount }
  }
}
