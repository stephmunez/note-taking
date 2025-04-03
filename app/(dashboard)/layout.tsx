import MenuBar from '../components/MenuBar';
import NavigationSidebar from '../components/NavigationSidebar';
import PageHeader from '../components/PageHeader';
import PageHeaderMobile from '../components/PageHeaderMobile';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeaderMobile />
      <NavigationSidebar />
      <div className="flex w-full flex-col">
        <PageHeader />
        {children}
      </div>
      <MenuBar />
    </>
  );
}
