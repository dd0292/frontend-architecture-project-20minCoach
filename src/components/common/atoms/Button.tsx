"use client";

import type React from "react";
import {
  TouchableOpacity,
  Text,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { createButtonStyles } from "../../styles/atoms/Button.styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const styles = createButtonStyles(theme, disabled);

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = { ...styles.baseStyle };

    // Size styles
    const sizeStyles = {
      small: { ...styles.smallButton },
      medium: { ...styles.mediumButton },
      large: { ...styles.largeButton },
    };

    // Variant styles
    const variantStyles = {
      primary: { ...styles.primaryStyle },
      secondary: { ...styles.secondaryStyle },
      outline: { ...styles.outlineStyle },
      ghost: { ...styles.ghostStyle },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = { ...styles.baseTextStyle };

    // Size text styles
    const sizeTextStyles = {
      small: { ...styles.smallText },
      medium: { ...styles.mediumText },
      large: { ...styles.largeText },
    };

    // Variant text styles
    const variantTextStyles = {
      primary: { ...styles.primaryTextStyles },
      secondary: { ...styles.secondaryTextStyles },
      outline: { ...styles.outlineTextStyles },
      ghost: { ...styles.ghostTextStyles },
    };

    return {
      ...baseTextStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
