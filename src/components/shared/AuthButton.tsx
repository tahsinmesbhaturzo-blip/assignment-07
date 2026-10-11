"use client"
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import UserProfileMenu from "./UserProfileMenu";
import { Spinner } from "@heroui/react";


const AuthButton = () => {
    const {data: session,isPending} = useSession()

   if (isPending) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full p-6 bg-gray-50/60 rounded-2xl border border-gray-100">
     
      <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      
      <p className="mt-3 text-xs font-medium text-gray-500 tracking-wide animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
}
    
    return (
        <div>
            {
                session?.user
                ? 
                // user Profile Area
                <UserProfileMenu session={session}></UserProfileMenu>
                : 
                // Sign in and Sign Up area
                <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
            <Link href={"/sign-in"}>
              <button
              className="flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:text-[#008a45] sm:flex-none sm:px-4 sm:text-base"
            >
              সাইন ইন
            </button>
            </Link>

            <Link href={"/sign-up"}>
              <button
              className="flex-1 rounded-xl bg-[#008a45] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#00753a] active:scale-95 sm:flex-none sm:px-6 sm:text-base"
            >
              সাইন আপ
            </button>
            </Link>
            
          </div>
            }
        </div>
    );
};

export default AuthButton;