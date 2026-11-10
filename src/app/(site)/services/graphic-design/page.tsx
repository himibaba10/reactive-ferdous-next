import { createPageMetadata } from "@/lib/seo";
import GraphicDesign from "./GraphicDesignContent";

export const metadata = createPageMetadata({
  title: "Graphic Design | Branding & Visual Identity | Ferdous",
  description:
    "Professional graphic design services including corporate branding, marketing materials, social media assets, and complete visual identity systems.",
  path: "/services/graphic-design",
});

export default function GraphicDesignPage() {
  return <GraphicDesign />;
}
