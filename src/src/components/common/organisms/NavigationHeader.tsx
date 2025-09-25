"use client"

import type React from "react"
import { View, TouchableOpacity, SafeAreaView } from "react-native"
import { useTheme } from "../../../contexts/ThemeContext"
import { Heading3, Caption } from "../atoms/Typography"
import { Icon } from "../atoms/Icon"

interface NavigationHeaderProps {
  title: string
  subtitle?: string
  onBackPress?: () => void
  rightComponent?: React.ReactNode
  showBackButton?: boolean
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  rightComponent,
  showBackButton = true,
}) => {
  const { colors } = useTheme()

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {showBackButton && (
            <TouchableOpacity onPress={onBackPress} style={{ marginRight: 16 }}>
              <Icon name="arrow-back" size={24} />
            </TouchableOpacity>
          )}

          <View style={{ flex: 1 }}>
            <Heading3>{title}</Heading3>
            {subtitle && <Caption>{subtitle}</Caption>}
          </View>
        </View>

        {rightComponent && <View>{rightComponent}</View>}
      </View>
    </SafeAreaView>
  )
}
