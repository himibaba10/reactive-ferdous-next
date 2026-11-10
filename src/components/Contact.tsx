import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <section id="contact" className="bg-gray py-5 sm:py-20">
      <div className="section flex flex-col sm:flex-row gap-8 md:gap-20 items-center">
        <ContactInfo />
        <div className="w-full sm:w-1/2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
