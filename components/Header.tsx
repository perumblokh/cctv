
import React from 'react';
import { CameraIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <CameraIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="text-xl md:text-2xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
          V380 Pro Web Viewer Guide
        </h1>
      </div>
    </header>
  );
};
