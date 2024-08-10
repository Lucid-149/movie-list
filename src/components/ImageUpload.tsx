"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./forms/AddMovie";

interface ImageUploadProps {
  register: UseFormRegister<FormValues>;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  currentImageUrl?: string;
}

const ImageUpload: FC<ImageUploadProps> = ({
  register,
  value,
  onChange,
  error,
  currentImageUrl
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(currentImageUrl || null);

  useEffect(() => {
    if (!value && currentImageUrl) {
      setFilePreview(currentImageUrl);
    } else if (!value) {
      setFilePreview(null);
    }
  }, [value, currentImageUrl]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFileSelection(files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFileSelection(files);
  };

  const handleFileSelection = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setFilePreview(URL.createObjectURL(file));
        onChange(file);
      } else {
        alert("Please upload a valid image file (PNG or JPEG).");
      }
    }
  };

  return (
    <label
      className={`flex flex-col relative p-1 aspect-square sm:aspect-auto border-dashed border-white border-2 bg-input sm:h-[504px] items-center justify-center w-[473px] rounded-[10px] cursor-pointer ${
        filePreview ? "bg-transparent border-none shadow-2xl" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="Image Upload"
    >
      {filePreview ? (
        <Image
          src={filePreview}
          alt="Uploaded file preview"
          fill
          className="object-cover rounded-lg"
          sizes="700px"
        />
      ) : (
        <div className="flex flex-col items-center justify-center pb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            className="w-24 h-24"
            viewBox="0 0 24 24"
          >
            <g clipPath="url(#clip0_3_346)">
              <path
                fill="#fff"
                d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4l-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3_346">
                <path fill="#fff" d="M0 0H24V24H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-white body-small">Drop an image here</span>
          </p>
        </div>
      )}
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        accept="image/png, image/jpeg"
        {...register("poster", {
          onChange: handleFileChange,
        })}
      />
      {error && <span className="text-red-500">{error}</span>}
    </label>
  );
};

export default ImageUpload;