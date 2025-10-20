import React from 'react';

const Feature: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary text-white">
        {icon}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-lg leading-6 font-medium text-white">{title}</h3>
      <p className="mt-2 text-base text-gray-400">{children}</p>
    </div>
  </div>
);


const WelcomeScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
        Unleash Your Creativity
      </h2>
      <p className="mt-4 max-w-xl mx-auto text-xl text-gray-400">
        Transform your photos with the power of AI. Get unique editing ideas and bring them to life with a single click.
      </p>
      <div className="mt-12 mb-12">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-12">
          <Feature
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            title="Upload Your Image"
            >
            Start with any photo from your device. High-resolution images work best!
          </Feature>
          <Feature
             icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
            title="Get AI Ideas"
          >
            Don't know what to create? Let our AI generate unique, creative prompts for you.
          </Feature>
          {/* FIX: Removed a stale developer comment from inside the Feature component below. */}
          <Feature
             icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Transform & Amaze"
          >
            Apply the edits and watch as Nano Banana magically transforms your image.
          </Feature>
        </div>
      </div>
      {children}
    </div>
  );
};

export default WelcomeScreen;
