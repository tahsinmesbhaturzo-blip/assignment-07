import NavLinks from "./shared/NavLinks";
import AuthButton from "./shared/AuthButton";
import { Suspense } from "react";
import LogoLink from "./shared/LogoLink";






const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-3 py-2.5 sm:py-4">
          {/* Logo and Title */}
          
          <LogoLink></LogoLink>

          {/* Auth Buttons */}
          <div className="shrink-0">
            <AuthButton />
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="border-t border-gray-100 py-2 sm:py-3">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex min-w-max justify-start sm:justify-center">
              <Suspense fallback={<div className="h-10" />}>
                <NavLinks />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
