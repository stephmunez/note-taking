'use client';

import { usePathname } from 'next/navigation';
import MenuBar from '../MenuBar';
import PageHeaderMobile from '../PageHeaderMobile';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!isAuthPage && <PageHeaderMobile />}
      {children}
      {!isAuthPage && <MenuBar />}
    </>
  );
}
