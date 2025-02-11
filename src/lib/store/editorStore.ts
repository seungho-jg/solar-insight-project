import { writable } from 'svelte/store';
import type { GraphEditor } from '../tools/graphEditor';
import type { PanelEditor } from '../tools/panelEditor';

interface EditorState {
  isEditing: boolean;
  isComplete: boolean;
  graphEditor: GraphEditor | null;
  panelEditor: PanelEditor | null;
}

const initialState: EditorState = {
  isEditing: false,
  isComplete: false,
  graphEditor: null,
  panelEditor: null
};

function createEditorStore() {
  const { subscribe, set, update } = writable<EditorState>(initialState);

  return {
    subscribe,
    toggleEditing: () => update(state => ({ ...state, isEditing: !state.isEditing })),
    toggleComplete: () => update(state => ({...state, isComplete: !state.isComplete})),
    reset: (graphEditor: GraphEditor, panelEditor: PanelEditor) => set({ isEditing: false, isComplete: false, graphEditor, panelEditor })
  };
}

export const editorStore = createEditorStore();