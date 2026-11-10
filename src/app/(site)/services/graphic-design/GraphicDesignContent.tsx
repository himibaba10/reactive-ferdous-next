import { MdContactPage, MdOutlineImage, MdOutlineShare, MdViewDay } from 'react-icons/md';
import DesignGallery from '@/components/DesignGallery';
import AuditBanner from '@/components/AuditBanner';
import Contact from '@/components/Contact';
import Reviews from '@/components/Reviews';
import ServiceCards from '@/components/ServiceCards';
import ServiceHero from '@/components/ServiceHero';

export default function GraphicDesign() {
  const cards = [
    {
      title: 'Poster Design',
      description:
        'High-impact poster designs for events, marketing campaigns, and promotions that grab attention instantly.',
      icon: <MdOutlineImage />,
    },
    {
      title: 'Business Card Design',
      description:
        'Professional and memorable business cards that leave a lasting impression on your clients and partners.',
      icon: <MdContactPage />,
    },
    {
      title: 'Banner Design',
      description:
        'Engaging web and print banners designed to drive clicks and clearly communicate your message.',
      icon: <MdViewDay />,
    },
    {
      title: 'Social Media Graphics',
      description:
        'Optimized, shareable graphics tailored for Instagram, Facebook, LinkedIn, and Twitter to boost engagement.',
      icon: <MdOutlineShare />,
    },
  ];

  return (
    <div>
      <ServiceHero
        title="Visual Identities That"
        highlightedText="Stand Out"
        description="Elevate your brand with premium, eye-catching graphic design. From memorable logos to complete marketing kits, we design visuals that leave a lasting impression."
      />

      <AuditBanner serviceName="Graphic Design" />

      <section className="section max-w-5xl mx-auto mb-10 text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
          Why Visual Identity Matters
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
          In today&apos;s crowded digital landscape, your visual identity is often the first
          interaction a potential customer has with your business. A strong, cohesive design
          language builds trust, conveys professionalism, and separates you from the competition.
        </p>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Our graphic design services are rooted in strategy. We don&apos;t just make things look
          good; we ensure your marketing materials, brand guidelines, and digital assets align
          perfectly with your core business values and speak directly to your target audience.
        </p>
      </section>

      <ServiceCards
        title="Graphic Design Services"
        description="Comprehensive design solutions tailored to your specific marketing and branding needs."
        cards={cards}
      />

      <DesignGallery
        category="Graphic Design"
        title="Graphic Design Portfolio"
        description="Explore a selection of our recent branding and graphic design projects."
      />

      <Reviews />
      <Contact />
    </div>
  );
}
