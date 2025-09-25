"use client"

import type React from "react"
import { View, TouchableOpacity, type TextInputProps } from "react-native"
import { useTheme } from "../../../contexts/ThemeContext"
import { Input } from "../atoms/Input"
import { Icon } from "../atoms/Icon"

interface SearchBarProps extends TextInputProps {
  onMicPress?: () => void
  showMicButton?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({ onMicPress, showMicButton = true, ...inputProps }) => {
  const { colors } = useTheme()

  return (
    <View style={{ position: "relative" }}>
      <Input
        {...inputProps}
        style={[
          {
            paddingLeft: 48,
            paddingRight: showMicButton ? 48 : 16,
          },
          inputProps.style,
        ]}
      />

      <View
        style={{
          position: "absolute",
          left: 16,
          top: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="search" size={20} color={colors.textSecondary} />
      </View>

      {showMicButton && (
        <TouchableOpacity
          onPress={onMicPress}
          style={{
            position: "absolute",
            right: 16,
            top: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="mic" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  )
}
