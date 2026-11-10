import Image from 'next/image';

export type ProjectSlide = {
  id: string;
  title: string;
  img: string;
  live?: string;
  technologies?: string[];
  frontendCodeLink?: string;
  backendCodeLink?: string;
  _id?: string;
};

export const ProjectImages = ({ projects }: { projects?: ProjectSlide[] }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex justify-center items-center w-full min-h-[200px]">
        <p className="text-xl text-zinc-400">No projects found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((slide, idx) => (
        <div
          className="relative bg-zinc-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group border border-zinc-100 dark:border-zinc-800"
          key={slide.id || slide._id || idx}
        >
          <div className="h-[250px] overflow-hidden relative">
            {slide.img ? (
              <Image
                src={slide.img}
                alt={slide.title || 'Project'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover object-top group-hover:object-[0_100%] transition-[object-position] duration-[3s] ease-in-out"
              />
            ) : null}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            {slide.live ? (
              <a
                href={slide.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${slide.title} — visit the live website`}
                className="text-2xl font-bold transition-colors mb-4 inline-block rounded-sm after:absolute after:inset-0 hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {slide.title} ↗
              </a>
            ) : (
              <div className="text-2xl font-bold transition-colors mb-4 inline-block">
                {slide.title}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {slide.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 px-3 py-1 text-xs font-semibold rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {(slide.frontendCodeLink || slide.backendCodeLink) && (
              <div className="relative z-10 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-4 text-sm font-medium">
                {slide.frontendCodeLink && (
                  <a
                    href={slide.frontendCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors underline"
                  >
                    Frontend Code
                  </a>
                )}
                {slide.backendCodeLink && (
                  <a
                    href={slide.backendCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors underline"
                  >
                    Backend Code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
