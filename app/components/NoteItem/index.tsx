import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { title, tags, lastEdited, id } = note;
  const formattedDate = new Date(lastEdited).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <li>
      <Link
        className='bg-white flex flex-col gap-3 p-2 dark:bg-neutral-950 transition-colors duration-300'
        href={id}
      >
        <h2 className='text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-950 dark:text-white transition-colors duration-300'>
          {title}
        </h2>
        {tags.length > 0 && (
          <ul className='flex gap-1'>
            {tags.map((tag) => (
              <li
                className='px-[0.375rem] py-[0.125rem] dark:bg-neutral-700 text-neutral-950 dark:text-white bg-neutral-200 rounded text-xs leading-[1.2] tracking-[-0.2px] transition-colors duration-300'
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <span className='text-xs leading-[1.2] text-neutral-700 dark:text-neutral-200 tracking-[-0.2px] transition-colors duration-300'>
          {formattedDate}
        </span>
      </Link>
    </li>
  );
};

export default NoteItem;
