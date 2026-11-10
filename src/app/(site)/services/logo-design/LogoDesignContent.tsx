import Image from 'next/image';
import {
  MdOutlineDiamond,
  MdOutlineFontDownload,
  MdOutlinePets,
  MdOutlineViewInAr,
} from 'react-icons/md';
import DesignGallery from '@/components/DesignGallery';
import AuditBanner from '@/components/AuditBanner';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import ServiceCards from '@/components/ServiceCards';
import ServiceHero from '@/components/ServiceHero';

export default function LogoDesign() {
  const cards = [
    {
      title: 'Minimalist Logo',
      description:
        'Clean, modern, and uncluttered designs that look great on everything from favicons to billboards.',
      icon: <MdOutlineDiamond />,
    },
    {
      title: '3D Logo',
      description:
        'Eye-catching three-dimensional marks with depth, shadow, and stunning gradients.',
      icon: <MdOutlineViewInAr />,
    },
    {
      title: 'Mascot Logo',
      description:
        'Friendly and highly identifiable character-driven logos perfect for engaging communities and gaming brands.',
      icon: <MdOutlinePets />,
    },
    {
      title: 'Wordmark Logo',
      description:
        'Custom typography and lettermarks that make your brand name itself the unforgettable icon.',
      icon: <MdOutlineFontDownload />,
    },
  ];

  const logoFaqs = [
    {
      question: 'Why does a custom logo cost more than a template?',
      answer:
        "A professional logo isn't just a pretty graphic; it's a strategic business asset. Cheap templates won't differentiate you or build trust. A custom logo is thoroughly researched, unique to your business, and designed specifically to generate a measurable return on investment (ROI) by elevating your brand's perceived value in the market.",
    },
    {
      question: 'How does a new logo improve my business ROI?',
      answer:
        'A strong visual identity increases brand recognition, builds instant trust with prospects, and allows you to charge premium prices. Customers literally judge a book by its cover, and a premium logo ensures you pass that first critical impression, increasing your conversion rates.',
    },
    {
      question: 'What files will I receive?',
      answer:
        'You will receive a comprehensive logo package including vector files (SVG, AI, EPS) for infinite scalability without any quality loss, and raster files (PNG, JPG) optimized for immediate web, application, and social media use.',
    },
    {
      question: 'Do you offer complete branding guidelines?',
      answer:
        'Yes! A logo is just the beginning. We also offer comprehensive brand guidelines that define your typography, color palettes, and strict usage rules to keep your branding perfectly consistent across all digital and print platforms.',
    },
  ];

  return (
    <div>
      <ServiceHero
        title="Logos That Speak"
        highlightedText="Volumes"
        description="We create distinctive, memorable logos that capture the essence of your business and serve as the cornerstone of your brand identity."
      />

      <AuditBanner serviceName="Logo Design" />

      <section className="section max-w-6xl mx-auto mb-20 px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-10 text-center">
          Crafting Timeless Brands
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 w-full">
            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Instant Recognition</h3>
              <p className="text-zinc-400">
                Your logo is the face of your business. We design marks that are instantly
                recognizable, helping you capture attention faster in a crowded market and turning
                casual viewers into loyal customers.
              </p>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Built for Scale & ROI</h3>
              <p className="text-zinc-400">
                A professional brand identity isn&apos;t an expense; it&apos;s an investment. Premium
                branding allows you to command higher prices, build deeper trust, and ultimately
                drive a higher Return on Investment (ROI).
              </p>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Versatility Across Mediums</h3>
              <p className="text-zinc-400">
                Whether it&apos;s a massive billboard or a tiny mobile favicon, your logo will remain
                crisp, legible, and impactful. Every design is meticulously crafted in vector formats
                for perfect scalability.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <Image
              src="/images/logo-sketching.webp"
              alt="Logo Design Sketching Process"
              width={1200}
              height={500}
              className="w-full h-auto lg:h-[500px] object-cover rounded-2xl shadow-[0_0_40px_rgba(64,140,255,0.15)] border border-zinc-700/50"
            />
          </div>
        </div>
      </section>

      <section className="section max-w-6xl mx-auto mb-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Brand Transformations That Drive Revenue
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            See how a strategic logo redesign can completely alter the trajectory of a business,
            building instant credibility and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/logo-tech-rebrand.webp"
                alt="Tech Startup Rebrand"
                width={800}
                height={256}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
              <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                Tech Startup Rebrand
              </h3>
            </div>
            <div className="p-6">
              <p className="text-zinc-400 mb-4">
                A modern SaaS company needed to shed its generic template logo to attract enterprise
                clients. We crafted a sleek, geometric mark that communicated security and innovation.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-secondary font-bold">
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Improved Conversion
                </span>
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Enterprise Trust
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/logo-ecommerce-brand.webp"
                alt="E-Commerce Brand Lift"
                width={800}
                height={256}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
              <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                E-Commerce Brand Lift
              </h3>
            </div>
            <div className="p-6">
              <p className="text-zinc-400 mb-4">
                A luxury retail brand was struggling to justify premium pricing with an outdated,
                messy logo. We streamlined their identity into an elegant, timeless wordmark.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-secondary font-bold">
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Higher Price Point
                </span>
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Market Authority
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCards
        title="Logo Design Styles"
        description="From clean minimalism to complex 3D marks, we tailor the aesthetic to match your brand's unique personality."
        cards={cards}
      />

      <DesignGallery
        category="Logo Design"
        title="Logo Portfolio"
        description="A collection of custom brand marks and logotypes."
      />

      <Reviews />
      <FAQ
        faqs={logoFaqs}
        title="Logo Design FAQs"
        description="Common questions about custom logo design, branding ROI, and how a professional identity can transform your business."
      />
      <Contact />
    </div>
  );
}
