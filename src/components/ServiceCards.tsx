import type { ReactNode } from 'react';
import Heading from '@/ui/Heading';

type ServiceCard = { title: string; description: string; icon?: ReactNode };

export default function ServiceCards({
  title = "What's Included",
  description,
  cards = [] as ServiceCard[],
}: {
  title?: string;
  description?: string;
  cards?: ServiceCard[];
}) {
  if (!cards.length) return null;

  return (
    <section className="section my-20 w-full relative">
      <div className="text-center mb-16 px-4">
        <Heading className="text-3xl sm:text-5xl mb-6">{title}</Heading>
        {description && (
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-zinc-800/40 border border-zinc-700/50 p-6 rounded-2xl hover:bg-zinc-800 transition-colors duration-300 flex flex-col"
          >
            {card.icon ? <div className="text-secondary text-4xl mb-4">{card.icon}</div> : null}
            <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
