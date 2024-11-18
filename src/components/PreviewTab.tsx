import React from 'react';
import { useStore } from '../store/useStore';

const PreviewTab: React.FC = () => {
  const { story, characters, scenes } = useStore();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 prose prose-indigo">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{story.title}</h1>
        
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Synopsis</h2>
          <p className="text-gray-700">{story.synopsis}</p>
        </div>

        {characters.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Characters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {characters.map((character) => (
                <div key={character.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold">{character.name}</h3>
                  <p className="text-gray-600 mb-2">{character.role}</p>
                  <p className="text-gray-700">{character.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {scenes.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Scenes</h2>
            <div className="space-y-6">
              {scenes.map((scene, index) => (
                <div key={scene.id} className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    Scene {index + 1}: {scene.title}
                  </h3>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600">Featured Characters: </span>
                    {scene.characters.map((charId, index, array) => {
                      const character = characters.find(c => c.id === charId);
                      return character ? (
                        <span key={`${scene.id}-${charId}`} className="text-sm text-gray-600">
                          {character.name}{index < array.length - 1 ? ', ' : ''}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{scene.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};