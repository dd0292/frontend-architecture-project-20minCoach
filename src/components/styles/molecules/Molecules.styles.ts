import { StyleSheet } from "react-native";

export const createMoleculesStyles = (showMicButton = true, multiline = true) =>
  StyleSheet.create({
    profileHeaderBaseStyle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    profileHeaderShowStatus: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "white",
      borderRadius: 8,
      padding: 2,
      zIndex: 10,
    },
    searchBarInput: {
      paddingLeft: 48,
      paddingRight: showMicButton ? 48 : 16,
      ...(multiline && {
        textAlignVertical: "center",
        paddingTop: 12,
      }),
    },
    searchBarIcon: {
      position: "absolute",
      right: 16,
      top: multiline ? 12 : 12,
      justifyContent: "center",
      alignItems: "center",
    },
    tagChipBaseStyle: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      gap: 9,
    },
  });
