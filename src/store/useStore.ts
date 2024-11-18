import { create } from 'zustand';

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
}

interface Scene {
  id: string;
  title: string;
  content: string;
  characters: string[];
}

interface Story {
  title: string;
  synopsis: string;
}

interface StoryState {
  story: Story;
  characters: Character[];
  scenes: Scene[];
  setStory: (story: Story) => void;
  addCharacter: (character: Character) => void;
  addScene: (scene: Scene) => void;
}

export const useStore = create<StoryState>((set) => ({
  story: { title: '', synopsis: '' },
  characters: [],
  scenes: [],
  setStory: (story) => set({ story }),
  addCharacter: (character) =>
    set((state) => ({ characters: [...state.characters, character] })),
  addScene: (scene) =>
    set((state) => ({ scenes: [...state.scenes, scene] })),
}));