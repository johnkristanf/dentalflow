import type { SanityClinic } from "@/types/dental-types";

import { sanityFetch } from "./client";

export function getClinic(): Promise<SanityClinic | null> {
  return sanityFetch<SanityClinic>(`*[_type == "clinic"][0] {
    ...,
    "photo": { "url": photo.asset->url, "alt": photo.alt }
  }`);
}
