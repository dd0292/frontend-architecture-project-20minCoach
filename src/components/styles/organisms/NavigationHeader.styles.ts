import { StyleSheet } from "react-native";
import { ThemeContextType } from "../ThemeContext";

export const createNavigationHeadertyles = (theme: ThemeContextType) =>
  StyleSheet.create({
    backGround: { backgroundColor: theme.colors.background },
    basicStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    contentDisplay: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
  });
