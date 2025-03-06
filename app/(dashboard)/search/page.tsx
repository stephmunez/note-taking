import { Metadata } from 'next';
import Search from '../../components/Search';

export const metadata: Metadata = {
  title: 'Notes Taking | Search',
};

export default function SearchPage() {
  return <Search />;
}
