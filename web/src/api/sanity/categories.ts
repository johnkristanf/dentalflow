import type { SanityServiceCategory } from "@/types/dental-types";

import { sanityFetch } from "./client";

export function getServiceCategories(): Promise<SanityServiceCategory[]> {
  return sanityFetch<SanityServiceCategory[]>(`
    *[_type == "serviceCategory"] | order(order asc, _createdAt asc) {
      _id,
      name,
      "slug": slug.current,
      icon,
      description,
      "services": *[_type == "service" && references(^._id)] | order(order asc, _createdAt asc) {
        _id,
        name,
        tagline,
        highlight,
        procedures
      }
    }
  `);
}
