
import React, { useState } from 'react';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter web-friendly stream URL (e.g., from go2rtc)"
        className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-4 py-2.5 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition duration-200"
      />
      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
      >
        Load Stream
      </button>
    </form>
  );
};
