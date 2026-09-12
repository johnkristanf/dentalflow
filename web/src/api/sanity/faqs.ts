import type { SanityFaq } from "@/types/dental-types";

import { sanityFetch } from "./client";

export function getFaqs(): Promise<SanityFaq[] | null> {
  return sanityFetch<SanityFaq[]>(
    `*[_type == "faq"] | order(order asc, _createdAt asc)`,
  );
}
