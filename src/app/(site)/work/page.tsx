import { createPageMetadata } from "@/lib/seo";
import Work from "./WorkPageContent";

export const metadata = createPageMetadata({
  title: "Case Studies | Web Development, WordPress & WooCommerce | Ferdous",
  description:
    "Detailed case studies of web development work: the problem, the approach and the results. Includes a WooCommerce rebuild that took load time from 6 seconds to under 1.",
  path: "/work",
});

export default function WorkPage() {
  return <Work />;
}
