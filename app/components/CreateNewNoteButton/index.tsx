import Image from 'next/image';
import iconPlus from '../../assets/images/icon-plus.svg';

const CreateNewNoteButton = () => {
  return (
    <button className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center fixed bottom-[4.5rem] right-4'>
      <Image src={iconPlus} width={32} height={32} alt='cross icon' />
    </button>
  );
};

export default CreateNewNoteButton;
