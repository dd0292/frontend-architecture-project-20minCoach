import type React from "react";
import { View } from "react-native";
import { Icon } from "../atoms/Icon";
import { BodyText, SmallText } from "../atoms/Typography";

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: "small" | "medium" | "large";
  showReviewCount?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
  size = "medium",
  showReviewCount = true,
}) => {
  const getStarSize = () => {
    switch (size) {
      case "small":
        return 12;
      case "large":
        return 20;
      case "medium":
      default:
        return 16;
    }
  };

  const getTextComponent = () => {
    switch (size) {
      case "small":
        return SmallText;
      case "large":
        return BodyText;
      case "medium":
      default:
        return BodyText;
    }
  };

  const TextComponent = getTextComponent();
  const starSize = getStarSize();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Icon name="star" size={starSize} color="#F59E0B" />
      <TextComponent style={{ fontWeight: "600" }}>
        {rating.toFixed(1)}
      </TextComponent>
      {showReviewCount && reviewCount && (
        <TextComponent style={{ opacity: 0.7 }}>({reviewCount})</TextComponent>
      )}
    </View>
  );
};
