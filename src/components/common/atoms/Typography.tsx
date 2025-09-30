"use client";

import type React from "react";
import { Text, type TextStyle } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

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
  const { colors } = useTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case "h1":
        return {
          fontSize: 32,
          fontWeight: "700" as const,
          lineHeight: 40,
        };
      case "h2":
        return {
          fontSize: 24,
          fontWeight: "600" as const,
          lineHeight: 32,
        };
      case "h3":
        return {
          fontSize: 20,
          fontWeight: "600" as const,
          lineHeight: 28,
        };
      case "body":
        return {
          fontSize: 16,
          fontWeight: "400" as const,
          lineHeight: 24,
        };
      case "caption":
        return {
          fontSize: 14,
          fontWeight: "400" as const,
          lineHeight: 20,
        };
      case "small":
        return {
          fontSize: 12,
          fontWeight: "400" as const,
          lineHeight: 16,
        };
      default:
        return {
          fontSize: 16,
          fontWeight: "400" as const,
          lineHeight: 24,
        };
    }
  };

  const defaultColor =
    variant === "caption" || variant === "small"
      ? colors.textSecondary
      : colors.text;

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
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: 32,
          fontWeight: "700",
          color: colors.text,
          lineHeight: 40,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Heading2: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: 24,
          fontWeight: "600",
          color: colors.text,
          lineHeight: 32,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Heading3: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: 20,
          fontWeight: "600",
          color: colors.text,
          lineHeight: 28,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const BodyText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: 16,
          fontWeight: "400",
          color: colors.text,
          lineHeight: 24,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const Caption: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: 14,
          fontWeight: "400",
          color: colors.textSecondary,
          lineHeight: 20,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const SmallText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: 12,
          fontWeight: "400",
          color: colors.textSecondary,
          lineHeight: 16,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
