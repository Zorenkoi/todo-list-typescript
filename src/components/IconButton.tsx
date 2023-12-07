interface IIconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: string;
  tailStyles?: string;
}

const IconButton: React.FC<IIconButtonProps> = ({
  onClick,
  icon,
  tailStyles,
}) => {
  return (
    <button
      className={`button w-9 h-7 flex-shrink-0 flex justify-center items-center rounded  ${tailStyles}`}
      onClick={onClick}
    >
      <img className="w-5 h-5" src={icon} alt="" />
    </button>
  );
};

export default IconButton;
