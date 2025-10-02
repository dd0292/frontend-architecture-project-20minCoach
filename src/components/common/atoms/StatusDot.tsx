import type React from "react";
import { View } from "react-native";
import { createStatusDotStyles } from "../../styles/atoms/StatusDot.styles";

interface StatusDotProps {
  status: "online" | "offline" | "busy" | "true" | "false";
  size?: number;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, size = 12 }) => {
  const styles = createStatusDotStyles(size);

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "#10B981";
      case "busy":
        return "#F59E0B";
      case "true":
        return "#10B981";
      case "false":
        return "#F59E0B";
      case "offline":
      default:
        return "#6B7280";
    }
  };
  return (
    <View style={{ ...styles.baseStyle, backgroundColor: getStatusColor() }} />
  );
};
