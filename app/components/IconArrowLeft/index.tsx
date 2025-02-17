interface IconArrowLeftProps {
  theme?: string;
  isActive?: boolean;
  width?: number;
  height?: number;
  lightColor?: string;
  darkColor?: string;
}

const IconArrowLeft = ({
  theme,
  isActive,
  width,
  height,
  darkColor,
  lightColor,
}: IconArrowLeftProps) => {
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
        d="M15.75 20.414 7.336 12l8.414-8.414L17.164 5l-7 7 7 7-1.414 1.414Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconArrowLeft;
