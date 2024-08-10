import { FC } from "react";
interface LoginButtonProps {
  label: string;
  type: "button" | "submit";
  onClick?: () => void;
  secondary?: boolean;
  loading?: boolean;
}

const Button: FC<LoginButtonProps> = ({
  onClick,
  label,
  type,
  secondary,
  loading,
}) => {
  return (
    <button
      type={type}
      onClick={type === "button" ? onClick : undefined}
      disabled={loading}
      className={`w-full relative py-[16px] px-[28px] font-bold text-white max-w-[300px] transition-all rounded-[10px] ${
        secondary
          ? " bg-background ring-white ring-1"
          : " bg-primary hover:bg-primary/90"
      } ${
        loading ? "animate-pulse" : ""
      } focus:outline-none focus:ring-2 focus:ring-primary-400 `}
    >
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={10}
          height={10}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="absolute left-16 animate-spin my-auto w-24 h-24"
          viewBox="0 0 24 24"
        >
          <path d="M21 12a9 9 0 11-6.219-8.56"></path>
        </svg>
      ) : null}
      {label}
    </button>
  );
};

export default Button;
