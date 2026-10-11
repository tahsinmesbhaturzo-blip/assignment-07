"use client";

import React, { useState } from "react";
import { useSession, updateUser, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const ProfilePage: React.FC = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [inputName, setInputName] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Loading skeleton
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f2f5f3] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl animate-pulse space-y-6">
          <div className="h-10 w-1/3 rounded-md bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
          <div className="h-44 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  // Sign out handler

   const handleSignOut = async (): Promise<void> => {
    setIsSigningOut(true);
    setErrorMessage('');
    setMessage('');

    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('সফলভাবে সাইন আউট হয়েছে!');
            window.location.href = '/';
            
          },
          onError: () => {
            toast.error('সাইন আউট করা যায়নি। আবার চেষ্টা করুন।');
            setIsSigningOut(false);
          },
        },
      });
    } catch (error: unknown) {
      console.error('Sign out error:', error);

      setErrorMessage('সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      setIsSigningOut(false);
    }
  };

  // Name update handler
  const handleUpdateName = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const trimmedName = inputName.trim();

    if (!trimmedName) {
      setErrorMessage("অনুগ্রহ করে আপনার নাম লিখুন।");
      setMessage("");
      return;
    }

    if (trimmedName === (user?.name ?? "")) {
      setMessage("আপনার নাম আগে থেকেই একই আছে।");
      toast.info("আপনার নাম আগে থেকেই একই আছে।");
      setErrorMessage("");
      return;
    }

    setIsUpdating(true);
    setMessage("");
    setErrorMessage("");

    try {
      const result = await updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করতে সমস্যা হয়েছে।");
        return;
      }

      setInputName(trimmedName);
      toast.success("নাম সফলভাবে হালনাগাদ করা হয়েছে!");
    } catch (error: unknown) {
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f5f3] px-4 py-12 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>

          <p className="mt-1 text-sm text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile information */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User Avatar"}
                className="h-12 w-12 shrink-0 rounded-xl border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#008a45] text-xl font-semibold uppercase text-white">
                {user?.name?.trim().charAt(0) || "U"}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-gray-800">
                {user?.name || "Guest User"}
              </h2>

              <p className="break-all text-sm text-gray-500">
                {user?.email || "Not signed in"}
              </p>
            </div>
          </div>

          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            type="button"
            disabled={isSigningOut}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-4 w-4 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>

            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </div>

        {/* Success message */}
        {message && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {message}
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {errorMessage}
          </div>
        )}

        {/* Update name form */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-bold text-gray-900">
            নাম হালনাগাদ করুন
          </h3>

          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-1.5 block text-sm font-medium text-gray-800"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                value={inputName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInputName(event.target.value);
                  setMessage("");
                  setErrorMessage("");
                }}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-gray-800 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#008a45]"
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                maxLength={100}
                required
                disabled={isUpdating}
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating || !inputName.trim()}
              className="rounded-lg bg-[#008a45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#007339] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "হালনাগাদ হচ্ছে..." : "নাম হালনাগাদ করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
