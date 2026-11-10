import { createPageMetadata } from "@/lib/seo";
import FigmaDesign from "./FigmaDesignContent";

export const metadata = createPageMetadata({
  title: "Figma UI/UX Design | Ferdous",
  description:
    "Expert UI/UX design services in Figma. We create intuitive, highly-converting, and stunning user interfaces that maximize ROI for web and mobile applications.",
  path: "/services/figma-design",
});

export default function FigmaDesignPage() {
  return <FigmaDesign />;
}
