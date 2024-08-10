"use client";
import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  error?: string;
}

const InputField = forwardRef<
  HTMLInputElement,
  InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, type, error, ...inputProps }, ref) => {
  return (
    <div className="w-full relative">
      <input
        type={type}
        ref={ref}
        className={`w-full p-3 bg-input text-sm leading-6 rounded-[10px] focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-input ${
          error ? "ring-1 ring-error" : ""
        }`}
        placeholder={label}
        {...inputProps}
      />
      {error && <p className="mt-2 body-extra-small text-error absolute -bottom-5">{error}</p>}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
