interface IconLockProps {
  theme?: string;
  isActive?: boolean;
  width?: number;
  height?: number;
  lightColor?: string;
  darkColor?: string;
}

const IconLock = ({
  theme,
  isActive,
  width,
  height,
  lightColor,
  darkColor,
}: IconLockProps) => {
  const color = isActive
    ? '#335CFF'
    : theme === 'dark'
      ? darkColor || '#99A0AE'
      : lightColor || '#525866';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M16.424 9.448V7.3a4.552 4.552 0 0 0-4.551-4.551 4.55 4.55 0 0 0-4.57 4.53v2.168"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M15.683 21.25H8.042a3.792 3.792 0 0 1-3.792-3.792v-4.29a3.792 3.792 0 0 1 3.792-3.791h7.641a3.792 3.792 0 0 1 3.792 3.792v4.289a3.792 3.792 0 0 1-3.792 3.792Z"
        clipRule="evenodd"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M11.862 14.203v2.22"
      />
    </svg>
  );
};

export default IconLock;
