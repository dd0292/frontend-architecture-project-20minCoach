"use client";

import type React from "react";
import {
  TouchableOpacity,
  Text,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { useTheme } from "../../styles/ThemeContext";

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
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    };

    // Size styles
    const sizeStyles = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minHeight: 32,
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        minHeight: 40,
      },
      large: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        minHeight: 48,
      },
    };

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: disabled ? colors.border : colors.primary,
      },
      secondary: {
        backgroundColor: disabled ? colors.border : colors.surface,
        borderWidth: 1,
        borderColor: disabled ? colors.border : colors.border,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: disabled ? colors.border : colors.primary,
      },
      ghost: {
        backgroundColor: "transparent",
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontFamily: "Inter-SemiBold",
      fontWeight: "600",
    };

    // Size text styles
    const sizeTextStyles = {
      small: {
        fontSize: 14,
      },
      medium: {
        fontSize: 16,
      },
      large: {
        fontSize: 18,
      },
    };

    // Variant text styles
    const variantTextStyles = {
      primary: {
        color: disabled ? colors.textSecondary : "#FFFFFF",
      },
      secondary: {
        color: disabled ? colors.textSecondary : colors.text,
      },
      outline: {
        color: disabled ? colors.textSecondary : colors.primary,
      },
      ghost: {
        color: disabled ? colors.textSecondary : colors.primary,
      },
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
