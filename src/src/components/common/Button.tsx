import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from "react-native"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {

  const getButtonStyle = () => {
    const baseStyle: StyleProp<ViewStyle>[] = [styles.button]

    switch (variant) {
      case "primary":
        baseStyle.push(styles.primaryButton)
        break
      case "secondary":
        baseStyle.push(styles.secondaryButton)
        break
      case "outline":
        baseStyle.push(styles.outlineButton)
        break
    }

    if (disabled) {
      baseStyle.push(styles.disabledButton)
    }

    if (style) {
      baseStyle.push(style)
    }

    return baseStyle
  }

  const getTextStyle = () => {
    const baseStyle: StyleProp<TextStyle>[] = [styles.buttonText]

    switch (variant) {
      case "primary":
        baseStyle.push(styles.primaryButtonText)
        break
      case "secondary":
        baseStyle.push(styles.secondaryButtonText)
        break
      case "outline":
        baseStyle.push(styles.outlineButtonText)
        break
    }

    if (disabled) {
      baseStyle.push(styles.disabledButtonText)
    }

    if (textStyle) {
      baseStyle.push(textStyle)
    }

    return baseStyle
  }

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: "#1f2937",
  },
  secondaryButton: {
    backgroundColor: "#8b5cf6",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1f2937",
  },
  disabledButton: {
    backgroundColor: "#e5e7eb",
    borderColor: "#e5e7eb",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
  },
  secondaryButtonText: {
    color: "#ffffff",
  },
  outlineButtonText: {
    color: "#1f2937",
  },
  disabledButtonText: {
    color: "#9ca3af",
  },
})
