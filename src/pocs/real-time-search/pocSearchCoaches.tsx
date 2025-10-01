import type { Coach } from "../../models/Coach";

export const pocSearchCoaches = async (
  coaches: Coach[],
  query: string,
  tags: string[],
): Promise<Coach[]> => {
  if (!query && tags.length === 0) return coaches;

  // optional delay to simulate server latency
  await new Promise((res) => setTimeout(res, 200));

  const q = query.toLowerCase();
  const t = tags.map((tag) => tag.toLowerCase());

  return coaches.filter((coach) => {
    // precompute lowercased fields once
    const name = coach.name.toLowerCase();
    const title = coach.title.toLowerCase();
    const bio = coach.bio.toLowerCase();
    const specialization = coach.specialization.map((s) => s.toLowerCase());
    const coachTags = coach.tags.map((s) => s.toLowerCase());

    const matchesQuery =
      !q ||
      name.includes(q) ||
      title.includes(q) ||
      bio.includes(q) ||
      specialization.some((spec) => spec.includes(q));

    const matchesTags =
      t.length === 0 ||
      t.some((tag) => coachTags.includes(tag) || specialization.includes(tag));

    return matchesQuery && matchesTags;
  });
};
