"use client";

import type React from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { Heading3, Caption } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { createNavigationHeadertyles } from "../../styles/organisms/NavigationHeader.styles";

interface NavigationHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  showBackButton?: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  rightComponent,
  showBackButton = true,
}) => {
  const theme = useTheme();
  const styles = createNavigationHeadertyles(theme);

  return (
    <SafeAreaView style={{ ...styles.backGround }}>
      <View style={{ ...styles.basicStyle }}>
        <View style={{ ...styles.contentDisplay }}>
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
  );
};
