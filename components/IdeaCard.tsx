
import React, { ReactNode } from 'react';

interface IdeaCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] hover:shadow-cyan-500/10">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gray-700 rounded-lg mr-4 text-cyan-400">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
        </div>
        <div className="text-gray-300 leading-relaxed text-base">
          {children}
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
