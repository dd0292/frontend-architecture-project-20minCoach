import type { Coach } from "../models/Coach";

export const searchCoaches = (
  coaches: Coach[],
  query: string,
  tags: string[],
): Coach[] => {
  if (!query && tags.length === 0) {
    return coaches;
  }

  return coaches.filter((coach) => {
    const matchesQuery =
      !query ||
      coach.name.toLowerCase().includes(query.toLowerCase()) ||
      coach.title.toLowerCase().includes(query.toLowerCase()) ||
      coach.specialization.some((spec) =>
        spec.toLowerCase().includes(query.toLowerCase()),
      ) ||
      coach.bio.toLowerCase().includes(query.toLowerCase());

    const matchesTags =
      tags.length === 0 ||
      tags.some(
        (tag) =>
          coach.tags.some((coachTag) =>
            coachTag.toLowerCase().includes(tag.toLowerCase()),
          ) ||
          coach.specialization.some((spec) =>
            spec.toLowerCase().includes(tag.toLowerCase()),
          ),
      );

    return matchesQuery && matchesTags;
  });
};

export const getAvailableCoaches = (coaches: Coach[]): Coach[] => {
  return coaches.filter((coach) => coach.isAvailable);
};

export const sortCoachesByRating = (coaches: Coach[]): Coach[] => {
  return [...coaches].sort((a, b) => b.rating - a.rating);
};
