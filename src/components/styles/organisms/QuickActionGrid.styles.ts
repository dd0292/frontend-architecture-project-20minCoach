import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createQAGtyles = (theme: ThemeContextType, columns: number) =>
  StyleSheet.create({
    generalView: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
    touchable: {
      flex: 1,
      minWidth: `${100 / columns - 2}%`,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    bodyText: {
      marginTop: 8,
      textAlign: "center",
      fontWeight: "600",
    },
  });
