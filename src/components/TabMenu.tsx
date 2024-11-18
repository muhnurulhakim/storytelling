import React from 'react';
import { BookOpen, Users, Film, Eye } from 'lucide-react';

interface TabMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'characters', label: 'Characters', icon: Users },
    { id: 'scenes', label: 'Scenes', icon: Film },
    { id: 'preview', label: 'Preview', icon: Eye },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base
            ${activeTab === id
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};