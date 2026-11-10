import { getLogos } from '@/lib/data';
import LogoMarquee from '@/components/client/LogoMarquee';

export default async function LogoSlider() {
  const logos = await getLogos();

  if (logos.length === 0) return null;

  const items = logos.map((logo) => ({
    id: logo.id,
    imgUrl: logo.imgUrl,
    name: logo.name || logo.company || logo.title,
  }));

  return (
    <section className="w-full py-12 bg-zinc-900/10 border-y border-zinc-800/30 overflow-hidden relative">
      <div className="text-center mb-8">
        <p className="text-zinc-300 uppercase tracking-widest text-sm font-semibold">
          Trusted by innovative companies
        </p>
      </div>
      <LogoMarquee logos={items} />
    </section>
  );
}
