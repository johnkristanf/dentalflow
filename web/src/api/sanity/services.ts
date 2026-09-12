import type { SanityService } from "@/types/dental-types";

import { sanityFetch } from "./client";

export function getServices(): Promise<SanityService[] | null> {
  return sanityFetch<SanityService[]>(
    `*[_type == "service"] | order(order asc, _createdAt asc)`,
  );
}
