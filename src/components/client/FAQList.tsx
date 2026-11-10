'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export type FaqItem = { question: string; answer: string };

export default function FAQList({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="mb-4 border border-zinc-700/50 rounded-xl overflow-hidden bg-zinc-900/50"
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none hover:bg-zinc-800/50 transition-colors"
            >
              <span className="text-lg font-bold text-white">{faq.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-secondary"
              >
                <MdKeyboardArrowDown size={24} />
              </motion.div>
            </button>

            <motion.div
              id={`faq-answer-${index}`}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden={!isOpen}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 pt-2 text-zinc-400 leading-relaxed border-t border-zinc-700/30">
                {faq.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
