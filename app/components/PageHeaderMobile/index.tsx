import Logo from '../Logo';

const PageHeaderMobile = () => {
  return (
    <header className="w-full bg-neutral-100 px-4 py-3 transition-colors duration-300 dark:bg-neutral-800 md:px-8 md:py-6">
      <Logo />
    </header>
  );
};

export default PageHeaderMobile;
