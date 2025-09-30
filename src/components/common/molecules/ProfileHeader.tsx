import type React from "react";
import { ImageSourcePropType, View } from "react-native";
import { Avatar } from "../atoms/Avatar";
import { StatusDot } from "../atoms/StatusDot";
import { BodyText, Caption } from "../atoms/Typography";

interface ProfileHeaderProps {
  name: string;
  subtitle?: string;
  avatarSource?: ImageSourcePropType;
  status?: "online" | "offline" | "busy";
  showStatus?: boolean;
  size?: "small" | "medium" | "large";
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  subtitle,
  avatarSource,
  status = "offline",
  showStatus = true,
  size = "medium",
}) => {
  const getAvatarSize = () => {
    switch (size) {
      case "small":
        return 32;
      case "large":
        return 64;
      case "medium":
      default:
        return 48;
    }
  };

  const avatarSize = getAvatarSize();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
      }}
    >
      <View style={{ position: "relative" }}>
        <Avatar
          source={avatarSource}
          size={avatarSize}
          initials={name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        />
        {showStatus && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: 8,
              padding: 2,
              zIndex: 10,
            }}
          >
            <StatusDot status={status} size={12} />
          </View>
        )}
      </View>

      <View style={{}}>
        <BodyText style={{ fontWeight: "600" }}>{name}</BodyText>
        {subtitle && <Caption>{subtitle}</Caption>}
      </View>
    </View>
  );
};
