import type { Metadata } from "next";

export const SITE_URL = "https://portfolio.reactiveferdous.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export type PageSeo = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

function normalizePath(path: string) {
  return path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageSeo): Metadata {
  const canonicalUrl = `${SITE_URL}${normalizePath(path)}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ferdous Ahmed",
      type: "website",
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function absoluteUrl(src: string | undefined) {
  if (!src) return undefined;
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}
