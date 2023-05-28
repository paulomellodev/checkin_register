import { HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="h-12 w-[100%] bg-orange-650 hover:bg-orange-500 rounded-md
                 font-bold text-blue-850 transition-colors"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
