'use client';

import { useMemo, useState } from 'react';
import type { ProjectDoc } from '@/lib/data';
import { ProjectImages } from '@/components/ProjectImages';

type PortfolioTabsProps = {
  projects: ProjectDoc[];
};

export default function PortfolioTabs({ projects }: PortfolioTabsProps) {
  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        projects.map((p) => p.category).filter((c): c is string => Boolean(c))
      ),
    ];
    return ['All', ...unique];
  }, [projects]);

  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects =
    activeTab === 'All'
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveTab(category)}
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
        <ProjectImages projects={filteredProjects} />
      </div>
    </>
  );
}
