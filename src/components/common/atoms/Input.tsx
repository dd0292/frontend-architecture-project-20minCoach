"use client";

import type React from "react";
import { TextInput, type TextInputProps, type ViewStyle } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { createInputStyles } from "../../styles/atoms/Input.styles";

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({ style, ...props }) => {
  const theme = useTheme();
  const styles = createInputStyles(theme);

  return (
    <TextInput
      style={[{ ...styles.baseStyle }, style]}
      placeholderTextColor={theme.colors.textSecondary}
      {...props}
    />
  );
};
