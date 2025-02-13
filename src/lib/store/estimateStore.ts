import { writable } from "svelte/store";

interface EstimateState {
  panelCount: number;
  currentPanelId: number | null; 
}
const initialState: EstimateState = {
  panelCount: 0,
  currentPanelId: null,
};

function createEstimateStore() {
  const { subscribe, update } = writable<EstimateState>(initialState);

  return {
    subscribe,
    setPanelCount: (count: number) => update(state => ({...state, panelCount: count})),
    setCurrentPanelId: (id: number | null) => update(state => ({...state, currentPanelId: id}))
  };
}

export const estimateStore = createEstimateStore();
