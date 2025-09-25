"use client"

import type React from "react"
import { View, TouchableOpacity } from "react-native"
import { useTheme } from "../../../contexts/ThemeContext"
import { ProfileHeader } from "../molecules/ProfileHeader"
import { RatingDisplay } from "../molecules/RatingDisplay"
import { TagChip } from "../molecules/TagChip"
import { BodyText, Caption } from "../atoms/Typography"
import { Icon } from "../atoms/Icon"
import type { Coach } from "../../../models/Coach"

interface CoachCardProps {
  coach: Coach
  onPress?: () => void
  onFavoritePress?: () => void
  isFavorite?: boolean
}

export const CoachCard: React.FC<CoachCardProps> = ({ coach, onPress, onFavoritePress, isFavorite = false}) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}
      >
        <ProfileHeader
          name={coach.name}
          subtitle={`$${coach.hourlyRate}/hr`}
          avatarSource={coach.profilePicture ? { uri: coach.profilePicture } : undefined}
          status={coach.isAvailable ? "online" : "offline" }
          size="medium"
        />

        <TouchableOpacity onPress={onFavoritePress}>
          <Icon
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? colors.accent : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 12 }}>
        <RatingDisplay rating={coach.rating} reviewCount={coach.reviewCount} size="small" />
      </View>

      {coach.bio && (
        <BodyText style={{ marginBottom: 12 }} numberOfLines={2}>
          {coach.bio}
        </BodyText>
      )}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {coach.tags.slice(0, 3).map((tag: string, index: React.Key | null | undefined) => (
          <TagChip key={index} label={tag} variant="default" />
        ))}
        {coach.tags.length > 3 && <Caption>+{coach.tags.length - 3} more</Caption>}
      </View>
    </TouchableOpacity>
  )
}
