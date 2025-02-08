import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeStylingState {
  nodeStyles: Record<
    string,
    {
      color: string;
      fontSize: number;
    }
  >;
}

const initialState: NodeStylingState = {
  nodeStyles: {},
};

const nodeStylingSlice = createSlice({
  name: "nodeStyling",
  initialState,
  reducers: {
    setNodeColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>
    ) => {
      const { nodeId, color } = action.payload;

      if (!state.nodeStyles[nodeId]) {
        state.nodeStyles[nodeId] = { color: "", fontSize: 12 };
      }

      state.nodeStyles[nodeId].color = color;
    },
    setFontSize: (
      state,
      action: PayloadAction<{ nodeId: string; fontSize: number }>
    ) => {
      const { nodeId, fontSize } = action.payload;

      if (!state.nodeStyles[nodeId]) {
        state.nodeStyles[nodeId] = { color: "", fontSize: 12 };
      }

      state.nodeStyles[nodeId].fontSize = fontSize;
    },
  },
});

export const { setNodeColor, setFontSize } = nodeStylingSlice.actions;
export default nodeStylingSlice.reducer;
