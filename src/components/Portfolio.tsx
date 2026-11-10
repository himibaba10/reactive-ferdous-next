import Heading from '@/ui/Heading';
import PortfolioTabs from '@/components/client/PortfolioTabs';
import { getWebProjects } from '@/lib/data';

const HOME_PORTFOLIO_INITIAL = 9;

export default async function Portfolio() {
  const projects = await getWebProjects();

  // Lean props only — avoids shipping full Mongo docs into the client bundle.
  const leanProjects = projects.map((p) => ({
    id: p.id,
    title: p.title,
    img: p.img,
    live: p.live,
    category: p.category,
    technologies: p.technologies,
  }));

  return (
    <section
      id="portfolio"
      className="section flex flex-col items-center my-20 w-full"
    >
      <div className="w-full text-center flex flex-col items-center">
        <Heading className="text-5xl sm:text-7xl mb-4">Featured Projects</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-10">
          Take a look at how we&apos;ve helped businesses scale and improve their digital presence
          with custom-built solutions.
        </p>
        <PortfolioTabs projects={leanProjects} initialCount={HOME_PORTFOLIO_INITIAL} />
      </div>
    </section>
  );
}
