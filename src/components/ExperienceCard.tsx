import PrimaryButton from '../ui/PrimaryButton';

const ExperienceCard = () => {
  return (
    <div className='w-full lg:w-1/4 bg-gray rounded-lg p-4 text-center flex flex-col justify-center items-center'>
      <span className='text-6xl font-semibold'>4+</span>
      <p className='text-4xl leading-tight mt-2 mb-10'>years experience working</p>
      <PrimaryButton 
        width='w-full' 
        href='https://drive.google.com/file/d/1TlDFKwKvLif3o3joopWGLU8O47gTQKED/view?usp=sharing' 
        target='_blank' 
        rel='noopener noreferrer' 
        className='mb-3'
      >
        RESUME
      </PrimaryButton>
      
      <PrimaryButton 
        width='w-full' 
        href='https://drive.google.com/file/d/1fWVnDaAg98PtnXyHNOiDojuXjktX-8rk/view?usp=sharing' 
        target='_blank' 
        rel='noopener noreferrer' 
        className='mb-3'
      >
        CV
      </PrimaryButton>
      
      <PrimaryButton 
        width='w-full' 
        href='https://www.github.com/himibaba10' 
        target='_blank' 
        rel='noopener noreferrer'
      >
        GitHub
      </PrimaryButton>
    </div>
  );
};

export default ExperienceCard;
