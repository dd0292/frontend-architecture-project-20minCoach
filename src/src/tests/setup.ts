// Jest setup file for React Native testing
const jest = require("jest")
import "react-native-gesture-handler/jestSetup"

// Mock React Native modules
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock")
  Reanimated.default.call = () => {}
  return Reanimated
})

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }: any) => children,
}))

jest.mock("@react-navigation/stack", () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ children }: any) => children,
  }),
}))

// Mock Redux
jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
  Provider: ({ children }: any) => children,
}))

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper")
