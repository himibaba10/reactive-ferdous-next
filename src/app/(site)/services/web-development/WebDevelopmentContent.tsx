import Image from 'next/image';
import Link from 'next/link';
import {
  MdOutlineBusiness,
  MdOutlineCloud,
  MdOutlineShoppingCart,
  MdOutlineWeb,
} from 'react-icons/md';
import AuditBanner from '@/components/AuditBanner';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import LeadBanner from '@/components/LeadBanner';
import Portfolio from '@/components/Portfolio';
import Process from '@/components/Process';
import Reviews from '@/components/Reviews';
import ServiceCards from '@/components/ServiceCards';
import ServiceHero from '@/components/ServiceHero';
import Skills from '@/components/Skills';
import Stats from '@/components/Stats';
import WebDevelopmentHeroDecor from '@/components/client/WebDevelopmentHeroDecor';

export default function WebDevelopment() {
  const cards = [
    {
      title: 'E-Commerce Platforms',
      description:
        'Robust, secure online stores built to maximize conversions and handle thousands of products with ease.',
      icon: <MdOutlineShoppingCart />,
    },
    {
      title: 'Corporate Websites',
      description:
        "Professional, responsive corporate hubs that establish trust and clearly communicate your company's value proposition.",
      icon: <MdOutlineBusiness />,
    },
    {
      title: 'SaaS Applications',
      description:
        'Scalable, highly-interactive MERN stack web applications designed to deliver your software service flawlessly.',
      icon: <MdOutlineCloud />,
    },
    {
      title: 'Landing Pages',
      description:
        'High-converting, laser-focused single pages optimized for marketing campaigns and lead generation.',
      icon: <MdOutlineWeb />,
    },
  ];

  return (
    <div>
      <ServiceHero
        title="Custom Web Development That"
        highlightedText="Drives Revenue"
        description="Stop losing customers to slow, outdated websites. We specialize in crafting modern, SEO-friendly web solutions designed to maximize your ROI and act as a 24/7 lead magnet for your business."
      >
        <WebDevelopmentHeroDecor />
      </ServiceHero>

      <AuditBanner serviceName="Web Development" />

      <section className="section max-w-6xl mx-auto mb-20 px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-10 text-center">
          Our Approach to Web Development
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 w-full">
            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Lead-Generating Solutions</h3>
              <p className="text-zinc-400">
                Your website shouldn&apos;t just look pretty. We build tailored MERN stack apps and
                WordPress sites optimized from the ground up to capture leads and drive sales.
              </p>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">SEO & Performance First</h3>
              <p className="text-zinc-400">
                Faster websites mean lower bounce rates and higher search engine rankings. We write
                clean, fully SEO-optimized code to ensure maximum visibility and traffic.
              </p>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Conversion & ROI Driven</h3>
              <p className="text-zinc-400">
                Every button, layout, and user journey is mapped out with a conversion-first mindset
                to guarantee you see a measurable Return on Investment (ROI).
              </p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <Image
              src="/images/web-workspace.webp"
              alt="Web Development Workspace"
              width={1200}
              height={500}
              className="w-full h-auto lg:h-[500px] object-cover rounded-2xl shadow-[0_0_40px_rgba(64,140,255,0.15)] border border-zinc-700/50"
            />
          </div>
        </div>
      </section>

      <section className="section max-w-6xl mx-auto mb-20 px-4">
        <Link
          href="/work/simply-beds"
          className="block bg-zinc-900/40 border border-zinc-800 hover:border-secondary/60 rounded-3xl p-8 sm:p-10 transition-colors group"
        >
          <span className="text-secondary font-bold tracking-wider uppercase text-sm block mb-3">
            Case study
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">
            From 6 seconds to under 1 — a WooCommerce rescue
          </h2>
          <p className="text-zinc-400 max-w-3xl">
            80+ plugins cut to 25, competing page builders collapsed into one, and load time dropped
            from over six seconds to under a second. See how the Simply Beds store was rebuilt in ten
            days.
          </p>
          <span className="inline-block mt-6 text-zinc-300 underline underline-offset-4">
            Read the Simply Beds case study →
          </span>
        </Link>
      </section>

      <ServiceCards
        title="What We Build"
        description="From high-converting landing pages to complex web applications, we have you covered."
        cards={cards}
      />

      <Process />
      <Skills />
      <Stats />
      <Portfolio />
      <Reviews />
      <FAQ />
      <LeadBanner
        text="Ready to start your next web project?"
        buttonText="Discuss Your Project"
        message="Hi Team, I'm ready to discuss a web development project!"
      />
      <Contact />
    </div>
  );
}
