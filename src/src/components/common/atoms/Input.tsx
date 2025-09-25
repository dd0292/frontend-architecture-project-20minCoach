"use client"

import type React from "react"
import { TextInput, type TextInputProps, type ViewStyle } from "react-native"
import { useTheme } from "../../../contexts/ThemeContext"

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle
}

export const Input: React.FC<InputProps> = ({ style, containerStyle, ...props }) => {
  const { colors } = useTheme()

  return (
    <TextInput
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: colors.text,
          minHeight: 48,
        },
        style,
      ]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  )
}
