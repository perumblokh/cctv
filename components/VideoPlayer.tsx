
import React from 'react';
import { VideoIcon } from './Icons';

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 flex items-center justify-center">
      {src ? (
        <video
          key={src} // Important for React to re-mount the component on src change
          className="w-full h-full"
          controls
          autoPlay
          muted
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-center text-gray-500">
          <VideoIcon className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400">CCTV Stream will appear here</h3>
          <p className="text-sm">Enter a valid web-stream URL below to begin.</p>
        </div>
      )}
    </div>
  );
};
