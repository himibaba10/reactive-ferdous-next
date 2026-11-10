const Hamburger = ({ showMenu, setShowMenu }) => {
  return (
    <button
      className='block sm:hidden z-20'
      aria-label='Toggle navigation menu'
    >
      <label
        htmlFor='check'
        className='flex flex-col gap-[5px] rounded-lg cursor-pointer'
      >
        <input
          type='checkbox'
          id='check'
          checked={showMenu ? true : false}
          onChange={(e) => setShowMenu(e.target.checked)}
          className='peer/check hidden'
        />
        <span className='w-6 h-1 rounded-lg inline-block bg-secondary peer-checked/check:rotate-45 peer-checked/check:translate-y-2 duration-300'></span>
        <span className='w-6 h-1 rounded-lg inline-block bg-secondary peer-checked/check:scale-0 duration-300'></span>
        <span className='w-6 h-1 rounded-lg inline-block bg-secondary peer-checked/check:-rotate-45 peer-checked/check:-translate-y-2.5 duration-300'></span>
      </label>
    </button>
  );
};

export default Hamburger;
