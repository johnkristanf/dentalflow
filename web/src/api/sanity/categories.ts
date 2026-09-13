import type { SanityServiceCategory } from "@/types/dental-types";

import { sanityFetch } from "./client";

export async function getServiceCategories(): Promise<SanityServiceCategory[]> {
  const data = await sanityFetch<SanityServiceCategory[]>(`
    *[_type == "serviceCategory"] | order(order asc, _createdAt asc) {
      _id,
      name,
      "slug": slug.current,
      icon,
      description,
      "services": *[_type == "service" && references(^._id)] | order(order asc, _createdAt asc) {
        _id,
        name,
        "slug": slug.current,
        tagline,
        highlight,
        symptoms,
        procedures
      }
    }
  `);
  return data ?? [];
}
