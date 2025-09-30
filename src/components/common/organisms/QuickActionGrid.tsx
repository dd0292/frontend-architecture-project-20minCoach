"use client";

import type React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { BodyText } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { Ionicons } from "@expo/vector-icons";
import { createQAGtyles } from "../../styles/organisms/QuickActionGrid.styles";

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
}

interface QuickActionGridProps {
  actions: QuickAction[];
  columns?: number;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({
  actions,
  columns = 2,
}) => {
  const theme = useTheme();
  const styles = createQAGtyles(theme, columns);

  return (
    <View style={{ ...styles.generalView }}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          style={{ ...styles.touchable }}
        >
          <Icon
            name={action.icon as keyof typeof Ionicons.glyphMap}
            size={32}
            color={action.color || theme.colors.primary}
          />
          <BodyText style={{ ...styles.bodyText }}>{action.title}</BodyText>
        </TouchableOpacity>
      ))}
    </View>
  );
};
