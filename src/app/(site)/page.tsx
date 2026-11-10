import About from '@/components/About';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Hero from '@/components/Hero';
import JsonLd from '@/components/JsonLd';
import LeadBanner from '@/components/LeadBanner';
import LogoSlider from '@/components/LogoSlider';
import Portfolio from '@/components/Portfolio';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import { buildHomeJsonLd, createPageMetadata, SITE_DESCRIPTION } from '@/lib/seo';
import { Suspense } from 'react';

export const metadata = createPageMetadata({
  title: 'Ferdous Ahmed | Web Developer & Designer',
  description: SITE_DESCRIPTION,
  path: '/',
});

const sectionFallback = (
  <div className='min-h-30 flex items-center justify-center text-zinc-400'>
    Loading...
  </div>
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
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
        buttonText='Get a Free Audit'
        message="Hi Team, I'd like to get a free website audit!"
      />
      <Suspense fallback={sectionFallback}>
        <Reviews />
      </Suspense>
      <LeadBanner
        text='Ready to become our next success story?'
        buttonText='Discuss Your Project'
        message="Hi Team, I'm ready to become your next success story!"
      />
      <FAQ />
      <Contact />
    </>
  );
}
