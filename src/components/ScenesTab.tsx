import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PlusCircle, Save } from 'lucide-react';

interface SceneForm {
  title: string;
  content: string;
  characters: string[];
}

const ScenesTab: React.FC = () => {
  const { characters, scenes, addScene } = useStore();
  const [forms, setForms] = useState<SceneForm[]>([
    { title: '', content: '', characters: [] }
  ]);

  const handleAddForm = () => {
    setForms([...forms, { title: '', content: '', characters: [] }]);
  };

  const handleChange = (index: number, field: keyof SceneForm, value: any) => {
    const newForms = [...forms];
    newForms[index][field] = value;
    setForms(newForms);
  };

  const handleSave = () => {
    forms.forEach((form) => {
      if (form.title && form.content) {
        addScene({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          ...form
        });
      }
    });
    setForms([{ title: '', content: '', characters: [] }]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="space-y-4 sm:space-y-6">
        {forms.map((form, index) => (
          <div key={`scene-form-${index}`} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scene Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter scene title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scene Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => handleChange(index, 'content', e.target.value)}
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter scene content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Characters in Scene
                </label>
                <select
                  multiple
                  value={form.characters}
                  onChange={(e) => handleChange(index, 'characters', 
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {characters.map((character) => (
                    <option key={character.id} value={character.id}>
                      {character.name} - {character.role}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple characters
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
          <button
            onClick={handleAddForm}
            className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Scene</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save All</span>
          </button>
        </div>

        {scenes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Saved Scenes</h3>
            <div className="space-y-4">
              {scenes.map((scene) => (
                <div key={scene.id} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">{scene.title}</h4>
                  <p className="text-gray-700 mt-2 whitespace-pre-wrap">{scene.content}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-600">Characters: </span>
                    {scene.characters.map((charId, index, array) => {
                      const character = characters.find(c => c.id === charId);
                      return character ? (
                        <span key={`${scene.id}-${charId}`} className="text-sm text-gray-600">
                          {character.name}{index < array.length - 1 ? ', ' : ''}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};