"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input, Button } from "@chakra-ui/react";
import { LuLoaderCircle } from "react-icons/lu";
import { BsEnvelopeAt } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { Login } from "@/loaders/auth";
import { PiUserCircleDashedDuotone } from "react-icons/pi";
import { useAuthStore } from "@/zustand/auth";

// Validation Schema using Zod
const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const { setAccessToken } = useAuthStore();

  const { mutate, isLoading, error } = useMutation((data: SignInFormData) => {
    return Login(data)
      .then((res) => {
        if (res) {
          setAccessToken(res);
        }
      })
      .catch((err) => console.error(err));
  });

  const onSubmit = async (data: SignInFormData) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[80%]">
        <div className="space-y-2 mb-10">
          <h2 className="text-center font-semibold text-2xl text-blue-500">
            Welcome Back !
          </h2>
          <p className="text-center text-gray-400">
            Publish your ideas, gather feedback, and explore new perspectives!
          </p>
        </div>

        <div className="space-y-2 mt-5">
          <div className="flex flex-row gap-2">
            <PiUserCircleDashedDuotone className="h-5 w-5 text-blue-600" />
            <label htmlFor="email" className="text-blue-600">
              Username
            </label>
          </div>
          <Input
            id="username"
            type="text"
            {...register("username")}
            className=" border-gray-200 h-12 rounded-md border pl-2 outline-none focus:border-blue-300"
            placeholder="JohnDoe"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-row gap-2">
            <FiLock className="h-5 w-5 text-blue-600" />
            <label htmlFor="password" className="text-blue-600">
              Password
            </label>
          </div>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="********"
            className="border-gray-200 h-12 rounded-md border pl-2 outline-none focus:border-blue-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button
          bg={"blue.600"}
          type="submit"
          className="w-full text-white rounded-md font-semibold h-12"
          disabled={isSubmitting}
        >
          {isLoading || isSubmitting ? (
            <LuLoaderCircle className="h-6 w-6 text-white animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
        <p className="text-center text-sm">
          Don't have an account ?{" "}
          <Link href={"/sign-up"} className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
