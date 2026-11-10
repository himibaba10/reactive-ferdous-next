import type { Metadata } from "next";
import CaseStudyArticle, {
  CaseStudyNotFound,
  type CaseStudyData,
} from "@/components/CaseStudyArticle";
import JsonLd from "@/components/JsonLd";
import { caseStudies } from "@/data/caseStudies";
import { absoluteUrl, createPageMetadata, pageUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

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
    type: "article",
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

  const canonical = pageUrl(`/work/${study.slug}`);
  const ogImage = absoluteUrl(study.ogImage || study.heroImage?.src);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title ?? study.h1,
    name: study.h1,
    description: study.metaDescription,
    url: canonical,
    image: ogImage,
    about: study.service?.label,
    keywords: study.stack?.join(", "),
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: pageUrl("/work"),
      },
      { "@type": "ListItem", position: 3, name: study.h1, item: canonical },
    ],
  };

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumbs} />
      <CaseStudyArticle study={study} />
    </>
  );
}
