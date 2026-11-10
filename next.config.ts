import type { NextConfig } from "next";

function hostFromUrl(value?: string): string | null {
  if (!value) return null;
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

const r2PublicHost = hostFromUrl(process.env.R2_PUBLIC_URL);
const cdnHost = hostFromUrl(
  process.env.NEXT_PUBLIC_CDN_URL || process.env.CDN_PUBLIC_URL
);

const remotePatterns: NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> = [
  { protocol: "https", hostname: "**.r2.dev" },
  { protocol: "https", hostname: "**.cloudflarestorage.com" },
  { protocol: "https", hostname: "res.cloudinary.com" },
  { protocol: "https", hostname: "**.cloudinary.com" },
];

for (const host of [r2PublicHost, cdnHost]) {
  if (host && !remotePatterns.some((p) => p.hostname === host)) {
    remotePatterns.push({ protocol: "https", hostname: host });
  }
}

const nextConfig: NextConfig = {
  // Match canonical URLs in src/lib/seo.ts (no trailing slash).
  trailingSlash: false,
  cacheComponents: true,
  // Avoid eager RSC prefetch storms for every in-viewport Link on mobile.
  partialPrefetching: false,
  images: {
    remotePatterns,
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
