import type { Metadata } from "next";
import CaseStudyArticle, {
  CaseStudyNotFound,
  type CaseStudyData,
} from "@/components/CaseStudyArticle";
import { caseStudies } from "@/data/caseStudies";
import { absoluteUrl, createPageMetadata, SITE_URL } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies
    .filter((item) => (item as { published?: boolean }).published)
    .map((item) => ({ slug: (item as { slug: string }).slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find(
    (item) => (item as CaseStudyData).slug === slug && (item as CaseStudyData).published
  ) as CaseStudyData | undefined;

  if (!study) {
    return createPageMetadata({
      title: "Case Study Not Found | Ferdous Ahmed",
      description: "This case study does not exist or has not been published.",
      noindex: true,
    });
  }

  return createPageMetadata({
    title: study.title ?? study.h1 ?? "Case Study",
    description: study.metaDescription ?? study.summary ?? "",
    path: `/work/${study.slug}`,
    image: absoluteUrl(study.ogImage || study.heroImage?.src),
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find(
    (item) => (item as CaseStudyData).slug === slug && (item as CaseStudyData).published
  ) as CaseStudyData | undefined;

  if (!study) {
    return <CaseStudyNotFound />;
  }

  const canonical = `${SITE_URL}/work/${study.slug}/`;
  const ogImage = absoluteUrl(study.ogImage || study.heroImage?.src);

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.h1,
    headline: study.title,
    description: study.metaDescription,
    url: canonical,
    image: ogImage,
    about: study.service?.label,
    keywords: study.stack?.join(", "),
    author: { "@type": "Person", name: "Ferdous Ahmed", url: SITE_URL },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${SITE_URL}/work/`,
      },
      { "@type": "ListItem", position: 3, name: study.h1, item: canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <CaseStudyArticle study={study} />
    </>
  );
}
