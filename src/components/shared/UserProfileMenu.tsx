
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

type UserProfileMenuProps = {
  session: {
    user: {
      name?: string;
      email?: string;
      image?: string | null;
    };
  };
};

export default function UserProfileMenu({
  session,
}: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const router = useRouter();

  // Sign Out Handler
  const handleSignOut = async (): Promise<void> => {
  try {
    setIsSigningOut(true);

    const { error } = await signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      console.error("Sign out failed:", error);
      return;
    }

    setIsOpen(false);

    toast.success("সফলভাবে সাইন আউট হয়েছে!", {
      duration: 3000,
    });

    // Toast দেখানোর পর Home page-এ যাওয়া
    setTimeout(() => {
      router.replace("/");
      router.refresh();
    }, 1500);
  } catch (error: unknown) {
    console.error("Sign out failed:", error);
    toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
  } finally {
    setIsSigningOut(false);
  }
};

  // User name-er first letter
  const userInitial = session.user.name
    ? session.user.name.charAt(0).toUpperCase()
    : "A";

  return (
    <div className="relative inline-block text-left">
      {/* Profile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 focus:outline-none"
      >
        {/* Avatar / Profile Image */}
        <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-sm font-bold text-white">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            userInitial
          )}
        </div>

        {/* User Name & Dropdown Icon */}
        <span className="text-sm font-medium text-gray-700">
          {session.user.name || "User"}
        </span>

        <span className="text-xs text-gray-500">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
          {/* User Details */}
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-600">
              {session.user.name || "User"}
            </h4>

            <p className="truncate text-xs text-gray-400">
              {session.user.email || ""}
            </p>
          </div>

          {/* Menu Items */}
          <div className="space-y-3 border-t border-gray-100 pt-3">
            {/* Profile Link */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-800 transition hover:text-emerald-600"
            >
              <span className="text-base text-purple-900">
                👤
              </span>

              <span className="font-medium">
                আমার প্রোফাইল
              </span>
            </Link>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center gap-2 text-left text-sm text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-base">↵</span>

              <span className="font-medium">
                {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

