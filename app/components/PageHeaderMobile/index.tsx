import Logo from '../Logo';

const PageHeaderMobile = () => {
  return (
    <header className='px-4 py-3 w-full bg-neutral-100 dark:bg-neutral-800 transition-colors duration-300'>
      <Logo />
    </header>
  );
};

export default PageHeaderMobile;
