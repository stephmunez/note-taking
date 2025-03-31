interface IconChevronRightProps {
  theme?: string;
  isActive?: boolean;
  width?: number;
  height?: number;
  lightColor?: string;
  darkColor?: string;
}

const IconChevronRight = ({
  theme,
  isActive,
  width,
  height,
  lightColor,
  darkColor,
}: IconChevronRightProps) => {
  const color = isActive
    ? '#335CFF'
    : theme === 'dark'
      ? darkColor || '#FFFFFF'
      : lightColor || '#0E121B';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : 24}
      height={height ? height : 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M9.47 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L12.94 12 9.47 8.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconChevronRight;
