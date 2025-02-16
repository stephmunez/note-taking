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

const NoteItem = ({ note }: NoteItemProps) => {
  const { title, tags, lastEdited, id } = note;
  const formattedDate = new Date(lastEdited).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <li>
      <Link
        className="flex flex-col gap-3 bg-white p-2 transition-colors duration-300 dark:bg-neutral-950"
        href={`/notes/${id}`}
      >
        <h2 className="text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-950 transition-colors duration-300 dark:text-white">
          {title}
        </h2>
        {tags.length > 0 && (
          <ul className="flex gap-1">
            {tags.map((tag) => (
              <li
                className="rounded bg-neutral-200 px-[0.375rem] py-[0.125rem] text-xs leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:bg-neutral-700 dark:text-white"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <span className="text-xs leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
          {formattedDate}
        </span>
      </Link>
    </li>
  );
};

export default NoteItem;
