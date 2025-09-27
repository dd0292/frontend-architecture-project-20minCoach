"use client"

import type React from "react"
import { View, TouchableOpacity, type TextInputProps } from "react-native"
import { useTheme } from "../../styles/ThemeContext"
import { Input } from "../atoms/Input"
import { Icon } from "../atoms/Icon"
import { useState } from 'react'

interface SearchBarProps extends TextInputProps {
  onMicPress?: () => void
  showMicButton?: boolean
  multiline?: boolean
  maxLines?: number
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onMicPress, 
  showMicButton = true, 
  multiline = true,
  maxLines = 4,
  ...inputProps 
}) => {
  const { colors } = useTheme()
  const [bio, setBio] = useState('');
  const [height, setHeight] = useState(multiline ? 80 : 48)

  const handleContentSizeChange = (event: any) => {
    if (multiline) {
      const newHeight = Math.max(0, event.nativeEvent.contentSize.height)
      setHeight(Math.max(80, newHeight))
    }
  }

  return (
    <View style={{ position: "relative"}}>
      <Input
        {...inputProps}
        multiline={multiline}
        value={bio}
        onChangeText={setBio}
        onContentSizeChange={handleContentSizeChange}
        style={[
          {
            paddingLeft: 48,
            paddingRight: showMicButton ? 48 : 16,
            ...(multiline && {
              textAlignVertical: "center",
              paddingTop: 12,
            }),
          },
          inputProps.style,
        ]}
      />

      {showMicButton && (
        <TouchableOpacity
          onPress={onMicPress}
          style={{
            position: "absolute",
            right: 16,
            top: multiline ? 12 : 12,
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