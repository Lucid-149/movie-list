"use client";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import pb from "@/lib/db";

const HomeButton: FC = () => {
  const router = useRouter();
  const user = pb.authStore.model;
  return (
    <>
      {user ? (
        <button
          onClick={() => router.push(`/movies/${user.id}`)}
          className=" py-16 px-32 hover:px-48 font-bold uppercase rounded-xl shadow-2xl bg-primary text-white hover:opacity-90 transition-all"
        >
          Go to your movies
        </button>
      ) : (
        <button
          onClick={() => router.push("/sign-in")}
          className=" py-16 px-32 hover:px-48 font-bold uppercase rounded-xl shadow-2xl bg-primary text-white hover:opacity-90 transition-all"
        >
          Sign In
        </button>
      )}
    </>
  );
};

export default HomeButton;
