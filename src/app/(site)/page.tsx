import { Suspense } from 'react';
import { createPageMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';
import LeadBanner from '@/components/LeadBanner';
import About from '@/components/About';
import Services from '@/components/Services';
import LogoSlider from '@/components/LogoSlider';
import Portfolio from '@/components/Portfolio';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export const metadata = createPageMetadata({
  title: 'Ferdous Ahmed | Web Developer & Designer',
  description:
    'We partner with businesses to deliver digital solutions that solve real problems. Specializing in Web Development, Graphic Design, and Figma Design.',
  path: '/',
});

const sectionFallback = (
  <div className="min-h-[120px] flex items-center justify-center text-zinc-400">
    Loading...
  </div>
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={sectionFallback}>
        <LogoSlider />
      </Suspense>
      <About />
      <Services />
      <Suspense fallback={sectionFallback}>
        <Portfolio />
      </Suspense>
      <LeadBanner
        text="Not sure where to start? Let's map out your strategy."
        buttonText="Get a Free Audit"
        message="Hi Team, I'd like to get a free website audit!"
      />
      <Suspense fallback={sectionFallback}>
        <Reviews />
      </Suspense>
      <LeadBanner
        text="Ready to become our next success story?"
        buttonText="Discuss Your Project"
        message="Hi Team, I'm ready to become your next success story!"
      />
      <FAQ />
      <Contact />
    </>
  );
}
