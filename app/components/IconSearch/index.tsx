interface IconSearchProps {
  theme?: string;
  isActive?: boolean;
  width?: number;
  height?: number;
  lightColor?: string;
  darkColor?: string;
}

const IconSearch = ({
  theme,
  isActive,
  width,
  height,
  lightColor,
  darkColor,
}: IconSearchProps) => {
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
        fill={color}
        fillRule="evenodd"
        d="M11.248 3.5a7.289 7.289 0 1 0 0 14.577 7.289 7.289 0 0 0 0-14.577ZM2.46 10.79a8.789 8.789 0 1 1 17.577 0 8.789 8.789 0 0 1-17.577 0Z"
        clipRule="evenodd"
      />
      <path
        fill={color}
        fillRule="evenodd"
        d="m16.736 15.648 5.616 5.6-1.06 1.063-5.615-5.601 1.06-1.062Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconSearch;
