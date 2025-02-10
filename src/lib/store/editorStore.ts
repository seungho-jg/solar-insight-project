import { writable } from 'svelte/store';
import type { GraphEditor } from '../tools/graphEditor';

interface EditorState {
  isEditing: boolean;
  isComplete: boolean;
  graphEditor: GraphEditor | null;
}

const initialState: EditorState = {
  isEditing: false,
  isComplete: false,
  graphEditor: null
};

function createEditorStore() {
  const { subscribe, set, update } = writable<EditorState>(initialState);

  return {
    subscribe,
    toggleEditing: () => update(state => ({ ...state, isEditing: !state.isEditing })),
    reset: (graphEditor: GraphEditor) => set({ isEditing: false, isComplete: false, graphEditor })
  };
}

export const editorStore = createEditorStore();