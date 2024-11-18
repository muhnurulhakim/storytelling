import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const StoryTab: React.FC = () => {
  const { story, setStory } = useStore();
  const [title, setTitle] = useState(story.title);
  const [synopsis, setSynopsis] = useState(story.synopsis);

  const handleSave = () => {
    setStory({ title, synopsis });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Story Details</h2>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter story title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Synopsis
          </label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            rows={6}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter story synopsis"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Story
        </button>
      </div>
    </div>
  );
};