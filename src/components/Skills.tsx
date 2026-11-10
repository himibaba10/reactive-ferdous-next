import Heading from '../ui/Heading';
import ExperienceCard from './ExperienceCard';
import SkillCards from './SkillCards';

const Skills = () => {
  return (
    <section id='skills' className='my-20 section'>
      <Heading className='font-bebas text-7xl text-secondary mb-5 text-center'>Our Skills</Heading>
      <div className='flex flex-col lg:flex-row mt-7 mb-20 gap-5 sm:gap-10'>
        <SkillCards />
        <ExperienceCard />
      </div>
    </section>
  );
};

export default Skills;
