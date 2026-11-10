import { cacheLife } from "next/cache";
import { createPageMetadata } from "@/lib/seo";
import Privacy from "./PrivacyPageContent";

export const metadata = createPageMetadata({
  title: "Privacy & Cookies | Ferdous Ahmed",
  description:
    "How this site handles your data: what we collect, the cookies we set, who processes it, and your rights. Analytics only runs if you accept.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  "use cache";
  cacheLife("max");
  return <Privacy />;
}
