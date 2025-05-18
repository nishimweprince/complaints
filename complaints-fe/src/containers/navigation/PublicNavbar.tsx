import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  /**
   * NAVIGATION
   */

  // NAVIGATION LINKS
  const navigationLinks = useMemo(
    () => [
      {
        to: "#benefits",
        label: "Services",
      },
      {
        to: "#specifications",
        label: "How It Works",
      },
      {
        to: "#howto",
        label: "Agencies",
      },
      {
        to: "#contact",
        label: "Support",
      },
    ],
    []
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between h-20">
          <Link to={`/`} className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
              Citizen Complaints
            </h1>
          </Link>
          <nav className="flex items-center">
            <menu className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationLinks?.map((navigationLink, index) => {
                return (
                  <a
                    href={navigationLink?.to}
                    key={index}
                    className="relative text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {navigationLink?.label}
                  </a>
                );
              })}
            </menu>
          </nav>
          <aside className="flex items-center gap-4">
            <Link to={`/tickets/create`} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20">
              Submit Complaint
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <UserCircle className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60 flex flex-col gap-1"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <section className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Welcome</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Sign in to access your account
                    </p>
                  </section>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={`/auth/login`} className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    <span>Citizen Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={`/auth/login`} className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>Agency Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={`/auth/login`} className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Admin Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-primary">
                  <Link to={`/auth/login`} className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <span>Register Account</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </aside>
        </nav>
      </header>
    </nav>
  );
};

export default PublicNavbar;
