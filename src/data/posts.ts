export type BlogSection = {
  heading: string;
  body: string[];
};

export type BlogPost = {
  slug: string;
  published: boolean;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string; // ISO date
  updatedAt?: string;
  readingTime: string;
  thumbnail: { src: string; alt: string };
  h1: string;
  intro: string[];
  sections: BlogSection[];
  cta?: { heading: string; body: string };
};

/**
 * Static blog posts for SEO. `published: true` gates sitemap + prerender.
 */
export const posts: BlogPost[] = [
  {
    slug: 'wordpress-speed-optimization-checklist',
    published: true,
    title: 'WordPress Speed Optimization Checklist (2026)',
    metaDescription:
      'A practical WordPress speed checklist: hosting, caching, images, plugins, and Core Web Vitals fixes that actually move the needle for business sites.',
    excerpt:
      'Slow WordPress sites lose leads. Use this checklist to cut load time without breaking the design or your admin workflow.',
    category: 'WordPress',
    tags: ['WordPress', 'Performance', 'Core Web Vitals'],
    publishedAt: '2026-10-15',
    readingTime: '8 min read',
    thumbnail: {
      src: '/blog/wordpress-speed-optimization.jpg',
      alt: 'Abstract illustration of website speed and performance metrics',
    },
    h1: 'WordPress Speed Optimization Checklist for Business Sites',
    intro: [
      'If your WordPress site takes more than three seconds to become usable, you are paying for it in bounce rate and lost enquiries. Speed is not a vanity metric — it is a conversion and SEO lever.',
      'This checklist is the same order of work we use on client rebuilds: fix the foundations first, then polish.',
    ],
    sections: [
      {
        heading: '1. Start with hosting and PHP',
        body: [
          'Shared hosting with overloaded neighbors will defeat every plugin tweak. Prefer managed WordPress or a VPS with enough RAM, current PHP (8.2+), and an object cache option (Redis/Memcached).',
          'Confirm your theme and critical plugins are compatible before upgrading PHP. A one-version bump often cuts TTFB more than a new “speed” plugin.',
        ],
      },
      {
        heading: '2. Cut plugin and page-builder bloat',
        body: [
          'Audit plugins quarterly. Remove anything unused, overlapping (two SEO plugins, three form tools), or loading scripts site-wide when you only need them on one page.',
          'If you run multiple page builders, consolidate. Competing builders are a common cause of 4–6 second loads on WooCommerce stores.',
        ],
      },
      {
        heading: '3. Images and media',
        body: [
          'Serve modern formats (WebP/AVIF), compress before upload, and set explicit width/height to avoid layout shift. Lazy-load below-the-fold media; keep the hero image eager with high fetch priority.',
          'Do not ship 4000px screenshots into a 600px column. Resize for the largest display size you actually use.',
        ],
      },
      {
        heading: '4. Caching and CDN',
        body: [
          'Use page caching for anonymous visitors, browser caching for static assets, and a CDN close to your audience. Purge caches deliberately after deploys so you are not debugging “ghost” CSS.',
          'For logged-in or cart users, exclude those routes from full-page cache so checkout stays correct.',
        ],
      },
      {
        heading: '5. Measure Core Web Vitals — then retest',
        body: [
          'Check LCP, INP, and CLS in PageSpeed Insights and Search Console. Fix the largest contentful paint element first (usually the hero image or a late webfont).',
          'Retest on mobile after each change. Desktop green scores with a red mobile LCP still hurt rankings and ads quality score.',
        ],
      },
    ],
    cta: {
      heading: 'Need a speed pass on your WordPress site?',
      body: 'We audit hosting, plugins, and front-end weight, then ship fixes that improve load time without a full redesign — unless you need one.',
    },
  },
  {
    slug: 'wordpress-vs-custom-website',
    published: true,
    title: 'WordPress vs Custom Website: Which Should You Choose?',
    metaDescription:
      'WordPress or a custom Next.js/React site? Compare cost, speed, SEO control, and maintenance so you pick the stack that fits your business goals.',
    excerpt:
      'Neither option is “always better.” Here is how we decide between WordPress and a custom build for client projects.',
    category: 'Web Development',
    tags: ['WordPress', 'Custom Development', 'Strategy'],
    publishedAt: '2026-10-22',
    readingTime: '7 min read',
    thumbnail: {
      src: '/blog/wordpress-vs-custom.jpg',
      alt: 'Abstract illustration comparing CMS blocks and custom development',
    },
    h1: 'WordPress vs Custom Website — How to Decide',
    intro: [
      'Clients often ask for “the fastest stack” or “whatever Google likes most.” The better question is: who will update the site, how often will content change, and what does success look like in 12 months?',
      'Here is the decision framework we use before recommending WordPress, a custom app, or a hybrid.',
    ],
    sections: [
      {
        heading: 'When WordPress is the right call',
        body: [
          'Marketing sites, blogs, and many brochure + lead-gen builds fit WordPress well. Non-technical teams can publish safely, and the plugin ecosystem covers forms, SEO fields, and booking embeds quickly.',
          'WooCommerce remains a strong choice for catalog commerce when you want admin control without inventing an entire order system.',
        ],
      },
      {
        heading: 'When a custom site wins',
        body: [
          'Choose custom (for example Next.js) when you need unusual workflows, multi-role dashboards, tight design systems, or performance budgets that page builders struggle to meet.',
          'Custom also pays off when the product is the website — SaaS marketing with interactive demos, memberships with complex entitlements, or integrations that fight WordPress’s request lifecycle.',
        ],
      },
      {
        heading: 'Cost and timeline reality',
        body: [
          'WordPress is often faster to launch for content sites. Custom usually costs more up front but can be cheaper long-term if you would otherwise duct-tape five plugins into a fragile stack.',
          'Budget for maintenance either way: updates, backups, and security are not optional.',
        ],
      },
      {
        heading: 'SEO is not locked to one stack',
        body: [
          'Google ranks pages, not frameworks. Clean URLs, fast LCP, solid internal links, and useful content matter more than “WordPress vs React.”',
          'Both stacks can score well. Both can fail if you ship bloated themes or skip metadata and sitemap hygiene.',
        ],
      },
    ],
    cta: {
      heading: 'Not sure which stack fits?',
      body: 'Book a short discovery call. We will map your content workflow and growth goals to a clear WordPress, custom, or hybrid recommendation.',
    },
  },
  {
    slug: 'seo-basics-for-small-business-websites',
    published: true,
    title: 'SEO Basics for Small Business Websites',
    metaDescription:
      'Practical on-page SEO for small businesses: titles, intent, local signals, technical hygiene, and content that earns rankings without shady tricks.',
    excerpt:
      'You do not need a 50-page SEO binder. These fundamentals compound if you apply them consistently.',
    category: 'SEO',
    tags: ['SEO', 'Small Business', 'Content'],
    publishedAt: '2026-11-01',
    readingTime: '6 min read',
    thumbnail: {
      src: '/blog/seo-for-small-business.jpg',
      alt: 'Abstract illustration of SEO growth chart and search',
    },
    h1: 'SEO Basics That Still Work for Small Business Sites',
    intro: [
      'Most small-business SEO problems are not exotic algorithm puzzles. They are missing pages for real search intent, thin service copy, slow mobile loads, and no clear path from Google to a contact action.',
      'Fix those first. Tools and “hacks” come later.',
    ],
    sections: [
      {
        heading: 'Match pages to search intent',
        body: [
          'Create one strong page per important service and location (if you are local). Do not stuff every keyword onto the homepage.',
          'Use titles and H1s that sound like how customers search: “WordPress developer for WooCommerce stores,” not “Welcome to our digital synergy hub.”',
        ],
      },
      {
        heading: 'On-page essentials',
        body: [
          'Unique title and meta description per URL, one H1, descriptive image alt text, and internal links between related services and proof pages (case studies, blog posts).',
          'Keep the primary CTA visible without turning the page into a pop-up maze.',
        ],
      },
      {
        heading: 'Technical hygiene',
        body: [
          'HTTPS everywhere, a working sitemap, robots that do not block important sections, and canonicals that match the URLs you actually serve.',
          'Mobile usability and Core Web Vitals are ranking and conversion factors. A beautiful desktop-only site underperforms.',
        ],
      },
      {
        heading: 'Content that earns trust',
        body: [
          'Publish useful answers: process explainers, checklists, and case studies with real outcomes. Consistency beats burst publishing.',
          'Avoid doorway pages and copied competitor fluff. Google is better at spotting hollow content every year.',
        ],
      },
    ],
    cta: {
      heading: 'Want an SEO-ready site structure?',
      body: 'We build and refine service pages, case studies, and blogs so your site supports both rankings and enquiries.',
    },
  },
  {
    slug: 'figma-to-wordpress-handoff',
    published: true,
    title: 'From Figma to WordPress: A Clean Handoff Guide',
    metaDescription:
      'How to hand off Figma UI/UX designs to WordPress without broken spacing, missing states, or endless revision loops. A checklist for designers and developers.',
    excerpt:
      'Great Figma files still fail in WordPress when spacing, components, and responsive rules are unclear. Here is a cleaner handoff.',
    category: 'Design',
    tags: ['Figma', 'WordPress', 'UI/UX'],
    publishedAt: '2026-11-05',
    readingTime: '7 min read',
    thumbnail: {
      src: '/blog/figma-to-wordpress.jpg',
      alt: 'Abstract illustration of UI wireframes and device mockups',
    },
    h1: 'From Figma to WordPress Without the Usual Chaos',
    intro: [
      'Most painful WordPress builds are not “bad developers” or “bad designers.” They are incomplete handoffs: missing mobile states, unclear type scales, and assets that were never exported for production.',
      'Use this guide whether you design in-house or work with an agency.',
    ],
    sections: [
      {
        heading: 'Design for the CMS you will ship',
        body: [
          'If the destination is WordPress, design with editable patterns in mind: reusable sections, sane content lengths, and components that map to blocks or a single page builder.',
          'Avoid one-off hero layouts on every page unless the budget includes custom templates.',
        ],
      },
      {
        heading: 'What the Figma file must include',
        body: [
          'Desktop and mobile frames, hover/active states for primary UI, a type and color style guide, and real (or realistic) copy — not “Lorem” that hides overflow bugs.',
          'Export icons as SVG and photos at the sizes the layout actually needs.',
        ],
      },
      {
        heading: 'Spacing and responsiveness rules',
        body: [
          'Document section padding, max content width, and how grids collapse. Developers should not guess whether 32px becomes 16px or 24px on mobile.',
          'Call out sticky headers, overlapping decorations, and z-index layers early — those are frequent WordPress theme footguns.',
        ],
      },
      {
        heading: 'Acceptance criteria before launch',
        body: [
          'Pixel-perfect is rarely the goal; consistent rhythm and accessible contrast are. Agree on a QA checklist: breakpoints, forms, and LCP image behavior.',
          'Schedule one design QA pass after development, not twenty fragmented comment threads.',
        ],
      },
    ],
    cta: {
      heading: 'Need design and WordPress under one roof?',
      body: 'We design in Figma and implement in WordPress (or Next.js) so the handoff stays inside one accountable team.',
    },
  },
  {
    slug: 'free-website-audit-checklist',
    published: true,
    title: 'Free Website Audit Checklist: What We Look For',
    metaDescription:
      'Use this website audit checklist to spot conversion leaks, speed issues, SEO gaps, and trust problems before you redesign or rebuild.',
    excerpt:
      'Before you rebuild everything, audit what is actually hurting enquiries. Here is the checklist behind our free website audits.',
    category: 'Strategy',
    tags: ['Audit', 'Conversion', 'UX'],
    publishedAt: '2026-11-08',
    readingTime: '5 min read',
    thumbnail: {
      src: '/blog/website-audit-checklist.jpg',
      alt: 'Abstract illustration of a website audit checklist and security shield',
    },
    h1: 'Website Audit Checklist (Speed, SEO, Trust, Conversion)',
    intro: [
      'A useful audit is not a 40-page PDF of generic Lighthouse screenshots. It is a prioritized list of issues that block leads — ranked by impact and effort.',
      'Steal this checklist for your own site, or use it to brief an agency.',
    ],
    sections: [
      {
        heading: 'Conversion and clarity',
        body: [
          'Can a first-time visitor tell what you do in five seconds? Is there one primary CTA above the fold? Are contact options obvious on mobile?',
          'Check form friction: too many fields, unclear errors, or WhatsApp/email links that fail on desktop.',
        ],
      },
      {
        heading: 'Performance and stability',
        body: [
          'Measure mobile LCP and INP on a mid-tier device throttle. Note oversized images, render-blocking fonts, and third-party scripts (chat, pixels, embeds).',
          'Look for layout shift from late banners, cookie bars, and unsized media.',
        ],
      },
      {
        heading: 'SEO and findability',
        body: [
          'Indexation (Search Console), title uniqueness, thin or duplicate service pages, broken internal links, and missing case-study/blog support for money keywords.',
          'Confirm canonicals and sitemap URLs match the live host you want ranked.',
        ],
      },
      {
        heading: 'Trust and maintenance',
        body: [
          'SSL, outdated plugins/themes, missing privacy policy, weak social proof placement, and broken portfolio images all erode trust.',
          'End with a fix order: quick wins this week, structural fixes next sprint, optional redesign only if the IA is the bottleneck.',
        ],
      },
    ],
    cta: {
      heading: 'Want us to run this on your site?',
      body: 'Request a free website audit — we will return prioritized findings you can act on, whether you work with us or not.',
    },
  },
];

export function getPublishedPosts(): BlogPost[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug && post.published);
}
