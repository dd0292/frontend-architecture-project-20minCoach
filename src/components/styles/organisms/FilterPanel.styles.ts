import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createFilterPanelStyles = (theme: ThemeContextType) =>
  StyleSheet.create({
    panelDisplay: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    baseStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
    },
    Touchable: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 4,
    },
    body: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
  });
