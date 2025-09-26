"use client"

import type React from "react"
import { View, Image, type ImageStyle, type ViewStyle, ImageSourcePropType } from "react-native"
import { useTheme } from "../../../contexts/ThemeContext"
import { BodyText } from "./Typography"

interface AvatarProps {
  source?: ImageSourcePropType 
  size?: number
  initials?: string
  style?: ImageStyle
  containerStyle?: ViewStyle
}

export const Avatar: React.FC<AvatarProps> = ({ source, size = 48, initials, style, containerStyle }) => {
  const { colors } = useTheme()

  if (source) {
    return (
      <Image
        source={source}
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          style,
        ]}
      />
    )
  }

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <BodyText style={{ color: "white", fontSize: size * 0.4 }}>{initials}</BodyText>
    </View>
  )
}
