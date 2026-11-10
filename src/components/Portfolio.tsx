import Heading from '@/ui/Heading';
import PortfolioTabs from '@/components/client/PortfolioTabs';
import { getWebProjects } from '@/lib/data';

export default async function Portfolio() {
  const projects = await getWebProjects();

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
        <PortfolioTabs projects={projects} />
      </div>
    </section>
  );
}
