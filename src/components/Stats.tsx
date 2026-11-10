const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function Stats() {
  return (
    <section className="w-full py-16 bg-zinc-950 relative overflow-hidden border-t border-zinc-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-secondary/10 filter blur-[100px] z-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-around items-center gap-10 relative z-10">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 mb-2 drop-shadow-lg">
              {stat.value}
            </div>
            <div className="text-secondary font-bold uppercase tracking-widest text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
