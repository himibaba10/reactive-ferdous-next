import type { Metadata } from "next";

export const SITE_URL = "https://portfolio.reactiveferdous.com";
export const SITE_HOST = "portfolio.reactiveferdous.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SITE_NAME = "Ferdous Ahmed";
export const SITE_DESCRIPTION =
  "We partner with businesses to deliver digital solutions that solve real problems. Specializing in Web Development, Graphic Design, and Figma Design.";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/ferdoushimel10",
  "https://www.linkedin.com/in/ferdous-ahmed-6535b0202/",
  "https://t.me/himibaba10",
  "https://www.fiverr.com/ferdoushimel",
  "https://wa.me/8801997722621",
] as const;

export type PageSeo = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  /** Open Graph type — case studies / posts should use `article`. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Paths without trailing slash (matches Next.js default routing).
 * `/` → `` (so URL is exactly SITE_URL), `/work/` → `/work`
 */
export function normalizePath(path: string) {
  if (!path || path === "/") return "";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function pageUrl(path: string = "/") {
  return `${SITE_URL}${normalizePath(path)}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  const canonicalUrl = pageUrl(path);
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [{ url: ogImage, alt: title }],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: [SITE_NAME],
          }
        : {}),
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

/** Sitewide @graph for the homepage (WebSite + Person + ProfessionalService). */
export function buildHomeJsonLd() {
  const websiteId = `${SITE_URL}/#website`;
  const personId = `${SITE_URL}/#person`;
  const businessId = `${SITE_URL}/#business`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        url: SITE_URL,
        image: DEFAULT_OG_IMAGE,
        jobTitle: "Web Developer & Designer",
        description: SITE_DESCRIPTION,
        sameAs: [...SOCIAL_PROFILES],
        worksFor: { "@id": businessId },
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: "Reactive Ferdous",
        url: SITE_URL,
        image: DEFAULT_OG_IMAGE,
        description: SITE_DESCRIPTION,
        founder: { "@id": personId },
        areaServed: "Worldwide",
        priceRange: "$$",
        serviceType: [
          "Web Development",
          "WordPress Development",
          "Graphic Design",
          "Figma UI/UX Design",
          "Logo Design",
        ],
        sameAs: [...SOCIAL_PROFILES],
      },
    ],
  };
}
