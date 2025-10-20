
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.293 12.293a1 1 0 0 1-1.414 1.414L12 13.414l-1.879 1.879a1 1 0 0 1-1.414-1.414L10.586 12 8.707 10.121a1 1 0 0 1 1.414-1.414L12 10.586l1.879-1.879a1 1 0 1 1 1.414 1.414L13.414 12l1.879 1.879z"/>
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Nano Banana <span className="text-brand-secondary">AI Image Editor</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
