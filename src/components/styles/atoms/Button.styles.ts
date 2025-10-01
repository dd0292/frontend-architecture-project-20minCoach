import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createButtonStyles = (theme: ThemeContextType, disabled = false) =>
  StyleSheet.create({
    baseStyle: {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    baseTextStyle: {
      fontFamily: "Inter-SemiBold",
      fontWeight: "600",
    },
    smallButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      minHeight: 32,
    },
    mediumButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      minHeight: 40,
    },
    largeButton: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      minHeight: 48,
    },
    primaryStyle: {
      backgroundColor: disabled ? theme.colors.border : theme.colors.primary,
    },
    secondaryStyle: {
      backgroundColor: disabled ? theme.colors.border : theme.colors.surface,
      borderWidth: 1,
      borderColor: disabled ? theme.colors.border : theme.colors.border,
    },
    outlineStyle: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: disabled ? theme.colors.border : theme.colors.primary,
    },
    ghostStyle: {
      backgroundColor: "transparent",
    },
    smallText: {
      fontSize: 14,
    },
    mediumText: {
      fontSize: 16,
    },
    largeText: {
      fontSize: 18,
    },
    primaryTextStyles: {
      color: disabled ? theme.colors.textSecondary : "#FFFFFF",
    },
    secondaryTextStyles: {
      color: disabled ? theme.colors.textSecondary : theme.colors.text,
    },
    outlineTextStyles: {
      color: disabled ? theme.colors.textSecondary : theme.colors.primary,
    },
    ghostTextStyles: {
      color: disabled ? theme.colors.textSecondary : theme.colors.primary,
    },
  });
