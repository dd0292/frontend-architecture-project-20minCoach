"use client";

import type React from "react";
import { Text, type TextStyle } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { createTypographyStyles } from "../../styles/atoms/Typography.styles";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "small";
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  color,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTypographyStyles(theme);

  const getVariantStyle = () => {
    switch (variant) {
      case "h1":
        return { ...styles.h1 };
      case "h2":
        return { ...styles.h2 };
      case "h3":
        return { ...styles.h3 };
      case "body":
        return { ...styles.body };
      case "caption":
        return { ...styles.caption };
      case "small":
        return { ...styles.small };
      default:
        return { ...styles.default };
    }
  };

  const defaultColor =
    variant === "caption" || variant === "small"
      ? theme.colors.textSecondary
      : theme.colors.text;

  return (
    <Text
      style={[
        getVariantStyle(),
        {
          color: color || defaultColor,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// Keep individual exports for backward compatibility
export const Heading1: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTypographyStyles(theme);

  return (
    <Text style={[{ ...styles.Heading1 }, style]} {...props}>
      {children}
    </Text>
  );
};

export const Heading2: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTypographyStyles(theme);

  return (
    <Text style={[{ ...styles.Heading2 }, style]} {...props}>
      {children}
    </Text>
  );
};

export const Heading3: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTypographyStyles(theme);
  return (
    <Text style={[{ ...styles.Heading3 }, style]} {...props}>
      {children}
    </Text>
  );
};

export const BodyText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTypographyStyles(theme);
  return (
    <Text style={[{ ...styles.BodyText }, style]} {...props}>
      {children}
    </Text>
  );
};

export const Caption: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTypographyStyles(theme);
  return (
    <Text style={[{ ...styles.Caption }, style]} {...props}>
      {children}
    </Text>
  );
};

export const SmallText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTypographyStyles(theme);
  return (
    <Text style={[{ ...styles.SmallText }, style]} {...props}>
      {children}
    </Text>
  );
};
