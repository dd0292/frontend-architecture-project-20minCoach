"use client";

import type React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { SmallText } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { createMoleculesStyles } from "../../styles/molecules/Molecules.styles";

interface TagChipProps {
  label: string;
  onRemove?: () => void;
  variant?: "default" | "selected" | "removable";
  onPress?: () => void;
  fontSize?: number;
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  onRemove,
  variant = "default",
  onPress,
  fontSize = 14,
}) => {
  const { colors } = useTheme();
  const styles = createMoleculesStyles();

  const getBackgroundColor = () => {
    switch (variant) {
      case "selected":
        return colors.primary;
      case "removable":
        return colors.accent;
      case "default":
      default:
        return colors.surface;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "selected":
      case "removable":
        return "white";
      case "default":
      default:
        return colors.text;
    }
  };

  const content = (
    <View
      style={{
        ...styles.tagChipBaseStyle,
        backgroundColor: getBackgroundColor(),
      }}
    >
      <SmallText style={{ color: getTextColor(), fontSize: fontSize }}>
        {label}
      </SmallText>
      {variant == "removable" && (
        <TouchableOpacity onPress={onRemove}>
          <Icon name="close" size={16} color={getTextColor()} />
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};
