import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Action {
  type: "color" | "fontSize" | "position";
  nodeId: string;
  prevValue: any;
  newValue: any;
}

interface NodeHistory {
  past: Action[];
  present: Action | null;
  future: Action[];
}

interface HistoryState {
  nodes: Record<string, NodeHistory>; // Separate history per node
}

const initialState: HistoryState = {
  nodes: {},
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<Action>) => {
      const { nodeId } = action.payload;

      if (!state.nodes[nodeId]) {
        state.nodes[nodeId] = { past: [], present: null, future: [] };
      }

      const nodeHistory = state.nodes[nodeId];

      // Move current present to past before updating
      if (nodeHistory.present) {
        nodeHistory.past.push(nodeHistory.present);
      }

      nodeHistory.present = action.payload;
      nodeHistory.future = []; // Clear future when a new action is added
    },

    undo: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;

      if (!state.nodes[nodeId]) return;

      const nodeHistory = state.nodes[nodeId];

      if (nodeHistory.past.length > 0) {
        const lastAction = nodeHistory.past.pop(); // Get last past action
        if (lastAction && nodeHistory.present) {
          nodeHistory.future.push(nodeHistory.present); // Move present to future
          nodeHistory.present = lastAction; // Revert to last action
        }
      }
    },

    redo: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;

      if (!state.nodes[nodeId]) return;

      const nodeHistory = state.nodes[nodeId];

      if (nodeHistory.future.length > 0) {
        const nextAction = nodeHistory.future.pop(); // Get next future action
        if (nextAction && nodeHistory.present) {
          nodeHistory.past.push(nodeHistory.present); // Move present to past
          nodeHistory.present = nextAction; // Apply next action
        }
      }
    },
  },
});

export const { addToHistory, undo, redo } = historySlice.actions;
export default historySlice.reducer;
