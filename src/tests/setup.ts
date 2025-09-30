import { jest } from "@jest/globals";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

/*
// Jest setup file for React Native testing

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
*/
