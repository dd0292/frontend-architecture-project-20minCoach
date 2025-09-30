import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createInputStyles = (theme: ThemeContextType) =>
  StyleSheet.create({
    baseStyle: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text,
      minHeight: 48,
    },
  });
