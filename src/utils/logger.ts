const __DEV__ = process.env.NODE_ENV !== "production"

export class Logger {
  static log(message: string, data?: any) {
    if (__DEV__) {
      console.log(`[20minCoach] ${message}`, data || "")
    }
  }

  static error(message: string, error?: any) {
    if (__DEV__) {
      console.error(`[20minCoach ERROR] ${message}`, error || "")
    }
  }

  static warn(message: string, data?: any) {
    if (__DEV__) {
      console.warn(`[20minCoach WARNING] ${message}`, data || "")
    }
  }
}
