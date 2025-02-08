import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INode {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    color: string;
    fontSize: number;
  };
}

interface IEdge {
  id: string;
  source: string;
  target: string;
}

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 700),
  y: Math.floor(Math.random() * 700),
});

const nodes: INode[] = Array.from({ length: 10 }, (_, index) => ({
  id: `node-${index + 1}`,
  type: `customNode`,
  position: getRandomPosition(),
  data: {
    label: `Node ${index + 1}`,
    color: "",
    fontSize: 12,
  },
}));

const edges: IEdge[] = [
  { id: "edge-1", source: "node-1", target: "node-2" },
  { id: "edge-2", source: "node-1", target: "node-3" },
];

const initialState = {
  nodes,
  edges,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<INode[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<IEdge[]>) => {
      state.edges = action.payload;
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{
        nodeId: string;
        position: { x: number; y: number };
      }>
    ) => {
      const { nodeId, position } = action.payload;
      const node = state.nodes.find((node) => node.id === nodeId);

      if (node) {
        node.position = position;
      }
    },
  },
});

export const { setNodes, setEdges, updateNodePosition } = graphSlice.actions;
export default graphSlice.reducer;
