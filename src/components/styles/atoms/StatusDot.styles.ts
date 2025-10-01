import { StyleSheet } from "react-native";
//import { ThemeContextType } from "./ThemeContext";

export const createStatusDotStyles = (size = 12) =>
  StyleSheet.create({
    baseStyle: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
  });
