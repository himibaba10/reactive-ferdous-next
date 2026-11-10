/**
 * One-shot port: Vite public UI → Next.js src (components, ui, hooks, data).
 */
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("E:/ReactJS projects/reactive-ferdous/src");
const DEST = path.resolve("E:/ReactJS projects/reactive-ferdous-next/src");

const componentFiles = [
  "About.jsx",
  "AdditionalSkills.jsx",
  "AuditBanner.jsx",
  "Contact.jsx",
  "ContactForm.jsx",
  "ContactInfo.jsx",
  "ContactSocialIcons.jsx",
  "CookieConsent.jsx",
  "DesignGallery.jsx",
  "ExperienceCard.jsx",
  "FAQ.jsx",
  "FloatingWhatsApp.jsx",
  "Footer.jsx",
  "Framer.jsx",
  "Hero.jsx",
  "HeroImage.jsx",
  "HeroInfo.jsx",
  "HeroLeftImage.jsx",
  "HeroRightImage.jsx",
  "LeadBanner.jsx",
  "LogoSlider.jsx",
  "NavLinks.jsx",
  "Navbar.jsx",
  "Popup.jsx",
  "Portfolio.jsx",
  "Process.jsx",
  "ProjectImages.jsx",
  "Reviews.jsx",
  "ServiceCards.jsx",
  "ServiceHero.jsx",
  "Services.jsx",
  "SkillCard.jsx",
  "SkillCards.jsx",
  "Skills.jsx",
  "Stats.jsx",
];

const uiFiles = [
  "Blob.jsx",
  "ContactButton.jsx",
  "Hamburger.jsx",
  "Heading.jsx",
  "PrimaryButton.jsx",
];

const hookFiles = [
  "useNavbar.js",
  "useAboutSlider.js",
  "useContactForm.js",
  "useLogoSlider.js",
  "usePortfolio.js",
  "useReviews.js",
];

function needsClient(code) {
  return (
    /\buseState\b/.test(code) ||
    /\buseEffect\b/.test(code) ||
    /\buseRef\b/.test(code) ||
    /\buseForm\b/.test(code) ||
    /\busePathname\b/.test(code) ||
    /\buseRouter\b/.test(code) ||
    /from ['"]framer-motion['"]/.test(code) ||
    /from ['"]@formspree\/react['"]/.test(code) ||
    /\bmotion\./.test(code) ||
    /window\./.test(code) ||
    /document\./.test(code) ||
    /localStorage/.test(code) ||
    /useLocation/.test(code)
  );
}

function transform(code, destRel) {
  let out = code;

  out = out.replace(
    /import\s*{\s*Link\s*(?:,\s*([^}]+))?\s*}\s*from\s*['"]react-router-dom['"];?\n?/g,
    (_, rest) => {
      const extra = rest
        ? rest
            .replace(/useLocation/g, "")
            .replace(/useParams/g, "")
            .replace(/useNavigate/g, "")
            .replace(/,\s*,/g, ",")
            .replace(/^\s*,\s*|\s*,\s*$/g, "")
            .trim()
        : "";
      let lines = `import Link from 'next/link';\n`;
      if (rest?.includes("useLocation")) {
        lines += `import { usePathname } from 'next/navigation';\n`;
      }
      if (rest?.includes("useNavigate")) {
        lines += `import { useRouter } from 'next/navigation';\n`;
      }
      if (extra && !extra.includes("useLocation") && !extra.includes("useNavigate")) {
        lines += `// TODO: was react-router: ${extra}\n`;
      }
      return lines;
    }
  );

  out = out.replace(
    /import\s*{\s*([^}]*)\s*}\s*from\s*['"]react-router-dom['"];?\n?/g,
    (match, imports) => {
      if (match.includes("Link")) return match;
      let lines = "";
      if (imports.includes("Link")) lines += `import Link from 'next/link';\n`;
      if (imports.includes("useLocation"))
        lines += `import { usePathname } from 'next/navigation';\n`;
      if (imports.includes("useNavigate"))
        lines += `import { useRouter } from 'next/navigation';\n`;
      if (imports.includes("useParams"))
        lines += `import { useParams } from 'next/navigation';\n`;
      return lines || "";
    }
  );

  out = out.replace(/\bto=\{/g, "href={");
  out = out.replace(/\bto="/g, 'href="');
  out = out.replace(/\bto='/g, "href='");

  out = out.replace(
    /const\s*{\s*pathname\s*}\s*=\s*useLocation\(\)/g,
    "const pathname = usePathname()"
  );

  out = out.replace(/import\.meta\.env\.VITE_(\w+)/g, "process.env.NEXT_PUBLIC_$1");

  if (destRel.includes("hooks/usePortfolio") || destRel.includes("hooks/useReviews") || destRel.includes("hooks/useLogoSlider")) {
    out = out.replace(
      /import\s*{\s*listDocuments\s*}\s*from\s*['"][^'"]+firestoreRest['"];?\n?/,
      ""
    );
  }

  if (destRel.includes("hooks/usePortfolio.js")) {
    out = out.replace(
      /const rawData = await listDocuments\('projects'\);/,
      `const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const rawData = await res.json();`
    );
  }
  if (destRel.includes("hooks/useReviews.js")) {
    out = out.replace(
      /const data = await listDocuments\('reviews'\);/,
      `const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();`
    );
  }
  if (destRel.includes("hooks/useLogoSlider.js")) {
    out = out.replace(
      /const data = await listDocuments\('logos'\);/,
      `const res = await fetch('/api/logos');
        if (!res.ok) throw new Error('Failed to fetch logos');
        const data = await res.json();`
    );
  }

  out = out.replace(/\.jsx/g, "");
  out = out.replace(/\.js(['"])/g, "$1");

  if (needsClient(out) && !out.startsWith("'use client'")) {
    out = `'use client';\n\n${out}`;
  }

  return out;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function portFile(relSrc, destSubdir, newName) {
  const srcPath = path.join(SRC, relSrc);
  const destPath = path.join(DEST, destSubdir, newName);
  ensureDir(path.dirname(destPath));
  const raw = fs.readFileSync(srcPath, "utf8");
  const transformed = transform(raw, path.join(destSubdir, newName));
  fs.writeFileSync(destPath, transformed, "utf8");
  console.log("ported", destPath);
}

for (const f of componentFiles) {
  portFile(`components/${f}`, "components", f.replace(".jsx", ".tsx"));
}

for (const f of uiFiles) {
  portFile(`ui/${f}`, "ui", f.replace(".jsx", ".tsx"));
}

for (const f of hookFiles) {
  portFile(`hooks/${f}`, "hooks", f.replace(".js", ".ts"));
}

// caseStudies
const csRaw = fs.readFileSync(path.join(SRC, "data/caseStudies.js"), "utf8");
const csTs = csRaw
  .replace(/^export const caseStudies = /, "export type CaseStudy = Record<string, unknown>;\n\nexport const caseStudies: CaseStudy[] = ")
  .replace(/\.js/g, "");
ensureDir(path.join(DEST, "data"));
fs.writeFileSync(path.join(DEST, "data/caseStudies.ts"), csTs, "utf8");
console.log("ported caseStudies.ts");

// analytics util for site layout
const analyticsRaw = fs.readFileSync(path.join(SRC, "utils/analytics.js"), "utf8");
ensureDir(path.join(DEST, "utils"));
fs.writeFileSync(
  path.join(DEST, "utils/analytics.ts"),
  analyticsRaw.replace(/\.js/g, ""),
  "utf8"
);
console.log("ported analytics.ts");
