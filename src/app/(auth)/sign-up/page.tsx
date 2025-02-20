"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input, Button } from "@chakra-ui/react";
import { LuLoaderCircle } from "react-icons/lu";
import { BsEnvelopeAt } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";

// Validation Schema using Zod
const signInSchema = z.object({
  username: z.string().min(6),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    // resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log("Sign In Data:", data);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[80%]">
        <div className="space-y-2 mb-10">
          <h2 className="text-center font-semibold text-2xl text-blue-500">
            Welcome to Echo!
          </h2>
          <p className="text-center text-gray-400">
            Publish your ideas, gather feedback, and explore new perspectives!
          </p>
        </div>
        <div className="space-y-2 mt-5">
          <div className="flex flex-row gap-2">
            <FaRegUser className="h-5 w-5 text-blue-600" />
            <label htmlFor="email" className="text-blue-600">
              Username
            </label>
          </div>
          <Input
            id="username"
            type="username"
            {...register("username")}
            className=" border-gray-200 h-12 rounded-md border pl-2 outline-none focus:border-blue-300"
            placeholder="JohnDoe"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2 mt-5">
          <div className="flex flex-row gap-2">
            <BsEnvelopeAt className="h-5 w-5 text-blue-600" />
            <label htmlFor="email" className="text-blue-600">
              Email
            </label>
          </div>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className=" border-gray-200 h-12 rounded-md border pl-2 outline-none focus:border-blue-300"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
          {isSubmitting ? (
            <LuLoaderCircle className="h-6 w-6 text-white animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
