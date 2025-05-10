import Image from 'next/image';
import Link from 'next/link';
import iconPlus from '../../assets/images/icon-plus.svg';

const CreateNewNoteButton = () => {
  return (
    <Link
      href={'/create'}
      className="fixed bottom-[4.5rem] right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 active:bg-blue-700 md:bottom-24 md:right-8 lg:hidden"
    >
      <Image src={iconPlus} width={32} height={32} alt="cross icon" />
    </Link>
  );
};

export default CreateNewNoteButton;
