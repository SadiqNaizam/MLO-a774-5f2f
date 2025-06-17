import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture } from 'lucide-react'; // Using Aperture as a placeholder logo icon

const Header: React.FC = () => {
  console.log('Header component loaded');

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold hover:text-primary transition-colors">
          <Aperture className="h-7 w-7 text-primary" />
          <span>AuthApp</span> {/* Placeholder application name */}
        </Link>
        <nav className="flex items-center space-x-4">
          {/* Minimal navigation, e.g., back to homepage, could be added here if needed */}
          {/* For now, the logo/app name serves as the primary link to home */}
        </nav>
      </div>
    </header>
  );
};

export default Header;