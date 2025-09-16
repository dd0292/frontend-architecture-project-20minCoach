export class Logger {
  static log(message: string, data?: any): void {
    console.log(`[20minCoach] ${message}`, data || "")
  }

  static error(message: string, error?: any): void {
    console.error(`[20minCoach ERROR] ${message}`, error || "")
  }

  static warn(message: string, data?: any): void {
    console.warn(`[20minCoach WARNING] ${message}`, data || "")
  }
}
