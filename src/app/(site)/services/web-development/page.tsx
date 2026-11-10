import { createPageMetadata } from "@/lib/seo";
import WebDevelopment from "./WebDevelopmentContent";

export const metadata = createPageMetadata({
  title: "Web Development | Custom Apps & WordPress | Ferdous",
  description:
    "We build lightning-fast, highly-converting custom web applications and lead-generation WordPress sites optimized for performance and SEO.",
  path: "/services/web-development",
});

export default function WebDevelopmentPage() {
  return <WebDevelopment />;
}
