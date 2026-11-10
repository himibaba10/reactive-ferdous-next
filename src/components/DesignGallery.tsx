import Heading from '@/ui/Heading';
import { ProjectImages } from '@/components/ProjectImages';
import { getProjects } from '@/lib/data';

export default async function DesignGallery({
  category,
  title = 'Featured Work',
  description = 'A selection of our recent projects in this area.',
}: {
  category: string;
  title?: string;
  description?: string;
}) {
  const all = await getProjects(category);
  const projects = all.filter((p) => p.category === category);

  return (
    <section className="section flex flex-col items-center my-20 w-full">
      <div className="w-full text-center flex flex-col items-center mb-12">
        <Heading className="text-4xl sm:text-6xl mb-4">{title}</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">{description}</p>
      </div>

      <div className="w-full">
        {projects.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] border border-dashed border-zinc-700 rounded-2xl bg-zinc-900/30">
            <p className="text-zinc-400">No projects uploaded yet in this category.</p>
          </div>
        ) : (
          <ProjectImages projects={projects} />
        )}
      </div>
    </section>
  );
}
