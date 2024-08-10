"use client";
import type { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import pb from "@/lib/db";
import { loginUser } from "@/utils/user";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "../InputField";
import Button from "../Button";
import Checkbox from "../Checkbox";

interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInForm: FC = () => {
  const [error, setError] = useState<string | null>();
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const search_params = useSearchParams().get("next");
  const router = useRouter();
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const handleLogin = async (data: SignInFormValues) => {
    setIsLoading(true)
    
    try {
      const pb_user = await loginUser({
        pb,
        user: data.email,
        password: data.password,
      });
      document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
      if (search_params) {
        // console.log("next page = ",search_params);
        router.push(search_params);
      } else {
        router.push(`/movies/${pb_user.record.id}`);
      }

      return pb_user;
    } catch (error: any) {
      console.log("error logging in user === ", error.message);
      setIsLoading(false)
      if (error.message) {
        setError(error.message);
      } else {
        setError("Error logining in user");
      }
      reset()
    }
  };

  return (
    <form
      className="max-w-xs gap-6 w-full m-auto flex flex-col items-center h-full p-[10px]"
      onSubmit={handleSubmit(handleLogin)}
    >
      <h1 className="text-5xl sm:text-[64px]">Sign In</h1>
      <InputField
        type="email"
        label="Email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        })}
      />
      <InputField
        type="password"
        label="Password"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
      />
      <Checkbox
        label="Remember me"
        checked={watch("rememberMe")}
        register={register("rememberMe")}
      />
      <Button loading={isLoading} type="submit" label="Login" />
      {error ? <caption className=" text-error animate-pulse">{error}</caption> : null}
    </form>
  );
};

export default SignInForm;
