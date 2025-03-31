import MenuBar from '../components/MenuBar';
import NavigationSidebar from '../components/NavigationSidebar';
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
      {children}
      <MenuBar />
    </>
  );
}
