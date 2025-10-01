import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createTypographyStyles = (theme: ThemeContextType) =>
  StyleSheet.create({
    h1: {
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 16,
    },
    default: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
    },
    Heading1: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.colors.text,
      lineHeight: 40,
    },
    Heading2: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.colors.text,
      lineHeight: 32,
    },
    Heading3: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.colors.text,
      lineHeight: 28,
    },
    BodyText: {
      fontSize: 16,
      fontWeight: "400",
      color: theme.colors.text,
      lineHeight: 24,
    },
    Caption: {
      fontSize: 14,
      fontWeight: "400",
      color: theme.colors.textSecondary,
      lineHeight: 20,
    },
    SmallText: {
      fontSize: 12,
      fontWeight: "400",
      color: theme.colors.textSecondary,
      lineHeight: 16,
    },
  });
