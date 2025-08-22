
import React from 'react';

interface InstructionCardProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

export const InstructionCard: React.FC<InstructionCardProps> = ({ step, title, children }) => {
  return (
    <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-5 shadow-md">
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0 bg-cyan-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
          {step}
        </div>
        <h3 className="ml-4 text-lg font-semibold text-gray-100">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};
