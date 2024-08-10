"use client";
import { useState, type FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../InputField";
import pb from "@/lib/db";
import Button from "../Button";
import { useRouter } from "next/navigation";
import ImageUpload from "../ImageUpload";

export interface FormValues {
  title: string;
  year: number;
  poster: File | null;
}

const AddMovie: FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);

  const router = useRouter();
  const user = pb.authStore.model;
  

  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
    },
  });

  const watchImage = watch("poster");

  const submit: SubmitHandler<FormValues> = async (data) => {
    const newMovie = {
      user: user!.id,
      title: data.title,
      year: data.year,
      poster: watchImage as File,
    };
    try {
      setUploading(true);
      const movie = await pb.collection("movies").create(newMovie, {
        requestKey: null,
      });
      reset();
      setUploading(false);
      return movie;
    } catch (error: any) {}
  };

  return (
    <form
      className={`${
        uploading ? " animate-pulse cursor-not-allowed" : ""
      } grid grid-cols-1 gap-24 sm:grid-cols-2 w-full place-content-start relative min-h-full`}
      onSubmit={handleSubmit(submit)}
    >
      {uploading ? (
        <div className=" z-50  absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className=" animate-spin w-80 h-80 "
            viewBox="0 0 24 24"
          >
            <path d="M21 12a9 9 0 11-6.219-8.56"></path>
          </svg>
        </div>
      ) : null}
      <div className=" flex-col flex w-full sm:max-w-sm gap-6 col-span-1 sm:col-start-2">
        <InputField
          type="text"
          error={errors.title?.message}
          label="Title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters long",
            },
          })}
        />
        <div className=" sm:w-[216px] w-full">
          <InputField
            type="number"
            label="Publishing year"
            error={errors.year?.message}
            min={1900}
            max={2024}
            {...register("year", {
              required: "Year is required",
              valueAsNumber: true,
              min: 1900,
              max: 2024,
            })}
          />
        </div>
      </div>
      <div className=" col-span-1 col-start-1 h-full flex sm:absolute top-0 left-0">
        <ImageUpload
          register={register}
          value={watchImage}
          onChange={(file) => setValue("poster", file)}
          error={errors.poster?.message}
        />
      </div>
      <div className=" flex h-14 gap-24 mt-40 sm:max-w-sm  col-span-1 col-start-1 sm:col-start-2 justify-center">
        <Button
          onClick={() => {
            router.push(`/movies/${user?.id}`);
          }}
          secondary
          type="button"
          label="Cancel"
        />
        <Button loading={uploading} type="submit" label="Submit" />
      </div>
    </form>
  );
};

export default AddMovie;
