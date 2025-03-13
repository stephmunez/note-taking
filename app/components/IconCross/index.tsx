interface IconCrossProps {
  width?: number;
  height?: number;
  lightColor?: string;
  darkColor?: string;
  isActive?: boolean;
  theme?: string;
}

const IconCross = ({
  width,
  height,
  lightColor,
  darkColor,
  isActive,
  theme,
}: IconCrossProps) => {
  const color = isActive
    ? '#335CFF'
    : theme === 'dark'
      ? darkColor || '#99A0AE'
      : lightColor || '#99A0AE';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : 24}
      height={height ? height : 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6 6 12 12M18 6 6 18"
      />
    </svg>
  );
};

export default IconCross;
