import { writable } from 'svelte/store';

interface EditorState {
  isEditing: boolean;
}

const initialState: EditorState = {
  isEditing: false
};

function createEditorStore() {
  const { subscribe, set, update } = writable<EditorState>(initialState);

  return {
    subscribe,
    toggleEditing: () => update(state => ({ ...state, isEditing: !state.isEditing })),
    reset: () => set({ isEditing: false })
  };
}

export const editorStore = createEditorStore();