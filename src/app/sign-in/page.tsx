
import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f1f4f2]">
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

