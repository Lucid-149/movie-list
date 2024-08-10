"use client"
import { logoutUser } from "@/utils/user";

import type { FC } from "react";

const SignOutButton: FC = () => {
  return (
    <button
      className=" flex items-center justify-center gap-16"
      onClick={()=>logoutUser}
    >
      <span className=" sm:flex hidden font-bold">Logout</span>{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-32 h-32"
        viewBox="0 0 24 24"
      >
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
        <path d="M16 17L21 12 16 7"></path>
        <path d="M21 12L9 12"></path>
      </svg>
    </button>
  );
};

export default SignOutButton;
