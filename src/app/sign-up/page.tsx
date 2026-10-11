"use client";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from 'sonner';

const SignUpPage = () => {

  const handleGoogleButton = async () => {
      const data = await authClient.signIn.social({
        provider: "google",
      });
      
    };
    const handleGithubButton = async () => {
      const data = await authClient.signIn.social({
        provider: "github"
      })
      
    }


  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মিলছে না");
      return;
    }

    const { data: resData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error("সাইন আপ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      return;
    }
    if (resData) {
      toast.success("সাইন আপ সফল হয়েছে!");
      router.push("/");
    }
  };


  return (
    <div className="min-h-screen bg-[#f1f4f2] flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Name Field */}
          <TextField
            isRequired
            name="name"
            type="text"
            className="flex flex-col gap-1.5 text-left"
          >
            <Label className="text-sm font-semibold text-gray-800">নাম</Label>
            <Input
              placeholder="আপনার নাম"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#04783d]/30 focus:border-[#04783d] transition-all placeholder:text-gray-400"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5 text-left"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা প্রদান করুন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-800">ইমেইল</Label>
            <Input
              placeholder="আপনার ইমেইল"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#04783d]/30 focus:border-[#04783d] transition-all placeholder:text-gray-400"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-1.5 text-left"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-800">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#04783d]/30 focus:border-[#04783d] transition-all placeholder:text-gray-400"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Confirm Password Field */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            className="flex flex-col gap-1.5 text-left"
          >
            <Label className="text-sm font-semibold text-gray-800">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              placeholder="আবার লিখুন"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#04783d]/30 focus:border-[#04783d] transition-all placeholder:text-gray-400"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-2 bg-[#04783d] hover:bg-[#036232] text-white font-medium py-3 rounded-lg text-base transition-colors shadow-sm cursor-pointer"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-xs text-gray-500 font-medium">
            অথবা
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Authentication Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* Google Button */}
                  <button
                    onClick={handleGoogleButton}
                    type="button"
                    className="flex items-center justify-center gap-2 border border-gray-800 rounded-xl py-2 px-3 hover:bg-gray-50 transition-colors text-xs font-bold text-gray-900 text-center leading-tight"
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <FcGoogle className="text-2xl" />
                      <span>Google দিয়ে চালিয়ে যান</span>
                    </div>
                  </button>
        
                  {/* GitHub Button */}
                  <button
                    onClick={handleGithubButton}
                    type="button"
                    className="flex items-center justify-center gap-2 border border-gray-800 rounded-xl py-2 px-3 hover:bg-gray-50 transition-colors text-xs font-bold text-gray-900 text-center leading-tight"
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <FaGithub className="text-2xl" />
                      <span>GitHub দিয়ে চালিয়ে যান</span>
                    </div>
                  </button>
                </div>

        {/* Existing Account Link */}
        <p className="text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#04783d] underline font-medium hover:text-[#036232]"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="mt-6 text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUpPage;
