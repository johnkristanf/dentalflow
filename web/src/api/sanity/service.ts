import type { SanityService, SanityServiceCategory } from "@/types/dental-types";

import { sanityFetch } from "./client";

/** Fetch a single service by slug with its parent category for context. */
export async function getServiceBySlug(
  slug: string,
): Promise<(SanityService & { categoryName?: string; categoryIcon?: string }) | null> {
  return sanityFetch<SanityService & { categoryName?: string; categoryIcon?: string }>(
    `*[_type == "service" && slug.current == "${slug}"][0] {
      _id,
      name,
      "slug": slug.current,
      tagline,
      highlight,
      symptoms,
      procedures,
      "categoryName": category->name,
      "categoryIcon": category->icon,
    }`,
  );
}

/** Collect all service slugs for static generation. */
export async function getAllServiceSlugs(): Promise<string[]> {
  const data = await sanityFetch<{ slug: string }[]>(
    `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`,
  );
  return (data ?? []).map((s) => s.slug);
}

/** Fetch clinic phone for the booking button on the detail page. */
export async function getServicePageCategories(): Promise<SanityServiceCategory[]> {
  const data = await sanityFetch<SanityServiceCategory[]>(
    `*[_type == "serviceCategory"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      icon,
      "services": *[_type == "service" && references(^._id)] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        tagline,
        highlight,
      }
    }`,
  );
  return data ?? [];
}
