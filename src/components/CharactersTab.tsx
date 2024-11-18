import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PlusCircle, Save } from 'lucide-react';

interface CharacterForm {
  name: string;
  role: string;
  description: string;
}

const CharactersTab: React.FC = () => {
  const { characters, addCharacter } = useStore();
  const [forms, setForms] = useState<CharacterForm[]>([{ name: '', role: '', description: '' }]);

  const handleAddForm = () => {
    setForms([...forms, { name: '', role: '', description: '' }]);
  };

  const handleChange = (index: number, field: keyof CharacterForm, value: string) => {
    const newForms = [...forms];
    newForms[index][field] = value;
    setForms(newForms);
  };

  const handleSave = () => {
    forms.forEach((form) => {
      if (form.name && form.role) {
        addCharacter({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          ...form
        });
      }
    });
    setForms([{ name: '', role: '', description: '' }]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="space-y-4 sm:space-y-6">
        {forms.map((form, index) => (
          <div key={`form-${index}`} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Character Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter character name"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Character Role
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => handleChange(index, 'role', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter character role"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Character Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter character description"
                />
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
            <span>Add Character</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save All</span>
          </button>
        </div>

        {characters.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Saved Characters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {characters.map((character) => (
                <div key={character.id} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg">{character.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{character.role}</p>
                  <p className="text-gray-700">{character.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};