import { MdArrowOutward } from 'react-icons/md';

const ContactButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <a
      href="https://wa.me/8801997722621"
      target="_blank"
      rel="noopener noreferrer"
      className="group uppercase text-sm sm:text-lg inline-flex items-center sm:gap-2 p-1 pl-1 sm:pl-4 rounded-full relative bg-transparent shadow-[0.5px_0_1.3px_rgba(255,255,255,1)] transition-colors duration-300 hover:bg-secondary"
    >
      <span className="text-white mx-3 relative transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
      <span className="bg-secondary p-2 rounded-full relative text-black transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-[135deg]">
        <MdArrowOutward size={25} />
      </span>
    </a>
  );
};

export default ContactButton;
