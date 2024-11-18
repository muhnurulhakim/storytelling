import React, { useState } from 'react';
import TabMenu from './components/TabMenu';
import StoryTab from './components/StoryTab';
import CharactersTab from './components/CharactersTab';
import ScenesTab from './components/ScenesTab';
import PreviewTab from './components/PreviewTab';
import { Feather } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('story');

  const renderTab = () => {
    switch (activeTab) {
      case 'story':
        return <StoryTab />;
      case 'characters':
        return <CharactersTab />;
      case 'scenes':
        return <ScenesTab />;
      case 'preview':
        return <PreviewTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-3">
            <Feather className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">StoryTeller</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full overflow-x-hidden">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}