import type React from "react"
import { View } from "react-native"

interface StatusDotProps {
  status: "online" | "offline" | "busy"
  size?: number
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, size = 12 }) => {
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "#10B981"
      case "busy":
        return "#F59E0B"
      case "offline":
      default:
        return "#6B7280"
    }
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: getStatusColor(),
      }}
    />
  )
}
