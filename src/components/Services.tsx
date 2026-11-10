import Heading from '@/ui/Heading';
import ServicesGrid from '@/components/client/ServicesGrid';

export default function Services() {
  return (
    <section id="services" className="section my-20 py-20 w-full relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[120px] opacity-10 -z-10" />

      <div className="text-center mb-16">
        <Heading className="text-4xl sm:text-6xl mb-6">How We Can Help You</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          We partner with businesses to deliver digital solutions that solve real problems. Here is
          what we specialize in.
        </p>
      </div>

      <ServicesGrid />
    </section>
  );
}
