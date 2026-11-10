'use client';

import { useMemo, useState } from 'react';
import { ProjectImages, type ProjectSlide } from '@/components/ProjectImages';

export type PortfolioProject = ProjectSlide & {
  category?: string;
};

type PortfolioTabsProps = {
  projects: PortfolioProject[];
  initialCount?: number;
};

export default function PortfolioTabs({
  projects,
  initialCount = 9,
}: PortfolioTabsProps) {
  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        projects.map((p) => p.category).filter((c): c is string => Boolean(c))
      ),
    ];
    return ['All', ...unique];
  }, [projects]);

  const [activeTab, setActiveTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const filteredProjects =
    activeTab === 'All'
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  const selectTab = (category: string) => {
    setActiveTab(category);
    setVisibleCount(initialCount);
  };

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectTab(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border border-transparent ${
                activeTab === category
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md scale-105'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      <div className="w-full">
        <ProjectImages projects={visibleProjects} />
      </div>
      {hasMore ? (
        <button
          type="button"
          onClick={() => setVisibleCount((n) => n + initialCount)}
          className="mt-10 px-8 py-3 rounded-full border border-zinc-600 text-zinc-200 hover:border-secondary hover:text-secondary transition-colors text-sm font-semibold uppercase tracking-wide"
        >
          Show more projects
        </button>
      ) : null}
    </>
  );
}
