import type { SanityReview } from "@/types/dental-types";

import { sanityFetch } from "./client";

export function getReviews(): Promise<SanityReview[] | null> {
  return sanityFetch<SanityReview[]>(
    `*[_type == "review" && (featured == true || !defined(featured))] | order(_createdAt desc)[0...6]`,
  );
}
