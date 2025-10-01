"use client";

import type React from "react";
import { View, TouchableOpacity, type TextInputProps } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { Input } from "../atoms/Input";
import { Icon } from "../atoms/Icon";
import { useState } from "react";
import { createMoleculesStyles } from "../../styles/molecules/Molecules.styles";

interface SearchBarProps extends TextInputProps {
  onMicPress?: () => void;
  showMicButton?: boolean;
  multiline?: boolean;
  maxLines?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onMicPress,
  showMicButton = true,
  multiline = true,
  ...inputProps
}) => {
  const theme = useTheme();
  const styles = createMoleculesStyles(showMicButton, multiline);
  const [bio, setBio] = useState("");
  const [, setHeight] = useState(multiline ? 80 : 48);

  const handleContentSizeChange = (event: any) => {
    if (multiline) {
      const newHeight = Math.max(0, event.nativeEvent.contentSize.height);
      setHeight(Math.max(80, newHeight));
    }
  };

  return (
    <View style={{ position: "relative" }}>
      <Input
        {...inputProps}
        multiline={multiline}
        value={bio}
        onChangeText={setBio}
        onContentSizeChange={handleContentSizeChange}
        style={[{ ...styles.searchBarInput }, inputProps.style]}
      />

      {showMicButton && (
        <TouchableOpacity
          onPress={onMicPress}
          style={{ ...styles.searchBarIcon }}
        >
          <Icon name="mic" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
