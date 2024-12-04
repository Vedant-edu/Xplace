import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/theme-toggle';
import { Building2 } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-semibold tracking-tight">
            {isAdmin ? 'Xplace Admin' : 'Xplace'}
          </span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          {!isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}