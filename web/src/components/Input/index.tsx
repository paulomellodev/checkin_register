import { HTMLAttributes, useRef } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

const Input = ({ id, label, value, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="bg-blue-850 px-4 py-1 rounded-md my-6"
    >
      <label
        onClick={() => inputRef.current?.focus()}
        htmlFor={id}
        className="font-light text-xs"
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={id}
        type="text"
        value={value}
        maxLength={8}
        minLength={8}
        className="outline-none w-[100%] text-white bg-transparent
                   rounded-sm font-semibold uppercase text-xl"
        {...rest}
      />
    </div>
  );
};

export default Input;
