"use client";

import React, { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [inputName, setInputName] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (user?.name) {
      setInputName(user.name);
    }
  }, [user?.name]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f2f5f3] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg animate-pulse space-y-6">
          <div className="h-10 w-1/3 rounded-md bg-gray-200" />
          <div className="h-44 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#f2f5f3] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-2">লগইন প্রয়োজন</h2>
          <p className="text-sm text-gray-600 mb-6">
            তথ্য পরিবর্তন করতে অনুগ্রহ করে আগে সাইন ইন করুন।
          </p>
          <Link
            href="/sign-in?callbackUrl=/profile/update"
            className="inline-block bg-[#008a45] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#007339] transition-colors"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateName = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const trimmedName = inputName.trim();

    if (!trimmedName) {
      setErrorMessage("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName === (user?.name ?? "")) {
      toast.info("আপনার নাম আগে থেকেই একই আছে।");
      router.push("/profile");
      return;
    }

    setIsUpdating(true);
    setErrorMessage("");

    try {
      const result = await updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।");
        return;
      }

      toast.success("তথ্য সফলভাবে হালনাগাদ করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f5f3] px-4 py-12 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg space-y-6">
        
        {/* Back Link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            তথ্য হালনাগাদ (Update Information)
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {errorMessage}
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleUpdateName} className="space-y-5">
            <div>
              <label
                htmlFor="user-name"
                className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-800"
              >
                <User className="w-4 h-4 text-gray-500" />
                <span>নাম (Name)</span>
              </label>

              <input
                id="user-name"
                type="text"
                value={inputName}
                onChange={(e) => {
                  setInputName(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#008a45]"
                placeholder="আপনার নাম লিখুন"
                maxLength={100}
                required
                disabled={isUpdating}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-400">
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isUpdating || !inputName.trim()}
                className="flex-1 rounded-xl bg-[#008a45] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#007339] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isUpdating ? "হালনাগাদ হচ্ছে..." : "তথ্য হালনাগাদ করুন (Update Information)"}
              </button>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                বাতিল
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
