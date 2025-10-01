"use client";

import type React from "react";
import {
  View,
  Image,
  type ImageStyle,
  type ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { BodyText } from "./Typography";
import { createAvatarStyles } from "../../styles/atoms/Avatar.styles";

interface AvatarProps {
  source?: ImageSourcePropType;
  size?: number;
  initials?: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 48,
  initials,
  style,
  containerStyle,
}) => {
  const theme = useTheme();
  const styles = createAvatarStyles(theme, size);

  if (source) {
    return (
      <Image source={source} style={[{ ...styles.imageBaseStyle }, style]} />
    );
  }

  return (
    <View style={[{ ...styles.containerStyle }, containerStyle]}>
      <BodyText style={{ color: "white", fontSize: size * 0.4 }}>
        {initials}
      </BodyText>
    </View>
  );
};
