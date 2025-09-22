import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "text"
  size?: "small" | "medium" | "large"
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
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
  const getButtonStyle = () => {
    const baseStyle = [styles.button as ViewStyle, styles[size] as ViewStyle]
    if (disabled) baseStyle.push(styles.disabled)
    if (style) baseStyle.push(style)
    return baseStyle
  }

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${variant}Text`], styles[`${size}Text`] as TextStyle]
    if (disabled) baseStyle.push(styles.disabledText)
    if (textStyle) baseStyle.push(textStyle)
    return baseStyle
  }

  if (variant === "primary" && !disabled) {
    return (
      <TouchableOpacity onPress={onPress} style={getButtonStyle()} disabled={disabled}>
        <LinearGradient
          colors={["#4361EE", "#3A0CA3"]}
          style={[styles.gradient, styles[size]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={getTextStyle()}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onPress} style={getButtonStyle()} disabled={disabled}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 48,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    height: 56,
  },
  text: {
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  secondaryText: {
    color: "#4361EE",
    fontWeight: "600",
  },
  textText: {
    color: "#4361EE",
    fontWeight: "500",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#9CA3AF",
  },
})

export default Button
