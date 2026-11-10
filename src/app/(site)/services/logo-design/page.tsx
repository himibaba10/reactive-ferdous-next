import { createPageMetadata } from "@/lib/seo";
import LogoDesign from "./LogoDesignContent";

export const metadata = createPageMetadata({
  title: "Logo Design | Custom Brand Marks | Ferdous",
  description:
    "Custom logo design services focused on creating memorable, scalable, and timeless brand marks that define your business identity and drive ROI.",
  path: "/services/logo-design",
});

export default function LogoDesignPage() {
  return <LogoDesign />;
}
