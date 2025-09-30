"use client";

import type React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { ProfileHeader } from "../molecules/ProfileHeader";
import { RatingDisplay } from "../molecules/RatingDisplay";
import { TagChip } from "../molecules/TagChip";
import { BodyText, Caption } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import type { Coach } from "../../../models/Coach";
import { createCardStyles } from "../../styles/organisms/CoachCard.styles";

interface CoachCardProps {
  coach: Coach;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export const CoachCard: React.FC<CoachCardProps> = ({
  coach,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  const theme = useTheme();
  const styles = createCardStyles(theme);

  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.baseStyle }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <ProfileHeader
          name={coach.name}
          subtitle={`Experience: ${coach.experience}`}
          avatarSource={coach.profilePicture}
          status={coach.isAvailable ? "online" : "offline"}
          size="large"
        />

        <TouchableOpacity style={{ left: 40 }} onPress={onFavoritePress}>
          <Icon
            size={25}
            name={isFavorite ? "heart" : "heart-outline"}
            color={
              isFavorite ? theme.colors.accent : theme.colors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 12 }}>
        <RatingDisplay
          rating={coach.rating}
          reviewCount={coach.reviewCount}
          size="medium"
        />
      </View>

      {coach.bio && (
        <BodyText style={{ marginBottom: 12, fontSize: 14 }} numberOfLines={5}>
          {coach.bio}
        </BodyText>
      )}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {coach.tags
          .slice(0, 3)
          .map((tag: string, index: React.Key | null | undefined) => (
            <TagChip key={index} label={tag} variant="selected" />
          ))}
        {coach.tags.length > 3 && (
          <Caption>+{coach.tags.length - 3} more</Caption>
        )}
      </View>
    </TouchableOpacity>
  );
};
