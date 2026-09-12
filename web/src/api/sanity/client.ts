const PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lcbbbb1a";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = "2024-01-01";

// ponytail: native fetch; swap for @sanity/client if you need live preview / CDN
export async function sanityFetch<T>(query: string): Promise<T | null> {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.result ?? null) as T;
  } catch {
    return null;
  }
}
