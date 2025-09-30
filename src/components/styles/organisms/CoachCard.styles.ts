import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createCardStyles = (theme: ThemeContextType) =>
  StyleSheet.create({
    baseStyle: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
  });
