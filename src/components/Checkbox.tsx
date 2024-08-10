"use client";
import React, { FC, memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxProps {
  label: string;
  checked: boolean;
  register: UseFormRegisterReturn;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, register }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        {...register}
        className="hidden"
        aria-checked={checked}
        role="checkbox"
      />
      <span
        className={
          "w-5 h-5 mr-5 flex justify-center items-center overflow-hidden rounded bg-input"
        }
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="animate-fade"
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        )}
      </span>
      <span className="text-sm font-medium text-white">{label}</span>
    </label>
  );
};

export default memo(Checkbox);
