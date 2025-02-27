import MenuBar from '../components/MenuBar';
import PageHeaderMobile from '../components/PageHeaderMobile';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeaderMobile />
      {children}
      <MenuBar />
    </>
  );
}
