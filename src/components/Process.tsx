import Heading from '@/ui/Heading';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We start with a free consultation to map out your business goals, target audience, and specific project requirements.',
  },
  {
    number: '02',
    title: 'Development',
    description:
      "We get to work building your custom solution. You'll receive regular updates and prototypes to ensure we are perfectly aligned.",
  },
  {
    number: '03',
    title: 'Launch & Support',
    description:
      'We deploy your blazing-fast application to the world. We also provide post-launch support to guarantee everything runs flawlessly.',
  },
];

export default function Process() {
  return (
    <section id="process" className="section my-20 py-20 w-full relative">
      <div className="text-center mb-16">
        <Heading className="text-4xl sm:text-6xl mb-6">How It Works</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          A seamless, transparent process designed to take you from idea to a revenue-generating
          application without the stress.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto relative">
        <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent z-0" />

        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative z-10">
            <div className="bg-zinc-900 border border-zinc-700/50 p-8 rounded-2xl flex flex-col items-center text-center h-full hover:bg-zinc-800 transition-colors duration-300">
              <div className="w-16 h-16 bg-secondary text-black rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-[0_0_20px_rgba(232,248,139,0.3)]">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
