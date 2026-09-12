import type { SanityService } from "@/types/dental-types";

/**
 * Groups an array of services by their `category` field.
 * Services without a category are placed under "General".
 */
export function groupByCategory(
  services: SanityService[],
): Record<string, SanityService[]> {
  return services.reduce<Record<string, SanityService[]>>((acc, s) => {
    const cat = s.category ?? "General";
    (acc[cat] ??= []).push(s);
    return acc;
  }, {});
}
