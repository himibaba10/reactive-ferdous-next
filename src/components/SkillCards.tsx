import Bootstrap from '../assets/Bootstrap 1.png';
import CSS from '../assets/CSS.png';
import ExpressJS from '../assets/Express.png';
import Firebase from '../assets/Firebase 1.png';
import HTML from '../assets/HTML.png';
import JS from '../assets/JS.png';
import MongoDB from '../assets/Mongodb.png';
import NextJS from '../assets/NextJS.png';
import ReactJS from '../assets/REACTJS.png';
import Redux from '../assets/redux-icon 1.png';
import Tailwind from '../assets/TAILWIND.png';
import WordPress from '../assets/Wordpress 1.png';
import SkillCard from '@/components/client/SkillCard';

const SkillCards = () => {
  const skills = [
    {
      name: 'WordPress',
      image: WordPress,
    },
    {
      name: 'HTML',
      image: HTML,
    },
    {
      name: 'CSS',
      image: CSS,
    },
    {
      name: 'JavaScript',
      image: JS,
    },
    {
      name: 'ReactJS',
      image: ReactJS,
    },
    {
      name: 'ExpressJS',
      image: ExpressJS,
    },
    {
      name: 'Firebase',
      image: Firebase,
    },
    {
      name: 'MongoDB',
      image: MongoDB,
    },
    {
      name: 'NextJS',
      image: NextJS,
    },
    {
      name: 'BootStrap',
      image: Bootstrap,
    },
    {
      name: 'Redux',
      image: Redux,
    },
    {
      name: 'Tailwind',
      image: Tailwind,
    },
  ];
  return (
    <div className='w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-7'>
      {skills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </div>
  );
};

export default SkillCards;
