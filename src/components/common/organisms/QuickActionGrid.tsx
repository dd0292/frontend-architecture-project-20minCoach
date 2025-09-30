"use client";

import type React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { BodyText } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { Ionicons } from "@expo/vector-icons";

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
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          style={{
            flex: 1,
            minWidth: `${100 / columns - 2}%`,
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Icon
            name={action.icon as keyof typeof Ionicons.glyphMap}
            size={32}
            color={action.color || colors.primary}
          />
          <BodyText
            style={{
              marginTop: 8,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {action.title}
          </BodyText>
        </TouchableOpacity>
      ))}
    </View>
  );
};
