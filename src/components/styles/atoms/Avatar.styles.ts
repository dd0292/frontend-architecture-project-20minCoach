import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createAvatarStyles = (theme: ThemeContextType, size = 48) =>
  StyleSheet.create({
    imageBaseStyle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      zIndex: 10,
    },
    containerStyle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
  });
