import Image from 'next/image';
import { MdAutoGraph, MdOutlineDraw, MdOutlineWeb, MdPhoneIphone } from 'react-icons/md';
import DesignGallery from '@/components/DesignGallery';
import AuditBanner from '@/components/AuditBanner';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import ServiceCards from '@/components/ServiceCards';
import ServiceHero from '@/components/ServiceHero';

export default function FigmaDesign() {
  const cards = [
    {
      title: 'Wireframing',
      description:
        'Laying the structural foundation of your digital product to ensure logical flow and intuitive user journeys before visual design.',
      icon: <MdOutlineDraw />,
    },
    {
      title: 'Prototyping',
      description:
        'Interactive, clickable prototypes that simulate the final product, perfect for user testing and stakeholder presentations.',
      icon: <MdAutoGraph />,
    },
    {
      title: 'Mobile App Design',
      description: 'Sleek, native-feeling mobile interfaces tailored for both iOS and Android platforms.',
      icon: <MdPhoneIphone />,
    },
    {
      title: 'Web App Design',
      description:
        'Complex dashboards and responsive web application interfaces designed for maximum usability and minimum friction.',
      icon: <MdOutlineWeb />,
    },
  ];

  const figmaFaqs = [
    {
      question: 'Why should we invest in UI/UX before development?',
      answer:
        "Changing a design in Figma takes minutes; changing hard-coded features takes days. Investing in professional UI/UX prototyping saves you thousands of dollars in development costs and ensures the final product is actually something your users want.",
    },
    {
      question: 'How does good UX design improve ROI?',
      answer:
        'Good UX removes friction. If users can effortlessly navigate your app, find what they need, and check out without frustration, your conversion rates skyrocket. Every dollar invested in UX yields a massive return in customer retention and sales.',
    },
    {
      question: 'Do you design for both mobile and web?',
      answer:
        'Absolutely. We take a responsive, mobile-first approach to ensure your product looks and functions flawlessly across all devices, from massive desktop monitors to small smartphone screens.',
    },
    {
      question: 'What do we receive at the end of the project?',
      answer:
        'You will receive a perfectly organized Figma file containing all screens, an interactive prototype, and a complete design system (colors, typography, components) ready for your developers to implement.',
    },
  ];

  return (
    <div>
      <ServiceHero
        title="Interfaces That Drive"
        highlightedText="Engagement"
        description="We craft beautiful, user-centric interfaces in Figma that provide seamless experiences, intuitive navigation, and massive conversion rates."
      />

      <AuditBanner serviceName="Figma UI/UX Design" />

      <section className="section max-w-6xl mx-auto mb-20 px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-10 text-center">
          The Importance of UI/UX
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 w-full">
            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">User-Centered Logic</h3>
              <p className="text-zinc-400">
                A great product can easily fail if it&apos;s confusing. We bridge the gap between
                complex software and human interaction, ensuring every click feels natural and
                intentional.
              </p>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Frictionless Conversions</h3>
              <p className="text-zinc-400">
                We map out user journeys meticulously to remove any roadblocks. By designing for
                usability, we guide your users effortlessly toward your conversion goals, driving up
                your ROI.
              </p>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Rapid Iteration</h3>
              <p className="text-zinc-400">
                Through interactive prototyping in Figma, we test and refine ideas before a single
                line of code is written, saving you significant time and development costs.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <Image
              src="/images/figma-process.webp"
              alt="Figma UI/UX Design Process"
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
            Prototypes That Scaled Startups
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Discover how professional UI/UX design can reduce churn, boost user engagement, and
            secure investor funding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/figma-fintech.webp"
                alt="Fintech App Redesign"
                width={800}
                height={256}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
              <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                Fintech App Redesign
              </h3>
            </div>
            <div className="p-6">
              <p className="text-zinc-400 mb-4">
                A financial dashboard was losing users due to overwhelming data displays. We
                restructured the information architecture and created a clean, modern interface in
                Figma.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-secondary font-bold">
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Lower Churn
                </span>
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Higher Engagement
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/figma-saas.webp"
                alt="SaaS MVP Prototype"
                width={800}
                height={256}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
              <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                SaaS MVP Prototype
              </h3>
            </div>
            <div className="p-6">
              <p className="text-zinc-400 mb-4">
                An early-stage startup needed an interactive prototype to pitch to investors. We
                delivered a stunning, clickable Figma mockup that perfectly communicated their vision.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-secondary font-bold">
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Secured Seed Funding
                </span>
                <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm border border-secondary/20">
                  Saved Dev Costs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCards
        title="UI/UX Services"
        description="From raw concepts to fully interactive prototypes, we handle the complete design lifecycle."
        cards={cards}
      />

      <DesignGallery
        category="Figma Design"
        title="UI/UX Prototypes"
        description="A showcase of wireframes, mockups, and interactive prototypes."
      />

      <Reviews />
      <FAQ
        faqs={figmaFaqs}
        title="UI/UX Design FAQs"
        description="Everything you need to know about our Figma design process and how it maximizes your software's potential."
      />
      <Contact />
    </div>
  );
}
