import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("E:/ReactJS projects/reactive-ferdous/src/pages");
const map = {
  "WebDevelopment.jsx": "web-development/WebDevelopmentContent.tsx",
  "GraphicDesign.jsx": "graphic-design/GraphicDesignContent.tsx",
  "FigmaDesign.jsx": "figma-design/FigmaDesignContent.tsx",
  "LogoDesign.jsx": "logo-design/LogoDesignContent.tsx",
  "Work.jsx": "work/WorkPageContent.tsx",
  "Privacy.jsx": "privacy/PrivacyPageContent.tsx",
};

const outDir = path.resolve(
  "E:/ReactJS projects/reactive-ferdous-next/src/app/(site)"
);

for (const [srcName, destRel] of Object.entries(map)) {
  let code = fs.readFileSync(path.join(SRC, srcName), "utf8");

  code = code.replace(/import SEO[^;]+;\n/, "");
  code = code.replace(/<SEO[^/]+\/>\s*/g, "");
  code = code.replace(
    /import\s*{\s*Link\s*}\s*from\s*['"]react-router-dom['"];?\n?/g,
    "import Link from 'next/link';\n"
  );
  code = code.replace(
    /import\s*{\s*Link,\s*useParams\s*}\s*from\s*['"]react-router-dom['"];?\n?/g,
    "import Link from 'next/link';\n"
  );
  code = code.replace(/\bto=/g, "href=");

  if (!code.startsWith("'use client'")) {
    code = `'use client';\n\n${code}`;
  }

  code = code.replace(/export default (\w+);/, "export default $1;");

  const dest = path.join(outDir, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, code);
  console.log("wrote", dest);
}
