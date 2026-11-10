import HeroImage from '@/components/client/HeroImage';
import HeroInfo from '@/components/client/HeroInfo';
import HeroLeftImage from '@/components/client/HeroLeftImage';
import HeroRightImage from '@/components/client/HeroRightImage';

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(11,17,35,1), rgba(64, 140, 255, 0.2))',
      }}
      className='mt-14 overflow-hidden relative'
    >
      <HeroInfo />
      <div className='relative mt-8 sm:mt-16 text-center'>
        <HeroLeftImage />
        <HeroRightImage />
        <HeroImage />
      </div>
    </div>
  );
};

export default Hero;
