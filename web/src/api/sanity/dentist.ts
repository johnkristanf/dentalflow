import type { SanityDentist } from "@/types/dental-types";

import { sanityFetch } from "./client";

export function getDentist(): Promise<SanityDentist | null> {
  return sanityFetch<SanityDentist>(`*[_type == "dentist"][0] {
    ...,
    "photo": select(defined(photo.asset) => { "url": photo.asset->url, "alt": photo.alt }, null)
  }`);
}
