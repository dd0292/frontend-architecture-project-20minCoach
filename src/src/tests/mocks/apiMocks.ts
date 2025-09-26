// API mocks for testing

export const mockApiService = {
  login: jest.fn(),
  logout: jest.fn(),
  getUserProfile: jest.fn(),
  getCoaches: jest.fn(),
  searchCoaches: jest.fn(),
  getCoachProfile: jest.fn(),
  requestSession: jest.fn(),
  getSessionHistory: jest.fn(),
  updateUserProfile: jest.fn(),
  updateCoachProfile: jest.fn()
}

export const mockAuthService = {
  isAuthenticated: jest.fn(),
  getCurrentUser: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  refreshToken: jest.fn(),
  hasPermission: jest.fn()
}

export const mockNavigationService = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  canGoBack: jest.fn()
}

export const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn()
}

export const mockValidator = {
  validateEmail: jest.fn(),
  validatePassword: jest.fn(),
  validateRequired: jest.fn(),
  validateMinLength: jest.fn()
}

// Reset all mocks
export const resetAllMocks = () => {
  Object.values(mockApiService).forEach(mock => mock.mockReset())
  Object.values(mockAuthService).forEach(mock => mock.mockReset())
  Object.values(mockNavigationService).forEach(mock => mock.mockReset())
  Object.values(mockLogger).forEach(mock => mock.mockReset())
  Object.values(mockValidator).forEach(mock => mock.mockReset())
}

// Setup default mock behaviors
export const setupDefaultMocks = () => {
  // API Service defaults
  mockApiService.login.mockResolvedValue({ success: true, user: { id: "1", email: "test@example.com" } })
  mockApiService.logout.mockResolvedValue({ success: true })
  mockApiService.getUserProfile.mockResolvedValue({ success: true, user: { id: "1", name: "Test User" } })
  
  // Auth Service defaults
  mockAuthService.isAuthenticated.mockReturnValue(true)
  mockAuthService.getCurrentUser.mockReturnValue({ id: "1", email: "test@example.com" })
  mockAuthService.hasPermission.mockReturnValue(true)
  
  // Navigation Service defaults
  mockNavigationService.navigate.mockImplementation(() => {})
  mockNavigationService.goBack.mockImplementation(() => {})
  mockNavigationService.canGoBack.mockReturnValue(true)
  
  // Logger defaults
  mockLogger.info.mockImplementation(() => {})
  mockLogger.warn.mockImplementation(() => {})
  mockLogger.error.mockImplementation(() => {})
  mockLogger.debug.mockImplementation(() => {})
  
  // Validator defaults
  mockValidator.validateEmail.mockReturnValue(true)
  mockValidator.validatePassword.mockReturnValue(true)
  mockValidator.validateRequired.mockReturnValue(true)
  mockValidator.validateMinLength.mockReturnValue(true)
}
