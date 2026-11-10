import Heading from '@/ui/Heading';
import FAQList, { type FaqItem } from '@/components/client/FAQList';
import JsonLd from '@/components/JsonLd';

const defaultFaqs: FaqItem[] = [
  {
    question: 'How long does it take to build a website/app?',
    answer:
      'The timeline depends entirely on the complexity of your project. A standard landing page might take 1-2 weeks, while a full-scale web application could take 1-3 months. We establish a clear timeline during our discovery call.',
  },
  {
    question: 'What is your pricing structure?',
    answer:
      'Our pricing is project-based and depends on the scope, features, and complexity of what we are building. We prioritize high-quality, scalable code that delivers a strong ROI for your business.',
  },
  {
    question: "What if I don't have a design ready?",
    answer:
      'No problem at all! We offer complete UI/UX implementation services. If you need a design from scratch, we can work together to create a stunning interface before development begins.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Absolutely. We provide post-launch support and maintenance packages to ensure your application stays fast, secure, and up-to-date with the latest technologies.',
  },
];

export default function FAQ({
  faqs = defaultFaqs,
  title = 'Frequently Asked Questions',
  description = "Got questions? We've got answers. Here are some of the most common things clients ask before we start working together.",
}: {
  faqs?: FaqItem[];
  title?: string;
  description?: string;
}) {
  return (
    <section id="faq" className="section my-20 py-20 w-full relative">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />
      <div className="text-center mb-16">
        <Heading className="text-4xl sm:text-6xl mb-6">{title}</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">{description}</p>
      </div>

      <FAQList faqs={faqs} />
    </section>
  );
}
