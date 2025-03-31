import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  return (
    <nav className="bg-background shadow-md fixed w-full z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-2">
            <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <Link href="/">
              <a className="text-xl font-bold text-foreground">Stockfolio</a>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" active={location === "/"}>Home</NavLink>
            <NavLink href="/about" active={location === "/about"}>About</NavLink>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.onboardingCompleted ? (
                  <Button variant="ghost" onClick={() => logoutMutation.mutate()}>
                    Logout
                  </Button>
                ) : (
                  <Link href="/onboarding">
                    <Button variant="ghost">Continue Onboarding</Button>
                  </Link>
                )}
                <Link href={user.onboardingCompleted ? "/dashboard" : "/onboarding"}>
                  <Button>Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          <button 
            className="md:hidden text-foreground focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <NavLink href="/" active={location === "/"}>Home</NavLink>
            <NavLink href="/about" active={location === "/about"}>About</NavLink>
            
            {user ? (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href={user.onboardingCompleted ? "/dashboard" : "/onboarding"}>
                  <Button className="w-full">Dashboard</Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => logoutMutation.mutate()}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/auth">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/auth">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <a className={`block py-2 md:inline-block md:py-0 transition-colors ${
        active ? "text-primary" : "text-muted-foreground hover:text-primary"
      }`}>
        {children}
      </a>
    </Link>
  );
}
